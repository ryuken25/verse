'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, Check, LogOut, AlertCircle, Smartphone, Monitor } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { shortAddress, copyToClipboard, getPolygonscanUrl, isPolygonChain } from '@/lib/wallet';
import { polygon } from '@/lib/chains';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Called after successful connect
}

export default function WalletModal({ isOpen, onClose, onSuccess }: WalletModalProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'connect' | 'connected' | 'no-wallet'>('connect');

  // Check if any injected wallet is available
  const hasInjected = typeof window !== 'undefined' && (window as any).ethereum;
  const hasWalletConnect = !!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  useEffect(() => {
    if (isConnected && address) {
      setView('connected');
      onSuccess?.();
    } else {
      setView('connect');
    }
  }, [isConnected, address, onSuccess]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      reset(); // Reset any previous errors
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, reset]);

  const handleConnect = useCallback((connector: any) => {
    connect({ connector }, {
      onSuccess: () => {
        setView('connected');
      },
      onError: (err) => {
        if (err.message?.includes('rejected') || err.message?.includes('User rejected')) {
          // User rejected - just show error, don't navigate
        }
      },
    });
  }, [connect]);

  const handleCopy = useCallback(() => {
    if (address) {
      copyToClipboard(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [address]);

  const handleSwitchToPolygon = useCallback(() => {
    switchChain({ chainId: polygon.id });
  }, [switchChain]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setView('connect');
    onClose();
  }, [disconnect, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass p-6 rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              {view === 'connect' ? 'Connect Wallet' : view === 'connected' ? 'Wallet Connected' : 'No Wallet Found'}
            </h3>
            <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* CONNECT VIEW */}
          {view === 'connect' && (
            <div className="space-y-4">
              {/* Desktop Wallets */}
              <div>
                <p className="text-xs text-gray-500 mb-3 flex items-center"><Monitor className="w-3 h-3 mr-1" /> Browser Extension</p>
                <div className="space-y-2">
                  {connectors
                    .filter((c) => c.id === 'injected')
                    .map((connector) => (
                      <button
                        key={connector.uid}
                        type="button"
                        onClick={() => handleConnect(connector)}
                        disabled={isPending}
                        className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
                      >
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
                  {hasWalletConnect && connectors
                    .filter((c) => c.id === 'walletConnect')
                    .map((connector) => (
                      <button
                        key={connector.uid}
                        type="button"
                        onClick={() => handleConnect(connector)}
                        disabled={isPending}
                        className="w-full flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
                      >
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

              {/* No wallet detected */}
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

              {/* WalletConnect not configured warning */}
              {!hasWalletConnect && hasInjected && (
                <p className="text-[10px] text-gray-600 text-center">
                  Mobile QR scanning requires WalletConnect project ID.
                </p>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-xs">
                    {error.message?.includes('rejected') || error.message?.includes('User rejected')
                      ? 'Connection rejected by user.'
                      : error.message?.includes('not found') || error.message?.includes('No provider')
                      ? 'Wallet not found. Please install it first.'
                      : `Error: ${error.message?.slice(0, 100)}`}
                  </p>
                </div>
              )}

              <p className="text-[10px] text-gray-600 text-center">
                By connecting, you agree to our Terms of Service
              </p>
            </div>
          )}

          {/* CONNECTED VIEW */}
          {view === 'connected' && address && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-xs text-gray-400 mb-1">Connected Address</p>
                <p className="text-white font-mono text-sm">{shortAddress(address, 6)}</p>
              </div>

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
