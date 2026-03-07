import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Use service role to update - no public RLS UPDATE policy needed
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase())
      .eq('status', 'active')
      .select('id');

    if (error) {
      console.error("Error in newsletter-unsubscribe function:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred processing your request. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Successfully unsubscribed from newsletter" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in newsletter-unsubscribe function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
