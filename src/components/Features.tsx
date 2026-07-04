'use client';

import { motion } from 'framer-motion';
import { 
  Shield, Zap, Globe, Users, BookOpen, Rocket, 
  Code, Coins, Heart, ArrowRight 
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure & Decentralized',
    description: 'Built on blockchain technology with military-grade security protocols',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second transaction finality with minimal gas fees',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connect with builders, developers, and innovators worldwide',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'DAO Governance',
    description: 'Community-driven decision making with transparent voting',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BookOpen,
    title: 'Learn & Earn',
    description: 'Master Web3 skills and earn NFT certificates',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Rocket,
    title: 'Launch Projects',
    description: 'Tools and support to launch your decentralized applications',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'Developer Tools',
    description: 'Comprehensive SDK and APIs for seamless integration',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Coins,
    title: 'DeFi Protocols',
    description: 'Access to lending, borrowing, and yield farming',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'Built by the community, for the community',
    color: 'from-red-500 to-pink-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

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
            Why Choose <span className="gradient-text">VERSE</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the powerful features that make VERSE the ultimate Web3 platform
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="glass p-8 rounded-2xl h-full hover:border-purple-500/30 transition-all duration-500">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
