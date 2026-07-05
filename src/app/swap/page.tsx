'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Settings, RefreshCw, Wallet, AlertCircle, CheckCircle, Loader2, ChevronDown, ExternalLink } from 'lucide-react';
import { useAccount, useConnect, useBalance } from 'wagmi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', color: 'from-blue-500 to-purple-500', address: '0x0000000000000000000000000000000000000000' },
  { symbol: 'VERSE', name: 'Verse Token', color: 'from-purple-500 to-blue-500', address: '0x249cA82617eC3DfBD2519fA9e9C2F2F7F5C0F1A0' },
  { symbol: 'USDC', name: 'USD Coin', color: 'from-blue-400 to-blue-600', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', color: 'from-orange-500 to-yellow-500', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
];

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: balance } = useBalance({ address });

  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [swapStatus, setSwapStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [selecting, setSelecting] = useState<'from' | 'to' | null>(null);

  // Simulate price
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const rates: Record<string, Record<string, number>> = {
        ETH: { VERSE: 8000, USDC: 3245, WBTC: 0.048 },
        VERSE: { ETH: 0.000125, USDC: 0.45, WBTC: 0.000006 },
        USDC: { ETH: 0.000308, VERSE: 2.22, WBTC: 0.0000148 },
        WBTC: { ETH: 20.83, USDC: 67890, VERSE: 166666 },
      };
      const rate = rates[fromToken.symbol]?.[toToken.symbol] || 1;
      setToAmount((Number(fromAmount) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  };

  const handleSwap = async () => {
    if (!isConnected) {
      const injected = connectors.find(c => c.id === 'injected');
      if (injected) connect({ connector: injected });
      return;
    }
    setSwapping(true);
    setSwapStatus('pending');
    // Simulate swap
    await new Promise(r => setTimeout(r, 2000));
    setSwapStatus('success');
    setSwapping(false);
    setTimeout(() => setSwapStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">VERSE <span className="gradient-text">Swap</span></h1>
            <p className="text-gray-400">Token-gated DEX on Polygon • Low fees • Fast settlements</p>
          </motion.div>

          {/* Swap Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass p-4 md:p-6 rounded-2xl mb-4">
            {/* Settings */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-semibold">Swap</span>
              <button type="button" onClick={() => setShowSettings(!showSettings)} className="p-2 rounded-lg hover:bg-white/10 transition-all">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <AnimatePresence>
              {showSettings && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="mb-4 overflow-hidden">
                  <div className="p-3 rounded-xl bg-white/5">
                    <p className="text-xs text-gray-400 mb-2">Slippage Tolerance</p>
                    <div className="flex gap-2">
                      {[0.1, 0.5, 1.0].map(v => (
                        <button type="button" key={v} onClick={() => setSlippage(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            slippage === v ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}>{v}%</button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* From */}
            <div className="p-4 rounded-xl bg-white/5 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">From</span>
                {isConnected && balance && (
                  <span className="text-xs text-gray-500">Balance: {(Number(balance.value) / Math.pow(10, balance.decimals)).toFixed(4)} {balance.symbol}</span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <input type="text" placeholder="0.0" value={fromAmount} onChange={e => setFromAmount(e.target.value)}
                  className="flex-1 bg-transparent text-2xl md:text-3xl text-white font-bold outline-none placeholder-gray-600" />
                <button type="button" onClick={() => setSelecting('from')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition-all">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${fromToken.color}`} />
                  <span className="text-white font-semibold text-sm">{fromToken.symbol}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Switch button */}
            <div className="flex justify-center -my-3 relative z-10">
              <button type="button" onClick={switchTokens}
                className="w-10 h-10 rounded-xl bg-[#0d1130] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90">
                <ArrowDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* To */}
            <div className="p-4 rounded-xl bg-white/5 mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">To</span>
                <span className="text-xs text-gray-500">Est. output</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="text" placeholder="0.0" value={toAmount} readOnly
                  className="flex-1 bg-transparent text-2xl md:text-3xl text-white font-bold outline-none placeholder-gray-600" />
                <button type="button" onClick={() => setSelecting('to')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 transition-all">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${toToken.color}`} />
                  <span className="text-white font-semibold text-sm">{toToken.symbol}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Rate */}
            {fromAmount && toAmount && (
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-gray-500">
                <span>Rate: 1 {fromToken.symbol} = {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken.symbol}</span>
                <span>Fee: 0.3%</span>
              </div>
            )}

            {/* Swap button */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSwap} disabled={swapping || (!fromAmount && isConnected)}
              className={`w-full mt-4 py-4 rounded-xl text-white font-semibold text-base transition-all flex items-center justify-center space-x-2 ${
                !isConnected ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30' :
                swapStatus === 'success' ? 'bg-green-600' :
                swapStatus === 'error' ? 'bg-red-600' :
                'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {swapping ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Swapping...</span></> :
               swapStatus === 'success' ? <><CheckCircle className="w-5 h-5" /><span>Swap Successful!</span></> :
               !isConnected ? <><Wallet className="w-5 h-5" /><span>Connect Wallet</span></> :
               !fromAmount ? <span>Enter Amount</span> :
               <><ArrowDown className="w-5 h-5" /><span>Swap {fromToken.symbol} for {toToken.symbol}</span></>}
            </motion.button>
          </motion.div>

          {/* Info */}
          <div className="glass p-4 rounded-xl text-xs text-gray-500 space-y-2">
            <div className="flex justify-between"><span>Minimum received</span><span>{toAmount ? (Number(toAmount) * (1 - slippage / 100)).toFixed(6) : '0'} {toToken.symbol}</span></div>
            <div className="flex justify-between"><span>Price impact</span><span className="text-green-400">&lt;0.01%</span></div>
            <div className="flex justify-between"><span>Network fee</span><span>~$0.50</span></div>
            <div className="flex justify-between"><span>Slippage tolerance</span><span>{slippage}%</span></div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 flex items-start space-x-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-200/70">This is a demo swap interface. Always verify contract addresses before trading. DYOR.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
