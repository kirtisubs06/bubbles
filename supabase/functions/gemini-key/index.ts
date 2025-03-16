
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Creating Supabase client");
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    const { method, url } = req;
    const pathSegments = new URL(url).pathname.split('/');
    const functionType = pathSegments[pathSegments.length - 1]; // 'get' or 'set'

    console.log(`Processing ${method} request to ${functionType}`);

    // GET request to fetch the API key
    if (method === 'GET' && functionType === 'get') {
      console.log("Fetching API key from database");
      const { data, error } = await supabaseClient
        .from('app_settings')
        .select('value')
        .eq('key', 'gemini_api_key')
        .single();
      
      if (error) {
        console.error('Error fetching API key:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve API key', details: error }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      console.log('Successfully retrieved API key');
      return new Response(
        JSON.stringify({ key: data.value }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // POST request to update the API key
    if (method === 'POST' && functionType === 'set') {
      const requestData = await req.json();
      const { apiKey } = requestData;
      
      console.log("Received update API key request", { hasApiKey: Boolean(apiKey) });
      
      if (!apiKey) {
        console.error("API key is required");
        return new Response(
          JSON.stringify({ error: 'API key is required' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }
      
      // Check if the record exists first
      const { data: existingData } = await supabaseClient
        .from('app_settings')
        .select('id')
        .eq('key', 'gemini_api_key')
        .single();
      
      let result;
      
      if (existingData) {
        console.log("Updating existing API key record");
        result = await supabaseClient
          .from('app_settings')
          .update({ value: apiKey, updated_at: new Date() })
          .eq('key', 'gemini_api_key');
      } else {
        console.log("Creating new API key record");
        result = await supabaseClient
          .from('app_settings')
          .insert({ key: 'gemini_api_key', value: apiKey });
      }
      
      const { error } = result;
      
      if (error) {
        console.error('Error updating API key:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update API key', details: error }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      console.log('Successfully updated API key');
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Unhandled request: ${method} ${url}`);
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
