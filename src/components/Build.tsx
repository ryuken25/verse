'use client';

import { motion } from 'framer-motion';
import { 
  Code, Cpu, Database, Globe, Layers, Rocket, 
  Terminal, Wallet, ArrowRight, ExternalLink 
} from 'lucide-react';

const tools = [
  {
    icon: Code,
    name: 'VERSE SDK',
    description: 'Comprehensive JavaScript/TypeScript SDK for building dApps',
    link: '#',
  },
  {
    icon: Terminal,
    name: 'CLI Tools',
    description: 'Command-line tools for deploying and managing smart contracts',
    link: '#',
  },
  {
    icon: Database,
    name: 'Smart Contracts',
    description: 'Pre-audited contract templates for common use cases',
    link: '#',
  },
  {
    icon: Globe,
    name: 'API Gateway',
    description: 'RESTful APIs for accessing VERSE network data',
    link: '#',
  },
  {
    icon: Layers,
    name: 'Component Library',
    description: 'React components for Web3 UI development',
    link: '#',
  },
  {
    icon: Wallet,
    name: 'Wallet Integration',
    description: 'Easy integration with MetaMask, WalletConnect, and more',
    link: '#',
  },
];

const projects = [
  {
    name: 'VerseSwap',
    description: 'Decentralized exchange built on VERSE',
    category: 'DeFi',
    status: 'Live',
  },
  {
    name: 'VerseNFT',
    description: 'NFT marketplace with low fees',
    category: 'NFT',
    status: 'Beta',
  },
  {
    name: 'VerseDAO',
    description: 'Community governance platform',
    category: 'Governance',
    status: 'Live',
  },
];

export default function Build() {
  return (
    <section id="build" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0d1130] to-[#0a0e27]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />

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
            Build on <span className="gradient-text">VERSE</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful tools and infrastructure to bring your Web3 ideas to life
          </p>
        </motion.div>

        {/* Developer Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl h-full hover:border-green-500/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{tool.name}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <a href={tool.link} className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors">
                  <span className="text-sm">View docs</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-3xl"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Featured Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-purple-400">{project.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{project.name}</h4>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Rocket className="w-5 h-5" />
            <span>Start Building</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
