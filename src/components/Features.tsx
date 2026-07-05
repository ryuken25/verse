'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Wallet, CalendarDays, BarChart3, Layers, TrendingUp, Users, Lock, Cpu, ArrowRight } from 'lucide-react';

const features = [
  { icon: GraduationCap, title: 'Web3 Academy', desc: '15+ courses on blockchain, DeFi, and crypto. Earn NFT certificates.', color: 'from-purple-500 to-indigo-500', tag: 'Learn', href: 'learn' },
  { icon: Wallet, title: 'VERSE Swap', desc: 'Token-gated DEX on Polygon. Swap tokens with low fees.', color: 'from-blue-500 to-cyan-500', tag: 'DeFi', href: 'market' },
  { icon: CalendarDays, title: 'Events Platform', desc: 'Hackathons, workshops, and community events with prizes.', color: 'from-green-500 to-emerald-500', tag: 'Events', href: 'events' },
  { icon: BarChart3, title: 'Market Data', desc: 'Live crypto prices, news, and exclusive analysis.', color: 'from-yellow-500 to-orange-500', tag: 'Analytics', href: 'market' },
  { icon: Layers, title: 'Asset Hub', desc: 'Official logos, banners, templates, and social kits.', color: 'from-pink-500 to-rose-500', tag: 'Resources', href: 'build' },
  { icon: TrendingUp, title: 'Provably Fair', desc: 'Blockchain-verified fairness for gaming and rewards.', color: 'from-violet-500 to-purple-500', tag: 'Gaming', href: 'features' },
  { icon: Users, title: 'Community Hub', desc: '50K+ builders worldwide. Discord, Telegram, Twitter.', color: 'from-teal-500 to-cyan-500', tag: 'Social', href: 'community' },
  { icon: Lock, title: 'Secure Wallet', desc: 'Non-custodial, multi-chain. Your keys, your crypto.', color: 'from-amber-500 to-yellow-500', tag: 'Security', href: 'features' },
  { icon: Cpu, title: 'Developer SDK', desc: 'Tools and APIs to build dApps on VERSE ecosystem.', color: 'from-red-500 to-pink-500', tag: 'Build', href: 'build' },
];

export default function Features() {
  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-0 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Why Choose <span className="gradient-text">VERSE</span>?</h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">A complete ecosystem for Web3 education, DeFi, community, and innovation</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -8 }} className="group">
              <button type="button" onClick={() => go(f.href)} className="text-left w-full glass p-5 md:p-8 rounded-xl md:rounded-2xl h-full hover:border-purple-500/30 transition-all duration-300 block relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <span className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{f.tag}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">{f.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs md:text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
