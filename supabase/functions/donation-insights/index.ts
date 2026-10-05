import { createClient } from "npm:@supabase/supabase-js@2";
import { createResponsesCall } from "../_shared/responses.ts";
import { getLovableAiGatewayResponseHeaders } from "../_shared/run-id.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
};

const json = (body: unknown, status = 200, extra?: HeadersInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: getLovableAiGatewayResponseHeaders(extra, { ...corsHeaders, "Content-Type": "application/json" }),
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return json({ error: "Please sign in." }, 401);

  const [{ data: isAdmin }, { data: access }, { data: approved }] = await Promise.all([
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
    supabase.rpc("unp_access", { _user_id: user.id }),
    supabase.rpc("unp_is_approved", { _user_id: user.id }),
  ]);
  const allowed = isAdmin === true || (approved === true && (access === "admin" || access === "manager"));
  if (!allowed) return json({ error: "Only donation administrators can use this." }, 403);

  let question = "";
  try {
    question = String((await req.json())?.question ?? "").trim();
  } catch { /* ignore */ }
  if (!question) return json({ error: "Please type a question." }, 400);
  if (question.length > 1000) return json({ error: "Question is too long (max 1000 characters)." }, 400);

  // RLS scopes this to what the caller may see
  const { data: rows, error } = await supabase
    .from("donation_requests")
    .select("donor_name, phone, email, amount, currency, provider, status, note, created_at, status_updated_at")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) return json({ error: "Could not load donation records." }, 500);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured." }, 500);

  const csv = [
    "donor_name,phone,email,amount,currency,operator,status,note,submitted_at,status_updated_at",
    ...(rows ?? []).map((r) =>
      [r.donor_name, r.phone, r.email, r.amount, r.currency, r.provider, r.status, r.note, r.created_at, r.status_updated_at]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
        .join(","),
    ),
  ].join("\n");

  const instructions = `You are a donations analyst for Utu Wa Kiafrika, a Ugandan NGO. Answer the administrator's question using ONLY the donation records provided (CSV). Operators: "airtel" = Airtel Money, "mtn" = MTN MoMo. Amounts are in UGX unless the currency says otherwise. Statuses: pending, confirmed, rejected. Today is ${new Date().toISOString().slice(0, 10)}. Show totals with thousands separators. If the data cannot answer the question, say so. Keep answers concise (under 200 words), using short bullet points or a small table where helpful.`;

  try {
    const { result, runIdFetch } = createResponsesCall(
      req,
      { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
      [{ role: "user", content: `Donation records (${rows?.length ?? 0} rows):\n${csv}\n\nQuestion: ${question}` }],
      instructions,
    );
    const answer = (await result.text).trim();
    const runId = runIdFetch.getRunId();
    const extra = runId ? { "X-Lovable-AIG-Run-ID": runId } : undefined;
    if (!answer) return json({ error: "The AI returned no answer. Please try a different question." }, 502, extra);
    return json({ answer, recordCount: rows?.length ?? 0 }, 200, extra);
  } catch (err) {
    if ((err as Error)?.name === "AbortError") return json({ error: "Cancelled" }, 499);
    const status = Number((err as { statusCode?: number })?.statusCode) || 500;
    const messages: Record<number, string> = {
      402: "AI credits are used up. Add credits in workspace billing to keep using this.",
      429: "Too many requests right now. Please wait a moment and try again.",
    };
    console.error("donation-insights error", status, (err as Error)?.message);
    return json({ error: messages[status] ?? "The AI could not answer right now." }, status);
  }
});
