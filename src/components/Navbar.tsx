'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';

const navLinks = [
  { name: 'Home', href: 'home', type: 'scroll' as const },
  { name: 'Features', href: 'features', type: 'scroll' as const },
  { name: 'Academy', href: '/academy', type: 'link' as const },
  { name: 'Events', href: 'events', type: 'scroll' as const },
  { name: 'Market', href: 'market', type: 'scroll' as const },
  { name: 'Build', href: 'build', type: 'scroll' as const },
  { name: 'Community', href: 'community', type: 'scroll' as const },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const l of [...navLinks].reverse()) {
        if (l.type === 'scroll') {
          const el = document.getElementById(l.href);
          if (el && el.getBoundingClientRect().top <= 200) { setActive(l.href); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback((link: typeof navLinks[0]) => {
    setMobileOpen(false);
    if (link.type === 'link') {
      window.location.href = link.href;
    } else {
      const el = document.getElementById(link.href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0e27]/90 backdrop-blur-xl shadow-2xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button type="button" onClick={() => {
            if (window.location.pathname !== '/') window.location.href = '/';
            else document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
          }} className="flex items-center space-x-2 flex-shrink-0 relative z-10">
            <img src="/verse-logo.png" alt="VERSE" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-xl md:text-2xl font-bold gradient-text">VERSE</span>
          </button>

          <div className="hidden lg:flex items-center space-x-1 relative z-10">
            {navLinks.map((l) => (
              <button key={l.name} type="button" onClick={() => handleClick(l)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === l.href ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>{l.name}</button>
            ))}
          </div>

          <div className="flex items-center space-x-3 relative z-10">
            <div className="hidden sm:block"><ConnectWalletButton /></div>
            <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 -mr-2" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0e27]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((l) => (
                <button key={l.name} type="button" onClick={() => handleClick(l)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active === l.href ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}>{l.name}</button>
              ))}
              <div className="pt-2"><ConnectWalletButton /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
