import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ---------------------------------------------------------------------------
// POST /api/telemetry/resume
// Handles tracking for CV actions: 'download' and 'view_request'.
// Sends a real-time email notification to the portfolio owner via Resend.
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    // 0. Parse inputs
    let body;
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }
    const { action } = body;

    if (!action || (action !== 'download' && action !== 'view_request')) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing action parameter.' },
        { status: 400 }
      );
    }

    // 1. Capture client metadata
    const userAgent = req.headers.get('user-agent') || 'Unknown Agent';
    const referer = req.headers.get('referer') || 'Direct Access';
    
    // Resolve IP address with secure edge fallbacks
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    let clientIp = '127.0.0.1';

    if (forwardedFor) {
      clientIp = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
      clientIp = realIp.trim();
    } else {
      clientIp = (req as any).ip || '127.0.0.1';
    }

    const timestamp = new Date().toUTCString();
    const actionLabel = action === 'download' ? 'Resume Downloaded' : 'Resume Request View';

    console.log(`[Telemetry API] ${actionLabel} by ${clientIp} at ${timestamp}. UA: ${userAgent}`);

    // 2. Resolve Resend Credentials
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_your_api_key_here') {
      console.warn('[Telemetry API] Resend not configured. Telemetry logged to console.');
      return NextResponse.json({
        success: true,
        message: 'Telemetry registered successfully (console mode).',
        metadata: { action, clientIp, timestamp }
      });
    }

    const ownerEmail = process.env.CONTACT_EMAIL || 'pathumpiyumal013@gmail.com';
    let fromEmail = process.env.RESEND_FROM_EMAIL;
    if (!fromEmail || fromEmail.trim() === '' || !fromEmail.includes('@')) {
      fromEmail = 'onboarding@resend.dev';
    }

    // 3. Build beautifully formatted notification HTML email
    const telemetryEmailHtml = `
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
          .meta-box { background: #0a0a0a; border: 1px solid #27272a; border-radius: 10px; padding: 20px; margin-top: 6px; font-family: 'Courier New', monospace; font-size: 12px; color: #a1a1aa; line-height: 1.6; }
          .footer { background: #0d0d0d; border-top: 1px solid #27272a; padding: 20px 36px; text-align: center; }
          .footer p { font-family: 'Courier New', monospace; font-size: 11px; color: #52525b; margin: 0; }
          .accent { color: #a855f7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-tag">// portfolio.telemetry_tracker → new_event</div>
            <h1>CV Access Event Registered</h1>
          </div>
          <div class="body">
            <div class="field">
              <div class="field-label">Action Logged</div>
              <div class="field-value" style="color: #ffffff; font-weight: 700;">${actionLabel}</div>
            </div>
            <div class="field">
              <div class="field-label">Requesting IP</div>
              <div class="field-value">${clientIp}</div>
            </div>
            <div class="field">
              <div class="field-label">Timestamp</div>
              <div class="field-value">${timestamp}</div>
            </div>
            <div class="field">
              <div class="field-label">System Metadata</div>
              <div class="meta-box">
                <strong>Referer:</strong> ${referer}<br/>
                <strong>User Agent:</strong> ${userAgent}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Monitored via <span class="accent">RMPK.dev</span> telemetry systems &nbsp;·&nbsp; Live Server</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Send email notification via Resend
    const resend = new Resend(apiKey);
    const sendResult = await resend.emails.send({
      from: `Portfolio Telemetry <${fromEmail}>`,
      to: [ownerEmail],
      subject: `[Telemetry] ${actionLabel} from ${clientIp}`,
      html: telemetryEmailHtml,
    });

    if (sendResult.error) {
      console.error('[Telemetry API] Failed to send email alert:', sendResult.error);
      return NextResponse.json({
        success: true,
        message: 'Telemetry registered but email alert failed to send.',
        error: sendResult.error.message,
        metadata: { action, clientIp, timestamp }
      });
    }

    console.log(`[Telemetry API] Email alert sent successfully. ID: ${sendResult.data?.id}`);
    return NextResponse.json({
      success: true,
      message: 'Telemetry registered and email alert triggered successfully.',
      id: sendResult.data?.id
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error.';
    console.error('[Telemetry API] Unhandled exception:', message);
    return NextResponse.json(
      { success: false, error: 'Server error tracking telemetry.' },
      { status: 500 }
    );
  }
}
