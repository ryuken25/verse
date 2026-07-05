'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

type OrbitBadge = {
  id: string;
  label: string;
  icon: ReactNode;
  ring: number; // which ring (0 = inner, 1 = outer)
  angle: number; // starting angle offset in degrees
  duration: number; // orbit duration in seconds
};

type SaturnOrbitVisualProps = {
  center: ReactNode;
  badges: OrbitBadge[];
  activeIndex: number;
  ringColors?: string[];
};

export default function SaturnOrbitVisual({
  center,
  badges,
  activeIndex,
  ringColors = ['rgba(124,58,237,0.25)', 'rgba(34,211,238,0.20)'],
}: SaturnOrbitVisualProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);

  const ringRadii = [100, 160];

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative mx-auto aspect-square w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-2xl overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.18),transparent_40%),radial-gradient(circle_at_65%_35%,rgba(34,211,238,0.10),transparent_30%)]" />

      {/* Saturn rings */}
      {ringRadii.map((radius, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            width: radius * 2,
            height: radius * 2,
            borderColor: ringColors[i] || ringColors[0],
            borderWidth: '1.5px',
            animation: `saturn-ring-rotate ${20 + i * 8}s linear infinite`,
          }}
        />
      ))}

      {/* Center object */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {center}
      </div>

      {/* Orbiting badges */}
      {badges.map((badge, index) => {
        const radius = ringRadii[badge.ring] || ringRadii[0];
        const isActive = index === activeIndex;

        return (
          <div
            key={badge.id}
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              animation: `saturn-orbit ${badge.duration}s linear infinite`,
              animationDelay: `${-(badge.angle / 360) * badge.duration}s`,
              ['--orbit-radius' as any]: `${radius}px`,
            }}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.08 : 0.95,
                opacity: isActive ? 1 : 0.72,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={[
                'relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl',
                'shadow-[0_0_24px_rgba(124,58,237,0.22),0_0_48px_rgba(34,211,238,0.10)]',
                isActive
                  ? 'border-cyan-300/70 bg-cyan-300/15'
                  : 'border-white/15 bg-white/10',
              ].join(' ')}
            >
              {badge.icon}
              {/* Label */}
              <span className={[
                'absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium',
                isActive ? 'text-cyan-300' : 'text-gray-500',
              ].join(' ')}>
                {badge.label}
              </span>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
