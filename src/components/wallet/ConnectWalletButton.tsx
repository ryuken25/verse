'use client';

import { useState } from 'react';
import { Wallet, ChevronDown } from 'lucide-react';
import { useAccount } from 'wagmi';
import { shortAddress } from '@/lib/wallet';
import WalletModal from './WalletModal';

interface ConnectWalletButtonProps {
  onSuccess?: () => void;
  className?: string;
}

export default function ConnectWalletButton({ onSuccess, className }: ConnectWalletButtonProps) {
  const { address, isConnected } = useAccount();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
          isConnected
            ? 'bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
        } ${className || ''}`}
      >
        {isConnected ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="hidden sm:inline">{shortAddress(address)}</span>
            <span className="sm:hidden">Connected</span>
            <ChevronDown className="w-3 h-3" />
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </button>

      <WalletModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={onSuccess} />
    </>
  );
}
