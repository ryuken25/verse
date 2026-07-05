'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type OrbitNode = {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  ring?: 'inner' | 'outer';
  angle: number;
  radius?: number;
  speed?: number;
  calloutSide:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
  color?: 'purple' | 'cyan' | 'blue' | 'green' | 'yellow' | 'pink';
};

type Props = {
  theme: 'wallet' | 'fair' | 'community' | 'devtools';
  centerIcon: ReactNode;
  centerTitle: string;
  centerSubtitle?: string;
  nodes: OrbitNode[];
  activeNodeId?: string;
  compact?: boolean;
  paused?: boolean;
};

const THEME = {
  wallet: {
    ring: 'rgba(34,211,238,0.24)',
    ring2: 'rgba(124,58,237,0.20)',
    active: 'rgb(34,211,238)',
    glow: 'rgba(34,211,238,0.18)',
  },
  fair: {
    ring: 'rgba(168,85,247,0.25)',
    ring2: 'rgba(34,211,238,0.16)',
    active: 'rgb(168,85,247)',
    glow: 'rgba(168,85,247,0.18)',
  },
  community: {
    ring: 'rgba(45,212,191,0.24)',
    ring2: 'rgba(96,165,250,0.16)',
    active: 'rgb(45,212,191)',
    glow: 'rgba(45,212,191,0.16)',
  },
  devtools: {
    ring: 'rgba(96,165,250,0.24)',
    ring2: 'rgba(124,58,237,0.16)',
    active: 'rgb(96,165,250)',
    glow: 'rgba(96,165,250,0.16)',
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function labelOffset(side: OrbitNode['calloutSide'], compact = false) {
  const d = compact ? 42 : 64;
  const long = compact ? 92 : 150;

  switch (side) {
    case 'top':
      return { x: -52, y: -d };
    case 'right':
      return { x: d, y: -20 };
    case 'bottom':
      return { x: -52, y: d - 8 };
    case 'left':
      return { x: -long, y: -20 };
    case 'top-left':
      return { x: -long, y: -d };
    case 'top-right':
      return { x: d, y: -d };
    case 'bottom-left':
      return { x: -long, y: d - 5 };
    case 'bottom-right':
      return { x: d, y: d - 5 };
  }
}

export default function AnnotatedOrbitVisual({
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

  const width = compact ? 340 : 540;
  const height = compact ? 340 : 540;
  const cx = width / 2;
  const cy = height / 2;
  const ellipseY = compact ? 0.46 : 0.50;

  useEffect(() => {
    if (paused || reduceMotion) return;
    let raf = 0;
    let start = performance.now();
    const loop = (now: number) => {
      setTick((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduceMotion]);

  const positioned = useMemo(() => {
    return nodes.map((node) => {
      const radius =
        node.radius ??
        (node.ring === 'outer'
          ? compact ? 122 : 180
          : compact ? 82 : 116);

      const animatedAngle =
        node.angle + (paused || reduceMotion ? 0 : tick * (node.speed ?? 3.2));

      const angle = (animatedAngle * Math.PI) / 180;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius * ellipseY;

      const offset = labelOffset(node.calloutSide, compact);
      const labelWidth = compact ? 98 : 142;
      const labelHeight = compact ? 40 : 54;

      const labelX = clamp(x + offset.x, 14, width - labelWidth - 14);
      const labelY = clamp(y + offset.y, 14, height - labelHeight - 14);

      const targetX = labelX + labelWidth / 2;
      const targetY = labelY + labelHeight / 2;
      const elbowX = x + (targetX - x) * 0.58;
      const elbowY = y + (targetY - y) * 0.24;

      return {
        ...node,
        x,
        y,
        labelX,
        labelY,
        labelWidth,
        labelHeight,
        targetX,
        targetY,
        elbowX,
        elbowY,
        active: node.id === activeNodeId,
      };
    });
  }, [nodes, tick, cx, cy, ellipseY, compact, width, height, activeNodeId, paused, reduceMotion]);

  return (
    <div
      data-testid={`annotated-orbit-${theme}`}
      className={[
        'relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]',
        'shadow-[0_24px_80px_rgba(0,0,0,0.22)]',
        compact ? 'h-[340px] w-full max-w-[340px]' : 'h-[540px] w-full max-w-[540px]',
        paused ? 'animation-paused' : '',
      ].join(' ')}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[22%] h-44 w-44 -translate-x-1/2 rounded-full blur-3xl md:h-60 md:w-60"
        style={{ backgroundColor: t.glow }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(124,58,237,0.12),transparent_34%),radial-gradient(circle_at_70%_35%,rgba(34,211,238,0.08),transparent_30%)]" />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <ellipse cx={cx} cy={cy} rx={compact ? 122 : 180} ry={(compact ? 122 : 180) * ellipseY} fill="none" stroke={t.ring} strokeWidth="1.3" />
        <ellipse cx={cx} cy={cy} rx={compact ? 82 : 116} ry={(compact ? 82 : 116) * ellipseY} fill="none" stroke={t.ring2} strokeWidth="1" />
        {positioned.map((node) => (
          <g key={`line-${node.id}`}>
            <path
              d={`M ${node.x} ${node.y} L ${node.elbowX} ${node.elbowY} L ${node.targetX} ${node.targetY}`}
              fill="none"
              stroke={node.active ? t.active : 'rgba(255,255,255,0.16)'}
              strokeWidth={node.active ? 1.7 : 1}
              strokeLinecap="round"
            />
            <circle cx={node.x} cy={node.y} r={node.active ? 3.8 : 2.3} fill={node.active ? t.active : 'rgba(255,255,255,0.38)'} />
          </g>
        ))}
      </svg>

      <motion.div
        animate={reduceMotion || paused ? {} : { rotate: [0, 1.2, -1.2, 0], scale: [1, 1.015, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/[0.09] p-4 text-center backdrop-blur-md"
        style={{ left: cx, top: cy, width: compact ? 112 : 144, minHeight: compact ? 92 : 116 }}
      >
        <div className="mb-2 text-white">{centerIcon}</div>
        <div className="text-sm font-semibold text-white">{centerTitle}</div>
        {centerSubtitle && !compact && <div className="mt-1 text-[10px] leading-4 text-gray-400">{centerSubtitle}</div>}
      </motion.div>

      {positioned.map((node) => (
        <div key={node.id}>
          <motion.div
            data-testid={`orbit-node-${node.id}`}
            animate={{ scale: node.active ? 1.08 : 1, opacity: node.active ? 1 : 0.78 }}
            transition={{ duration: 0.2 }}
            className={[
              'absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-md',
              compact ? 'h-9 w-9' : 'h-12 w-12',
              node.active
                ? 'border-cyan-300/80 bg-cyan-300/15 shadow-[0_0_28px_rgba(34,211,238,0.26)]'
                : 'border-white/15 bg-white/10 shadow-[0_0_18px_rgba(124,58,237,0.12)]',
            ].join(' ')}
            style={{ left: node.x, top: node.y }}
          >
            {node.icon}
          </motion.div>

          <motion.div
            data-testid={`orbit-label-${node.id}`}
            animate={{ opacity: node.active ? 1 : 0.76, scale: node.active ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
            className={[
              'absolute z-20 rounded-xl border px-3 py-2 backdrop-blur-md',
              node.active ? 'border-cyan-300/50 bg-cyan-300/[0.10]' : 'border-white/10 bg-[#0c1028]/75',
            ].join(' ')}
            style={{ left: node.labelX, top: node.labelY, width: node.labelWidth, minHeight: node.labelHeight }}
          >
            <div className="truncate text-[11px] font-semibold text-white">{node.title}</div>
            {node.subtitle && !compact && <div className="mt-0.5 line-clamp-2 text-[10px] leading-3 text-gray-400">{node.subtitle}</div>}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
