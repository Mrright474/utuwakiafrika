// Supabase Edge Function: create-admin
// Purpose: Create or update an admin user without email verification and ensure admin role
// - Uses SERVICE_ROLE_KEY to call Admin API
// - Idempotent: will update password if user exists
// - Ensures user_roles has 'admin' for this user
//
// Request: POST { email?: string, password?: string }
// Defaults: email = 'admin@utuafrika.org', password = 'Utu!Admin#2025'

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

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

    console.log('create-admin function called for:', email);

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error('Missing environment variables:', { 
        hasUrl: !!SUPABASE_URL, 
        hasServiceKey: !!SERVICE_ROLE_KEY 
      });
      return new Response(JSON.stringify({ error: "Missing Supabase configuration" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Create admin client with service role key
    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    let userId: string | null = null;

    try {
      // Try to get existing user first
      const { data: listData } = await adminClient.auth.admin.listUsers();
      const existingUser = listData?.users?.find(u => u.email === email);
      
      if (existingUser) {
        console.log('User already exists, updating password');
        userId = existingUser.id;
        
        // Update password for existing user
        const { error: updateError } = await adminClient.auth.admin.updateUserById(userId, {
          password: password,
          email_confirm: true
        });
        
        if (updateError) {
          console.error('Error updating user:', updateError);
          return new Response(JSON.stringify({ error: updateError.message }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      } else {
        console.log('Creating new user');
        
        // Create new user
        const { data: createData, error: createError } = await adminClient.auth.admin.createUser({
          email: email,
          password: password,
          email_confirm: true,
          user_metadata: { 
            display_name: 'Administrator',
            role: 'admin' 
          }
        });
        
        if (createError || !createData.user) {
          console.error('Error creating user:', createError);
          return new Response(JSON.stringify({ error: createError?.message || 'Failed to create user' }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        
        userId = createData.user.id;
        console.log('User created with ID:', userId);
      }
    } catch (authError) {
      console.error('Auth operation error:', authError);
      return new Response(JSON.stringify({ error: `Auth error: ${authError.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'No user ID obtained' }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Ensure admin role exists
    console.log('Adding admin role for user:', userId);
    const { error: roleError } = await adminClient
      .from('user_roles')
      .upsert({ 
        user_id: userId, 
        role: 'admin'
      }, { 
        onConflict: 'user_id,role' 
      });

    if (roleError) {
      console.error('Error adding admin role:', roleError);
      return new Response(JSON.stringify({ error: `Role error: ${roleError.message}` }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log('Admin user setup complete');
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin user created/updated successfully',
        email: email,
        userId: userId
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in create-admin:', error);
    return new Response(JSON.stringify({ 
      error: 'Unexpected error', 
      details: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
