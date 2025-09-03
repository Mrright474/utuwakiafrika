// Supabase Edge Function: create-admin
// Purpose: Create or update an admin user without email verification and ensure admin role
// - Uses SERVICE_ROLE_KEY to call Admin API
// - Idempotent: will update password if user exists
// - Ensures user_roles has 'admin' for this user
//
// Request: POST { email?: string, password?: string }
// Defaults: email = 'admin@utuafrika.org', password = 'Utu!Admin#2025'

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const DEFAULT_EMAIL = "admin@utuafrika.org";
const DEFAULT_PASSWORD = "Utu!Admin#2025"; // strong, to be rotated later if desired

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { ...corsHeaders } });
  }

  try {
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const email = (body.email as string) || DEFAULT_EMAIL;
    const password = (body.password as string) || DEFAULT_PASSWORD;

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Missing Supabase configuration" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Check if user exists
    let userId: string | null = null;
    const { data: existingUser, error: getErr } = await adminClient.auth.admin.getUserByEmail(email);
    if (getErr && getErr.message !== 'User not found') {
      console.error('getUserByEmail error', getErr);
    }

    if (existingUser?.user) {
      userId = existingUser.user.id;
      // Update password to ensure access
      const { error: updErr } = await adminClient.auth.admin.updateUserById(userId, {
        password,
        email_confirm: true,
      });
      if (updErr) {
        console.error('updateUserById error', updErr);
        return new Response(JSON.stringify({ error: updErr.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } else {
      // Create confirmed user
      const { data: created, error: createErr } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { display_name: 'Administrator' },
      });
      if (createErr || !created.user) {
        console.error('createUser error', createErr);
        return new Response(JSON.stringify({ error: createErr?.message || 'Failed to create user' }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      userId = created.user.id;
    }

    // Ensure role 'admin' exists for this user
    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user id' }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Upsert admin role
    const { error: roleErr } = await adminClient
      .from('user_roles')
      .upsert({ user_id: userId, role: 'admin' as any }, { onConflict: 'user_id,role' });

    if (roleErr) {
      console.error('user_roles upsert error', roleErr);
      return new Response(JSON.stringify({ error: roleErr.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        email,
        note: 'User is confirmed and has admin role',
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (e) {
    console.error('Unhandled error', e);
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
