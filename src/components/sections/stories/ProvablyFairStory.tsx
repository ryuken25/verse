'use client';

import StoryShell from './StoryShell';
import AnnotatedOrbitVisual from './AnnotatedOrbitVisual';
import { provablyFairNodes } from './orbitStoryConfigs';
import { Dice5, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'commit', visualNodeId: 'commit', kicker: 'Commit', title: 'The system commits before the outcome is known', body: 'A commit is a cryptographic promise. The system publishes a hash before revealing the secret value.', bullets: ['Hash is published first', 'Secret stays hidden', 'Commit prevents after-the-fact changes'] },
  { id: 'mix', visualNodeId: 'mix', kicker: 'Mix', title: 'Users can add randomness too', body: 'Combine server randomness with user randomness, wallet address, block data, or nonce.', bullets: ['Server seed', 'User seed or nonce', 'Block data'] },
  { id: 'reveal', visualNodeId: 'reveal', kicker: 'Reveal', title: 'The secret is revealed after the result', body: 'Anyone can hash it again and check that it matches the earlier commit.', bullets: ['Reveal original seed', 'Recompute hash', 'Compare with commit'] },
  { id: 'verify', visualNodeId: 'verify', kicker: 'Verify', title: 'Anyone can recompute the outcome', body: 'Same formula + same inputs = same result. That is independent verification.', bullets: ['No hidden server trust', 'Repeatable result', 'Public verification'] },
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
      visual={({ activeStep, paused, compact }) => (
        <AnnotatedOrbitVisual
          theme="fair"
          centerIcon={<Dice5 className="h-8 w-8 text-purple-300" />}
          centerTitle="Provable Outcome"
          centerSubtitle="Transparent reward logic"
          nodes={provablyFairNodes}
          activeNodeId={steps[activeStep]?.visualNodeId}
          compact={compact}
          paused={paused}
        />
      )}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="/academy#how-blockchain-works" className="px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all">Learn Blockchain Verification</a>
          <a href="/#events" className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all">Explore Rewards / Events</a>
        </div>
      }
    />
  );
}
