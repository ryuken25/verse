'use client';

import StoryShell from './StoryShell';
import AnnotatedOrbitVisual from './AnnotatedOrbitVisual';
import { Code, Layers, Wifi, Hexagon, FileCode, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'evm', kicker: 'EVM', title: 'Build with standard EVM tools', body: 'VERSE dApps use the proven Ethereum and Polygon tooling stack. No proprietary SDK required.', bullets: ['Standard smart contracts', 'EVM-compatible tooling', 'No fake SDK dependency'] },
  { id: 'frontend', kicker: 'Frontend', title: 'Use wagmi and viem for dApp frontends', body: 'wagmi gives React hooks for wallets and contracts. viem provides TypeScript-safe Ethereum utilities.', bullets: ['wagmi React hooks', 'viem TypeScript utilities', 'wallet state and contract calls'] },
  { id: 'wallet', kicker: 'Wallets', title: 'Use Reown AppKit for wallet connection', body: 'Reown AppKit provides WalletConnect modal and QR/deeplink support for browser and mobile wallets.', bullets: ['WalletConnect QR', 'mobile deeplink', 'browser wallets'] },
  { id: 'polygon', kicker: 'Polygon', title: 'Deploy and test on Polygon', body: 'Polygon is EVM-compatible with lower fees and broad wallet support.', bullets: ['Polygon chain config', 'POL gas token', 'block explorer verification'] },
  { id: 'tokens', kicker: 'Token List', title: 'Use a verified VERSE token list', body: 'Token lists reduce mistakes in dApp interfaces. Use verified token metadata from a trusted source.', bullets: ['Verified symbols', 'logos and decimals', 'safer frontend metadata'] },
];

const nodes = [
  { id: 'wagmi', title: 'wagmi', subtitle: 'React wallet hooks', icon: <Code className="w-4 h-4 text-purple-300" />, ring: 'inner' as const, angle: 20, speed: 0.14, radius: 92, calloutSide: 'bottom-left' as const },
  { id: 'viem', title: 'viem', subtitle: 'TypeScript Ethereum client', icon: <Layers className="w-4 h-4 text-blue-300" />, ring: 'outer' as const, angle: 90, speed: 0.10, radius: 148, calloutSide: 'left' as const },
  { id: 'reown', title: 'Reown AppKit', subtitle: 'WalletConnect UI / modal', icon: <Wifi className="w-4 h-4 text-green-300" />, ring: 'inner' as const, angle: 160, speed: 0.16, radius: 92, calloutSide: 'top-left' as const },
  { id: 'polygon', title: 'Polygon Docs', subtitle: 'Chain setup & deployment', icon: <Hexagon className="w-4 h-4 text-violet-300" />, ring: 'outer' as const, angle: 240, speed: 0.09, radius: 148, calloutSide: 'right' as const },
  { id: 'tokens', title: 'Token List', subtitle: 'Token metadata / references', icon: <FileCode className="w-4 h-4 text-cyan-300" />, ring: 'inner' as const, angle: 310, speed: 0.12, radius: 92, calloutSide: 'bottom-right' as const },
];

export default function DeveloperToolsStory() {
  return (
    <StoryShell
      id="feature-developer-tools"
      eyebrow="Build"
      title="Developer Tools"
      description="Build dApps on Polygon using standard EVM tools. No proprietary SDK required."
      steps={steps}
      minHeightClass="min-h-[340vh] lg:min-h-[390vh]"
      visual={({ activeStep }) => {
        const stepToNode: Record<number, string> = { 0: 'wagmi', 1: 'wagmi', 2: 'reown', 3: 'polygon', 4: 'tokens' };
        return (
          <AnnotatedOrbitVisual
            centerIcon={<Code className="w-8 h-8 text-red-300" />}
            centerTitle="Build on EVM"
            centerSubtitle="Standard tools, Polygon-ready"
            nodes={nodes}
            activeNodeId={stepToNode[activeStep]}
            theme="devtools"
          />
        );
      }}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="https://wagmi.sh/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-1">
            <span>wagmi Docs</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://viem.sh/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>viem Docs</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://docs.polygon.technology/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Polygon Docs</span><ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    />
  );
}
