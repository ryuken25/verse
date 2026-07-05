'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  BookOpen,
  Code2,
  Zap,
  Server,
  Shield,
  Blocks,
  Globe,
  Copy,
  Check,
  ChevronRight,
  Menu,
  X,
  Search,
  Terminal,
  FileCode,
  Wallet,
  Link,
  Layers
} from 'lucide-react';

const sections = [
  { id: 'getting-started', label: 'Getting Started', icon: Zap },
  { id: 'installation', label: 'Installation', icon: Terminal },
  { id: 'quick-start', label: 'Quick Start', icon: Code2 },
  { id: 'api-reference', label: 'API Reference', icon: Server },
  { id: 'sdk-methods', label: 'SDK Methods', icon: FileCode },
  { id: 'smart-contracts', label: 'Smart Contracts', icon: Blocks },
  { id: 'web3-integration', label: 'Web3 Integration', icon: Globe },
  { id: 'examples', label: 'Examples', icon: BookOpen },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1230] border border-white/10 rounded-t-xl">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="bg-[#0a0e27] border border-t-0 border-white/10 rounded-b-xl p-4 overflow-x-auto">
        <code className="text-sm font-mono text-emerald-300 leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 flex gap-8">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-violet-600 p-3 rounded-full shadow-lg shadow-violet-500/30"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-24 left-0 z-40 lg:z-auto h-[calc(100vh-6rem)] w-72 shrink-0 bg-[#0d1230]/95 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Documentation
          </div>

          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-violet-500/20 text-violet-300 border-l-2 border-violet-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{section.label}</span>
                  {activeSection === section.id && (
                    <ChevronRight size={14} className="ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-xl border border-violet-500/20">
            <div className="text-sm font-semibold text-violet-300 mb-1">Need Help?</div>
            <p className="text-xs text-gray-400 mb-3">Join the VERSE developer community on Discord.</p>
            <button className="w-full py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs font-medium transition-colors">
              Join Discord
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 lg:pl-4">
          {/* Getting Started */}
          <motion.section
            id="getting-started"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <Zap size={20} className="text-violet-400" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Getting Started
              </h1>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Welcome to the VERSE SDK</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The VERSE SDK provides a comprehensive toolkit for building decentralized applications (dApps) 
                on the VERSE blockchain ecosystem. Whether you're creating DeFi protocols, NFT marketplaces, 
                DAO governance systems, or cross-chain bridges, our SDK offers type-safe, production-ready 
                utilities that abstract away blockchain complexity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Shield, title: 'Type-Safe', desc: 'Full TypeScript support with comprehensive type definitions' },
                  { icon: Zap, title: 'High Performance', desc: 'Optimized RPC calls with built-in caching and batching' },
                  { icon: Layers, title: 'Modular', desc: 'Use only what you need — tree-shakable module architecture' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <Icon size={20} className="text-violet-400 mb-2" />
                      <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-amber-300 mb-1">Prerequisites</div>
                  <p className="text-xs text-gray-300">
                    Node.js v18+, npm or yarn, and basic knowledge of TypeScript/JavaScript. 
                    Familiarity with blockchain concepts (wallets, transactions, smart contracts) is recommended.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Installation */}
          <motion.section
            id="installation"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <Terminal size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Installation</h2>
            </div>

            <p className="text-gray-300 mb-4">
              Install the VERSE SDK and its peer dependencies using your preferred package manager:
            </p>

            <CodeBlock
              language="npm"
              code={`# Using npm
npm install @verse/sdk @verse/core @verse/wallet

# Using yarn
yarn add @verse/sdk @verse/core @verse/wallet

# Using pnpm
pnpm add @verse/sdk @verse/core @verse/wallet`}
            />

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Package Overview</h3>
              <div className="space-y-3">
                {[
                  { pkg: '@verse/sdk', desc: 'Core SDK — wallet connection, transaction building, contract interaction' },
                  { pkg: '@verse/core', desc: 'Low-level primitives — RPC client, encoding/decoding, ABI utilities' },
                  { pkg: '@verse/wallet', desc: 'Wallet adapters — MetaMask, WalletConnect, Coinbase Wallet, Ledger' },
                  { pkg: '@verse/defi', desc: 'DeFi utilities — AMM math, liquidity helpers, price oracles (optional)' },
                  { pkg: '@verse/nft', desc: 'NFT tools — metadata, minting, marketplace integration (optional)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <code className="text-emerald-400 text-sm font-mono shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {item.pkg}
                    </code>
                    <span className="text-sm text-gray-300">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Quick Start */}
          <motion.section
            id="quick-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <Code2 size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Quick Start</h2>
            </div>

            <p className="text-gray-300 mb-4">
              Get up and running with a minimal example that connects a wallet and reads on-chain data:
            </p>

            <CodeBlock
              language="typescript"
              code={`import { VerseClient } from '@verse/sdk';
import { MetaMaskAdapter } from '@verse/wallet';

// Initialize the client with your preferred network
const verse = new VerseClient({
  network: 'mainnet', // or 'testnet', 'devnet'
  rpcUrl: 'https://rpc.verse.network/v1',
  chainId: 1337,
});

// Connect wallet
const wallet = new MetaMaskAdapter();
const account = await verse.connect(wallet);

console.log('Connected:', account.address);
console.log('Balance:', await verse.getBalance(account.address));

// Read a smart contract
const contract = verse.contract('0x1234...abcd', ERC20_ABI);
const name = await contract.read.name();
const balance = await contract.read.balanceOf(account.address);

console.log(\`\${name} balance: \${balance}\`);`}
            />

            <div className="mt-6 p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Check size={16} className="text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">That's it!</span>
              </div>
              <p className="text-sm text-gray-300">
                You now have a connected wallet reading on-chain state. The SDK handles RPC 
                connection pooling, automatic retries, and response caching out of the box.
              </p>
            </div>
          </motion.section>

          {/* API Reference */}
          <motion.section
            id="api-reference"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <Server size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">API Reference</h2>
            </div>

            <p className="text-gray-300 mb-6">
              The VERSE client exposes a clean, Promise-based API for all blockchain interactions.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-6">
              <div className="px-5 py-3 bg-white/5 border-b border-white/10">
                <h3 className="text-sm font-semibold text-violet-300">VerseClient Configuration</h3>
              </div>
              <div className="p-5">
                <CodeBlock
                  language="typescript"
                  code={`interface VerseConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  rpcUrl: string;
  chainId: number;
  timeout?: number;        // RPC timeout in ms (default: 30000)
  retries?: number;        // Auto-retry count (default: 3)
  cache?: boolean;         // Enable response caching (default: true)
  cacheTTL?: number;       // Cache TTL in ms (default: 5000)
  gasBuffer?: number;      // Gas estimate buffer % (default: 20)
  logger?: Logger;         // Custom logger instance
}`}
                />
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  method: 'verse.connect(wallet)',
                  returns: 'Promise<Account>',
                  desc: 'Connect a wallet adapter and return the connected account with address, chain, and signing capabilities.',
                },
                {
                  method: 'verse.getBalance(address)',
                  returns: 'Promise<bigint>',
                  desc: 'Fetch the native token balance for an address. Results are cached for 5 seconds by default.',
                },
                {
                  method: 'verse.sendTransaction(tx)',
                  returns: 'Promise<TransactionReceipt>',
                  desc: 'Build, sign, and broadcast a transaction. Automatically estimates gas and applies the configured buffer.',
                },
                {
                  method: 'verse.contract(address, abi)',
                  returns: 'ContractInstance',
                  desc: 'Create a typed contract instance for reading state and sending transactions.',
                },
                {
                  method: 'verse.subscribe(event, callback)',
                  returns: 'Unsubscribe',
                  desc: 'Subscribe to real-time blockchain events via WebSocket subscription.',
                },
              ].map((api, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <code className="text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2 py-0.5 rounded">
                      {api.method}
                    </code>
                    <span className="text-xs text-gray-500">→</span>
                    <code className="text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-0.5 rounded">
                      {api.returns}
                    </code>
                  </div>
                  <p className="text-sm text-gray-400">{api.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SDK Methods */}
          <motion.section
            id="sdk-methods"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <FileCode size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">SDK Methods</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Deep dive into the core methods available across the SDK's module system.
            </p>

            <div className="space-y-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Wallet size={18} className="text-violet-400" />
                  Wallet Management
                </h3>
                <CodeBlock
                  language="typescript"
                  code={`// Get all available wallet adapters
const wallets = verse.getAvailableWallets();

// Switch accounts
await verse.switchAccount();

// Listen for account changes
verse.on('accountsChanged', (accounts) => {
  console.log('New account:', accounts[0]);
});

// Listen for chain changes
verse.on('chainChanged', (chainId) => {
  console.log('Chain switched to:', chainId);
  window.location.reload(); // recommended
});

// Disconnect
await verse.disconnect();`}
                />
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Server size={18} className="text-violet-400" />
                  Transaction Utilities
                </h3>
                <CodeBlock
                  language="typescript"
                  code={`// Estimate gas before sending
const gasEstimate = await verse.estimateGas({
  to: '0xRecipient...',
  value: verse.parseEther('1.0'),
  data: '0x...',
});

// Send with custom gas settings
const receipt = await verse.sendTransaction({
  to: '0xRecipient...',
  value: verse.parseEther('1.0'),
  gasLimit: gasEstimate * 120n / 100n, // 20% buffer
  maxFeePerGas: verse.parseGwei('30'),
});

// Wait for confirmation with custom timeout
const confirmed = await receipt.wait(2); // 2 confirmations
console.log('Block:', confirmed.blockNumber);`}
                />
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Link size={18} className="text-violet-400" />
                  Event Subscriptions
                </h3>
                <CodeBlock
                  language="typescript"
                  code={`// Subscribe to contract events
const unsub = contract.events.Transfer(
  { from: myAddress }, // filter
  (event) => {
    console.log('Transfer:', {
      from: event.args.from,
      to: event.args.to,
      amount: event.args.value,
      txHash: event.transactionHash,
    });
  }
);

// Subscribe to pending transactions
verse.on('pending', (txHash) => {
  console.log('Pending tx:', txHash);
});

// Cleanup
unsub();`}
                />
              </div>
            </div>
          </motion.section>

          {/* Smart Contracts */}
          <motion.section
            id="smart-contracts"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <Blocks size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Smart Contracts</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Interact with smart contracts using type-safe, ABI-aware wrappers. The SDK supports
              Solidity-style ABIs and generates fully typed interfaces from them.
            </p>

            <CodeBlock
              language="solidity"
              code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@verse/contracts/token/ERC20.sol";
import "@verse/contracts/access/Ownable.sol";

/// @title VerseToken - Example ERC-20 token on VERSE
/// @notice Demonstrates a standard token with mint/burn functionality
contract VerseToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 1e18;
    mapping(address => bool) public minters;

    event MinterUpdated(address indexed minter, bool status);

    constructor() ERC20("Verse Token", "VERSE") Ownable(msg.sender) {
        _mint(msg.sender, 100_000_000 * 1e18); // 10% initial supply
    }

    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
        emit MinterUpdated(minter, true);
    }

    function mint(address to, uint256 amount) external {
        require(minters[msg.sender], "Not authorized");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}`}
            />

            <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Deploying with the SDK</h3>
              <CodeBlock
                language="typescript"
                code={`import { VerseDeployer } from '@verse/sdk';
import VerseTokenArtifact from './artifacts/VerseToken.json';

const deployer = new VerseDeployer(verse);

// Deploy with constructor arguments
const token = await deployer.deploy({
  abi: VerseTokenArtifact.abi,
  bytecode: VerseTokenArtifact.bytecode,
  args: [], // No constructor args for this contract
  gasLimit: 3_000_000n,
});

console.log('Deployed at:', token.address);
console.log('Tx hash:', token.deploymentTransaction.hash);

// Verify on block explorer
await deployer.verify(token.address, {
  contract: 'contracts/VerseToken.sol:VerseToken',
  constructorArgs: [],
});`}
              />
            </div>
          </motion.section>

          {/* Web3 Integration */}
          <motion.section
            id="web3-integration"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <Globe size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Web3 Integration</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Build production-grade dApps with the VERSE SDK's React hooks and provider pattern.
              Full support for server-side rendering (SSR) and static site generation (SSG).
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Provider Setup (React/Next.js)</h3>
              <CodeBlock
                language="tsx"
                code={`// app/providers.tsx
'use client';

import { VerseProvider, type VerseConfig } from '@verse/react';

const config: VerseConfig = {
  network: 'mainnet',
  rpcUrl: process.env.NEXT_PUBLIC_VERSE_RPC!,
  chainId: 1337,
  autoConnect: true,
  connectors: ['metamask', 'walletconnect', 'coinbase'],
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <VerseProvider config={config}>
      {children}
    </VerseProvider>
  );
}`}
              />
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">React Hooks</h3>
              <CodeBlock
                language="tsx"
                code={`'use client';

import { 
  useVerse, 
  useAccount, 
  useBalance, 
  useContractRead,
  useContractWrite 
} from '@verse/react';

export function Dashboard() {
  const { connect, disconnect, isConnected } = useVerse();
  const { address } = useAccount();
  const { data: balance } = useBalance(address);

  // Read contract state with automatic refetching
  const { data: tokenBalance } = useContractRead({
    address: '0xToken...',
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address!],
    enabled: !!address,
    refetchInterval: 10_000, // Poll every 10s
  });

  // Write to contract with optimistic updates
  const { write: transfer, isLoading } = useContractWrite({
    address: '0xToken...',
    abi: ERC20_ABI,
    functionName: 'transfer',
    onSuccess: (receipt) => {
      console.log('Transfer confirmed:', receipt.hash);
    },
  });

  return (
    <div>
      {isConnected ? (
        <>
          <p>Address: {address}</p>
          <p>Balance: {balance?.formatted} {balance?.symbol}</p>
          <p>Token: {tokenBalance?.toString()}</p>
          <button onClick={() => transfer([recipient, amount])} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Tokens'}
          </button>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-violet-300 mb-2">Supported Wallets</h4>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><Wallet size={14} /> MetaMask</li>
                  <li className="flex items-center gap-2"><Wallet size={14} /> WalletConnect v2</li>
                  <li className="flex items-center gap-2"><Wallet size={14} /> Coinbase Wallet</li>
                  <li className="flex items-center gap-2"><Wallet size={14} /> Ledger / Trezor</li>
                  <li className="flex items-center gap-2"><Wallet size={14} /> Injected (any EIP-1193)</li>
                </ul>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-violet-300 mb-2">Network Support</h4>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><Globe size={14} /> VERSE Mainnet (chainId: 1337)</li>
                  <li className="flex items-center gap-2"><Globe size={14} /> VERSE Testnet (chainId: 1338)</li>
                  <li className="flex items-center gap-2"><Globe size={14} /> Ethereum Mainnet</li>
                  <li className="flex items-center gap-2"><Globe size={14} /> Polygon, Arbitrum, Optimism</li>
                  <li className="flex items-center gap-2"><Globe size={14} /> Custom EVM chains</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Examples */}
          <motion.section
            id="examples"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-lg border border-violet-500/30">
                <BookOpen size={20} className="text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Examples</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Complete, copy-paste examples for common dApp patterns.
            </p>

            <div className="space-y-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Token Swap (AMM)</h3>
                <CodeBlock
                  language="typescript"
                  code={`import { VerseClient, parseEther, formatEther } from '@verse/sdk';
import { VerseRouter } from '@verse/defi';

const verse = new VerseClient({ network: 'mainnet', chainId: 1337 });
const router = new VerseRouter(verse);

// Get a quote for swapping 1 VERSE → USDC
const quote = await router.getQuote({
  tokenIn: '0xVERSE...',
  tokenOut: '0xUSDC...',
  amountIn: parseEther('100'),
  slippage: 0.5, // 0.5% max slippage
});

console.log('Expected output:', formatEther(quote.amountOut));
console.log('Price impact:', quote.priceImpact, '%');
console.log('Route:', quote.path.map(t => t.symbol).join(' → '));

// Execute the swap
const tx = await router.swap({
  tokenIn: '0xVERSE...',
  tokenOut: '0xUSDC...',
  amountIn: parseEther('100'),
  amountOutMin: quote.amountOutMin,
  deadline: Math.floor(Date.now() / 1000) + 1200, // 20 min
  recipient: account.address,
});

const receipt = await tx.wait();
console.log('Swapped! Tx:', receipt.hash);`}
                />
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">NFT Minting</h3>
                <CodeBlock
                  language="typescript"
                  code={`import { VerseClient } from '@verse/sdk';
import { NFTCollection } from '@verse/nft';

const verse = new VerseClient({ network: 'mainnet', chainId: 1337 });
const collection = new NFTCollection(verse, '0xNFT...');

// Mint a single NFT
const mintTx = await collection.mint({
  to: account.address,
  tokenURI: 'ipfs://QmHash.../metadata.json',
});

await mintTx.wait();
console.log('Minted!');

// Batch mint (up to 20 at once)
const batchTx = await collection.batchMint({
  to: account.address,
  tokenURIs: [
    'ipfs://QmHash1.../metadata.json',
    'ipfs://QmHash2.../metadata.json',
    'ipfs://QmHash3.../metadata.json',
  ],
});

await batchTx.wait();
console.log('Batch minted 3 NFTs!');

// Fetch owned NFTs
const nfts = await collection.tokensOf(account.address);
nfts.forEach(nft => {
  console.log(\`Token #\${nft.tokenId}: \${nft.metadata.name}\`);
});`}
                />
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-3">Multi-Sig Wallet</h3>
                <CodeBlock
                  language="typescript"
                  code={`import { VerseClient } from '@verse/sdk';
import { MultiSigWallet } from '@verse/dao';

const verse = new VerseClient({ network: 'mainnet', chainId: 1337 });
const multisig = new MultiSigWallet(verse, '0xMultiSig...');

// Propose a transaction
const proposal = await multisig.propose({
  to: '0xTreasury...',
  value: parseEther('1000'),
  data: '0x', // simple transfer
  description: 'Q3 developer grants disbursement',
});

console.log('Proposal ID:', proposal.id);
console.log('Required confirmations:', proposal.threshold);

// Confirm a proposal (as a signer)
await multisig.confirm(proposal.id);

// Execute after threshold met
if (proposal.confirmations >= proposal.threshold) {
  const tx = await multisig.execute(proposal.id);
  await tx.wait();
  console.log('Executed!');
}`}
                />
              </div>
            </div>
          </motion.section>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Build?</h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Explore the full SDK reference, join the developer community, and start shipping
              decentralized applications on VERSE today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors">
                View on GitHub
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl font-medium transition-colors">
                Join Discord
              </button>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
