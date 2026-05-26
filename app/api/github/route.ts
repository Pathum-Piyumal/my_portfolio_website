import { NextResponse } from 'next/server';

export async function GET() {
  // GitHub credentials loaded securely from environment variables
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'Pathum-Piyumal';

  if (!token) {
    // If no token is set up, fallback to querying the public community scraper proxy
    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        next: { revalidate: 3600 }
      });
      if (!response.ok) {
        throw new Error('Public Contributions Scraper gateway failed');
      }
      const data = await response.json();
      
      const totalConts = Object.values(data.total).reduce((a: any, b: any) => a + b, 0) as number;
      const rawDays = data.contributions;

      // Filter out any future dates from the scraper payload to align with GitHub's actual contribution calendar behavior (which ends today)
      const todayStr = new Date().toISOString().split('T')[0];
      const pastDays = rawDays.filter((day: any) => day.date <= todayStr);

      // Sort chronologically ascending to ensure the most recent dates are at the end of the array
      pastDays.sort((a: any, b: any) => a.date.localeCompare(b.date));

      const formattedCells = pastDays.map((day: any, index: number) => ({
        dayIndex: index,
        contributions: day.count,
        level: day.level,
        date: day.date
      }));

      // Trim / Pad to exactly 371 cells
      const targetLength = 371;
      let finalCells = [...formattedCells];
      
      if (finalCells.length < targetLength) {
        const paddingCount = targetLength - finalCells.length;
        const padding = Array.from({ length: paddingCount }, () => ({
          dayIndex: 0,
          contributions: 0,
          level: 0,
          date: ''
        }));
        finalCells = [...padding, ...finalCells];
      } else if (finalCells.length > targetLength) {
        finalCells = finalCells.slice(finalCells.length - targetLength);
      }

      // Re-map dayIndices sequentially to ensure perfectly ordered grid coordinate arrays
      finalCells = finalCells.map((cell, idx) => ({ ...cell, dayIndex: idx }));

      return NextResponse.json({
        success: true,
        username,
        totalContributions: totalConts,
        cells: finalCells,
        source: 'public-scraper'
      });

    } catch (err: any) {
      console.warn('Tokenless fallback scraper query failed:', err.message || err);
      return NextResponse.json({
        success: false,
        message: 'No GITHUB_TOKEN configured and public scraper query failed. Falling back to cached telemetry.',
        fallback: true
      }, { status: 200 });
    }
  }

  // GraphQL query to fetch the user's contribution calendar
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Website-Telemetry-Fetch'
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Cache results for 1 hour to prevent API rate limit throttling
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL Query Error');
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      throw new Error('User contributions calendar not found');
    }

    // Flatten weeks into days array
    const rawDays = calendar.weeks.flatMap((week: any) => week.contributionDays);

    // Format days to match the calendar grid schema expected by the DevAnalytics component (371 cells)
    const formattedCells = rawDays.map((day: any, index: number) => {
      let level = 0;
      if (day.contributionCount > 10) level = 4;
      else if (day.contributionCount > 5) level = 3;
      else if (day.contributionCount > 2) level = 2;
      else if (day.contributionCount > 0) level = 1;

      return {
        dayIndex: index,
        contributions: day.contributionCount,
        level: level,
        date: day.date
      };
    });

    // Ensure we send back exactly 371 cells or pad/trim to match our 53x7 grid perfectly
    const targetLength = 371;
    let finalCells = [...formattedCells];
    
    if (finalCells.length < targetLength) {
      const paddingCount = targetLength - finalCells.length;
      const padding = Array.from({ length: paddingCount }, () => ({
        dayIndex: 0,
        contributions: 0,
        level: 0,
        date: ''
      }));
      finalCells = [...padding, ...finalCells];
    } else if (finalCells.length > targetLength) {
      finalCells = finalCells.slice(finalCells.length - targetLength);
    }

    // Re-map dayIndices sequentially to ensure perfectly ordered grid coordinate arrays
    finalCells = finalCells.map((cell, idx) => ({ ...cell, dayIndex: idx }));

    return NextResponse.json({
      success: true,
      username,
      totalContributions: calendar.totalContributions,
      cells: finalCells
    });

  } catch (error: any) {
    console.error('Error fetching live GitHub statistics:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error occurred while querying GitHub secure API gateway.',
      fallback: true
    }, { status: 200 });
  }
}
