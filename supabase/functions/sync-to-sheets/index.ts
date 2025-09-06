import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface SyncRequest {
  type: 'rsvp' | 'hotel';
  recordId: string;
}

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { type, recordId }: SyncRequest = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Google Sheets credentials from environment
    const googlePrivateKey = Deno.env.get('GOOGLE_PRIVATE_KEY');
    const googleClientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const spreadsheetId = Deno.env.get('GOOGLE_SPREADSHEET_ID');

    if (!googlePrivateKey || !googleClientEmail || !spreadsheetId) {
      console.error('Missing Google Sheets configuration');
      return new Response(JSON.stringify({ error: 'Google Sheets not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch the record from database
    const tableName = type === 'rsvp' ? 'rsvp_submissions' : 'hotel_reservations';
    const { data: record, error: fetchError } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', recordId)
      .single();

    if (fetchError || !record) {
      console.error('Record fetch error:', fetchError);
      return new Response(JSON.stringify({ error: 'Record not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create JWT for Google Sheets API
    const now = Math.floor(Date.now() / 1000);
    const jwtHeader = {
      alg: 'RS256',
      typ: 'JWT'
    };

    const jwtPayload = {
      iss: googleClientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };

    // Simple base64 encode function
    const base64UrlEncode = (str: string) => {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };

    const headerB64 = base64UrlEncode(JSON.stringify(jwtHeader));
    const payloadB64 = base64UrlEncode(JSON.stringify(jwtPayload));

    // Create signature using Web Crypto API
    const signatureInput = `${headerB64}.${payloadB64}`;
    const privateKeyPem = googlePrivateKey.replace(/\\n/g, '\n');
    
    // Clean up the private key
    const privateKeyData = privateKeyPem
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\s/g, '');

    // Convert base64 to ArrayBuffer
    const binaryDerString = atob(privateKeyData);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
      binaryDer[i] = binaryDerString.charCodeAt(i);
    }

    // Import the private key
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    // Sign the JWT
    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      privateKey,
      encoder.encode(signatureInput)
    );

    const signatureB64 = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
    const jwt = `${headerB64}.${payloadB64}.${signatureB64}`;

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token request failed:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to get access token' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Prepare data for Google Sheets
    let sheetName: string;
    let values: string[];

    if (type === 'rsvp') {
      sheetName = 'RSVP';
      values = [
        record.unique_code || '',
        record.name || '',
        record.email || '',
        record.phone || '',
        record.guests?.toString() || '1',
        record.attendance || '',
        record.dietary || '',
        record.message || '',
        record.needs_accommodation || '',
        new Date(record.created_at).toLocaleString()
      ];
    } else {
      sheetName = 'Hotel Reservations';
      values = [
        record.unique_code || '',
        record.hotel || '',
        record.checkin || '',
        record.checkout || '',
        record.guests?.toString() || '2',
        record.name || '',
        record.email || '',
        record.phone || '',
        new Date(record.created_at).toLocaleString()
      ];
    }

    // Add to Google Sheets
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW`;
    
    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [values]
      })
    });

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      console.error('Google Sheets error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to sync to Google Sheets' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mark as synced in database
    const { error: updateError } = await supabase
      .from(tableName)
      .update({ synced_to_sheets: true })
      .eq('id', recordId);

    if (updateError) {
      console.error('Database update error:', updateError);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});