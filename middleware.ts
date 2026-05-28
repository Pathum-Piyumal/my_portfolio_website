import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple edge-compatible in-memory rate-limiter map
// (persists effectively across active container instances in serverless environments)
const tracker = new Map<string, number[]>();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Limit only specific public API endpoints
  if (
    pathname.startsWith('/api/contact') ||
    pathname.startsWith('/api/github') ||
    pathname.startsWith('/api/wakatime') ||
    pathname.startsWith('/api/projects') ||
    pathname.startsWith('/api/telemetry/resume')
  ) {
    // Resolve secure client IP (cast req to any for type safety in strict TS modes)
    const ip = (req as any).ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const now = Date.now();

    const isContactRoute = pathname.startsWith('/api/contact');
    const isResumeTelemetry = pathname.startsWith('/api/telemetry/resume');
    
    // Set windows and limit thresholds
    let windowMs = 60 * 1000;
    let maxRequests = 15;
    let limitLabel = '1 minute';
    
    if (isContactRoute) {
      windowMs = 5 * 60 * 1000;
      maxRequests = 3;
      limitLabel = '5 minutes';
    } else if (isResumeTelemetry) {
      windowMs = 10 * 60 * 1000;
      maxRequests = 5;
      limitLabel = '10 minutes';
    }

    const ipKey = `${ip}:${pathname}`;
    
    // Filter timestamps falling within the current sliding window
    const timestamps = (tracker.get(ipKey) || []).filter(t => now - t < windowMs);

    if (timestamps.length >= maxRequests) {
      console.warn(`[Rate Limiter] Blocked request from IP: ${ip} to path: ${pathname} (exceeded threshold of ${maxRequests} requests)`);
      
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: `Too many requests. Please wait before trying again. (Limit: ${maxRequests} requests per ${limitLabel})`
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log the request timestamp and update tracker
    timestamps.push(now);
    tracker.set(ipKey, timestamps);
  }

  return NextResponse.next();
}

// Next.js middleware match rule to run specifically on API routes only
export const config = {
  matcher: '/api/:path*'
};
