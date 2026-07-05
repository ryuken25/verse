'use client';

import StoryShell from './StoryShell';
import StoryGlobeOrbitVisual from './StoryGlobeOrbitVisual';
import { secureWalletNodes } from './storyOrbitConfigs';
import { Shield, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'own-keys', visualNodeId: 'keys', kicker: 'Step 01', title: 'Non-custodial means you own the keys', body: 'A non-custodial wallet gives you direct control through your private key or seed phrase.', bullets: ['You control the wallet', 'No centralized custodian', 'Ownership depends on key security'] },
  { id: 'seed-backup', visualNodeId: 'seed', kicker: 'Step 02', title: 'Back up your seed phrase offline', body: 'Anyone who sees your seed phrase can steal your funds. Write it offline, never upload it.', bullets: ['Write it offline', 'Never screenshot it', 'Never share it'] },
  { id: 'connect-safely', visualNodeId: 'connect', kicker: 'Step 03', title: 'Connect safely with WalletConnect or browser wallets', body: 'Connecting lets a dApp see your public address. Spending requires separate approval.', bullets: ['WalletConnect QR', 'Browser extension support', 'Public address visibility'] },
  { id: 'fake-approvals', visualNodeId: 'approvals', kicker: 'Step 04', title: 'Beware of fake token approvals', body: 'Check the token, contract address, spender, and amount before signing any approval.', bullets: ['Check spender', 'Check amount', 'Reject suspicious approvals'] },
  { id: 'verify-contracts', visualNodeId: 'verify', kicker: 'Step 05', title: 'Verify contract addresses before signing', body: 'Verify through official links or block explorers before approving anything.', bullets: ['Use official links', 'Check block explorer', 'Avoid random links'] },
  { id: 'hardware-wallet', visualNodeId: 'hardware', kicker: 'Step 06', title: 'Use hardware wallets for large holdings', body: 'Hardware wallets keep private keys isolated from your browser and phone.', bullets: ['Cold storage', 'Safer signing', 'Best for large holdings'] },
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
      visual={({ activeStep, paused, compact }) => (
        <StoryGlobeOrbitVisual
          theme="wallet"
          centerIcon={<Shield className="h-8 w-8 text-cyan-300" />}
          centerTitle="Wallet Safety"
          centerSubtitle="Control, recovery, signing, protection"
          nodes={secureWalletNodes}
          activeNodeId={steps[activeStep]?.visualNodeId}
          compact={compact}
          paused={paused}
        />
      )}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="/academy#wallet-security" className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all">Learn Wallet Security</a>
          <a href="https://wallet.bitcoin.com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Download Bitcoin.com Wallet</span><ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    />
  );
}
