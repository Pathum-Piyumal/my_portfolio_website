import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Resolve datastore file path reliably at runtime
const METRICS_FILE_PATH = path.join(process.cwd(), 'lib', 'blog-metrics.json');

// Helper to safely read metrics
async function readMetrics(): Promise<Record<string, { views: number; claps: number }>> {
  try {
    const data = await fs.readFile(METRICS_FILE_PATH, 'utf-8');
    return JSON.parse(data || '{}');
  } catch (error) {
    console.warn('[Blog Metrics API] Store file read failed, falling back to empty database:', error);
    return {};
  }
}

// Helper to safely write metrics (atomic overwrite)
async function writeMetrics(metrics: Record<string, { views: number; claps: number }>) {
  try {
    const data = JSON.stringify(metrics, null, 2);
    // Write to a temporary file first then rename to achieve atomic writes
    const tempPath = `${METRICS_FILE_PATH}.tmp`;
    await fs.writeFile(tempPath, data, 'utf-8');
    await fs.rename(tempPath, METRICS_FILE_PATH);
  } catch (error) {
    console.error('[Blog Metrics API] Store file write failed:', error);
    throw new Error('Database write operation failed.');
  }
}

// ---------------------------------------------------------------------------
// GET /api/blog/[slug]/metrics
// Fetches the current views and claps counts for a blog post.
// ---------------------------------------------------------------------------
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug parameter is required.' },
        { status: 400 }
      );
    }

    const metrics = await readMetrics();
    const postMetrics = metrics[slug] || { views: 0, claps: 0 };

    return NextResponse.json({
      success: true,
      slug,
      views: postMetrics.views,
      claps: postMetrics.claps,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error.';
    console.error('[Blog Metrics API] GET failed:', message);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve metrics.' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/blog/[slug]/metrics
// Updates (increments) the views or claps count for a blog post.
// ---------------------------------------------------------------------------
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug parameter is required.' },
        { status: 400 }
      );
    }

    // Parse payload
    let body;
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }

    const { action } = body;
    if (!action || (action !== 'view' && action !== 'clap')) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing action parameter. Expected "view" or "clap".' },
        { status: 400 }
      );
    }

    // Read existing database mapping
    const metrics = await readMetrics();
    
    // Initialize record if missing
    if (!metrics[slug]) {
      metrics[slug] = { views: 0, claps: 0 };
    }

    // Increment values
    if (action === 'view') {
      metrics[slug].views += 1;
    } else if (action === 'clap') {
      metrics[slug].claps += 1;
    }

    // Persist updated records
    await writeMetrics(metrics);

    console.log(`[Blog Metrics API] Incremented ${action} for post: ${slug}. (Views: ${metrics[slug].views}, Claps: ${metrics[slug].claps})`);

    return NextResponse.json({
      success: true,
      slug,
      views: metrics[slug].views,
      claps: metrics[slug].claps,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unexpected server error.';
    console.error('[Blog Metrics API] POST failed:', message);
    return NextResponse.json(
      { success: false, error: 'Failed to update metrics.' },
      { status: 500 }
    );
  }
}
