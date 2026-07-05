'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, Check, LogOut, AlertCircle, Smartphone, Monitor, Award, Flame, BookOpen, Trophy, Star } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { shortAddress, copyToClipboard, getPolygonscanUrl, isPolygonChain } from '@/lib/wallet';
import { polygon } from '@/lib/chains';
import { loadProgress, calcLevel, calcLevelProgress, mergeGuestProgress, type UserProgress } from '@/lib/progress';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'connect' | 'profile' | 'no-wallet'>('connect');
  const [progress, setProgress] = useState<UserProgress | null>(null);

  const hasInjected = typeof window !== 'undefined' && !!(window as any).ethereum;
  const hasWalletConnect = !!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  // Load progress when connected
  useEffect(() => {
    if (isConnected && address) {
      const p = loadProgress(address);
      // Merge guest progress on first connect
      const guest = loadProgress('guest');
      if (Object.keys(guest.lessons).length > 0) {
        const merged = mergeGuestProgress(address);
        setProgress(merged);
      } else {
        setProgress(p);
      }
      setView('profile');
    } else {
      setView('connect');
      setProgress(null);
    }
  }, [isConnected, address]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Close on route change
  useEffect(() => {
    const handlePop = () => onClose();
    if (isOpen) window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  const handleConnect = useCallback((connector: any) => {
    connect({ connector }, { onSuccess: () => setView('profile') });
  }, [connect]);

  const handleCopy = useCallback(() => {
    if (address) { copyToClipboard(address); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  }, [address]);

  const handleSwitchToPolygon = useCallback(() => {
    switchChain({ chainId: polygon.id });
  }, [switchChain]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setView('connect');
    setProgress(null);
    onClose();
  }, [disconnect, onClose]);

  if (!isOpen) return null;

  const level = progress ? calcLevel(progress.totalXP) : 1;
  const levelProgress = progress ? calcLevelProgress(progress.totalXP) : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-[#101322]/95 border border-white/15 p-6 rounded-2xl w-full sm:max-w-sm max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              {view === 'connect' ? 'Connect Wallet' : 'Profile'}
            </h3>
            <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* CONNECT VIEW */}
          {view === 'connect' && (
            <div className="space-y-4">
              {/* Injected wallets */}
              <div>
                <p className="text-xs text-gray-500 mb-3 flex items-center"><Monitor className="w-3 h-3 mr-1" /> Browser Extension</p>
                <div className="space-y-2">
                  {connectors.filter(c => c.id === 'injected').map((connector) => (
                    <button key={connector.uid} type="button" onClick={() => handleConnect(connector)} disabled={isPending}
                      className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all active:scale-[0.98] disabled:opacity-50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-white font-medium text-sm">
                          {hasInjected ? 'Browser Wallet (MetaMask, Rabby, OKX, Bitget...)' : 'Injected Wallet'}
                        </p>
                        <p className="text-gray-500 text-xs">Detects installed wallet extensions</p>
                      </div>
                      {isPending && <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />}
                    </button>
                  ))}

                  {/* WalletConnect */}
                  {hasWalletConnect && connectors.filter(c => c.id === 'walletConnect').map((connector) => (
                    <button key={connector.uid} type="button" onClick={() => handleConnect(connector)} disabled={isPending}
                      className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-white font-medium text-sm">WalletConnect (QR / Mobile)</p>
                        <p className="text-gray-500 text-xs">Scan QR or deeplink to mobile wallet</p>
                      </div>
                      {isPending && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* No wallet */}
              {!hasInjected && !hasWalletConnect && (
                <div className="text-center py-4">
                  <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-4">No wallet detected. Install a wallet to continue.</p>
                  <div className="space-y-2">
                    {[
                      { name: 'MetaMask', url: 'https://metamask.io/download/' },
                      { name: 'OKX Wallet', url: 'https://www.okx.com/download' },
                      { name: 'Bitget Wallet', url: 'https://web3.bitget.com/' },
                      { name: 'Rabby', url: 'https://rabby.io/' },
                      { name: 'Coinbase Wallet', url: 'https://www.coinbase.com/wallet' },
                    ].map((w) => (
                      <a key={w.name} href={w.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-sm text-gray-300">Install {w.name}</span>
                        <ExternalLink className="w-4 h-4 text-gray-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {!hasWalletConnect && hasInjected && (
                <p className="text-[10px] text-gray-600 text-center">Mobile QR scanning requires WalletConnect project ID.</p>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-xs">
                    {error.message?.includes('rejected') ? 'Connection rejected by user.' :
                     error.message?.includes('not found') ? 'Wallet not found. Please install it first.' :
                     `Error: ${error.message?.slice(0, 100)}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* PROFILE VIEW */}
          {view === 'profile' && address && progress && (
            <div className="space-y-4">
              {/* Address */}
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-xs text-gray-400 mb-1">Connected</p>
                <p className="text-white font-mono text-sm">{shortAddress(address, 6)}</p>
              </div>

              {/* Network */}
              <div className={`p-4 rounded-xl ${isPolygonChain(chain?.id) ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Network</p>
                    <p className={`text-sm font-medium ${isPolygonChain(chain?.id) ? 'text-green-400' : 'text-yellow-400'}`}>
                      {chain?.name || 'Unknown'} {isPolygonChain(chain?.id) ? '✓' : ''}
                    </p>
                  </div>
                  {!isPolygonChain(chain?.id) && (
                    <button type="button" onClick={handleSwitchToPolygon} disabled={isSwitching}
                      className="px-3 py-1.5 bg-purple-600 rounded-lg text-white text-xs font-medium hover:bg-purple-700 transition-colors disabled:opacity-50">
                      {isSwitching ? 'Switching...' : 'Switch to Polygon'}
                    </button>
                  )}
                </div>
              </div>

              {/* XP & Level */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold text-lg">Level {level}</span>
                  </div>
                  <span className="text-purple-300 text-sm font-medium">{progress.totalXP} XP</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all" style={{ width: `${levelProgress * 100}%` }} />
                </div>
                <p className="text-[10px] text-gray-500 text-right">{Math.round(levelProgress * 100)}% to Level {level + 1}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <BookOpen className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">{progress.completedLessons}</p>
                  <p className="text-[10px] text-gray-500">Lessons</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">{progress.completedQuizzes}</p>
                  <p className="text-[10px] text-gray-500">Quizzes</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                  <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">{progress.streak}</p>
                  <p className="text-[10px] text-gray-500">Streak</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button type="button" onClick={handleCopy}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  <span className="text-sm text-gray-300">{copied ? 'Copied!' : 'Copy Address'}</span>
                </button>
                <a href={getPolygonscanUrl(address)} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">View on Polygonscan</span>
                </a>
                <button type="button" onClick={handleDisconnect}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors">
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-400">Disconnect</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
