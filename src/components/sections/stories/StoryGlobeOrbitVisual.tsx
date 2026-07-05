'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type StoryOrbitNode = {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  angle: number;
  radius?: number;
  ring?: 'inner' | 'outer';
  labelSlot:
    | 'top-left'
    | 'top-right'
    | 'middle-left'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-right';
  orbitDrift?: number;
};

type Theme = 'wallet' | 'fair' | 'community' | 'devtools';

type Props = {
  theme: Theme;
  centerIcon: ReactNode;
  centerTitle: string;
  centerSubtitle?: string;
  nodes: StoryOrbitNode[];
  activeNodeId?: string;
  compact?: boolean;
  paused?: boolean;
};

const THEME = {
  wallet: {
    active: 'rgb(34,211,238)',
    ringA: 'rgba(34,211,238,0.28)',
    ringB: 'rgba(124,58,237,0.22)',
    glowA: 'rgba(34,211,238,0.18)',
    glowB: 'rgba(124,58,237,0.14)',
    coreGradient: 'from-cyan-400/25 via-blue-500/15 to-purple-500/25',
  },
  fair: {
    active: 'rgb(168,85,247)',
    ringA: 'rgba(168,85,247,0.30)',
    ringB: 'rgba(34,211,238,0.18)',
    glowA: 'rgba(168,85,247,0.18)',
    glowB: 'rgba(34,211,238,0.10)',
    coreGradient: 'from-purple-400/25 via-fuchsia-500/15 to-cyan-400/20',
  },
  community: {
    active: 'rgb(45,212,191)',
    ringA: 'rgba(45,212,191,0.28)',
    ringB: 'rgba(96,165,250,0.18)',
    glowA: 'rgba(45,212,191,0.16)',
    glowB: 'rgba(96,165,250,0.12)',
    coreGradient: 'from-teal-400/25 via-cyan-500/15 to-purple-500/20',
  },
  devtools: {
    active: 'rgb(96,165,250)',
    ringA: 'rgba(96,165,250,0.30)',
    ringB: 'rgba(124,58,237,0.18)',
    glowA: 'rgba(96,165,250,0.16)',
    glowB: 'rgba(124,58,237,0.12)',
    coreGradient: 'from-blue-400/25 via-indigo-500/15 to-purple-500/20',
  },
};

function getLabelSlotPosition(
  slot: StoryOrbitNode['labelSlot'],
  width: number,
  height: number,
  compact = false,
) {
  const labelW = compact ? 102 : 150;
  const labelH = compact ? 42 : 56;
  const padX = compact ? 12 : 22;
  const padY = compact ? 14 : 24;
  const top = padY;
  const middle = height / 2 - labelH / 2;
  const bottom = height - labelH - padY;

  switch (slot) {
    case 'top-left':
      return { x: padX, y: top, w: labelW, h: labelH };
    case 'top-right':
      return { x: width - labelW - padX, y: top, w: labelW, h: labelH };
    case 'middle-left':
      return { x: padX, y: middle, w: labelW, h: labelH };
    case 'middle-right':
      return { x: width - labelW - padX, y: middle, w: labelW, h: labelH };
    case 'bottom-left':
      return { x: padX, y: bottom, w: labelW, h: labelH };
    case 'bottom-right':
      return { x: width - labelW - padX, y: bottom, w: labelW, h: labelH };
  }
}

export default function StoryGlobeOrbitVisual({
  theme,
  centerIcon,
  centerTitle,
  centerSubtitle,
  nodes,
  activeNodeId,
  compact = false,
  paused = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const t = THEME[theme];

  const width = compact ? 340 : 560;
  const height = compact ? 340 : 560;
  const cx = width / 2;
  const cy = height / 2;

  const innerRadius = compact ? 82 : 122;
  const outerRadius = compact ? 122 : 188;
  const ellipseY = compact ? 0.48 : 0.5;

  useEffect(() => {
    if (paused || reduceMotion) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setTick((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduceMotion]);

  const positioned = useMemo(() => {
    return nodes.map((node) => {
      const radius = node.radius ?? (node.ring === 'outer' ? outerRadius : innerRadius);
      const drift = Math.min(4, Math.max(0, node.orbitDrift ?? 0));
      const animatedAngle = node.angle + (paused || reduceMotion ? 0 : Math.sin(tick * 0.55) * drift);
      const angle = (animatedAngle * Math.PI) / 180;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius * ellipseY;
      const label = getLabelSlotPosition(node.labelSlot, width, height, compact);
      const targetX = label.x + label.w / 2;
      const targetY = label.y + label.h / 2;
      const elbowX = x + (targetX - x) * 0.58;
      const elbowY = y + (targetY - y) * 0.18;

      return {
        ...node,
        x,
        y,
        label,
        targetX,
        targetY,
        elbowX,
        elbowY,
        active: node.id === activeNodeId,
      };
    });
  }, [nodes, tick, cx, cy, compact, width, height, activeNodeId, paused, reduceMotion, innerRadius, outerRadius, ellipseY]);

  return (
    <div
      data-testid={`story-globe-${theme}`}
      className={[
        'relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b1f]/70',
        'shadow-[0_24px_80px_rgba(0,0,0,0.22)]',
        compact ? 'h-[340px] w-full max-w-[340px]' : 'h-[560px] w-full max-w-[560px]',
        paused ? 'animation-paused' : '',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute left-1/2 top-[22%] h-44 w-44 -translate-x-1/2 rounded-full blur-3xl md:h-60 md:w-60" style={{ backgroundColor: t.glowA }} />
      <div className="pointer-events-none absolute left-[58%] top-[54%] h-40 w-40 -translate-x-1/2 rounded-full blur-3xl md:h-56 md:w-56" style={{ backgroundColor: t.glowB }} />

      <svg viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <motion.ellipse
          cx={cx}
          cy={cy}
          rx={outerRadius}
          ry={outerRadius * ellipseY}
          fill="none"
          stroke={t.ringA}
          strokeWidth="1.4"
          strokeDasharray="6 8"
          animate={paused || reduceMotion ? {} : { strokeDashoffset: [0, -28] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <ellipse cx={cx} cy={cy} rx={innerRadius} ry={innerRadius * ellipseY} fill="none" stroke={t.ringB} strokeWidth="1" />

        {positioned.map((node) => (
          <g key={`line-${node.id}`}>
            <path
              d={`M ${node.x} ${node.y} L ${node.elbowX} ${node.elbowY} L ${node.targetX} ${node.targetY}`}
              fill="none"
              stroke={node.active ? t.active : 'rgba(255,255,255,0.16)'}
              strokeWidth={node.active ? 1.8 : 1}
              strokeLinecap="round"
            />
            <circle cx={node.x} cy={node.y} r={node.active ? 4 : 2.4} fill={node.active ? t.active : 'rgba(255,255,255,0.38)'} />
          </g>
        ))}
      </svg>

      <motion.div
        data-testid={`story-core-${theme}`}
        animate={paused || reduceMotion ? {} : { rotate: [0, 1.2, -1.2, 0], scale: [1, 1.018, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className={[
          'absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 text-center backdrop-blur-md',
          'bg-gradient-to-br',
          t.coreGradient,
          compact ? 'h-28 w-28 p-3' : 'h-36 w-36 p-4',
          'shadow-[0_0_40px_rgba(124,58,237,0.20)]',
        ].join(' ')}
        style={{ left: cx, top: cy }}
      >
        <div className="mb-2 text-white">{centerIcon}</div>
        <div className="text-sm font-semibold text-white">{centerTitle}</div>
        {centerSubtitle && !compact && <div className="mt-1 max-w-[110px] text-[10px] leading-4 text-gray-300">{centerSubtitle}</div>}
      </motion.div>

      {positioned.map((node) => (
        <div key={node.id}>
          <motion.div
            data-testid={`story-orbit-node-${node.id}`}
            animate={{ scale: node.active ? 1.1 : 1, opacity: node.active ? 1 : 0.78 }}
            transition={{ duration: 0.2 }}
            className={[
              'absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md',
              compact ? 'h-9 w-9' : 'h-12 w-12',
              node.active ? 'border-cyan-300/80 bg-cyan-300/15 shadow-[0_0_28px_rgba(34,211,238,0.26)]' : 'border-white/15 bg-white/10 shadow-[0_0_18px_rgba(124,58,237,0.12)]',
            ].join(' ')}
            style={{ left: node.x, top: node.y }}
          >
            {node.icon}
          </motion.div>

          <motion.div
            data-testid={`story-orbit-label-${node.id}`}
            animate={{ opacity: node.active ? 1 : 0.72, scale: node.active ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
            className={[
              'absolute z-20 rounded-xl border px-3 py-2 backdrop-blur-md',
              node.active ? 'border-cyan-300/50 bg-cyan-300/[0.10]' : 'border-white/10 bg-[#0c1028]/78',
            ].join(' ')}
            style={{ left: node.label.x, top: node.label.y, width: node.label.w, minHeight: node.label.h }}
          >
            <div className="truncate text-[11px] font-semibold text-white">{node.title}</div>
            {node.subtitle && !compact && <div className="mt-0.5 line-clamp-2 text-[10px] leading-3 text-gray-400">{node.subtitle}</div>}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
