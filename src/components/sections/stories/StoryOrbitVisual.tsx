'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

type Badge = {
  id: string;
  label: string;
  icon: ReactNode;
  color: string;
  radius: number;
  duration: number;
  delay?: number;
};

export default function StoryOrbitVisual({
  center,
  badges,
  activeIndex,
}: {
  center: ReactNode;
  badges: Badge[];
  activeIndex: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="relative mx-auto aspect-square w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-2xl"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.22),transparent_38%),radial-gradient(circle_at_65%_35%,rgba(34,211,238,0.14),transparent_28%)]" />

      {/* Orbit rings */}
      <div className="absolute inset-8 rounded-full border border-cyan-300/15 pointer-events-none" />
      <div className="absolute inset-16 rounded-full border border-purple-300/10 pointer-events-none" />

      {/* Center */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {center}
      </div>

      {/* Orbiting badges */}
      {badges.map((badge, index) => (
        <div
          key={badge.id}
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            animation: `story-orbit ${badge.duration}s linear infinite`,
            animationDelay: `${badge.delay ?? 0}s`,
            ['--orbit-radius' as any]: `${badge.radius}px`,
          }}
        >
          <motion.div
            animate={{
              rotateX: [0, 16, -10, 0],
              rotateY: [0, 180, 320, 360],
              rotateZ: [0, 8, -8, 0],
              scale: index === activeIndex ? 1.12 : 1,
            }}
            transition={{
              rotateX: { duration: 4 + index, repeat: Infinity, ease: 'easeInOut' },
              rotateY: { duration: 5 + index * 0.7, repeat: Infinity, ease: 'linear' },
              rotateZ: { duration: 3.8 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.25 },
            }}
            className={[
              'flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl',
              'shadow-[0_0_24px_rgba(124,58,237,0.18)]',
              index === activeIndex
                ? 'border-cyan-300/70 bg-cyan-300/15'
                : 'border-white/15 bg-white/10',
            ].join(' ')}
          >
            {badge.icon}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
