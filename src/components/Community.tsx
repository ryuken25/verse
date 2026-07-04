'use client';

import { motion } from 'framer-motion';
import { 
  MessageCircle, Users, Trophy, Star, 
  ExternalLink, ArrowRight
} from 'lucide-react';

const stats = [
  { icon: Users, value: '50K+', label: 'Active Members' },
  { icon: MessageCircle, value: '1M+', label: 'Messages Sent' },
  { icon: Trophy, value: '500+', label: 'Projects Launched' },
  { icon: Star, value: '4.9/5', label: 'Community Rating' },
];

const socialLinks = [
  { label: 'GitHub', href: '#', icon: 'GH' },
  { label: 'Twitter', href: '#', icon: 'X' },
  { label: 'Discord', href: '#', icon: 'DC' },
];

export default function Community() {
  return (
    <section id="community" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="gradient-text">Community</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with thousands of builders, developers, and innovators shaping the future of Web3
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-2xl text-center hover:border-purple-500/30 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-3xl text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Build the Future?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join our vibrant community and start your Web3 journey today. 
            Whether you&apos;re a developer, designer, or enthusiast, there&apos;s a place for you.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 text-sm font-bold"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Join Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Join Community</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
