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
    const sheetsApiKey = Deno.env.get('GOOGLE_SHEETS_API_KEY');
    const spreadsheetId = Deno.env.get('GOOGLE_SPREADSHEET_ID');

    if (!sheetsApiKey || !spreadsheetId) {
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
      return new Response(JSON.stringify({ error: 'Record not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare data for Google Sheets
    let sheetName: string;
    let values: string[];

    if (type === 'rsvp') {
      sheetName = 'RSVP';
      values = [
        record.unique_code,
        record.name,
        record.email,
        record.phone,
        record.guests.toString(),
        record.attendance,
        record.dietary || '',
        record.message || '',
        record.needs_accommodation,
        new Date(record.created_at).toLocaleString()
      ];
    } else {
      sheetName = 'Hotel Reservations';
      values = [
        record.unique_code,
        record.hotel,
        record.checkin,
        record.checkout,
        record.guests.toString(),
        record.name,
        record.email,
        record.phone,
        new Date(record.created_at).toLocaleString()
      ];
    }

    // Add to Google Sheets
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW&key=${sheetsApiKey}`;
    
    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: {
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});