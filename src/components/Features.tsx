'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import FeatureStoryHub from '@/components/sections/FeatureStoryHub';

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


      <FeatureStoryHub />
    </>
  );
}
