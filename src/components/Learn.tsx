'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react';

const courses = [
  { slug: 'crypto-basics', title: 'Crypto Basics', desc: 'Learn Bitcoin, Ethereum, and blockchain fundamentals.', duration: '6 weeks', level: 'Beginner', students: '10K+', rating: 4.8, color: 'from-purple-500 to-indigo-500', topics: ['Blockchain', 'Bitcoin', 'Ethereum', 'Wallets'] },
  { slug: 'bitcoin-deep-dive', title: 'Bitcoin Deep Dive', desc: 'UTXO, mining, halving, Lightning Network, self-custody.', duration: '4 weeks', level: 'Intermediate', students: '5K+', rating: 4.7, color: 'from-orange-500 to-yellow-500', topics: ['UTXO', 'Mining', 'Lightning', 'Self-custody'] },
  { slug: 'ethereum-evm', title: 'Ethereum & EVM', desc: 'Smart contracts, ERC-20/721, gas, Layer 2, Polygon.', duration: '6 weeks', level: 'Intermediate', students: '4K+', rating: 4.8, color: 'from-blue-500 to-cyan-500', topics: ['EVM', 'Smart Contracts', 'Polygon', 'L2'] },
  { slug: 'defi-basics', title: 'DeFi Basics', desc: 'DEX, AMM, lending, stablecoins, impermanent loss.', duration: '5 weeks', level: 'Intermediate', students: '6K+', rating: 4.6, color: 'from-green-500 to-emerald-500', topics: ['DEX', 'AMM', 'Lending', 'Stablecoins'] },
  { slug: 'wallet-security', title: 'Wallet Security', desc: 'Seed phrases, hardware wallets, phishing defense.', duration: '3 weeks', level: 'Beginner', students: '8K+', rating: 4.9, color: 'from-pink-500 to-rose-500', topics: ['Seed Phrase', 'Hardware', 'Phishing', 'Approvals'] },
  { slug: 'build-web3', title: 'Build Web3', desc: 'Connect wallet, read/write contracts, deploy dApps.', duration: '8 weeks', level: 'Advanced', students: '3K+', rating: 4.9, color: 'from-violet-500 to-purple-500', topics: ['wagmi', 'Solidity', 'Deploy', 'dApp UX'] },
];

const benefits = ['All learning materials are 100% free', 'Wallet only for quizzes & certificates', 'Real-world examples and practical exercises', 'Source links to Bitcoin.com, Ethereum.org, and more'];

export default function Learn() {
  const goToCourse = (slug: string) => {
    window.location.href = `/academy#${slug}`;
  };

  return (
    <section id="learn" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" /><span className="text-xs md:text-sm text-gray-300">6 Courses • 100% Free</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Learn & <span className="gradient-text">Earn</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-2">Master Web3 from zero to hero</p>
          <p className="text-xs text-gray-500 max-w-xl mx-auto">All learning materials are free. Wallet connection is only required for quizzes, certificates, and rewards.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
          {courses.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }} className="group">
              <div className="glass p-5 md:p-8 rounded-xl md:rounded-2xl h-full hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${c.color} flex items-center justify-center`}>
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">{c.level}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4">{c.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.topics.map((t, j) => (
                    <span key={j} className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500 mb-4">
                  <span className="flex items-center"><Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />{c.duration}</span>
                  <span className="flex items-center"><Users className="w-3 h-3 md:w-4 md:h-4 mr-1" />{c.students}</span>
                  <span className="flex items-center"><Star className="w-3 h-3 md:w-4 md:h-4 mr-1 text-yellow-400" />{c.rating}</span>
                </div>
                <button type="button" onClick={() => goToCourse(c.slug)}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm font-medium flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all active:scale-95">
                  <span>Learn Free</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 md:p-12 rounded-2xl md:rounded-3xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">Why Learn with VERSE?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-2 md:space-x-3">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-300">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
