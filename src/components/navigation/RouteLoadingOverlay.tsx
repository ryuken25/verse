'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTE_LOADING_EVENT } from '@/lib/navigation-events';

export default function RouteLoadingOverlay() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setLabel(detail.label || 'Loading...');
      setVisible(true);
      // Auto-hide after navigation completes (fallback timeout)
      setTimeout(() => setVisible(false), 2500);
    };
    window.addEventListener(ROUTE_LOADING_EVENT, handler);
    return () => window.removeEventListener(ROUTE_LOADING_EVENT, handler);
  }, []);

  // Also hide on route change complete
  useEffect(() => {
    if (!visible) return;
    const hide = () => setVisible(false);
    // Listen for popstate as a proxy for route change
    window.addEventListener('popstate', hide);
    // Also hide after a reasonable timeout
    const t = setTimeout(hide, 1500);
    return () => { window.removeEventListener('popstate', hide); clearTimeout(t); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050816]/95 backdrop-blur-xl"
        >
          <div className="text-center">
            {/* Orbit loader */}
            <div className="relative mx-auto mb-6 w-20 h-20">
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/verse-logo.png" alt="VERSE" className="w-10 h-10 object-contain animate-pulse" />
              </div>
              {/* Orbit ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '2s' }} />
              {/* Orbit dot */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 animate-spin" style={{ animationDuration: '1.5s' }} />
            </div>

            <h2 className="text-2xl font-bold text-white">{label}</h2>
            <p className="mt-2 text-sm text-gray-400">Preparing your lesson path...</p>

            {/* Progress bar */}
            <div className="mt-6 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
