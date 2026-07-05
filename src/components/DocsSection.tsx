'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Copy, Check, ChevronRight, ExternalLink } from 'lucide-react';

const sections = [
  { id: 'wagmi', title: 'wagmi Setup', icon: Code },
  { id: 'polygon', title: 'Polygon Config', icon: Terminal },
  { id: 'verse-token', title: 'VERSE Token', icon: Code },
  { id: 'wallet', title: 'Wallet Connect', icon: Terminal },
];

const codeExamples: Record<string, { lang: string; code: string; title: string }> = {
  wagmi: {
    lang: 'typescript',
    title: 'wagmi + Reown AppKit Setup',
    code: `// Install: npm install wagmi viem @tanstack/react-query @reown/appkit @reown/appkit-adapter-wagmi

import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { polygon } from '@reown/appkit/networks'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

const wagmiAdapter = new WagmiAdapter({
  networks: [polygon],
  projectId,
})

const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [polygon],
  projectId,
  metadata: {
    name: 'VERSE DApp',
    description: 'Build with VERSE on Polygon',
    url: 'https://your-app.com',
  },
})`,
  },
  polygon: {
    lang: 'typescript',
    title: 'Polygon Chain Config (viem)',
    code: `import { defineChain } from 'viem'

export const polygon = defineChain({
  id: 137,
  name: 'Polygon',
  nativeCurrency: {
    name: 'POL',
    symbol: 'POL',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://polygon-rpc.com', 'https://rpc.ankr.com/polygon'],
    },
  },
  blockExplorers: {
    default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
  },
})`,
  },
  'verse-token': {
    lang: 'typescript',
    title: 'Read VERSE Token Balance',
    code: `import { useReadContract } from 'wagmi'
import { formatUnits } from 'viem'

// VERSE token on Polygon
// Contract: see https://support.bitcoin.com/en/articles/8692423
const VERSE_ADDRESS = '0xc708d6f2153933daa50b2E0D48d8947702f1a04e'

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

export function useVerseBalance(address?: string) {
  return useReadContract({
    address: VERSE_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: 137,
  })
}

// Usage:
// const { data: balance } = useVerseBalance(userAddress)
// console.log(formatUnits(balance ?? 0n, 18))`,
  },
  wallet: {
    lang: 'typescript',
    title: 'Connect Wallet with wagmi',
    code: `import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { polygon } from './chains'

function WalletButton() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  if (isConnected) {
    return (
      <div>
        <p>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
        <p>Network: {chain?.name}</p>
        {chain?.id !== 137 && (
          <button onClick={() => switchChain({ chainId: polygon.id })}>
            Switch to Polygon
          </button>
        )}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  )
}`,
  },
};

const verifiedLinks = [
  { name: 'VERSE DEX', url: 'https://verse.bitcoin.com/' },
  { name: 'VERSE FAQ', url: 'https://support.bitcoin.com/en/articles/6799142-verse-frequently-asked-questions-faq' },
  { name: 'Bridge VERSE to Polygon', url: 'https://support.bitcoin.com/en/articles/8692423-how-to-bridge-verse-to-polygon' },
  { name: 'Security Audits', url: 'https://verse.bitcoin.com/audits/' },
  { name: 'Polygon Docs', url: 'https://docs.polygon.technology/' },
  { name: 'POL Token Docs', url: 'https://docs.polygon.technology/pos/concepts/tokens/pol' },
  { name: 'wagmi Guide', url: 'https://wagmi.sh/react/guides/connect-wallet' },
  { name: 'Reown AppKit', url: 'https://docs.reown.com/appkit/next/core/installation' },
  { name: 'EIP-6963', url: 'https://eips.ethereum.org/EIPS/eip-6963' },
  { name: 'Bitcoin.com Charts API', url: 'https://charts.bitcoin.com/api.html' },
  { name: 'VERSE Token List', url: 'https://github.com/bitcoin-portal/verse-dex-tokens' },
];

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1130] rounded-t-xl border-b border-white/5">
        <span className="text-xs text-gray-500">{lang}</span>
        <button type="button" onClick={copy} className="flex items-center space-x-1 text-xs text-gray-500 hover:text-white transition-colors">
          {copied ? <><Check className="w-3 h-3 text-green-400" /><span className="text-green-400">Copied!</span></> : <><Copy className="w-3 h-3" /><span>Copy</span></>}
        </button>
      </div>
      <pre className="p-4 bg-[#0a0e27] rounded-b-xl overflow-x-auto"><code className="text-xs md:text-sm text-gray-300 font-mono whitespace-pre">{code}</code></pre>
    </div>
  );
}

export default function DocsSection() {
  const [active, setActive] = useState('wagmi');

  return (
    <section id="docs-section" className="relative py-20 md:py-32 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Build with <span className="gradient-text">VERSE + Polygon</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Real integration examples using wagmi, viem, and Reown AppKit</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <div className="glass p-4 rounded-xl sticky top-24">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">Code Examples</h3>
              {sections.map(s => (
                <button key={s.id} type="button" onClick={() => setActive(s.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${
                    active === s.id ? 'text-white bg-purple-600/20 border border-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}>
                  <s.icon className="w-4 h-4" /><span>{s.title}</span>
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-semibold text-gray-500 mb-2 px-2">Verified Resources</h4>
                {verifiedLinks.slice(0, 6).map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-1.5 text-xs text-purple-400 hover:text-purple-300">
                    <span>{l.name}</span><ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Code panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <div className="glass p-4 md:p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">{codeExamples[active].title}</h3>
              <CodeBlock code={codeExamples[active].code} lang={codeExamples[active].lang} />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">VERSE + Polygon integration examples</p>
                <button type="button" onClick={() => {
                  const idx = sections.findIndex(s => s.id === active);
                  if (idx < sections.length - 1) setActive(sections[idx + 1].id);
                }} className="flex items-center space-x-1 text-sm text-purple-400 hover:text-purple-300">
                  <span>Next</span><ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* All verified links */}
            <div className="glass p-6 rounded-xl mt-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Verified Documentation & Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {verifiedLinks.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <ExternalLink className="w-3 h-3 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{l.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
