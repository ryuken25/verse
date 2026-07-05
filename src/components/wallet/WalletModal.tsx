'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, Check, LogOut, Globe, AlertCircle } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { shortAddress, copyToClipboard, getPolygonscanUrl, isPolygonChain } from '@/lib/wallet';
import { polygon } from '@/lib/chains';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'connect' | 'connected'>('connect');

  useEffect(() => {
    if (isConnected && address) setView('connected');
    else setView('connect');
  }, [isConnected, address]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleConnect = (connector: any) => {
    connect({ connector }, {
      onSuccess: () => { setView('connected'); },
    });
  };

  const handleCopy = () => {
    if (address) {
      copyToClipboard(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitchToPolygon = () => {
    switchChain({ chainId: polygon.id });
  };

  const handleDisconnect = () => {
    disconnect();
    setView('connect');
    onClose();
  };

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
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              {view === 'connect' ? 'Connect Wallet' : 'Wallet'}
            </h3>
            <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {view === 'connect' ? (
            <>
              {/* Wallet List */}
              <div className="space-y-3 mb-4">
                {connectors.map((connector) => (
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
                      <p className="text-white font-medium text-sm">{connector.name}</p>
                      <p className="text-gray-500 text-xs">
                        {connector.id === 'injected' ? 'Browser Extension' :
                         connector.id === 'walletConnect' ? 'Mobile / QR Code' :
                         'EVM Wallet'}
                      </p>
                    </div>
                    {isPending && (
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                ))}
              </div>

              {/* No wallet message */}
              {connectors.length === 0 && (
                <div className="text-center py-6">
                  <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-4">No wallet detected</p>
                  <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 transition-colors">
                    <span>Install MetaMask</span><ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                  <p className="text-red-400 text-xs">
                    {error.message.includes('rejected') ? 'Connection rejected by user.' :
                     error.message.includes('not found') ? 'Wallet not found. Please install it first.' :
                     `Error: ${error.message.slice(0, 100)}`}
                  </p>
                </div>
              )}

              {/* Info */}
              <p className="text-[10px] text-gray-600 text-center">
                By connecting, you agree to our Terms of Service
              </p>
            </>
          ) : (
            <>
              {/* Connected View */}
              <div className="space-y-4">
                {/* Address */}
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-400 mb-1">Connected Address</p>
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

                {/* Actions */}
                <div className="space-y-2">
                  <button type="button" onClick={handleCopy}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm text-gray-300">{copied ? 'Copied!' : 'Copy Address'}</span>
                  </button>
                  <a href={getPolygonscanUrl(address || '')} target="_blank" rel="noopener noreferrer"
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
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
