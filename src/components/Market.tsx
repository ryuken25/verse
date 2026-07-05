'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink, RefreshCw, Loader2, Newspaper, Star, Search, ChevronDown, AlertCircle } from 'lucide-react';
interface Coin {
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
}

interface MarketResponse {
  ok: boolean;
  source: string;
  cached: boolean;
  stale: boolean;
  lastUpdated: string;
  page: number;
  perPage: number;
  total: number;
  hasMore: boolean;
  coins: Coin[];
  error?: string;
}

interface NewsItem { title: string; url: string; date: string; description: string; }

type Tab = 'all' | 'gainers' | 'losers' | 'favorites';

const INITIAL_SHOW = 10;
const LOAD_MORE = 10;

const fmt = (n: number) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.001) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
};

const pctColor = (v: number) => v >= 0 ? 'text-green-400' : 'text-red-400';
const pctIcon = (v: number) => v >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;

export default function Market() {
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isStale, setIsStale] = useState(false);
  const [apiError, setApiError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  // Fetch coins
  const fetchCoins = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch('/api/market?per_page=100');
      const data: MarketResponse = await res.json();
      if (data.ok && data.coins?.length > 0) {
        setAllCoins(data.coins);
        setLastUpdated(data.lastUpdated);
        setIsStale(data.stale);
        if (data.error) setApiError(data.error);
      } else {
        setApiError(data.error || 'No market data available.');
      }
    } catch (e) {
      setApiError('Failed to fetch market data.');
    }
    setLoading(false);
  }, []);

  // Fetch news
  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data.items || []);
    } catch {}
    setNewsLoading(false);
  }, []);

  useEffect(() => { fetchCoins(); fetchNews(); }, [fetchCoins, fetchNews]);

  // Toggle favorite
  const toggleFav = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Filtered coins by tab
  const filteredCoins = useMemo(() => {
    let coins = allCoins;
    if (search) {
      const q = search.toLowerCase();
      coins = coins.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
    }
    switch (activeTab) {
      case 'gainers': return coins.filter(c => c.change24h > 0).sort((a, b) => b.change24h - a.change24h);
      case 'losers': return coins.filter(c => c.change24h < 0).sort((a, b) => a.change24h - b.change24h);
      case 'favorites': return coins.filter(c => favorites.has(c.id));
      default: return coins;
    }
  }, [allCoins, activeTab, favorites, search]);

  // Visible coins
  const visibleCoins = useMemo(() => filteredCoins.slice(0, showCount), [filteredCoins, showCount]);
  const hasMore = showCount < filteredCoins.length;

  // View More
  const handleViewMore = useCallback(() => {
    setLoadingMore(true);
    setTimeout(() => { setShowCount(prev => prev + LOAD_MORE); setLoadingMore(false); }, 300);
  }, []);

  // Reset on tab/search change
  useEffect(() => { setShowCount(INITIAL_SHOW); }, [activeTab, search]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: 'All Coins' },
    { key: 'gainers', label: 'Gainers' },
    { key: 'losers', label: 'Losers' },
    { key: 'favorites', label: `Favorites (${favorites.size})` },
  ];

  return (
    <section id="market" className="relative py-20 md:py-32 overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Market <span className="gradient-text">Dashboard</span></h2>
          <p className="text-base md:text-xl text-gray-400">Live crypto prices • Data from CoinGecko • News from Bitcoin.com</p>
        </motion.div>

        {/* Stale/Error banner */}
        {(isStale || apiError) && (
          <div className="mb-6 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <p className="text-xs text-yellow-300">{apiError || 'Using cached market data.'}</p>
          </div>
        )}

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>{tab.label}</button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search coins..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50" />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block glass rounded-2xl overflow-hidden mb-6">
          <div className="grid grid-cols-[40px_1fr_120px_100px_120px_120px_40px] gap-2 px-4 py-3 bg-white/5 text-xs text-gray-500 font-medium">
            <span>#</span>
            <span>Coin</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h</span>
            <span className="text-right">Market Cap</span>
            <span className="text-right">Volume 24h</span>
            <span></span>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
          ) : visibleCoins.length > 0 ? (
            <AnimatePresence>
              {visibleCoins.map((coin, i) => (
                <motion.div key={coin.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % LOAD_MORE) * 0.03 }}
                  className="grid grid-cols-[40px_1fr_120px_100px_120px_120px_40px] gap-2 px-4 py-3 items-center hover:bg-white/5 transition-colors border-t border-white/5">
                  <span className="text-xs text-gray-500">{coin.rank}</span>
                  <div className="flex items-center space-x-3">
                    {coin.image && <img src={coin.image} alt={coin.symbol} className="w-6 h-6 rounded-full" />}
                    <div>
                      <p className="text-sm text-white font-medium">{coin.name}</p>
                      <p className="text-xs text-gray-500">{coin.symbol}</p>
                    </div>
                  </div>
                  <span className="text-sm text-white text-right font-mono">{coin.price > 0 ? fmt(coin.price) : '—'}</span>
                  <span className={`text-sm text-right flex items-center justify-end space-x-1 ${pctColor(coin.change24h)}`}>
                    {pctIcon(coin.change24h)}<span>{coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                  </span>
                  <span className="text-sm text-gray-400 text-right">{coin.marketCap > 0 ? fmt(coin.marketCap) : '—'}</span>
                  <span className="text-sm text-gray-400 text-right">{coin.volume24h > 0 ? fmt(coin.volume24h) : '—'}</span>
                  <button type="button" onClick={() => toggleFav(coin.id)}
                    className="flex items-center justify-center p-1 rounded hover:bg-white/10 transition-colors">
                    <Star className={`w-4 h-4 ${favorites.has(coin.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              {activeTab === 'favorites' ? 'No favorites yet. Click the star to add.' : 'No coins found.'}
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3 mb-6">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-purple-400 animate-spin" /></div>
          ) : visibleCoins.length > 0 ? (
            visibleCoins.map((coin, i) => (
              <motion.div key={coin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % LOAD_MORE) * 0.03 }}
                className="glass p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {coin.image && <img src={coin.image} alt={coin.symbol} className="w-8 h-8 rounded-full" />}
                    <div>
                      <p className="text-sm text-white font-medium">{coin.name}</p>
                      <p className="text-xs text-gray-500">{coin.symbol} • #{coin.rank}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => toggleFav(coin.id)} className="p-1">
                    <Star className={`w-4 h-4 ${favorites.has(coin.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg text-white font-bold">{coin.price > 0 ? fmt(coin.price) : '—'}</span>
                  <span className={`text-sm flex items-center space-x-1 ${pctColor(coin.change24h)}`}>
                    {pctIcon(coin.change24h)}<span>{coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%</span>
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>MCap: {coin.marketCap > 0 ? fmt(coin.marketCap) : '—'}</span>
                  <span>Vol: {coin.volume24h > 0 ? fmt(coin.volume24h) : '—'}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              {activeTab === 'favorites' ? 'No favorites yet.' : 'No coins found.'}
            </div>
          )}
        </div>

        {/* View More */}
        {filteredCoins.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-xs text-gray-500 mb-3">
              Showing {Math.min(showCount, filteredCoins.length)} of {filteredCoins.length} coins
            </p>
            {hasMore ? (
              <button type="button" onClick={handleViewMore} disabled={loadingMore}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2 mx-auto">
                {loadingMore ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Loading...</span></>
                ) : (
                  <><ChevronDown className="w-4 h-4" /><span>View More Coins</span></>
                )}
              </button>
            ) : (
              <p className="text-xs text-gray-500">All coins loaded</p>
            )}
          </div>
        )}

        {/* Refresh + status */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            {lastUpdated && <span className="text-xs text-gray-500">Updated: {new Date(lastUpdated).toLocaleTimeString()}</span>}
            {isStale && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">Cached</span>}
          </div>
          <button type="button" onClick={() => { fetchCoins(); fetchNews(); }} disabled={loading}
            className="flex items-center space-x-1 text-purple-400 text-xs hover:text-purple-300 disabled:opacity-50">
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}<span>Refresh</span>
          </button>
        </div>

        {/* News */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 md:p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center"><Newspaper className="w-5 h-5 mr-2 text-purple-400" /> Latest News</h3>
            <a href="https://news.bitcoin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 text-sm flex items-center hover:text-purple-300">
              <span>View all</span><ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
          {newsLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />)}</div>
          ) : news.length > 0 ? (
            <div className="space-y-3">
              {news.map((n, i) => (
                <motion.a key={i} href={n.url} target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }}
                  className="flex items-start justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-150 cursor-pointer block">
                  <div className="flex-1">
                    <p className="text-white text-sm md:text-base font-medium mb-1">{n.title}</p>
                    {n.description && <p className="text-gray-500 text-xs line-clamp-2">{n.description}</p>}
                    {n.date && <p className="text-gray-600 text-[10px] mt-1">{new Date(n.date).toLocaleDateString()}</p>}
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 ml-4 flex-shrink-0 mt-1" />
                </motion.a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">News temporarily unavailable. Visit <a href="https://news.bitcoin.com" className="text-purple-400 underline" target="_blank" rel="noopener noreferrer">news.bitcoin.com</a></p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
