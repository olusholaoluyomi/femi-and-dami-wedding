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
        JSON.stringify({ success: false, message: "You have already RSVP’d / registered. No duplicate email was sent." }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    // --- End safeguard ---

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
          <h2 style="color: #8B4513; font-size: 24px; margin-bottom: 20px;">Your RSVP Has Been Confirmed!</h2>
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            Dear ${name},
          </p>
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            We are thrilled that you'll be joining us on our special day. Your attendance has been confirmed, and we can’t wait to celebrate with you!
          </p>

          <div style="background: #F5F1EB; padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h4 style="color: #8B4513; margin: 0 0 15px 0;">Wedding Ceremony Details:</h4>
            <p style="color: #4A4A4A; margin: 5px 0;"><strong>Date:</strong> December 10th, 2025</p>
            <p style="color: #4A4A4A; margin: 5px 0;"><strong>Time:</strong> 9:00 AM - 11:00 AM WAT</p>
            <p style="color: #4A4A4A; margin: 5px 0;"><strong>Venue:</strong> United Mission Church of Africa (UMCA) Chapel, Tanke, Ilorin</p>
          </div>

          <div style="background: #FFF8E7; padding: 20px; border-radius: 15px; margin: 20px 0; border: 1px solid #D4AF37;">
            <h4 style="color: #8B4513; margin: 0 0 15px 0;">Explore Kwara State With Us</h4>
            <p style="color: #4A4A4A; line-height: 1.6;">
              For guests staying longer in Ilorin, we are planning a little sightseeing experience over the weekend. 
              Highlights include:
            </p>
            <ul style="color: #4A4A4A; margin: 15px 0 0 20px; line-height: 1.6;">
              <li><strong>Owu Waterfall</strong> – the tallest in West Africa</li>
              <li><strong>Esie Museum</strong> – famous for its soapstone figures and cultural history</li>
              <li>And more hidden gems around Kwara State!</li>
            </ul>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin: 20px 0; border: 1px solid #eee;">
            <h4 style="color: #8B4513; margin: 0 0 15px 0;">Gifts & Contributions</h4>
            <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 10px;">
              Your presence is the greatest gift. However, if you would still love to give towards the wedding, 
              we are open to cash gifts or items from our wishlist (delivered directly to us).
            </p>
            <p style="margin: 10px 0;">
              <a href="https://revolut.me/amiria2122" target="_blank" style="background: #D4AF37; color: #fff; padding: 10px 15px; border-radius: 8px; text-decoration: none; font-weight: bold;">💷 Give via Revolut</a>
            </p>
            <p style="margin: 10px 0;">
              <a href="https://flutterwave.com/donate/vmlqzuuy3qpu" target="_blank" style="background: #D4AF37; color: #fff; padding: 10px 15px; border-radius: 8px; text-decoration: none; font-weight: bold;">🇳🇬 Give via Flutterwave</a>
            </p>
            <p style="margin: 10px 0;">
              <a href="https://www.amazon.co.uk/hz/wishlist/ls/QTIVU9W0Q471" target="_blank" style="background: #D4AF37; color: #fff; padding: 10px 15px; border-radius: 8px; text-decoration: none; font-weight: bold;">🎁 Registry Bag</a>
            </p>
          </div>

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
          
          <p style="color: #4A4A4A; line-height: 1.6; margin-bottom: 20px;">
            Thank you for submitting your hotel reservation request. We've received your information and our team will be in touch shortly to confirm all details.
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
