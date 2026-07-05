'use client';

import SecureWalletStory from './stories/SecureWalletStory';
import ProvablyFairStory from './stories/ProvablyFairStory';
import CommunityHubStory from './stories/CommunityHubStory';
import DeveloperToolsStory from './stories/DeveloperToolsStory';

export default function FeatureStoryHub() {
  return (
    <div className="relative mt-20 md:mt-28">
      <SecureWalletStory />
      <ProvablyFairStory />
      <CommunityHubStory />
      <DeveloperToolsStory />
    </div>
  );
}
