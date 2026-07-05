import { NextResponse } from 'next/server';

type CoinMarket = {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
};

type MarketCache = {
  coins: CoinMarket[];
  timestamp: number;
  lastUpdated: string;
};

let marketCache: MarketCache | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function isFresh(cache: MarketCache | null): boolean {
  return cache !== null && Date.now() - cache.timestamp < CACHE_TTL;
}

function normalize(raw: any[]): CoinMarket[] {
  return raw.map((coin: any) => ({
    id: coin.id,
    rank: coin.market_cap_rank ?? 0,
    symbol: (coin.symbol ?? '').toUpperCase(),
    name: coin.name ?? '',
    image: coin.image ?? '',
    price: coin.current_price ?? 0,
    change24h: coin.price_change_percentage_24h ?? 0,
    change7d: coin.price_change_percentage_7d_in_currency ?? 0,
    marketCap: coin.market_cap ?? 0,
    volume24h: coin.total_volume ?? 0,
    lastUpdated: coin.last_updated ?? '',
  }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('per_page') || '50');

  // If cache is fresh, serve from cache
  if (isFresh(marketCache)) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const sliced = marketCache!.coins.slice(start, end);
    return NextResponse.json({
      ok: true,
      source: 'coingecko',
      cached: true,
      stale: false,
      lastUpdated: marketCache!.lastUpdated,
      page,
      perPage,
      total: marketCache!.coins.length,
      hasMore: end < marketCache!.coins.length,
      coins: sliced,
    });
  }

  // Fetch from CoinGecko
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d';
    const res = await fetch(url, {
      headers: { 'User-Agent': 'VERSE-Bot/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const raw = await res.json();
      const coins = normalize(raw);
      const now = new Date().toISOString();

      marketCache = { coins, timestamp: Date.now(), lastUpdated: now };

      const start = (page - 1) * perPage;
      const end = start + perPage;
      const sliced = coins.slice(start, end);

      return NextResponse.json({
        ok: true,
        source: 'coingecko',
        cached: false,
        stale: false,
        lastUpdated: now,
        page,
        perPage,
        total: coins.length,
        hasMore: end < coins.length,
        coins: sliced,
      });
    }

    // CoinGecko returned error — try stale cache
    if (marketCache) {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const sliced = marketCache.coins.slice(start, end);
      return NextResponse.json({
        ok: true,
        source: 'coingecko',
        cached: true,
        stale: true,
        lastUpdated: marketCache.lastUpdated,
        page,
        perPage,
        total: marketCache.coins.length,
        hasMore: end < marketCache.coins.length,
        coins: sliced,
        error: 'Using cached data — CoinGecko unavailable.',
      });
    }
  } catch (e) {
    // Network error — try stale cache
    if (marketCache) {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const sliced = marketCache.coins.slice(start, end);
      return NextResponse.json({
        ok: true,
        source: 'coingecko',
        cached: true,
        stale: true,
        lastUpdated: marketCache.lastUpdated,
        page,
        perPage,
        total: marketCache.coins.length,
        hasMore: end < marketCache.coins.length,
        coins: sliced,
        error: 'Using cached data — network error.',
      });
    }
  }

  // No cache, no data
  return NextResponse.json({
    ok: false,
    source: 'coingecko',
    cached: false,
    stale: false,
    lastUpdated: '',
    page,
    perPage,
    total: 0,
    hasMore: false,
    coins: [],
    error: 'Failed to fetch market data. CoinGecko may be rate-limited.',
  });
}
