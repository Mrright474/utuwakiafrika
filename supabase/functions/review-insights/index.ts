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

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ROW_LIMIT = 300;

const toCsv = (rows: Record<string, unknown>[], cols: string[]) =>
  [
    cols.join(","),
    ...rows.map((r) =>
      cols.map((c) => `"${String(r[c] ?? "").slice(0, 400).replace(/"/g, '""').replace(/\s+/g, " ")}"`).join(","),
    ),
  ].join("\n");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) return json({ error: "Please sign in." }, 401);

  const [{ data: approved }, { data: isAdmin }] = await Promise.all([
    supabase.rpc("unp_is_approved", { _user_id: user.id }),
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
  ]);
  if (approved !== true && isAdmin !== true) return json({ error: "Only approved staff can use this." }, 403);

  let body: { question?: unknown; from?: unknown; to?: unknown } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const question = String(body.question ?? "").trim();
  const from = typeof body.from === "string" && DATE_RE.test(body.from) ? body.from : null;
  const to = typeof body.to === "string" && DATE_RE.test(body.to) ? body.to : null;
  if (!question) return json({ error: "Please type a question." }, 400);
  if (question.length > 1000) return json({ error: "Question is too long (max 1000 characters)." }, 400);
  if (from && to && from > to) return json({ error: "The start date is after the end date." }, 400);

  // Every query runs as the signed-in user, so RLS limits rows to what they may see.
  let reportsQ = supabase.from("unp_field_reports")
    .select("title, report_date, submitted_by, district, village, findings, challenges, recommendations, sync_status")
    .order("report_date", { ascending: false }).limit(ROW_LIMIT);
  let donationsQ = supabase.from("donation_requests")
    .select("donor_name, amount, currency, provider, status, created_at, status_updated_at")
    .order("created_at", { ascending: false }).limit(ROW_LIMIT);
  let auditQ = supabase.from("unp_audit_log")
    .select("created_at, actor_name, action, module_label, record_label, description")
    .order("created_at", { ascending: false }).limit(ROW_LIMIT);
  if (from) {
    reportsQ = reportsQ.gte("report_date", from);
    donationsQ = donationsQ.gte("created_at", `${from}T00:00:00Z`);
    auditQ = auditQ.gte("created_at", `${from}T00:00:00Z`);
  }
  if (to) {
    reportsQ = reportsQ.lte("report_date", to);
    donationsQ = donationsQ.lte("created_at", `${to}T23:59:59.999Z`);
    auditQ = auditQ.lte("created_at", `${to}T23:59:59.999Z`);
  }
  const [reports, donations, audit] = await Promise.all([reportsQ, donationsQ, auditQ]);

  const section = (name: string, res: { data: unknown; error: unknown }, cols: string[]) => {
    if (res.error) return `## ${name}\n(Not available to this user.)`;
    const rows = (res.data ?? []) as Record<string, unknown>[];
    const note = rows.length >= ROW_LIMIT ? ` (latest ${ROW_LIMIT} only)` : "";
    return `## ${name} — ${rows.length} rows${note}\n${rows.length ? toCsv(rows, cols) : "(none)"}`;
  };

  const context = [
    section("Field reports", reports, ["report_date", "title", "submitted_by", "district", "village", "findings", "challenges", "recommendations", "sync_status"]),
    section("Donations", donations, ["created_at", "donor_name", "amount", "currency", "provider", "status", "status_updated_at"]),
    section("Audit log", audit, ["created_at", "actor_name", "action", "module_label", "record_label", "description"]),
  ].join("\n\n");

  const counts = {
    reports: reports.error ? null : (reports.data?.length ?? 0),
    donations: donations.error ? null : (donations.data?.length ?? 0),
    audit: audit.error ? null : (audit.data?.length ?? 0),
  };

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured." }, 500);

  const period = from || to ? `Records are limited to ${from ?? "the beginning"} through ${to ?? "today"}.` : "No date filter applied.";
  const instructions = `You help staff of Utu Wa Kiafrika, a Ugandan NGO, review their records. Answer ONLY from the records provided below (field reports, donations, audit log). Do not invent facts. If a section says it is not available, tell the user they don't have access to that data. If the records cannot answer the question, say so plainly. Operators: "airtel" = Airtel Money, "mtn" = MTN MoMo; amounts are UGX unless stated. Today is ${new Date().toISOString().slice(0, 10)}. ${period} Keep answers under 250 words, using short bullet points or a small table, and mention dates or names from the records that support your answer.`;

  try {
    const { result, runIdFetch } = createResponsesCall(
      req,
      { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
      [{ role: "user", content: `${context}\n\nQuestion: ${question}` }],
      instructions,
    );
    const answer = (await result.text).trim();
    const runId = runIdFetch.getRunId();
    const extra = runId ? { "X-Lovable-AIG-Run-ID": runId } : undefined;
    if (!answer) return json({ error: "The AI returned no answer. Please try a different question." }, 502, extra);
    return json({ answer, counts }, 200, extra);
  } catch (err) {
    if ((err as Error)?.name === "AbortError") return json({ error: "Cancelled" }, 499);
    const status = Number((err as { statusCode?: number })?.statusCode) || 500;
    const messages: Record<number, string> = {
      402: "AI credits are used up. Add credits in workspace billing to keep using this.",
      429: "Too many requests right now. Please wait a moment and try again.",
    };
    console.error("review-insights error", status, (err as Error)?.message);
    return json({ error: messages[status] ?? "The AI could not answer right now." }, status);
  }
});
