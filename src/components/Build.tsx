'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ArrowLeftRight, Droplets, Sprout, Lock, BarChart3, FileText } from 'lucide-react';

const tools = [
  { icon: ArrowLeftRight, name: 'Verse DEX Swap', desc: 'Swap tokens on the VERSE decentralized exchange', url: 'https://verse.bitcoin.com/swap/' },
  { icon: Droplets, name: 'Liquidity Pools', desc: 'Provide liquidity and earn fees on VERSE pools', url: 'https://verse.bitcoin.com/pools/' },
  { icon: Sprout, name: 'VERSE Farms', desc: 'Stake LP tokens and earn VERSE rewards', url: 'https://verse.bitcoin.com/farms/' },
  { icon: Lock, name: 'VERSE Staking', desc: 'Stake VERSE tokens and earn yield', url: 'https://verse.bitcoin.com/staking/' },
  { icon: BarChart3, name: 'Analytics', desc: 'Track TVL, volume, and protocol metrics', url: 'https://analytics.verse.bitcoin.com/' },
  { icon: FileText, name: 'Whitepaper', desc: 'Read the VERSE whitepaper and tokenomics', url: 'https://www.getverse.com/verse-whitepaper.pdf' },
];

export default function Build() {
  return (
    <section id="build" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-[600px] md:h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Build on <span className="gradient-text">VERSE</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Explore the VERSE ecosystem — swap, stake, farm, and build</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
          {tools.map((tool, i) => (
            <motion.a key={i} href={tool.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }} className="group block">
              <div className="glass p-5 md:p-8 rounded-xl md:rounded-2xl h-full hover:border-green-500/30 transition-all duration-300">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{tool.name}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4">{tool.desc}</p>
                <div className="flex items-center text-green-400 text-sm group-hover:text-green-300 transition-colors">
                  <span>Open</span><ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional links */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 md:p-8 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4 text-center">VERSE Ecosystem</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'VERSE Token', url: 'https://www.getverse.com/' },
              { name: 'Security Audits', url: 'https://verse.bitcoin.com/audits/' },
              { name: 'Bitcoin.com Wallet', url: 'https://wallet.bitcoin.com/' },
              { name: 'VERSE Wallet', url: 'https://wallet.bitcoin.com/verse/' },
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
                <span className="text-sm text-gray-300 hover:text-white">{link.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
