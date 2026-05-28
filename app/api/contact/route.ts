import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ---------------------------------------------------------------------------
// POST /api/contact
// Called by the contact form when the user clicks "Send Message".
// Validates the payload, sends a formatted email to the owner, and
// sends an auto-reply confirmation email to the sender.
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    // 0. Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_your_api_key_here') {
      console.error('[Contact API] Error: RESEND_API_KEY is not configured in .env.local.');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Resend API key is not configured. Please add a valid RESEND_API_KEY to your .env.local file and restart the development server.' 
        },
        { status: 500 }
      );
    }

    // Resolve configuration values dynamically to support env hot-reloading
    const ownerEmail = process.env.CONTACT_EMAIL || 'pathumpiyumal013@gmail.com';
    let fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail || fromEmail.trim() === '' || !fromEmail.includes('@')) {
      fromEmail = 'onboarding@resend.dev';
    }

    const resend = new Resend(apiKey);

    // 1. Parse the request body sent from the frontend form
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 2. Server-side validation — never trust client-only validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    // Basic email format check using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters.' },
        { status: 400 }
      );
    }

    // Sanitize inputs — strip any HTML tags to prevent injection
    const cleanName    = name.trim().replace(/<[^>]*>/g, '');
    const cleanEmail   = email.trim().toLowerCase();
    const cleanSubject = (subject || 'Portfolio Contact Form').trim().replace(/<[^>]*>/g, '');
    const cleanMessage = message.trim().replace(/<[^>]*>/g, '');

    // 3. Build the formatted HTML email that arrives in YOUR inbox
    const ownerEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e4e4e7; margin: 0; padding: 0; }
          .container { max-width: 580px; margin: 40px auto; background: #111111; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #111111 100%); padding: 32px 36px; border-bottom: 1px solid #27272a; }
          .header-tag { font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #a855f7; margin-bottom: 12px; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
          .body { padding: 32px 36px; }
          .field { margin-bottom: 24px; }
          .field-label { font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #71717a; margin-bottom: 6px; }
          .field-value { font-size: 15px; color: #e4e4e7; font-weight: 500; }
          .message-box { background: #0a0a0a; border: 1px solid #27272a; border-radius: 10px; padding: 20px; margin-top: 6px; }
          .message-box p { font-size: 14px; line-height: 1.8; color: #a1a1aa; margin: 0; white-space: pre-wrap; }
          .footer { background: #0d0d0d; border-top: 1px solid #27272a; padding: 20px 36px; text-align: center; }
          .footer p { font-family: 'Courier New', monospace; font-size: 11px; color: #52525b; margin: 0; }
          .accent { color: #a855f7; }
          .reply-btn { display: inline-block; margin-top: 24px; padding: 12px 28px; background: #a855f7; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-tag">// portfolio.contact_form → new_transmission</div>
            <h1>New Message Received</h1>
          </div>
          <div class="body">
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${cleanName}</div>
            </div>
            <div class="field">
              <div class="field-label">Reply-To Email</div>
              <div class="field-value"><a href="mailto:${cleanEmail}" style="color: #a855f7; text-decoration: none;">${cleanEmail}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${cleanSubject}</div>
            </div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="message-box">
                <p>${cleanMessage}</p>
              </div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${cleanEmail}?subject=Re: ${encodeURIComponent(cleanSubject)}" class="reply-btn">Reply to ${cleanName}</a>
            </div>
          </div>
          <div class="footer">
            <p>Received via <span class="accent">RMPK.dev</span> portfolio contact gateway &nbsp;·&nbsp; ${new Date().toUTCString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Send notification email to the owner
    const sendResult = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [ownerEmail],
      replyTo: cleanEmail,                               // So clicking Reply in Gmail goes to the sender
      subject: `[Portfolio] ${cleanSubject} — from ${cleanName}`,
      html: ownerEmailHtml,
    });

    // 5. Check if the email failed
    if (sendResult.error) {
      console.error('[Contact API] Failed to send notification email:', sendResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: `Email delivery failed: ${sendResult.error.message || 'Please check your API key.'}` 
        },
        { status: 500 }
      );
    }

    // Log success for debugging (only visible in your server logs, not the browser)
    console.log(`[Contact API] Message from ${cleanEmail} delivered. ID: ${sendResult.data?.id}`);

    // 7. Return success response to the frontend
    return NextResponse.json({
      success: true,
      message: 'Your message was sent successfully!',
    });

  } catch (error: unknown) {
    // Catch unexpected errors (JSON parse failures, network issues, etc.)
    const message = error instanceof Error ? error.message : 'Unexpected server error.';
    console.error('[Contact API] Unhandled error:', message);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
