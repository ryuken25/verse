'use client';

import { KeyRound, FileText, Wifi, AlertTriangle, CheckCircle, HardDrive, Dice5, Shuffle, Eye, Users, MessageCircle, Hash, Linkedin, Code2, Boxes, WalletCards, Database } from 'lucide-react';
import type { StoryOrbitNode } from './StoryGlobeOrbitVisual';

export const secureWalletNodes: StoryOrbitNode[] = [
  { id: 'keys', title: 'Keys', subtitle: 'You control access', icon: <KeyRound className="h-4 w-4 text-cyan-200" />, ring: 'inner', angle: 315, radius: 122, labelSlot: 'top-left', orbitDrift: 2 },
  { id: 'seed', title: 'Seed Phrase', subtitle: 'Offline recovery', icon: <FileText className="h-4 w-4 text-cyan-200" />, ring: 'outer', angle: 45, radius: 188, labelSlot: 'top-right', orbitDrift: 2 },
  { id: 'connect', title: 'WalletConnect', subtitle: 'Safe dApp connection', icon: <Wifi className="h-4 w-4 text-purple-200" />, ring: 'outer', angle: 160, radius: 188, labelSlot: 'middle-left', orbitDrift: 2 },
  { id: 'approvals', title: 'Approvals', subtitle: 'Review permissions', icon: <AlertTriangle className="h-4 w-4 text-yellow-200" />, ring: 'inner', angle: 205, radius: 122, labelSlot: 'bottom-left', orbitDrift: 2 },
  { id: 'verify', title: 'Verify', subtitle: 'Check contracts', icon: <CheckCircle className="h-4 w-4 text-green-200" />, ring: 'outer', angle: 285, radius: 188, labelSlot: 'bottom-right', orbitDrift: 2 },
  { id: 'hardware', title: 'Hardware', subtitle: 'Cold storage', icon: <HardDrive className="h-4 w-4 text-blue-200" />, ring: 'inner', angle: 20, radius: 122, labelSlot: 'middle-right', orbitDrift: 2 },
];

export const provablyFairNodes: StoryOrbitNode[] = [
  { id: 'commit', title: 'Commit', subtitle: 'Hash locked first', icon: <Dice5 className="h-4 w-4 text-purple-200" />, ring: 'inner', angle: 300, radius: 122, labelSlot: 'top-left', orbitDrift: 2 },
  { id: 'mix', title: 'Mix', subtitle: 'Inputs combined', icon: <Shuffle className="h-4 w-4 text-cyan-200" />, ring: 'outer', angle: 35, radius: 188, labelSlot: 'top-right', orbitDrift: 2 },
  { id: 'reveal', title: 'Reveal', subtitle: 'Secret shown later', icon: <Eye className="h-4 w-4 text-green-200" />, ring: 'outer', angle: 165, radius: 188, labelSlot: 'middle-left', orbitDrift: 2 },
  { id: 'verify', title: 'Verify', subtitle: 'Recompute result', icon: <CheckCircle className="h-4 w-4 text-cyan-200" />, ring: 'inner', angle: 285, radius: 122, labelSlot: 'bottom-right', orbitDrift: 2 },
];

export const communityNodes: StoryOrbitNode[] = [
  { id: 'telegram', title: 'Telegram', subtitle: 'Fast updates', icon: <MessageCircle className="h-4 w-4 text-cyan-200" />, ring: 'outer', angle: 330, radius: 188, labelSlot: 'top-left', orbitDrift: 2 },
  { id: 'discord', title: 'Discord', subtitle: 'Builder channels', icon: <Users className="h-4 w-4 text-purple-200" />, ring: 'inner', angle: 50, radius: 122, labelSlot: 'top-right', orbitDrift: 2 },
  { id: 'x', title: 'X', subtitle: 'Public news', icon: <Hash className="h-4 w-4 text-white" />, ring: 'outer', angle: 150, radius: 188, labelSlot: 'middle-left', orbitDrift: 2 },
  { id: 'linkedin', title: 'LinkedIn', subtitle: 'Professional network', icon: <Linkedin className="h-4 w-4 text-blue-200" />, ring: 'inner', angle: 225, radius: 122, labelSlot: 'bottom-left', orbitDrift: 2 },
  { id: 'builders', title: 'Builders', subtitle: 'Ship and review', icon: <Code2 className="h-4 w-4 text-green-200" />, ring: 'outer', angle: 285, radius: 188, labelSlot: 'bottom-right', orbitDrift: 2 },
];

export const developerNodes: StoryOrbitNode[] = [
  { id: 'wagmi', title: 'wagmi', subtitle: 'React hooks', icon: <Code2 className="h-4 w-4 text-blue-200" />, ring: 'inner', angle: 315, radius: 122, labelSlot: 'top-left', orbitDrift: 2 },
  { id: 'viem', title: 'viem', subtitle: 'TS client', icon: <Database className="h-4 w-4 text-cyan-200" />, ring: 'outer', angle: 35, radius: 188, labelSlot: 'top-right', orbitDrift: 2 },
  { id: 'reown', title: 'Reown', subtitle: 'Wallet UI', icon: <WalletCards className="h-4 w-4 text-purple-200" />, ring: 'inner', angle: 25, radius: 122, labelSlot: 'middle-right', orbitDrift: 2 },
  { id: 'polygon', title: 'Polygon', subtitle: 'Deploy on POL', icon: <Boxes className="h-4 w-4 text-pink-200" />, ring: 'outer', angle: 210, radius: 188, labelSlot: 'bottom-left', orbitDrift: 2 },
  { id: 'token-list', title: 'Token List', subtitle: 'Metadata', icon: <FileText className="h-4 w-4 text-green-200" />, ring: 'inner', angle: 285, radius: 122, labelSlot: 'bottom-right', orbitDrift: 2 },
];
