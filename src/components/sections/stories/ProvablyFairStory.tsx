'use client';

import StoryShell from './StoryShell';
import StoryOrbitVisual from './StoryOrbitVisual';
import { Dice5, Shuffle, Eye, CheckCircle, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'commit', kicker: 'Commit', title: 'The system commits before the outcome is known', body: 'A commit is a cryptographic promise. The system publishes a hash before revealing the secret value. Because hashes are one-way, users can see that a value was locked in without seeing it yet.', bullets: ['Hash is published first', 'Secret stays hidden', 'Commit prevents after-the-fact changes'] },
  { id: 'user-randomness', kicker: 'Mix', title: 'Users can add randomness too', body: 'A fair design can combine server randomness with user randomness, wallet address, block data, or nonce. This reduces the chance that one party controls the result.', bullets: ['Server seed', 'User seed or nonce', 'Block data'] },
  { id: 'reveal', kicker: 'Reveal', title: 'The secret is revealed after the result', body: 'After the game or reward draw, the original seed is revealed. Anyone can hash it again and check that it matches the earlier commit.', bullets: ['Reveal original seed', 'Recompute hash', 'Compare with commit'] },
  { id: 'verify', kicker: 'Verify', title: 'Anyone can recompute the outcome', body: 'If users run the same formula with the same inputs, they should get the same result. That is the core of independent verification.', bullets: ['No hidden server trust', 'Repeatable result', 'Public verification'] },
];

const badges = [
  { id: 'commit', label: 'Commit', icon: <Dice5 className="w-5 h-5 text-purple-300" />, color: 'purple', radius: 120, duration: 12, delay: 0 },
  { id: 'mix', label: 'Mix', icon: <Shuffle className="w-5 h-5 text-blue-300" />, color: 'blue', radius: 140, duration: 15, delay: 1 },
  { id: 'reveal', label: 'Reveal', icon: <Eye className="w-5 h-5 text-green-300" />, color: 'green', radius: 110, duration: 10, delay: 0.5 },
  { id: 'verify', label: 'Verify', icon: <CheckCircle className="w-5 h-5 text-cyan-300" />, color: 'cyan', radius: 130, duration: 14, delay: 1.5 },
];

export default function ProvablyFairStory() {
  return (
    <StoryShell
      id="feature-provably-fair"
      eyebrow="Fairness"
      title="Provably Fair"
      description="Provably fair means the outcome of a game, draw, quest, or reward distribution can be independently verified. Users do not need to blindly trust a hidden server."
      steps={steps}
      minHeightClass="min-h-[220vh] lg:min-h-[300vh]"
      visual={({ activeStep }) => (
        <StoryOrbitVisual
          center={
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/30 to-purple-500/30 border border-violet-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
              <Dice5 className="w-10 h-10 text-violet-300" />
            </div>
          }
          badges={badges}
          activeIndex={activeStep}
        />
      )}
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
