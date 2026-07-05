'use client';

import StoryShell from './StoryShell';
import AnnotatedOrbitVisual from './AnnotatedOrbitVisual';
import { Users, MessageCircle, Linkedin, Hammer, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'join', kicker: 'Network', title: 'Start with the community layer', body: 'Community channels help users discover updates and find builders working on similar problems.', bullets: ['Learn with others', 'Find builders', 'Follow ecosystem updates'] },
  { id: 'chat', kicker: 'Chat', title: 'Telegram and Discord keep builders connected', body: 'Telegram for quick updates, Discord for structured channels, events, and developer discussions.', bullets: ['Telegram for quick updates', 'Discord for channels', 'Events and support'] },
  { id: 'social', kicker: 'Social', title: 'X and LinkedIn extend the network', body: 'Public social channels help projects share announcements, educational threads, and partnership news.', bullets: ['X for announcements', 'LinkedIn for professional updates', 'Public reputation'] },
  { id: 'build', kicker: 'Build', title: 'Community turns users into builders', body: 'A strong ecosystem grows when people learn, build, review, ship, and help each other improve.', bullets: ['Ship projects', 'Review dApps', 'Share feedback'] },
];

const nodes = [
  { id: 'telegram', title: 'Telegram', subtitle: 'Quick updates / chat', icon: <MessageCircle className="w-4 h-4 text-blue-300" />, ring: 'inner' as const, angle: 30, speed: 0.14, radius: 92, calloutSide: 'bottom-left' as const },
  { id: 'discord', title: 'Discord', subtitle: 'Developer discussions', icon: <Users className="w-4 h-4 text-indigo-300" />, ring: 'outer' as const, angle: 100, speed: 0.10, radius: 148, calloutSide: 'left' as const },
  { id: 'twitter', title: 'X (Twitter)', subtitle: 'Announcements', icon: <ExternalLink className="w-4 h-4 text-gray-300" />, ring: 'inner' as const, angle: 200, speed: 0.16, radius: 92, calloutSide: 'top-right' as const },
  { id: 'linkedin', title: 'LinkedIn', subtitle: 'Professional presence', icon: <Linkedin className="w-4 h-4 text-blue-300" />, ring: 'outer' as const, angle: 280, speed: 0.09, radius: 148, calloutSide: 'right' as const },
  { id: 'events', title: 'Events', subtitle: 'Live participation', icon: <Hammer className="w-4 h-4 text-orange-300" />, ring: 'inner' as const, angle: 320, speed: 0.12, radius: 92, calloutSide: 'bottom-right' as const },
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
      visual={({ activeStep }) => {
        const stepToNode: Record<number, string> = { 0: 'telegram', 1: 'telegram', 2: 'twitter', 3: 'events' };
        return (
          <AnnotatedOrbitVisual
            centerIcon={<Users className="w-8 h-8 text-teal-300" />}
            centerTitle="VERSE Community"
            centerSubtitle="Builders, traders, and users"
            nodes={nodes}
            activeNodeId={stepToNode[activeStep]}
            theme="community"
          />
        );
      }}
      ctas={
        <div className="flex flex-wrap gap-3">
          <a href="https://t.me/GetVerse/1/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all flex items-center space-x-1">
            <span>Join Telegram</span><ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://discord.com/invite/bitcoin-com/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 glass rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
            <span>Join Discord</span><ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    />
  );
}
