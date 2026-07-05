'use client';

import StoryShell from './StoryShell';
import StoryGlobeOrbitVisual from './StoryGlobeOrbitVisual';
import { communityNodes } from './storyOrbitConfigs';
import { Users, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'join', visualNodeId: 'telegram', kicker: 'Network', title: 'Start with the community layer', body: 'Community channels help users discover updates and find builders working on similar problems.', bullets: ['Learn with others', 'Find builders', 'Follow ecosystem updates'] },
  { id: 'chat', visualNodeId: 'discord', kicker: 'Chat', title: 'Telegram and Discord keep builders connected', body: 'Telegram for quick updates, Discord for structured channels, events, and developer discussions.', bullets: ['Telegram for quick updates', 'Discord for channels', 'Events and support'] },
  { id: 'social', visualNodeId: 'x', kicker: 'Social', title: 'X and LinkedIn extend the network', body: 'Public social channels help projects share announcements, educational threads, and partnership news.', bullets: ['X for announcements', 'LinkedIn for professional updates', 'Public reputation'] },
  { id: 'build', visualNodeId: 'builders', kicker: 'Build', title: 'Community turns users into builders', body: 'A strong ecosystem grows when people learn, build, review, ship, and help each other improve.', bullets: ['Ship projects', 'Review dApps', 'Share feedback'] },
];

export default function CommunityHubStory() {
  return (
    <StoryShell
      id="feature-community-hub"
      eyebrow="Community"
      title="Community Hub"
      description="Join the Bitcoin.com and VERSE community. Connect with developers, traders, learners, and builders worldwide."
      steps={steps}
      minHeightClass="min-h-[300vh] lg:min-h-[340vh]"
      visual={({ activeStep, paused, compact }) => (
        <StoryGlobeOrbitVisual
          theme="community"
          centerIcon={<Users className="h-8 w-8 text-teal-300" />}
          centerTitle="VERSE Community"
          centerSubtitle="Builders, traders, and users"
          nodes={communityNodes}
          activeNodeId={steps[activeStep]?.visualNodeId}
          compact={compact}
          paused={paused}
        />
      )}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="https://t.me/GetVerse/1/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-1">
            <span>Join Telegram</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://discord.com/invite/bitcoin-com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Join Discord</span><ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    />
  );
}
