import { NextResponse } from 'next/server';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('per_page') || '50');

  // Return cached data if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    // Filter from cache based on page
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const sliced = cache.data.coins.slice(start, end);
    return NextResponse.json({
      coins: sliced,
      total: cache.data.coins.length,
      page,
      perPage,
      hasMore: end < cache.data.coins.length,
    });
  }

  try {
    // Fetch from CoinGecko /coins/markets
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'VERSE-Bot/1.0' },
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const data = await res.json();
      const coins = data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol?.toUpperCase(),
        name: coin.name,
        price: coin.current_price ?? 0,
        change24h: coin.price_change_percentage_24h ?? 0,
        change7d: coin.price_change_percentage_7d_in_currency ?? 0,
        marketCap: coin.market_cap ?? 0,
        volume24h: coin.total_volume ?? 0,
        image: coin.image ?? '',
        rank: coin.market_cap_rank ?? 0,
      }));

      cache = { data: { coins }, timestamp: Date.now() };

      const start = (page - 1) * perPage;
      const end = start + perPage;
      const sliced = coins.slice(start, end);

      return NextResponse.json({
        coins: sliced,
        total: coins.length,
        page,
        perPage,
        hasMore: end < coins.length,
      });
    }
  } catch (e) {
    console.error('Market fetch failed:', e);
  }

  return NextResponse.json({ coins: [], total: 0, page, perPage, hasMore: false, error: 'Failed to fetch market data' });
}
