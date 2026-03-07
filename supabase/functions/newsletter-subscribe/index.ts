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

    if (email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Email address is too long" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      if (existing.status === 'active') {
        return new Response(
          JSON.stringify({ message: "You are already subscribed to our newsletter" }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      } else {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active',
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null
          })
          .eq('id', existing.id);

        if (error) {
          console.error("Error reactivating subscription:", error);
          return new Response(
            JSON.stringify({ error: "An error occurred processing your request. Please try again." }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }

        return new Response(
          JSON.stringify({ message: "Newsletter subscription reactivated" }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.toLowerCase() });

    if (error) {
      console.error("Error creating subscription:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred processing your request. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Successfully subscribed to newsletter" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in newsletter-subscribe function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
