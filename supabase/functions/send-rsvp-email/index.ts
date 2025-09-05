const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EmailRequest {
  email: string;
  name: string;
  uniqueCode: string;
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

    const { email, name, uniqueCode, type }: EmailRequest = await req.json();

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Determine email content based on type
    const isRSVP = type === 'rsvp';
    const subject = isRSVP 
      ? 'Your RSVP Confirmation - Dami & Femi Wedding'
      : 'Your Hotel Reservation Confirmation - Dami & Femi Wedding';

    const emailContent = isRSVP ? `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FEFDFB; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-family: 'Playfair Display', serif; color: #8B4513; font-size: 32px; margin-bottom: 10px;">
            Dami & Femi Wedding
          </h1>
          <div style="width: 60px; height: 2px; background: #D4AF37; margin: 0 auto;"></div>
        </div>

        <div style="background: rgba(245, 241, 235, 0.8); padding: 30px; border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.2);">
          <h2 style="color: #8B4513; font-size: 24px; margin-bottom: 20px;">Thank You for Your RSVP!</h2>
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            Dear ${name},
          </p>
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 30px;">
            We're thrilled that you'll be joining us for our special day! Your RSVP has been confirmed.
          </p>

          <div style="background: #D4AF37; color: white; padding: 20px; border-radius: 15px; text-align: center; margin: 30px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 18px;">Your Entry Code</h3>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: monospace;">
              ${uniqueCode}
            </div>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
              Please save this code - you'll need it for check-in at the wedding
            </p>
          </div>

          <div style="background: #F5F1EB; padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #8B4513; margin: 0 0 15px 0;">Event Details:</h4>
            <p style="color: #4A4A4A; margin: 5px 0;"><strong>Date:</strong> December 10th, 2025</p>
            <p style="color: #4A4A4A; margin: 5px 0;"><strong>Time:</strong> 9:00 AM - 11:00 AM WAT</p>
            <p style="color: #4A4A4A; margin: 5px 0;"><strong>Venue:</strong> United Mission Church of Africa (UMCA) Chapel, Tanke, Ilorin</p>
          </div>

          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            We can't wait to celebrate with you! If you have any questions, please don't hesitate to reach out.
          </p>

          <p style="color: #4A4A4A; line-height: 1.6;">
            With love,<br>
            <strong style="color: #8B4513;">Dami & Femi</strong>
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #4A4A4A; font-size: 12px;">
          <p>#TheHesed - A love that endures</p>
        </div>
      </div>
    ` : `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FEFDFB; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-family: 'Playfair Display', serif; color: #8B4513; font-size: 32px; margin-bottom: 10px;">
            Dami & Femi Wedding
          </h1>
          <div style="width: 60px; height: 2px; background: #D4AF37; margin: 0 auto;"></div>
        </div>

        <div style="background: rgba(245, 241, 235, 0.8); padding: 30px; border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.2);">
          <h2 style="color: #8B4513; font-size: 24px; margin-bottom: 20px;">Hotel Reservation Confirmed!</h2>
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            Dear ${name},
          </p>
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 30px;">
            Thank you for submitting your hotel reservation request. We've received your information and will be in touch soon!
          </p>

          <div style="background: #D4AF37; color: white; padding: 20px; border-radius: 15px; text-align: center; margin: 30px 0;">
            <h3 style="margin: 0 0 10px 0; font-size: 18px;">Your Reservation Code</h3>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: monospace;">
              ${uniqueCode}
            </div>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
              Keep this code for your reservation reference
            </p>
          </div>

          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            We'll contact you within 24 hours to confirm your hotel reservation details.
          </p>

          <p style="color: #4A4A4A; line-height: 1.6;">
            With love,<br>
            <strong style="color: #8B4513;">Dami & Femi</strong>
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #4A4A4A; font-size: 12px;">
          <p>#TheHesed - A love that endures</p>
        </div>
      </div>
    `;

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dami & Femi Wedding <noreply@thehesed.com>',
        to: [email],
        subject: subject,
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