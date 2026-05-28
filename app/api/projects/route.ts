import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'Pathum-Piyumal';

  const headers: Record<string, string> = {
    'User-Agent': 'Portfolio-Website-Telemetry-Fetch',
    'Accept': 'application/vnd.github.v3+json'
  };

  if (token && token !== 'your_github_token_here') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Fetch all public repositories for the user (handles pagination up to 100 repositories)
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: 3600 } // Cache results for 1 hour to prevent API throttling
    });

    if (!response.ok) {
      throw new Error(`GitHub REST API responded with status ${response.status}`);
    }

    const repos = await response.json();
    
    if (!Array.isArray(repos)) {
      throw new Error('Invalid repository payload structure received.');
    }

    // Build a clean map of repository stats (key is lowercase repository name)
    const reposMap: Record<string, { stars: number; forks: number }> = {};
    
    repos.forEach((repo: any) => {
      if (repo && repo.name) {
        reposMap[repo.name.toLowerCase()] = {
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0
        };
      }
    });

    return NextResponse.json({
      success: true,
      source: token ? 'github-api-auth' : 'github-api-public',
      repos: reposMap
    });

  } catch (error: any) {
    console.error('[Projects API] Secure gateway fetching failed:', error);
    
    // In case of error (rate limit, offline, etc.), return empty list to trigger default mock values gracefully
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to establish connection with GitHub API gateway.',
      repos: {},
      fallback: true
    }, { status: 200 });
  }
}
