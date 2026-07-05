'use client';

import { motion } from 'framer-motion';
import { Code, Terminal, FileCode, Globe, Layers, Wallet, ArrowRight, ExternalLink } from 'lucide-react';

const tools = [
  { icon: Code, name: 'VERSE SDK', desc: 'JavaScript/TypeScript SDK for building dApps on VERSE ecosystem' },
  { icon: Terminal, name: 'CLI Tools', desc: 'Command-line tools for deploying and managing smart contracts' },
  { icon: FileCode, name: 'Smart Contracts', desc: 'Pre-audited contract templates for DeFi, NFTs, and DAOs' },
  { icon: Globe, name: 'API Gateway', desc: 'RESTful APIs for accessing VERSE network data and analytics' },
  { icon: Layers, name: 'Component Library', desc: 'React components for Web3 UI — wallet connect, token display, swaps' },
  { icon: Wallet, name: 'Wallet Integration', desc: 'MetaMask, WalletConnect, and Coinbase Wallet support out of the box' },
];

export default function Build() {
  return (
    <section id="build" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-[600px] md:h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Build on <span className="gradient-text">VERSE</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Powerful tools and infrastructure to bring your Web3 ideas to life</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
          {tools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }} className="group">
              <div className="glass p-5 md:p-8 rounded-xl md:rounded-2xl h-full hover:border-green-500/30 transition-all duration-300">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{tool.name}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4">{tool.desc}</p>
                <a href="https://github.com/ryuken25/verse" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors text-sm">
                  <span>View docs</span><ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <a href="https://github.com/ryuken25/verse" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all active:scale-95">
            <span>Start Building</span><ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
