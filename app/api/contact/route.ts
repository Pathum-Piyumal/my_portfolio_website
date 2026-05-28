import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend client with API key from environment variable.
// IMPORTANT: This key is only ever read server-side — it's never exposed to the browser.
const resend = new Resend(process.env.RESEND_API_KEY);

// The email address where you want to receive contact form messages
const OWNER_EMAIL = process.env.CONTACT_EMAIL || 'pathumpiyumal013@gmail.com';

// The verified custom sender email from your Resend account (if you've configured a custom domain)
// If not provided, it defaults to Resend's default onboarding address 'onboarding@resend.dev'
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

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

    // 4. Build the auto-reply HTML sent back to the person who messaged you
    const senderAutoReplyHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e4e4e7; margin: 0; padding: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #111111; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #111111 100%); padding: 36px; border-bottom: 1px solid #27272a; text-align: center; }
          .icon { width: 52px; height: 52px; background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.25); border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 24px; }
          .header h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #fff; }
          .header p { margin: 0; font-size: 14px; color: #71717a; }
          .body { padding: 36px; }
          .body p { font-size: 14px; line-height: 1.85; color: #a1a1aa; margin: 0 0 16px; }
          .highlight { color: #e4e4e7; font-weight: 500; }
          .quote-box { background: #0a0a0a; border-left: 3px solid #a855f7; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 24px 0; }
          .quote-box p { font-size: 13px; font-style: italic; color: #71717a; margin: 0; white-space: pre-wrap; }
          .footer { background: #0d0d0d; border-top: 1px solid #27272a; padding: 20px 36px; text-align: center; }
          .footer p { font-family: 'Courier New', monospace; font-size: 11px; color: #52525b; margin: 0 0 4px; }
          .accent { color: #a855f7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">✓</div>
            <h1>Message Received!</h1>
            <p>Your transmission was logged successfully.</p>
          </div>
          <div class="body">
            <p>Hi <span class="highlight">${cleanName}</span>,</p>
            <p>Thank you for reaching out! Your message has been received and I'll get back to you within <span class="highlight">24–48 hours</span>.</p>
            <p>Here's a copy of what you sent:</p>
            <div class="quote-box">
              <p>${cleanMessage}</p>
            </div>
            <p>If you need to follow up sooner, feel free to connect with me directly on <a href="https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/" style="color: #a855f7; text-decoration: none;">LinkedIn</a> or check out my work on <a href="https://github.com/Pathum-Piyumal" style="color: #a855f7; text-decoration: none;">GitHub</a>.</p>
            <p style="margin-top: 24px;">Best regards,<br/><span class="highlight">Pathum Piyumal</span><br/><span style="color: #71717a; font-size: 13px;">Software Engineer · RMPK.dev</span></p>
          </div>
          <div class="footer">
            <p><span class="accent">RMPK.dev</span> · Portfolio Contact System</p>
            <p>This is an automated acknowledgement — please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Send emails
    //    - Email 1: Notification to YOU (the owner)
    //    - Email 2: Auto-reply confirmation to the sender (only sent if not in sandbox mode or if sender is the owner)
    const isSandbox = RESEND_FROM_EMAIL.includes('onboarding@resend.dev');
    const canSendAutoReply = !isSandbox || (cleanEmail === OWNER_EMAIL.toLowerCase());

    const emailPromises = [
      resend.emails.send({
        from: `Portfolio Contact <${RESEND_FROM_EMAIL}>`,
        to: [OWNER_EMAIL],
        replyTo: cleanEmail,                               // So clicking Reply in Gmail goes to the sender
        subject: `[Portfolio] ${cleanSubject} — from ${cleanName}`,
        html: ownerEmailHtml,
      })
    ];

    if (canSendAutoReply) {
      emailPromises.push(
        resend.emails.send({
          from: `Pathum Piyumal <${RESEND_FROM_EMAIL}>`,
          to: [cleanEmail],
          subject: `Message received: "${cleanSubject}"`,
          html: senderAutoReplyHtml,
        })
      );
    } else {
      console.log('[Contact API] Sandbox mode detected: skipping auto-reply to visitor to prevent Resend rejection. To enable, verify a custom domain in Resend and set RESEND_FROM_EMAIL.');
    }

    const results = await Promise.all(emailPromises);
    const ownerResult = results[0];
    const replyResult = canSendAutoReply ? results[1] : null;

    // 6. Check if the primary email failed (Resend returns an error object on failure)
    if (ownerResult.error) {
      console.error('[Contact API] Failed to send notification email:', ownerResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: `Email delivery failed: ${ownerResult.error.message || 'Please check your API key.'}` 
        },
        { status: 500 }
      );
    }

    // Log if the auto-reply failed for debugging, but don't fail the primary transmission
    if (replyResult && replyResult.error) {
      console.warn('[Contact API] Notification email delivered, but auto-reply to visitor failed:', replyResult.error);
    }

    // Log success for debugging (only visible in your server logs, not the browser)
    console.log(`[Contact API] Message from ${cleanEmail} delivered. ID: ${ownerResult.data?.id}`);

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
