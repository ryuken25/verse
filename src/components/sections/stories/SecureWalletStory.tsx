'use client';

import StoryShell from './StoryShell';
import StoryOrbitVisual from './StoryOrbitVisual';
import { Shield, Key, FileText, Wifi, AlertTriangle, CheckCircle, HardDrive, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'own-keys', kicker: 'Step 01', title: 'Non-custodial means you own the keys', body: 'A non-custodial wallet does not hold your crypto for you. It gives you direct control through your private key or seed phrase. If the app disappears, your funds are still recoverable as long as you still control the recovery phrase.', bullets: ['You control the wallet', 'No centralized custodian', 'Ownership depends on key security'] },
  { id: 'seed-backup', kicker: 'Step 02', title: 'Back up your seed phrase offline', body: 'A seed phrase can restore your wallet. That also means anyone who sees it can steal your funds. Write it offline, never upload it, never send it in chat, and never type it into unknown websites.', bullets: ['Write it offline', 'Never screenshot it', 'Never share it'] },
  { id: 'connect-safely', kicker: 'Step 03', title: 'Connect safely with WalletConnect or browser wallets', body: 'Connecting a wallet lets a dApp see your public address. It should not give permission to spend tokens by itself. Spending permissions happen through separate approval or signing actions.', bullets: ['WalletConnect QR', 'Browser extension support', 'Public address visibility'] },
  { id: 'fake-approvals', kicker: 'Step 04', title: 'Beware of fake token approvals', body: 'Some malicious sites ask for token approvals that let them move assets later. Before signing, check the token, contract address, spender, network, and permission amount.', bullets: ['Check spender', 'Check amount', 'Reject suspicious approvals'] },
  { id: 'verify-contracts', kicker: 'Step 05', title: 'Verify contract addresses before signing', body: 'Scammers copy real project names and logos. The contract address is the real identity of a token or dApp. Verify it through official links, block explorers, or trusted docs before approving anything.', bullets: ['Use official links', 'Check block explorer', 'Avoid random links'] },
  { id: 'hardware-wallet', kicker: 'Step 06', title: 'Use hardware wallets for large holdings', body: 'A hardware wallet keeps private keys isolated from your browser and phone. It adds friction, but that friction is useful when the value is high.', bullets: ['Cold storage', 'Safer signing', 'Best for large holdings'] },
];

const badges = [
  { id: 'key', label: 'Key', icon: <Key className="w-5 h-5 text-purple-300" />, color: 'purple', radius: 120, duration: 12, delay: 0 },
  { id: 'seed', label: 'Seed', icon: <FileText className="w-5 h-5 text-blue-300" />, color: 'blue', radius: 140, duration: 15, delay: 1 },
  { id: 'wifi', label: 'Connect', icon: <Wifi className="w-5 h-5 text-green-300" />, color: 'green', radius: 100, duration: 10, delay: 0.5 },
  { id: 'alert', label: 'Warning', icon: <AlertTriangle className="w-5 h-5 text-yellow-300" />, color: 'yellow', radius: 160, duration: 18, delay: 2 },
  { id: 'check', label: 'Verify', icon: <CheckCircle className="w-5 h-5 text-teal-300" />, color: 'teal', radius: 130, duration: 14, delay: 1.5 },
  { id: 'hw', label: 'Hardware', icon: <HardDrive className="w-5 h-5 text-pink-300" />, color: 'pink', radius: 110, duration: 11, delay: 0.8 },
];

export default function SecureWalletStory() {
  return (
    <StoryShell
      id="feature-secure-wallet"
      eyebrow="Security"
      title="Secure Wallet"
      description="Your crypto, your keys. VERSE uses non-custodial wallets so you always control your funds. No third party can access your assets without your private key."
      steps={steps}
      minHeightClass="min-h-[280vh] lg:min-h-[360vh]"
      visual={({ activeStep }) => (
        <StoryOrbitVisual
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
