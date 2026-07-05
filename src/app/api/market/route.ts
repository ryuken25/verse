import { NextResponse } from 'next/server';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 60 * 1000; // 1 minute

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    // CoinGecko IDs from official docs
    const ids = 'bitcoin,ethereum,verse-bitcoin,polygon-ecosystem-token';
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'VERSE-Bot/1.0' },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      const result = {
        tokens: [
          {
            id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin',
            color: 'from-orange-500 to-yellow-500',
            price: data.bitcoin?.usd ?? 0,
            change24h: data.bitcoin?.usd_24h_change ?? 0,
            marketCap: data.bitcoin?.usd_market_cap ?? 0,
            volume24h: data.bitcoin?.usd_24h_vol ?? 0,
          },
          {
            id: 'ethereum', symbol: 'ETH', name: 'Ethereum',
            color: 'from-blue-500 to-purple-500',
            price: data.ethereum?.usd ?? 0,
            change24h: data.ethereum?.usd_24h_change ?? 0,
            marketCap: data.ethereum?.usd_market_cap ?? 0,
            volume24h: data.ethereum?.usd_24h_vol ?? 0,
          },
          {
            id: 'verse-bitcoin', symbol: 'VERSE', name: 'Verse',
            color: 'from-purple-500 to-blue-500',
            price: data['verse-bitcoin']?.usd ?? 0,
            change24h: data['verse-bitcoin']?.usd_24h_change ?? 0,
            marketCap: data['verse-bitcoin']?.usd_market_cap ?? 0,
            volume24h: data['verse-bitcoin']?.usd_24h_vol ?? 0,
          },
          {
            id: 'polygon-ecosystem-token', symbol: 'POL', name: 'Polygon',
            color: 'from-purple-600 to-indigo-600',
            price: data['polygon-ecosystem-token']?.usd ?? 0,
            change24h: data['polygon-ecosystem-token']?.usd_24h_change ?? 0,
            marketCap: data['polygon-ecosystem-token']?.usd_market_cap ?? 0,
            volume24h: data['polygon-ecosystem-token']?.usd_24h_vol ?? 0,
          },
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
