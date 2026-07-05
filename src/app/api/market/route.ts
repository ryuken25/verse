import { NextResponse } from 'next/server';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 60 * 1000; // 1 minute

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const ids = 'bitcoin,ethereum,verse-bitcoin,polygon';
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'VERSE-Bot/1.0' },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      const result = {
        tokens: [
          { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', color: 'from-orange-500 to-yellow-500', ...data.bitcoin },
          { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', color: 'from-blue-500 to-purple-500', ...data.ethereum },
          { id: 'verse-bitcoin', symbol: 'VERSE', name: 'Verse', color: 'from-purple-500 to-blue-500', ...data['verse-bitcoin'] },
          { id: 'polygon', symbol: 'POL', name: 'Polygon', color: 'from-purple-600 to-indigo-600', ...data.polygon },
        ],
      };
      cache = { data: result, timestamp: Date.now() };
      return NextResponse.json(result);
    }
  } catch (e) {
    console.error('Market fetch failed:', e);
  }

  return NextResponse.json({ tokens: [], error: 'Failed to fetch market data' });
}
