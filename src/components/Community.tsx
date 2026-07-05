'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Trophy, Star, ExternalLink } from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Members' },
  { icon: MessageCircle, value: '1M+', label: 'Messages Sent' },
  { icon: Trophy, value: '500+', label: 'Projects Launched' },
  { icon: Star, value: '4.9/5', label: 'Community Rating' },
];

const channels = [
  { name: 'Telegram', desc: 'Bitcoin.com/Verse community chat', members: '25K+', url: 'https://t.me/GetVerse/1/' },
  { name: 'Discord', desc: 'Bitcoin.com Discord community', members: '15K+', url: 'https://discord.com/invite/bitcoin-com/' },
  { name: 'X (Twitter)', desc: 'Bitcoin.com official Twitter', members: '10K+', url: 'https://x.com/bitcoincom/' },
  { name: 'LinkedIn', desc: 'Bitcoin.com company page', members: '5K+', url: 'https://www.linkedin.com/company/bitcoin.com/' },
];

export default function Community() {
  return (
    <section id="community" className="relative py-20 md:py-32 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-[800px] md:h-[800px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Join the <span className="gradient-text">Community</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Connect with the Bitcoin.com and VERSE ecosystem</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="glass p-4 md:p-8 rounded-xl md:rounded-2xl text-center hover:border-purple-500/30 transition-all">
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-2 md:mb-4" />
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1 md:mb-2">{stat.value}</div>
              <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {channels.map((ch, index) => (
            <motion.a key={index} href={ch.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }}
              className="glass p-5 md:p-6 rounded-xl md:rounded-2xl hover:border-purple-500/30 transition-all block">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{ch.name}</h3>
                <span className="text-xs text-purple-400">{ch.members}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{ch.desc}</p>
              <div className="flex items-center text-purple-400 text-sm">
                <span>Join</span><ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-2xl md:rounded-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Ready to Build the Future?</h3>
          <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join the Bitcoin.com and VERSE community. Start learning, building, and earning today.
          </p>
          <a href="https://t.me/GetVerse/1/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all active:scale-95">
            <span>Join Community</span><ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
