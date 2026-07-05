'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Key, FileText, Wifi, AlertTriangle, CheckCircle, HardDrive, ExternalLink } from 'lucide-react';

const steps = [
  { icon: Key, title: 'Your Keys', desc: 'Non-custodial — you own your private keys. No one else can access your funds.', color: 'from-purple-500 to-indigo-500' },
  { icon: FileText, title: 'Seed Phrase Backup', desc: 'Your seed phrase is the master key. Write it down offline. Never share it digitally.', color: 'from-blue-500 to-cyan-500' },
  { icon: Wifi, title: 'Connect Anywhere', desc: 'WalletConnect + browser extension support. Connect to any dApp securely.', color: 'from-green-500 to-emerald-500' },
  { icon: AlertTriangle, title: 'Stay Safe', desc: 'Beware of phishing, fake token approvals, and malicious contracts. Always verify.', color: 'from-yellow-500 to-orange-500' },
  { icon: CheckCircle, title: 'Verify Addresses', desc: 'Always check contract addresses before signing. Use Polygonscan to verify.', color: 'from-teal-500 to-cyan-500' },
  { icon: HardDrive, title: 'Hardware Wallet', desc: 'For large holdings, use a hardware wallet. Your keys never leave the device.', color: 'from-pink-500 to-rose-500' },
];

export default function SecureWalletStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="feature-secure-wallet" ref={sectionRef} className="relative py-20 md:py-32 scroll-mt-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-4">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-300">Security</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Secure <span className="gradient-text">Wallet</span></h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto">Your crypto, your keys. Understand how non-custodial wallets protect your assets.</p>
        </motion.div>

        {/* Story steps — sticky visual + scrolling text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Visual panel — sticky on desktop */}
          <div className="hidden lg:block sticky top-28">
            <div className="glass p-8 rounded-3xl">
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                {/* Animated wallet visual */}
                <WalletVisual scrollYProgress={scrollYProgress} />
              </div>
            </div>
          </div>

          {/* Steps — scroll reveal */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} total={steps.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          <a href="/academy#wallet-security"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all">
            Learn Wallet Security
          </a>
          <a href="https://wallet.bitcoin.com/" target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 glass rounded-xl text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center space-x-2">
            <span>Download Bitcoin.com Wallet</span><ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Animated wallet visual
function WalletVisual({ scrollYProgress }: { scrollYProgress: any }) {
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.15], [0.3, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.30], [0.3, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.30, 0.45], [0.3, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.45, 0.60], [0.3, 1]);
  const opacity5 = useTransform(scrollYProgress, [0.60, 0.75], [0.3, 1]);
  const opacity6 = useTransform(scrollYProgress, [0.75, 0.90], [0.3, 1]);
  const opacities = [opacity1, opacity2, opacity3, opacity4, opacity5, opacity6];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central wallet icon */}
      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
        <Shield className="w-16 h-16 text-purple-400" />
      </div>

      {/* Orbiting step indicators */}
      {steps.map((step, i) => {
        const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 45;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <motion.div
            key={i}
            style={{ opacity: opacities[i], left: `${x}%`, top: `${y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
              <step.icon className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Step card with scroll reveal
function StepCard({ step, index, total, scrollYProgress }: { step: typeof steps[0]; index: number; total: number; scrollYProgress: any }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.02, end], [0, 1, 1, 0.5]);
  const x = useTransform(scrollYProgress, [start, start + 0.08], [30, 0]);

  return (
    <motion.div style={{ opacity, x }} className="glass p-6 rounded-2xl">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0`}>
          <step.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
