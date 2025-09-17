const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EmailRequest {
  email: string;
  name: string;
  type: 'rsvp' | 'hotel';
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

    const { email, name, type }: EmailRequest = await req.json();

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // --- Audience safeguard ---
    const audienceId = "general";

    // Check if this email already exists in the audience
    const contactsRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!contactsRes.ok) {
      console.error("Failed to fetch contacts:", await contactsRes.text());
      return new Response(JSON.stringify({ error: 'Could not verify audience' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const contacts = await contactsRes.json();
    const alreadyExists = contacts.data?.some(
      (contact: any) => contact.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      console.log(`Skipping email — already sent to ${email}`);
      return new Response(
        JSON.stringify({ success: false, message: "You have already RSVP’d. No duplicate email was sent." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    // --- End safeguard ---

    // Determine email content based on type
    const isRSVP = type === 'rsvp';
    const subject = isRSVP 
      ? 'Your RSVP Confirmation - Dami & Femi Wedding'
      : 'Your Hotel Reservation Confirmation - Dami & Femi Wedding';

    const emailContent = isRSVP
      ? `... (your full RSVP HTML here as before) ...`
      : `... (your hotel HTML here as before) ...`;

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dami & Femi Wedding <noreply@thehesedforever.com>',
        to: [email],
        subject,
        html: emailContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    // Add the contact to the General audience
    await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, firstName: name }),
    });

    return new Response(JSON.stringify({ success: true, emailId: emailResult.id }), {
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
