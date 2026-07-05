'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';

const navLinks = [
  { name: 'Home', href: '/', hash: 'home' },
  { name: 'Features', href: '/', hash: 'features' },
  { name: 'Academy', href: '/academy', hash: null },
  { name: 'Events', href: '/', hash: 'events' },
  { name: 'Market', href: '/', hash: 'market' },
  { name: 'Docs', href: '/', hash: 'docs-section' },
  { name: 'Build', href: '/', hash: 'build' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (pathname === '/') {
        for (const l of [...navLinks].reverse()) {
          if (l.hash) {
            const el = document.getElementById(l.hash);
            if (el && el.getBoundingClientRect().top <= 200) { setActive(l.name); break; }
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Set active based on pathname
  useEffect(() => {
    if (pathname === '/academy') setActive('Academy');
    else if (pathname === '/') {
      // Will be set by scroll
    }
  }, [pathname]);

  const handleClick = useCallback((link: typeof navLinks[0]) => {
    setMobileOpen(false);
    if (link.href === '/academy') {
      router.push('/academy');
    } else if (pathname === '/' && link.hash) {
      // Already on homepage, smooth scroll
      const el = document.getElementById(link.hash!);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Navigate to homepage with hash
      router.push(`/#${link.hash}`);
    }
  }, [pathname, router]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0e27]/90 backdrop-blur-xl shadow-2xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button type="button" onClick={() => { if (pathname !== '/') router.push('/'); else window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2 flex-shrink-0 relative z-10">
            <img src="/verse-logo.png" alt="VERSE" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-xl md:text-2xl font-bold gradient-text">VERSE</span>
          </button>

          <div className="hidden lg:flex items-center space-x-1 relative z-10">
            {navLinks.map((l) => (
              <button key={l.name} type="button" onClick={() => handleClick(l)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === l.name ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
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
                    active === l.name ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
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
