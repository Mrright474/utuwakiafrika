import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      user_id, first_name, last_name, email,
      phone, city, country, age, occupation, education,
      volunteer_area, availability, skills, languages,
      experience, motivation, emergency_contact, emergency_phone
    } = body;

    if (!user_id || !first_name || !last_name || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id, first_name, last_name, email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if profile already exists
    const { data: existing } = await supabaseAdmin
      .from('volunteer_profiles')
      .select('id')
      .eq('user_id', user_id)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ message: 'Profile already exists', profile_id: existing.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: profile, error } = await supabaseAdmin
      .from('volunteer_profiles')
      .insert({
        user_id,
        first_name,
        last_name,
        email,
        phone: phone || null,
        city: city || null,
        country: country || null,
        age: age ? parseInt(age) : null,
        occupation: occupation || null,
        education: education || null,
        volunteer_area: volunteer_area || null,
        availability: availability || null,
        skills: skills || null,
        languages: languages || null,
        experience: experience || null,
        motivation: motivation || null,
        emergency_contact: emergency_contact || null,
        emergency_phone: emergency_phone || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Profile insert error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Also assign volunteer role
    await supabaseAdmin
      .from('user_roles')
      .insert({ user_id, role: 'volunteer' })
      .then(({ error: roleError }) => {
        if (roleError) console.error('Role assignment error:', roleError);
      });

    return new Response(
      JSON.stringify({ message: 'Profile created successfully', profile }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
