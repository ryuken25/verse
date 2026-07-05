'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Flame, Trophy } from 'lucide-react';
import { onProgressUpdated, type ProgressUpdatePayload } from '@/lib/progress-events';

interface XPToastItem {
  id: string;
  deltaXP: number;
  reason: string;
  leveledUp: boolean;
  oldLevel: number;
  newLevel: number;
  allComplete?: boolean;
}

export default function XPToast() {
  const [toasts, setToasts] = useState<XPToastItem[]>([]);

  useEffect(() => {
    return onProgressUpdated((payload: ProgressUpdatePayload) => {
      if (payload.deltaXP <= 0) return;
      const toast: XPToastItem = {
        id: `${Date.now()}-${Math.random()}`,
        deltaXP: payload.deltaXP,
        reason: payload.reason,
        leveledUp: payload.leveledUp,
        oldLevel: payload.oldLevel,
        newLevel: payload.newLevel,
      };
      setToasts(prev => [...prev, toast]);
      // Auto-remove after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, i) => (
          <motion.div
            key={toast.id}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute"
            style={{ transform: `translateY(${-60 + i * -80}px)` }}
          >
            <div className="bg-[#101322]/95 border border-purple-500/30 rounded-2xl px-8 py-6 shadow-2xl shadow-purple-500/20 text-center">
              {toast.leveledUp ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">Level Up!</p>
                  <p className="text-yellow-400 text-lg font-semibold mb-2">Level {toast.newLevel} reached</p>
                  <p className="text-purple-300 text-sm">+{toast.deltaXP} XP</p>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-3">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">+{toast.deltaXP} XP</p>
                  <p className="text-purple-300 text-sm capitalize">{toast.reason.replace('_', ' ')}</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
