'use client';

import StoryShell from './StoryShell';
import SaturnOrbitVisual from './SaturnOrbitVisual';
import { Shield, Key, FileText, Wifi, AlertTriangle, CheckCircle, HardDrive, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'own-keys', kicker: 'Step 01', title: 'Non-custodial means you own the keys', body: 'A non-custodial wallet does not hold your crypto for you. It gives you direct control through your private key or seed phrase.', bullets: ['You control the wallet', 'No centralized custodian', 'Ownership depends on key security'] },
  { id: 'seed-backup', kicker: 'Step 02', title: 'Back up your seed phrase offline', body: 'A seed phrase can restore your wallet. That also means anyone who sees it can steal your funds. Write it offline, never upload it.', bullets: ['Write it offline', 'Never screenshot it', 'Never share it'] },
  { id: 'connect-safely', kicker: 'Step 03', title: 'Connect safely with WalletConnect or browser wallets', body: 'Connecting a wallet lets a dApp see your public address. It should not give permission to spend tokens by itself.', bullets: ['WalletConnect QR', 'Browser extension support', 'Public address visibility'] },
  { id: 'fake-approvals', kicker: 'Step 04', title: 'Beware of fake token approvals', body: 'Some malicious sites ask for token approvals that let them move assets later. Before signing, check the token, contract address, spender, and amount.', bullets: ['Check spender', 'Check amount', 'Reject suspicious approvals'] },
  { id: 'verify-contracts', kicker: 'Step 05', title: 'Verify contract addresses before signing', body: 'Scammers copy real project names and logos. The contract address is the real identity. Verify it through official links or block explorers.', bullets: ['Use official links', 'Check block explorer', 'Avoid random links'] },
  { id: 'hardware-wallet', kicker: 'Step 06', title: 'Use hardware wallets for large holdings', body: 'A hardware wallet keeps private keys isolated from your browser and phone. It adds friction, but that friction is useful when the value is high.', bullets: ['Cold storage', 'Safer signing', 'Best for large holdings'] },
];

const badges = [
  { id: 'key', label: 'Keys', icon: <Key className="w-5 h-5 text-purple-300" />, ring: 0, angle: 0, duration: 22 },
  { id: 'seed', label: 'Seed', icon: <FileText className="w-5 h-5 text-blue-300" />, ring: 0, angle: 120, duration: 24 },
  { id: 'wifi', label: 'Connect', icon: <Wifi className="w-5 h-5 text-green-300" />, ring: 0, angle: 240, duration: 20 },
  { id: 'alert', label: 'Approvals', icon: <AlertTriangle className="w-5 h-5 text-yellow-300" />, ring: 1, angle: 60, duration: 28 },
  { id: 'check', label: 'Verify', icon: <CheckCircle className="w-5 h-5 text-teal-300" />, ring: 1, angle: 180, duration: 26 },
  { id: 'hw', label: 'Hardware', icon: <HardDrive className="w-5 h-5 text-pink-300" />, ring: 1, angle: 300, duration: 30 },
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
      visual={({ activeStep }) => (
        <SaturnOrbitVisual
          center={
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.3)]">
              <Shield className="w-10 h-10 text-purple-300" />
            </div>
          }
          badges={badges}
          activeIndex={activeStep}
        />
      )}
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
