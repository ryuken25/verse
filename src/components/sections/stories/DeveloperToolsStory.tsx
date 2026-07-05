'use client';

import StoryShell from './StoryShell';
import StoryGlobeOrbitVisual from './StoryGlobeOrbitVisual';
import { developerNodes } from './storyOrbitConfigs';
import { Code, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'evm', visualNodeId: 'wagmi', kicker: 'EVM', title: 'Build with standard EVM tools', body: 'VERSE dApps use the proven Ethereum and Polygon tooling stack. No proprietary SDK required.', bullets: ['Standard smart contracts', 'EVM-compatible tooling', 'No fake SDK dependency'] },
  { id: 'frontend', visualNodeId: 'viem', kicker: 'Frontend', title: 'Use wagmi and viem for dApp frontends', body: 'wagmi gives React hooks for wallets and contracts. viem provides TypeScript-safe Ethereum utilities.', bullets: ['wagmi React hooks', 'viem TypeScript utilities', 'wallet state and contract calls'] },
  { id: 'wallet', visualNodeId: 'reown', kicker: 'Wallets', title: 'Use Reown AppKit for wallet connection', body: 'Reown AppKit provides WalletConnect modal and QR/deeplink support for browser and mobile wallets.', bullets: ['WalletConnect QR', 'mobile deeplink', 'browser wallets'] },
  { id: 'polygon', visualNodeId: 'polygon', kicker: 'Polygon', title: 'Deploy and test on Polygon', body: 'Polygon is EVM-compatible with lower fees and broad wallet support.', bullets: ['Polygon chain config', 'POL gas token', 'block explorer verification'] },
  { id: 'tokens', visualNodeId: 'token-list', kicker: 'Token List', title: 'Use a verified VERSE token list', body: 'Token lists reduce mistakes in dApp interfaces. Use verified token metadata from a trusted source.', bullets: ['Verified symbols', 'logos and decimals', 'safer frontend metadata'] },
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
      visual={({ activeStep, paused, compact }) => (
        <StoryGlobeOrbitVisual
          theme="devtools"
          centerIcon={<Code className="h-8 w-8 text-blue-300" />}
          centerTitle="Build on EVM"
          centerSubtitle="Standard tools, Polygon-ready"
          nodes={developerNodes}
          activeNodeId={steps[activeStep]?.visualNodeId}
          compact={compact}
          paused={paused}
        />
      )}
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
