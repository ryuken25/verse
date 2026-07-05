'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Terminal, FileCode, Zap, Copy, Check, ChevronRight, ExternalLink } from 'lucide-react';

const sections = [
  { id: 'install', title: 'Installation', icon: Terminal },
  { id: 'quickstart', title: 'Quick Start', icon: Zap },
  { id: 'contracts', title: 'Smart Contracts', icon: FileCode },
  { id: 'api', title: 'API Reference', icon: Code },
];

const codeExamples = {
  install: { lang: 'bash', code: `# Install the VERSE SDK
npm install @verse/sdk

# Or with yarn
yarn add @verse/sdk

# Install Web3 dependencies
npm install wagmi viem @tanstack/react-query` },
  quickstart: { lang: 'typescript', code: `import { VerseSDK } from '@verse/sdk';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

// Initialize the SDK
const verse = new VerseSDK({
  chainId: 137, // Polygon
  rpcUrl: 'https://polygon-rpc.com',
});

// Connect wallet
const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

// Get VERSE token balance
const balance = await verse.getBalance(address);
console.log(\`VERSE Balance: \${balance}\`);

// Swap tokens
const tx = await verse.swap({
  from: '0x0000000000000000000000000000000000000000', // ETH
  to: '0x249cA82617eC3DfBD2519fA9e9C2F2F7F5C0F1A0',   // VERSE
  amount: '1000000000000000000', // 1 ETH in wei
  slippage: 0.5,
});

console.log(\`Swap TX: \${tx.hash}\`);` },
  contracts: { lang: 'solidity', code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@verse/sdk/contracts/VerseBase.sol";

contract MyDApp is VerseBase {
    mapping(address => uint256) public stakes;
    
    event Staked(address indexed user, uint256 amount);
    
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(verseToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        stakes[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }
    
    function unstake() external {
        uint256 amount = stakes[msg.sender];
        require(amount > 0, "Nothing staked");
        
        stakes[msg.sender] = 0;
        verseToken.transfer(msg.sender, amount);
    }
}` },
  api: { lang: 'typescript', code: `// VERSE SDK API Reference

// Token Operations
await verse.getBalance(address: string): Promise<bigint>
await verse.transfer(to: string, amount: bigint): Promise<TransactionHash>
await verse.approve(spender: string, amount: bigint): Promise<TransactionHash>

// Swap Operations  
await verse.swap(params: SwapParams): Promise<SwapResult>
await verse.getQuote(from: string, to: string, amount: bigint): Promise<Quote>
await verse.getSlippage(): Promise<number>

// Staking Operations
await verse.stake(amount: bigint): Promise<TransactionHash>
await verse.unstake(): Promise<TransactionHash>
await verse.getStakeInfo(address: string): Promise<StakeInfo>

// Event Operations
await verse.getEvents(params: EventParams): Promise<Event[]>
await verse.registerEvent(eventId: string): Promise<TransactionHash>
await verse.attendEvent(eventId: string): Promise<TransactionHash>

// Academy Operations
await verse.getCourses(): Promise<Course[]>
await verse.enrollCourse(courseId: string): Promise<TransactionHash>
await verse.getCertificate(courseId: string): Promise<NFTMetadata>` },
};

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1130] rounded-t-xl border-b border-white/5">
        <span className="text-xs text-gray-500">{lang}</span>
        <button type="button" onClick={copy} className="flex items-center space-x-1 text-xs text-gray-500 hover:text-white transition-colors">
          {copied ? <><Check className="w-3 h-3 text-green-400" /><span className="text-green-400">Copied!</span></> :
           <><Copy className="w-3 h-3" /><span>Copy</span></>}
        </button>
      </div>
      <pre className="p-4 bg-[#0a0e27] rounded-b-xl overflow-x-auto">
        <code className="text-xs md:text-sm text-gray-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

export default function DocsSection() {
  const [active, setActive] = useState('install');

  return (
    <section id="docs-section" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 right-0 w-48 h-48 md:w-96 md:h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Developer <span className="gradient-text">Docs</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Everything you need to build on VERSE — from installation to deployment</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <div className="glass p-4 rounded-xl sticky top-24">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">Getting Started</h3>
              {sections.map(s => (
                <button type="button" key={s.id} onClick={() => setActive(s.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                    active === s.id ? 'text-white bg-purple-600/20 border border-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}>
                  <s.icon className="w-4 h-4" /><span>{s.title}</span>
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-purple-400 text-sm hover:text-purple-300 transition-colors">
                  <span>Full Documentation</span><ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center space-x-2 px-3 py-2 text-purple-400 text-sm hover:text-purple-300 transition-colors">
                  <span>GitHub Repository</span><ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Code panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <div className="glass p-4 md:p-6 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                {sections.find(s => s.id === active)?.icon && (() => {
                  const Icon = sections.find(s => s.id === active)!.icon;
                  return <Icon className="w-5 h-5 text-purple-400" />;
                })()}
                <h3 className="text-lg font-semibold text-white">{sections.find(s => s.id === active)?.title}</h3>
              </div>
              <CodeBlock code={codeExamples[active as keyof typeof codeExamples].code} lang={codeExamples[active as keyof typeof codeExamples].lang} />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">VERSE SDK v1.0.0 • MIT License</p>
                <button type="button" onClick={() => {
                  const idx = sections.findIndex(s => s.id === active);
                  if (idx < sections.length - 1) setActive(sections[idx + 1].id);
                }} className="flex items-center space-x-1 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  <span>Next: {sections[sections.findIndex(s => s.id === active) + 1]?.title || 'Done'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
