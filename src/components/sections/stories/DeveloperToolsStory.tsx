'use client';

import StoryShell from './StoryShell';
import StoryOrbitVisual from './StoryOrbitVisual';
import { Code, Layers, Wifi, Hexagon, FileCode, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'evm-standard', kicker: 'EVM', title: 'Build with standard EVM tools', body: 'VERSE dApps should not depend on a fake proprietary SDK. Use the proven Ethereum and Polygon tooling stack that developers already understand.', bullets: ['Standard smart contracts', 'EVM-compatible tooling', 'No fake SDK dependency'] },
  { id: 'frontend-stack', kicker: 'Frontend', title: 'Use wagmi and viem for dApp frontends', body: 'wagmi gives React hooks for wallets and contracts. viem provides TypeScript-safe Ethereum utilities for reading, writing, formatting, and encoding blockchain data.', bullets: ['wagmi React hooks', 'viem TypeScript utilities', 'wallet state and contract calls'] },
  { id: 'walletconnect', kicker: 'Wallets', title: 'Use Reown AppKit for wallet connection', body: 'Reown AppKit provides WalletConnect modal and QR/deeplink support, so users can connect from browser extensions or mobile wallets.', bullets: ['WalletConnect QR', 'mobile deeplink', 'browser wallets'] },
  { id: 'polygon', kicker: 'Polygon', title: 'Deploy and test on Polygon', body: 'Polygon is EVM-compatible, so contracts and frontends can use familiar tooling while benefiting from lower fees and broad wallet support.', bullets: ['Polygon chain config', 'POL gas token', 'block explorer verification'] },
  { id: 'token-list', kicker: 'Token List', title: 'Use a verified VERSE token list', body: 'Token lists reduce mistakes in dApp interfaces. Use verified token metadata from a trusted source instead of hardcoding random contract details.', bullets: ['Verified symbols', 'logos and decimals', 'safer frontend metadata'] },
];

const badges = [
  { id: 'wagmi', label: 'wagmi', icon: <Code className="w-5 h-5 text-purple-300" />, color: 'purple', radius: 120, duration: 12, delay: 0 },
  { id: 'viem', label: 'viem', icon: <Layers className="w-5 h-5 text-blue-300" />, color: 'blue', radius: 140, duration: 15, delay: 1 },
  { id: 'reown', label: 'Reown', icon: <Wifi className="w-5 h-5 text-green-300" />, color: 'green', radius: 110, duration: 10, delay: 0.5 },
  { id: 'polygon', label: 'Polygon', icon: <Hexagon className="w-5 h-5 text-violet-300" />, color: 'violet', radius: 130, duration: 14, delay: 1.5 },
  { id: 'tokens', label: 'Tokens', icon: <FileCode className="w-5 h-5 text-cyan-300" />, color: 'cyan', radius: 100, duration: 11, delay: 0.8 },
];

export default function DeveloperToolsStory() {
  return (
    <StoryShell
      id="feature-developer-tools"
      eyebrow="Build"
      title="Developer Tools"
      description="Build dApps on Polygon using standard EVM tools. No proprietary SDK required."
      steps={steps}
      minHeightClass="min-h-[260vh] lg:min-h-[360vh]"
      visual={({ activeStep }) => (
        <StoryOrbitVisual
          center={
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/30 to-pink-500/30 border border-red-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.3)]">
              <Code className="w-10 h-10 text-red-300" />
            </div>
          }
          badges={badges}
          activeIndex={activeStep}
        />
      )}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="https://wagmi.sh/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-1">
            <span>wagmi Docs</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://viem.sh/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>viem Docs</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://docs.reown.com/appkit/overview" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Reown AppKit</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://docs.polygon.technology/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Polygon Docs</span><ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    />
  );
}
