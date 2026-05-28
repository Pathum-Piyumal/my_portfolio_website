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
    pathname.startsWith('/api/projects')
  ) {
    // Resolve secure client IP (cast req to any for type safety in strict TS modes)
    const ip = (req as any).ip || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const now = Date.now();

    const isContactRoute = pathname.startsWith('/api/contact');
    
    // Set 5 minutes window for the contact form, 1 minute for telemetry endpoints
    const windowMs = isContactRoute ? 5 * 60 * 1000 : 60 * 1000;
    
    // Max 3 requests for the contact form, 15 for telemetry endpoints
    const maxRequests = isContactRoute ? 3 : 15;

    const ipKey = `${ip}:${pathname}`;
    
    // Filter timestamps falling within the current sliding window
    const timestamps = (tracker.get(ipKey) || []).filter(t => now - t < windowMs);

    if (timestamps.length >= maxRequests) {
      console.warn(`[Rate Limiter] Blocked request from IP: ${ip} to path: ${pathname} (exceeded threshold of ${maxRequests} requests)`);
      
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: `Too many requests. Please wait before trying again. (Limit: ${maxRequests} requests per ${isContactRoute ? '5 minutes' : '1 minute'})`
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
