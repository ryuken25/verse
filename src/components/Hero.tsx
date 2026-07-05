'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Globe, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotionSafe';
import MagneticButton from '@/components/ui/MagneticButton';

const HeroScene3D = dynamic(() => import('@/components/three/HeroScene3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black flex items-center justify-center pointer-events-auto"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} className="absolute h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent w-[200%]"
            style={{ top: `${5 + i * 7}%`, left: '-50%' }}
            initial={{ x: '-50%' }} animate={{ x: '50%' }}
            transition={{ duration: 2, delay: i * 0.1 }} />
        ))}
      </motion.div>
      <motion.div className="relative z-10 flex flex-col items-center pointer-events-none">
        {[1, 2, 3].map((r) => (
          <motion.div key={r} className="absolute w-24 h-24 rounded-full border border-purple-500/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2 + r, opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, delay: 0.5 + r * 0.3 }} />
        ))}
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 100 }}>
          <motion.img src="/verse-logo.png" alt="VERSE" className="w-24 h-24 md:w-32 md:h-32 object-contain"
            animate={{ filter: ['drop-shadow(0 0 20px rgba(124,58,237,0.8))', 'drop-shadow(0 0 40px rgba(124,58,237,0.4))', 'drop-shadow(0 0 20px rgba(124,58,237,0.8))'] }}
            transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-6 text-center">
          <motion.h1 className="text-4xl md:text-5xl font-bold gradient-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}>VERSE</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-gray-400 mt-2 text-sm">
            The Future of Web3
          </motion.p>
        </motion.div>
        <motion.div className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: '0%' }} animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }} />
        </motion.div>
      </motion.div>
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div key={i} className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{ background: ['#7c3aed', '#3b82f6', '#06b6d4', '#f59e0b'][i % 4], left: '50%', top: '50%' }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 600, opacity: 0 }}
          transition={{ duration: 1.5, delay: 1 + Math.random() * 0.5 }} />
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const [intro, setIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!mounted) return <section id="home" className="min-h-screen bg-[#0a0e27]" />;

  return (
    <>
      <AnimatePresence>
        {intro && !reducedMotion && <IntroOverlay key="intro" onComplete={() => setIntro(false)} />}
      </AnimatePresence>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 scroll-mt-24">
        {/* 3D Scene */}
        {!reducedMotion && <HeroScene3D />}

        {/* Background fallback */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[500px] md:h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-[400px] md:h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27]/50 to-[#0a0e27] pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: intro ? 3.5 : 0 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: intro ? 3.8 : 0.3 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6 md:mb-10">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-xs md:text-sm text-gray-300">Powered by Bitcoin.com • 50K+ Community</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: intro ? 3.6 : 0.1 }} className="mb-6 md:mb-8">
              <img src="/verse-logo.png" alt="VERSE" className="w-16 h-16 md:w-24 md:h-24 mx-auto object-contain" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
              <motion.span className="gradient-text inline-block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: intro ? 4 : 0.2 }}>Build.</motion.span><br />
              <motion.span className="text-white inline-block" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: intro ? 4.2 : 0.4 }}>Learn.</motion.span><br />
              <motion.span className="gradient-text inline-block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: intro ? 4.4 : 0.6 }}>Earn.</motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: intro ? 4.6 : 0.8 }}
              className="text-base md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12">
              The complete Web3 ecosystem — learn blockchain, trade tokens, join events, and build the decentralized future with VERSE.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: intro ? 4.8 : 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <MagneticButton onClick={() => go('learn')}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-sm md:text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow flex items-center justify-center space-x-2 relative z-10">
                <Zap className="w-4 h-4 md:w-5 md:h-5" /><span>Start Learning</span><ChevronRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton onClick={() => go('features')}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 glass rounded-xl text-white font-semibold text-sm md:text-base hover:bg-white/10 transition-all flex items-center justify-center space-x-2 relative z-10">
                <Globe className="w-4 h-4 md:w-5 md:h-5" /><span>Explore Ecosystem</span>
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: intro ? 5.2 : 1.4 }}
              className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { value: '50K+', label: 'Community Members', id: 'community' },
                { value: '15+', label: 'Courses Available', id: 'learn' },
                { value: '100+', label: 'Projects Built', id: 'build' },
                { value: '$10M+', label: 'TVL Locked', id: 'market' },
              ].map((s, i) => (
                <motion.button type="button" key={i} onClick={() => go(s.id)} whileHover={{ y: -4, scale: 1.02 }}
                  className="glass p-4 md:p-6 rounded-xl md:rounded-2xl hover:bg-white/5 hover:border-purple-500/30 transition-all cursor-pointer relative z-10">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{s.value}</div>
                  <div className="text-gray-400 text-xs md:text-sm">{s.label}</div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
