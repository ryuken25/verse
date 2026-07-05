'use client';

import StoryShell from './StoryShell';
import SaturnOrbitVisual from './SaturnOrbitVisual';
import { Users, MessageCircle, Linkedin, Hammer, ExternalLink } from 'lucide-react';

const steps = [
  { id: 'join', kicker: 'Network', title: 'Start with the community layer', body: 'Web3 is easier when you are not learning alone. Community channels help users discover updates and find builders.', bullets: ['Learn with others', 'Find builders', 'Follow ecosystem updates'] },
  { id: 'chat', kicker: 'Chat', title: 'Telegram and Discord keep builders connected', body: 'Telegram is useful for quick updates, while Discord is useful for structured channels, events, and developer discussions.', bullets: ['Telegram for quick updates', 'Discord for channels', 'Events and support'] },
  { id: 'social', kicker: 'Social', title: 'X and LinkedIn extend the network', body: 'Public social channels help projects share announcements, educational threads, partnership news, and developer opportunities.', bullets: ['X for announcements', 'LinkedIn for professional updates', 'Public reputation'] },
  { id: 'build', kicker: 'Build', title: 'Community turns users into builders', body: 'A strong ecosystem grows when people learn, build, review, ship, and help each other improve.', bullets: ['Ship projects', 'Review dApps', 'Share feedback'] },
];

const badges = [
  { id: 'tg', label: 'Telegram', icon: <MessageCircle className="w-5 h-5 text-blue-300" />, ring: 0, angle: 0, duration: 22 },
  { id: 'dc', label: 'Discord', icon: <Users className="w-5 h-5 text-indigo-300" />, ring: 0, angle: 120, duration: 24 },
  { id: 'x', label: 'X', icon: <ExternalLink className="w-5 h-5 text-gray-300" />, ring: 1, angle: 60, duration: 26 },
  { id: 'li', label: 'LinkedIn', icon: <Linkedin className="w-5 h-5 text-blue-300" />, ring: 1, angle: 180, duration: 28 },
  { id: 'build', label: 'Builder', icon: <Hammer className="w-5 h-5 text-orange-300" />, ring: 1, angle: 300, duration: 30 },
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
      visual={({ activeStep }) => (
        <SaturnOrbitVisual
          center={
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/30 to-cyan-500/30 border border-teal-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.3)]">
              <Users className="w-10 h-10 text-teal-300" />
            </div>
          }
          badges={badges}
          activeIndex={activeStep}
        />
      )}
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
