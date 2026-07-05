'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ArrowRight, CheckCircle, Sparkles, Star, Wallet } from 'lucide-react';
import WalletModal from '@/components/wallet/WalletModal';
import { useAccount } from 'wagmi';

const courses = [
  { id: 'intro-crypto', title: 'Introduction to Crypto', desc: 'Learn Bitcoin, Ethereum, and blockchain fundamentals.', duration: '6 weeks', level: 'Beginner', students: '10K+', modules: 12, rating: 4.8, color: 'from-purple-500 to-indigo-500', topics: ['Blockchain', 'Bitcoin', 'Ethereum', 'Wallets'] },
  { id: 'defi-deep-dive', title: 'DeFi Deep Dive', desc: 'Master lending, borrowing, yield farming, and liquidity pools.', duration: '8 weeks', level: 'Intermediate', students: '5K+', modules: 12, rating: 4.7, color: 'from-blue-500 to-cyan-500', topics: ['DEXs', 'AMMs', 'Lending', 'Yield'] },
  { id: 'smart-contract-dev', title: 'Smart Contract Dev', desc: 'Build and deploy smart contracts on Ethereum using Solidity.', duration: '10 weeks', level: 'Advanced', students: '3K+', modules: 12, rating: 4.9, color: 'from-green-500 to-emerald-500', topics: ['Solidity', 'Security', 'Testing', 'Deploy'] },
  { id: 'trading-security', title: 'Trading & Security', desc: 'Learn trading strategies, portfolio management, and crypto security.', duration: '7 weeks', level: 'Intermediate', students: '8K+', modules: 12, rating: 4.6, color: 'from-pink-500 to-rose-500', topics: ['TA', 'Portfolio', 'Hardware', 'Tax'] },
];

const benefits = ['Earn NFT certificates upon completion', 'Access to exclusive community channels', 'Hands-on projects with real-world applications', 'Mentorship from industry experts', 'Lifetime access to course materials', 'Wallet connection only for quizzes & certificates'];

export default function Learn() {
  const { isConnected } = useAccount();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleCourseClick = useCallback((courseId: string) => {
    // Public access - go to academy page
    window.location.href = '/academy';
  }, []);

  return (
    <section id="learn" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" /><span className="text-xs md:text-sm text-gray-300">15+ Courses • Free Access</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Learn & <span className="gradient-text">Earn</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-2">Master Web3 skills and earn NFT certificates</p>
          <p className="text-xs text-gray-500 max-w-xl mx-auto">Learning materials are free to access. Wallet connection is only required for quizzes, certificates, and rewards.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20">
          {courses.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="group">
              <div className="glass p-5 md:p-8 rounded-xl md:rounded-2xl h-full hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${c.color} flex items-center justify-center`}>
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">{c.modules} modules</span>
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
                <button type="button" onClick={() => handleCourseClick(c.id)}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm font-medium flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all active:scale-95">
                  <span>View Course — Free</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 md:p-12 rounded-2xl md:rounded-3xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 text-center">Why Learn with VERSE?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
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
