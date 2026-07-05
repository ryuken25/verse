'use client';

import StoryShell from './StoryShell';
import AnnotatedOrbitVisual from './AnnotatedOrbitVisual';
import { Shield, Key, Wifi, AlertTriangle, CheckCircle, HardDrive, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'own-keys', kicker: 'Step 01', title: 'Non-custodial means you own the keys', body: 'A non-custodial wallet gives you direct control through your private key or seed phrase.', bullets: ['You control the wallet', 'No centralized custodian', 'Ownership depends on key security'] },
  { id: 'seed-backup', kicker: 'Step 02', title: 'Back up your seed phrase offline', body: 'Anyone who sees your seed phrase can steal your funds. Write it offline, never upload it.', bullets: ['Write it offline', 'Never screenshot it', 'Never share it'] },
  { id: 'connect-safely', kicker: 'Step 03', title: 'Connect safely with WalletConnect or browser wallets', body: 'Connecting lets a dApp see your public address. Spending requires separate approval.', bullets: ['WalletConnect QR', 'Browser extension support', 'Public address visibility'] },
  { id: 'fake-approvals', kicker: 'Step 04', title: 'Beware of fake token approvals', body: 'Check the token, contract address, spender, and amount before signing any approval.', bullets: ['Check spender', 'Check amount', 'Reject suspicious approvals'] },
  { id: 'verify-contracts', kicker: 'Step 05', title: 'Verify contract addresses before signing', body: 'Verify through official links or block explorers before approving anything.', bullets: ['Use official links', 'Check block explorer', 'Avoid random links'] },
  { id: 'hardware-wallet', kicker: 'Step 06', title: 'Use hardware wallets for large holdings', body: 'Hardware wallets keep private keys isolated from your browser and phone.', bullets: ['Cold storage', 'Safer signing', 'Best for large holdings'] },
];

const nodes = [
  { id: 'seed', title: 'Seed Phrase', subtitle: 'Recovery backup', icon: <Key className="w-4 h-4 text-purple-300" />, ring: 'inner' as const, angle: 40, speed: 0.14, radius: 92, calloutSide: 'bottom-left' as const },
  { id: 'walletconnect', title: 'WalletConnect', subtitle: 'Secure connection', icon: <Wifi className="w-4 h-4 text-blue-300" />, ring: 'outer' as const, angle: 140, speed: 0.10, radius: 148, calloutSide: 'left' as const },
  { id: 'verify', title: 'Verify', subtitle: 'Check contract & URL', icon: <CheckCircle className="w-4 h-4 text-teal-300" />, ring: 'inner' as const, angle: 200, speed: 0.16, radius: 92, calloutSide: 'top-right' as const },
  { id: 'hardware', title: 'Hardware', subtitle: 'Strongest protection', icon: <HardDrive className="w-4 h-4 text-pink-300" />, ring: 'outer' as const, angle: 280, speed: 0.09, radius: 148, calloutSide: 'right' as const },
  { id: 'approvals', title: 'Approvals', subtitle: 'Review permissions', icon: <AlertTriangle className="w-4 h-4 text-yellow-300" />, ring: 'inner' as const, angle: 320, speed: 0.12, radius: 92, calloutSide: 'bottom-right' as const },
];

export default function SecureWalletStory() {
  return (
    <StoryShell
      id="feature-secure-wallet"
      eyebrow="Security"
      title="Secure Wallet"
      description="Your crypto, your keys. VERSE uses non-custodial wallets so you always control your funds."
      steps={steps}
      minHeightClass="min-h-[380vh] lg:min-h-[430vh]"
      visual={({ activeStep }) => {
        const nodeIds = nodes.map(n => n.id);
        const stepToNode: Record<number, string> = { 0: 'seed', 1: 'seed', 2: 'walletconnect', 3: 'approvals', 4: 'verify', 5: 'hardware' };
        return (
          <AnnotatedOrbitVisual
            centerIcon={<Shield className="w-8 h-8 text-purple-300" />}
            centerTitle="Wallet Safety"
            centerSubtitle="Control, recovery, signing, protection"
            nodes={nodes}
            activeNodeId={stepToNode[activeStep]}
            theme="wallet"
          />
        );
      }}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="/academy#wallet-security" className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all">
            Learn Wallet Security
          </a>
          <a href="https://wallet.bitcoin.com/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Download Bitcoin.com Wallet</span><ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    />
  );
}
