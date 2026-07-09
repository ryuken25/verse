'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Wallet, ExternalLink, Copy, Check, LogOut, AlertCircle, Smartphone, Monitor, Award, Flame, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, type Connector } from 'wagmi';
import { shortAddress, copyToClipboard, getPolygonscanUrl, isPolygonChain } from '@/lib/wallet';
import { polygon } from '@/lib/chains';
import { loadProgress, calcLevel, calcLevelProgress, mergeGuestProgress, LEVELS, isAllComplete } from '@/lib/progress';
import { onProgressUpdated } from '@/lib/progress-events';
import ModalPortal from '@/components/ui/ModalPortal';
import type { UserProgress } from '@/lib/progress';

interface WalletModalProps { isOpen: boolean; onClose: () => void; }

type ConnectorLike = Connector & {
  uid?: string;
  icon?: string;
};

const TOTAL_LESSONS = 48;
const TOTAL_QUIZZES = 48;
const LAST_WALLET_CONNECTOR_KEY = 'verse:last-wallet-connector-id';

function getConnectorKey(connector: ConnectorLike) {
  return `${connector.id}:${connector.name}`;
}

function getConnectorLabel(connector: Pick<ConnectorLike, 'id' | 'name'>) {
  const raw = `${connector.name || ''} ${connector.id || ''}`.toLowerCase();
  if (raw.includes('metamask')) return 'MetaMask';
  if (raw.includes('rabby')) return 'Rabby';
  if (raw.includes('okx')) return 'OKX Wallet';
  if (raw.includes('bitget')) return 'Bitget Wallet';
  if (raw.includes('coinbase')) return 'Coinbase Wallet';
  if (raw.includes('brave')) return 'Brave Wallet';
  if (raw.includes('walletconnect')) return 'WalletConnect';
  if (raw.includes('injected')) return connector.name && connector.name !== 'Injected' ? connector.name : 'Browser Wallet';
  return connector.name || 'Browser Wallet';
}

function dedupeConnectors<T extends ConnectorLike>(items: readonly T[]) {
  const seen = new Set<string>();
  return items.filter((connector) => {
    const key = getConnectorKey(connector).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getLastConnectorId() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(LAST_WALLET_CONNECTOR_KEY);
}

function rememberConnector(connector: ConnectorLike) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LAST_WALLET_CONNECTOR_KEY, connector.id || connector.name);
}

const installWallets = [
  { name: 'MetaMask', url: 'https://metamask.io/download/' },
  { name: 'Rabby', url: 'https://rabby.io/' },
  { name: 'OKX Wallet', url: 'https://www.okx.com/web3' },
  { name: 'Bitget Wallet', url: 'https://web3.bitget.com/' },
  { name: 'Coinbase Wallet', url: 'https://www.coinbase.com/wallet' },
];

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'connect' | 'profile' | 'no-wallet'>('connect');
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [pendingConnectorKey, setPendingConnectorKey] = useState<string | null>(null);

  const hasWalletConnectEnv = !!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  const walletConnectors = useMemo(() => dedupeConnectors(
    connectors.filter((c) => c.id === 'walletConnect' || /walletconnect/i.test(c.name)) as ConnectorLike[],
  ), [connectors]);

  const browserConnectors = useMemo(() => dedupeConnectors(
    connectors.filter((c) => c.id !== 'walletConnect' && !/walletconnect/i.test(c.name)) as ConnectorLike[],
  ), [connectors]);

  useEffect(() => {
    if (isConnected && address) {
      const current = loadProgress(address);
      const guest = loadProgress('guest');
      setProgress(Object.keys(guest.lessons).length > 0 ? mergeGuestProgress(address) : current);
      setView('profile');
    } else {
      setView('connect');
      setProgress(null);
    }
  }, [isConnected, address]);

  useEffect(() => {
    return onProgressUpdated((payload) => {
      if (payload.address === (address || 'guest')) setProgress(payload.newProgress);
    });
  }, [address]);

  useEffect(() => {
    if (isOpen) {
      reset();
      setPendingConnectorKey(null);
    }
  }, [isOpen, reset]);

  const handleConnect = useCallback((connector: ConnectorLike) => {
    const key = getConnectorKey(connector);
    setPendingConnectorKey(key);
    connect(
      { connector },
      {
        onSuccess: () => {
          rememberConnector(connector);
          setView('profile');
        },
        onError: () => setView('connect'),
        onSettled: () => setPendingConnectorKey(null),
      },
    );
  }, [connect]);

  const pickRecommendedConnector = useCallback(() => {
    const last = getLastConnectorId();
    const all = [...browserConnectors, ...walletConnectors];
    const lastMatch = all.find((c) => c.id === last || c.name === last || getConnectorKey(c) === last);
    if (lastMatch) return lastMatch;
    if (browserConnectors.length > 0) return browserConnectors[0];
    if (walletConnectors.length > 0) return walletConnectors[0];
    return null;
  }, [browserConnectors, walletConnectors]);

  const handleAutoConnect = useCallback(() => {
    const connector = pickRecommendedConnector();
    if (!connector) {
      setView('no-wallet');
      return;
    }
    handleConnect(connector);
  }, [handleConnect, pickRecommendedConnector]);

  const handleCopy = useCallback(() => {
    if (!address) return;
    copyToClipboard(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [address]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setView('connect');
    setProgress(null);
    onClose();
  }, [disconnect, onClose]);

  const handleChangeWallet = useCallback(() => {
    disconnect();
    setView('connect');
    setProgress(null);
  }, [disconnect]);

  const level = progress ? calcLevel(progress.totalXP) : 1;
  const levelProgress = progress ? calcLevelProgress(progress.totalXP) : 0;
  const isMax = progress ? level >= LEVELS.length || isAllComplete(progress, TOTAL_LESSONS, TOTAL_QUIZZES) : false;
  const noWallets = browserConnectors.length === 0 && walletConnectors.length === 0;

  const renderConnectorCard = (connector: ConnectorLike, type: 'browser' | 'walletconnect') => {
    const key = getConnectorKey(connector);
    const pending = isPending && pendingConnectorKey === key;
    const label = getConnectorLabel(connector);
    const Icon = type === 'walletconnect' ? Smartphone : Wallet;
    return (
      <button
        key={connector.uid || key}
        type="button"
        onClick={() => handleConnect(connector)}
        disabled={isPending}
        className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/35 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
          {connector.icon ? <img src={connector.icon} alt="" className="h-7 w-7 rounded-lg" /> : <Icon className="w-5 h-5 text-purple-300" />}
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate">{label}</p>
          <p className="text-gray-500 text-xs">{type === 'walletconnect' ? 'QR / mobile deep link' : 'Detected in browser'}</p>
        </div>
        {pending && <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />}
      </button>
    );
  };

  return (
    <ModalPortal isOpen={isOpen} onClose={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-[#101322]/95 border border-white/15 shadow-2xl rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">{view === 'profile' ? 'Profile' : 'Connect Wallet'}</h3>
            {view !== 'profile' && <p className="text-xs text-gray-500 mt-1">Choose how you want to connect to VERSE.</p>}
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {view !== 'profile' && (
          <div className="space-y-5">
            <button type="button" onClick={handleAutoConnect} disabled={isPending}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-600/25 to-blue-600/25 hover:from-purple-600/35 hover:to-blue-600/35 border border-purple-400/25 transition-all disabled:opacity-50">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><Sparkles className="w-5 h-5 text-yellow-300" /></div>
              <div className="text-left flex-1">
                <p className="text-white font-semibold text-sm">Auto / Recommended</p>
                <p className="text-gray-400 text-xs">Uses your last wallet or best detected option.</p>
              </div>
              {isPending && pendingConnectorKey === null && <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />}
            </button>

            {browserConnectors.length > 0 && <div><p className="text-xs text-gray-500 mb-3 flex items-center"><Monitor className="w-3 h-3 mr-1" /> Browser wallets</p><div className="space-y-2">{browserConnectors.map((c) => renderConnectorCard(c, 'browser'))}</div></div>}
            {walletConnectors.length > 0 && hasWalletConnectEnv && <div><p className="text-xs text-gray-500 mb-3 flex items-center"><Smartphone className="w-3 h-3 mr-1" /> Mobile / QR</p><div className="space-y-2">{walletConnectors.map((c) => renderConnectorCard(c, 'walletconnect'))}</div></div>}

            {(noWallets || view === 'no-wallet') && <div className="text-center py-4"><AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-3" /><p className="text-gray-400 text-sm mb-4">No wallet detected. Install a wallet to continue.</p><div className="space-y-2">{installWallets.map((w) => <a key={w.name} href={w.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"><span className="text-sm text-gray-300">Install {w.name}</span><ExternalLink className="w-4 h-4 text-gray-500" /></a>)}</div></div>}
            {!hasWalletConnectEnv && <p className="text-[10px] text-gray-600 text-center">WalletConnect disabled: missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.</p>}
            {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"><p className="text-red-400 text-xs">{error.message?.includes('rejected') ? 'Connection rejected by user.' : error.message?.includes('not found') ? 'Wallet not found. Please install it first.' : `Error: ${error.message?.slice(0, 120)}`}</p></div>}
          </div>
        )}

        {view === 'profile' && address && progress && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5"><p className="text-xs text-gray-400 mb-1">Connected</p><p className="text-white font-mono text-sm">{shortAddress(address, 6)}</p></div>
            <div className={`p-4 rounded-xl ${isPolygonChain(chain?.id) ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}><div className="flex items-center justify-between"><div><p className="text-xs text-gray-400 mb-1">Network</p><p className={`text-sm font-medium ${isPolygonChain(chain?.id) ? 'text-green-400' : 'text-yellow-400'}`}>{chain?.name || 'Unknown'} {isPolygonChain(chain?.id) ? '✓' : ''}</p></div>{!isPolygonChain(chain?.id) && <button type="button" onClick={() => switchChain({ chainId: polygon.id })} disabled={isSwitching} className="px-3 py-1.5 bg-purple-600 rounded-lg text-white text-xs font-medium hover:bg-purple-700 transition-colors disabled:opacity-50">{isSwitching ? 'Switching...' : 'Switch to Polygon'}</button>}</div></div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20"><div className="flex items-center justify-between mb-3"><div className="flex items-center space-x-2"><Award className="w-5 h-5 text-yellow-400" /><span className="text-white font-bold text-lg">{isMax ? 'Level MAX' : `Level ${level}`}</span>{isMax && <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">VERSE Academy Master</span>}</div><span className="text-purple-300 text-sm font-medium">{progress.totalXP} XP</span></div>{!isMax && <><div className="w-full bg-white/10 rounded-full h-2 mb-1"><div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all" style={{ width: `${levelProgress * 100}%` }} /></div><p className="text-[10px] text-gray-500 text-right">{Math.round(levelProgress * 100)}% to Level {level + 1}</p></>}{isMax && <p className="text-green-400 text-xs text-center mt-1">All courses completed!</p>}</div>
            <div className="grid grid-cols-3 gap-3"><div className="p-3 rounded-xl bg-white/5 text-center"><BookOpen className="w-4 h-4 text-blue-400 mx-auto mb-1" /><p className="text-white font-bold text-lg">{progress.completedLessons}</p><p className="text-[10px] text-gray-500">Lessons</p></div><div className="p-3 rounded-xl bg-white/5 text-center"><Trophy className="w-4 h-4 text-yellow-400 mx-auto mb-1" /><p className="text-white font-bold text-lg">{progress.completedQuizzes}</p><p className="text-[10px] text-gray-500">Quizzes</p></div><div className="p-3 rounded-xl bg-white/5 text-center"><Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" /><p className="text-white font-bold text-lg">{progress.streak}</p><p className="text-[10px] text-gray-500">Streak</p></div></div>
            <div className="space-y-2"><button type="button" onClick={handleChangeWallet} className="w-full flex items-center space-x-3 p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-colors"><Wallet className="w-4 h-4 text-purple-300" /><span className="text-sm text-purple-200">Change Wallet</span></button><button type="button" onClick={handleCopy} className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">{copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}<span className="text-sm text-gray-300">{copied ? 'Copied!' : 'Copy Address'}</span></button><a href={getPolygonscanUrl(address)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"><ExternalLink className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-300">View on Polygonscan</span></a><button type="button" onClick={handleDisconnect} className="w-full flex items-center space-x-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-colors"><LogOut className="w-4 h-4 text-red-400" /><span className="text-sm text-red-400">Disconnect</span></button></div>
          </div>
        )}
      </motion.div>
    </ModalPortal>
  );
}
