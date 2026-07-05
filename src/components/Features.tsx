'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';

import { GraduationCap, Wallet, CalendarDays, BarChart3, Layers, TrendingUp, Users, Lock, Cpu, ArrowRight, Shield, ExternalLink } from 'lucide-react';

const features = [
  { icon: GraduationCap, title: 'Web3 Academy', desc: '15+ courses on blockchain, DeFi, and crypto. Earn NFT certificates.', color: 'from-purple-500 to-indigo-500', tag: 'Learn', href: '/academy' },
  { icon: Wallet, title: 'VERSE Swap', desc: 'Token-gated DEX on Polygon. Swap tokens with low fees.', color: 'from-blue-500 to-cyan-500', tag: 'DeFi', href: 'https://verse.bitcoin.com/swap/' },
  { icon: CalendarDays, title: 'Events', desc: 'Conferences, workshops, and community events from Bitcoin.com.', color: 'from-green-500 to-emerald-500', tag: 'Events', href: '#events' },
  { icon: BarChart3, title: 'Market Data', desc: 'Live crypto prices and Bitcoin.com News.', color: 'from-yellow-500 to-orange-500', tag: 'Analytics', href: '#market' },
  { icon: Layers, title: 'Asset Hub', desc: 'Official logos, banners, templates, and social kits.', color: 'from-pink-500 to-rose-500', tag: 'Resources', href: 'https://verse.bitcoin.com/' },
  { icon: TrendingUp, title: 'Provably Fair', desc: 'Blockchain-verified fairness for gaming and rewards.', color: 'from-violet-500 to-purple-500', tag: 'Gaming', href: '#feature-provably-fair' },
  { icon: Users, title: 'Community Hub', desc: '50K+ builders worldwide. Telegram, Discord, X, LinkedIn.', color: 'from-teal-500 to-cyan-500', tag: 'Social', href: '#feature-community-hub' },
  { icon: Lock, title: 'Secure Wallet', desc: 'Non-custodial, multi-chain. Your keys, your crypto.', color: 'from-amber-500 to-yellow-500', tag: 'Security', href: '#feature-secure-wallet' },
  { icon: Cpu, title: 'Developer Tools', desc: 'Build dApps with wagmi, viem, Reown AppKit, Polygon.', color: 'from-red-500 to-pink-500', tag: 'Build', href: '#feature-developer-tools' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  const handleClick = useCallback((href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('/')) {
      window.location.href = href;
    } else if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <section id="features" className="relative py-20 md:py-32 overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
        <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Why Choose <span className="gradient-text">VERSE</span>?</h2>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">A complete ecosystem for Web3 education, DeFi, community, and innovation</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {features.map((f, i) => (
              <motion.div key={i} variants={cardVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2 }} className="group">
                <button type="button" onClick={() => handleClick(f.href)} className="text-left w-full glass p-5 md:p-8 rounded-xl md:rounded-2xl h-full hover:border-purple-500/30 transition-all duration-200 block relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <f.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <span className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{f.tag}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{f.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs md:text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-200" />
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Detail Panels */}
      <section id="feature-secure-wallet" className="relative py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-6 md:p-10 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center"><Lock className="w-5 h-5 text-white" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Secure Wallet</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              Your crypto, your keys. VERSE uses non-custodial wallets so you always control your funds. No third party can access your assets without your private key.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                'Non-custodial — you own your keys',
                'Seed phrase backup for recovery',
                'WalletConnect + browser extension support',
                'Beware of phishing and fake token approvals',
                'Always verify contract addresses before signing',
                'Use hardware wallets for large holdings',
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /><span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/academy#wallet-security" className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all">
                Learn Wallet Security
              </a>
              <a href="https://wallet.bitcoin.com/" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 glass rounded-lg text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center space-x-1">
                <span>Download Bitcoin.com Wallet</span><ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="feature-provably-fair" className="relative py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-6 md:p-10 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-white" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Provably Fair</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              Provably fair means the outcome of a game or reward distribution can be independently verified on the blockchain. No hidden manipulation.
            </p>
            <div className="glass p-4 rounded-xl mb-6">
              <p className="text-xs text-gray-500 mb-2 font-semibold">How it works:</p>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs">Commit</span>
                <span>→</span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-300 text-xs">Reveal</span>
                <span>→</span>
                <span className="px-2 py-1 bg-green-500/20 rounded text-green-300 text-xs">Verify</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/academy#how-blockchain-works" className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all">
                Learn Blockchain Verification
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="feature-community-hub" className="relative py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-6 md:p-10 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center"><Users className="w-5 h-5 text-white" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Community Hub</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              Join the Bitcoin.com and VERSE community. Connect with developers, traders, and builders worldwide.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { name: 'Telegram', url: 'https://t.me/GetVerse/1/' },
                { name: 'Discord', url: 'https://discord.com/invite/bitcoin-com/' },
                { name: 'X (Twitter)', url: 'https://x.com/bitcoincom/' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/bitcoin.com/' },
              ].map((ch, i) => (
                <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
                  <span className="text-sm text-gray-300">{ch.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="feature-developer-tools" className="relative py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-6 md:p-10 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center"><Cpu className="w-5 h-5 text-white" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Developer Tools</h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
              Build dApps on Polygon using standard EVM tools. No proprietary SDK required.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {[
                { name: 'wagmi', desc: 'React hooks for Ethereum', url: 'https://wagmi.sh/' },
                { name: 'viem', desc: 'TypeScript Ethereum library', url: 'https://viem.sh/' },
                { name: 'Reown AppKit', desc: 'WalletConnect modal/QR', url: 'https://docs.reown.com/' },
                { name: 'Polygon Docs', desc: 'Chain config & deployment', url: 'https://docs.polygon.technology/' },
              ].map((tool, i) => (
                <a key={i} href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div><p className="text-sm text-white font-medium">{tool.name}</p><p className="text-xs text-gray-500">{tool.desc}</p></div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              ))}
            </div>
            <a href="https://github.com/bitcoin-portal/verse-dex-tokens" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all">
              <span>VERSE Token List GitHub</span><ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
