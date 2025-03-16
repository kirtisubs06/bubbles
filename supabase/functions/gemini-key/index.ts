
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    const { method, url } = req;
    const path = new URL(url).pathname.split('/').pop();

    // GET request to fetch the API key
    if (method === 'GET' && path === 'get') {
      const { data, error } = await supabaseClient
        .from('app_settings')
        .select('value')
        .eq('key', 'gemini_api_key')
        .single();
      
      if (error) {
        console.error('Error fetching API key:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve API key' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify({ key: data.value }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // POST request to update the API key
    if (method === 'POST' && path === 'set') {
      const { apiKey } = await req.json();
      
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: 'API key is required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }
      
      const { error } = await supabaseClient
        .from('app_settings')
        .update({ value: apiKey, updated_at: new Date() })
        .eq('key', 'gemini_api_key');
      
      if (error) {
        console.error('Error updating API key:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update API key' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
