'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, ExternalLink, RefreshCw, Loader2, Newspaper } from 'lucide-react';

interface Token { symbol: string; name: string; color: string; price: number; change24h: number; marketCap: number; volume24h: number; }
interface NewsItem { title: string; url: string; date: string; description: string; }

export default function Market() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/market');
      const data = await res.json();
      if (data.tokens?.length) {
        setTokens(data.tokens.map((t: any) => ({
          symbol: t.symbol, name: t.name, color: t.color,
          price: t.usd || 0, change24h: t.usd_24h_change || 0,
          marketCap: t.usd_market_cap || 0, volume24h: t.usd_24h_vol || 0,
        })));
        setLastUpdate(new Date().toLocaleTimeString());
      }
    } catch {}
    setLoading(false);
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data.items || []);
    } catch {}
    setNewsLoading(false);
  };

  useEffect(() => { fetchPrices(); fetchNews(); }, []);

  const fmt = (n: number) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
    if (n >= 1) return `$${n.toFixed(2)}`;
    return `$${n.toFixed(6)}`;
  };

  return (
    <section id="market" className="relative py-20 md:py-32 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Market <span className="gradient-text">Data</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Live crypto prices • News from Bitcoin.com</p>
        </motion.div>

        {/* Token Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {loading ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass p-5 rounded-xl animate-pulse"><div className="h-8 bg-white/10 rounded mb-3" /><div className="h-6 bg-white/10 rounded mb-2 w-2/3" /><div className="h-4 bg-white/10 rounded w-1/2" /></div>
          )) : tokens.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="glass p-5 rounded-xl hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${t.color}`} />
                  <div><p className="text-white font-semibold text-sm">{t.symbol}</p><p className="text-gray-500 text-xs">{t.name}</p></div>
                </div>
                <span className={`flex items-center text-xs ${t.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {t.change24h >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(2)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-2">{t.price > 0 ? fmt(t.price) : '—'}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>MCap: {t.marketCap > 0 ? fmt(t.marketCap) : '—'}</span>
                <span>Vol: {t.volume24h > 0 ? fmt(t.volume24h) : '—'}</span>
              </div>
              {/* External links for POL */}
              {t.symbol === 'POL' && (
                <div className="mt-2 flex gap-2">
                  <a href="https://coinmarketcap.com/id/currencies/polygon-ecosystem-token/" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-purple-400 hover:text-purple-300">CMC ↗</a>
                  <a href="https://docs.polygon.technology/pos/concepts/tokens/matic-to-pol/" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-purple-400 hover:text-purple-300">POL Docs ↗</a>
                </div>
              )}
              {t.symbol === 'VERSE' && (
                <div className="mt-2 flex gap-2">
                  <a href="https://www.coingecko.com/en/coins/verse" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-purple-400 hover:text-purple-300">CoinGecko ↗</a>
                  <a href="https://verse.bitcoin.com/" target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-purple-400 hover:text-purple-300">Verse DEX ↗</a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Refresh */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <span className="text-xs text-gray-500">{lastUpdate && `Last updated: ${lastUpdate}`}</span>
          <button type="button" onClick={() => { fetchPrices(); fetchNews(); }} disabled={loading} className="flex items-center space-x-1 text-purple-400 text-xs hover:text-purple-300 disabled:opacity-50">
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
                <motion.a key={i} href={n.url} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }}
                  className="flex items-start justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer block">
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
