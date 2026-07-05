import { NextResponse } from 'next/server';

// Cache for 10 minutes
let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000;

export async function GET() {
  // Return cached data if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    // Try RSS first
    const res = await fetch('https://news.bitcoin.com/feed/', {
      headers: { 'User-Agent': 'VERSE-Bot/1.0' },
      next: { revalidate: 600 },
    });

    if (res.ok) {
      const xml = await res.text();
      // Parse RSS items
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
      const news = items.slice(0, 8).map((item) => {
        const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
                      item.match(/<title>(.*?)<\/title>/)?.[1] || '';
        const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
        const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
                     item.match(/<description>(.*?)<\/description>/)?.[1] || '';
        // Strip HTML from description
        const cleanDesc = desc.replace(/<[^>]*>/g, '').slice(0, 200);
        return { title: title.trim(), url: link.trim(), date: pubDate, description: cleanDesc };
      });

      const result = { source: 'Bitcoin.com News', items: news };
      cache = { data: result, timestamp: Date.now() };
      return NextResponse.json(result);
    }
  } catch (e) {
    console.error('RSS fetch failed:', e);
  }

  // Fallback: return empty with error indicator
  return NextResponse.json({
    source: 'Bitcoin.com News',
    items: [],
    error: 'Failed to fetch news. Please try again later.',
  });
}
