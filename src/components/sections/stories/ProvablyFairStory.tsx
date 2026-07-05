'use client';

import StoryShell from './StoryShell';
import AnnotatedOrbitVisual from './AnnotatedOrbitVisual';
import { Dice5, Shuffle, Eye, CheckCircle, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'commit', kicker: 'Commit', title: 'The system commits before the outcome is known', body: 'A commit is a cryptographic promise. The system publishes a hash before revealing the secret value.', bullets: ['Hash is published first', 'Secret stays hidden', 'Commit prevents after-the-fact changes'] },
  { id: 'mix', kicker: 'Mix', title: 'Users can add randomness too', body: 'Combine server randomness with user randomness, wallet address, block data, or nonce.', bullets: ['Server seed', 'User seed or nonce', 'Block data'] },
  { id: 'reveal', kicker: 'Reveal', title: 'The secret is revealed after the result', body: 'Anyone can hash it again and check that it matches the earlier commit.', bullets: ['Reveal original seed', 'Recompute hash', 'Compare with commit'] },
  { id: 'verify', kicker: 'Verify', title: 'Anyone can recompute the outcome', body: 'Same formula + same inputs = same result. That is independent verification.', bullets: ['No hidden server trust', 'Repeatable result', 'Public verification'] },
];

const nodes = [
  { id: 'commit', title: 'Commit', subtitle: 'Hash locked', icon: <Dice5 className="w-4 h-4 text-purple-300" />, ring: 'inner' as const, angle: 30, speed: 0.14, radius: 92, calloutSide: 'bottom-left' as const },
  { id: 'mix', title: 'Mix', subtitle: 'Inputs combined', icon: <Shuffle className="w-4 h-4 text-blue-300" />, ring: 'outer' as const, angle: 120, speed: 0.10, radius: 148, calloutSide: 'left' as const },
  { id: 'reveal', title: 'Reveal', subtitle: 'Secret shown', icon: <Eye className="w-4 h-4 text-green-300" />, ring: 'inner' as const, angle: 220, speed: 0.16, radius: 92, calloutSide: 'top-right' as const },
  { id: 'verify', title: 'Verify', subtitle: 'Result checked', icon: <CheckCircle className="w-4 h-4 text-cyan-300" />, ring: 'outer' as const, angle: 310, speed: 0.09, radius: 148, calloutSide: 'right' as const },
];

export default function ProvablyFairStory() {
  return (
    <StoryShell
      id="feature-provably-fair"
      eyebrow="Fairness"
      title="Provably Fair"
      description="Provably fair means the outcome can be independently verified. Users do not need to blindly trust a hidden server."
      steps={steps}
      minHeightClass="min-h-[300vh] lg:min-h-[340vh]"
      visual={({ activeStep }) => {
        const stepToNode: Record<number, string> = { 0: 'commit', 1: 'mix', 2: 'reveal', 3: 'verify' };
        return (
          <AnnotatedOrbitVisual
            centerIcon={<Dice5 className="w-8 h-8 text-violet-300" />}
            centerTitle="Provable Outcome"
            centerSubtitle="Transparent reward logic"
            nodes={nodes}
            activeNodeId={stepToNode[activeStep]}
            theme="fair"
          />
        );
      }}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="/academy#how-blockchain-works" className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all">
            Learn Blockchain Verification
          </a>
          <a href="/#events" className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all">
            Explore Rewards / Events
          </a>
        </div>
      }
    />
  );
}
