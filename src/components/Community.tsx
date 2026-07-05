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
  { name: 'Discord', desc: 'Join our main community hub', members: '25K+', url: '#' },
  { name: 'Telegram', desc: 'Real-time chat and updates', members: '15K+', url: '#' },
  { name: 'Twitter', desc: 'News and announcements', members: '10K+', url: '#' },
];

export default function Community() {
  const [toast, setToast] = useState('');

  const handleChannelClick = (name: string, url: string) => {
    if (url === '#') {
      setToast(`${name} link coming soon!`);
      setTimeout(() => setToast(''), 3000);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="community" className="relative py-20 md:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-[800px] md:h-[800px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-2xl text-sm font-medium">
          {toast}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Join the <span className="gradient-text">Community</span></h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">Connect with thousands of builders, developers, and innovators</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {channels.map((ch, index) => (
            <motion.button type="button" key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }}
              onClick={() => handleChannelClick(ch.name, ch.url)}
              className="glass p-5 md:p-6 rounded-xl md:rounded-2xl hover:border-purple-500/30 transition-all text-left">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{ch.name}</h3>
                <span className="text-xs text-purple-400">{ch.members}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{ch.desc}</p>
              <div className="flex items-center text-purple-400 text-sm">
                <span>Join now</span><ExternalLink className="w-4 h-4 ml-2" />
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-2xl md:rounded-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Ready to Build the Future?</h3>
          <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
            Whether you are a developer, designer, or enthusiast — there is a place for you in the VERSE ecosystem.
          </p>
          <button type="button" onClick={() => setToast('Discord link coming soon!')}
            className="px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-sm md:text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all inline-flex items-center space-x-2 active:scale-95">
            <span>Join Community</span><ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
