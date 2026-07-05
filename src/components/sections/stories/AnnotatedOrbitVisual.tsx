'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

export type OrbitNode = {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  ring: 'inner' | 'outer';
  angle: number;
  speed?: number;
  radius?: number;
  calloutSide?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
};

type AnnotatedOrbitVisualProps = {
  centerIcon: ReactNode;
  centerTitle: string;
  centerSubtitle?: string;
  nodes: OrbitNode[];
  activeNodeId?: string;
  theme?: 'wallet' | 'fair' | 'community' | 'devtools';
  compact?: boolean;
  paused?: boolean;
};

const themeColors = {
  wallet: { ring: 'rgba(124,58,237,0.22)', glow: 'rgba(124,58,237,0.18)', accent: '#a78bfa', line: 'rgba(124,58,237,0.35)' },
  fair: { ring: 'rgba(139,92,246,0.22)', glow: 'rgba(139,92,246,0.18)', accent: '#c4b5fd', line: 'rgba(139,92,246,0.35)' },
  community: { ring: 'rgba(20,184,166,0.22)', glow: 'rgba(20,184,166,0.18)', accent: '#5eead4', line: 'rgba(20,184,166,0.35)' },
  devtools: { ring: 'rgba(59,130,246,0.22)', glow: 'rgba(59,130,246,0.18)', accent: '#93c5fd', line: 'rgba(59,130,246,0.35)' },
};

function getLabelOffset(side: string) {
  switch (side) {
    case 'top': return { x: 0, y: -52 };
    case 'right': return { x: 54, y: 0 };
    case 'bottom': return { x: 0, y: 52 };
    case 'left': return { x: -54, y: 0 };
    case 'top-left': return { x: -40, y: -40 };
    case 'top-right': return { x: 40, y: -40 };
    case 'bottom-left': return { x: -40, y: 40 };
    case 'bottom-right': return { x: 40, y: 40 };
    default: return { x: 48, y: 0 };
  }
}

export default function AnnotatedOrbitVisual({
  centerIcon,
  centerTitle,
  centerSubtitle,
  nodes,
  activeNodeId,
  theme = 'wallet',
  compact = false,
  paused = false,
}: AnnotatedOrbitVisualProps) {
  const [time, setTime] = useState(0);
  const colors = themeColors[theme];
  const ringRadii = { inner: 92, outer: 148 };

  // Animation loop
  useEffect(() => {
    let raf: number;
    const tick = () => {
      setTime((t) => t + 0.016);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Mouse parallax for card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);

  // Compute node positions
  const nodePositions = nodes.map((node) => {
    const r = node.radius || ringRadii[node.ring];
    const speed = node.speed || 0.12;
    const angle = (node.angle * Math.PI) / 180 + time * speed;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r * 0.55; // elliptical
    const depth = (Math.sin(angle) + 1) / 2; // 0..1
    const scale = 0.88 + depth * 0.14;
    const opacity = 0.6 + depth * 0.4;
    return { ...node, x, y, depth, scale, opacity };
  });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative mx-auto aspect-square w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-white/[0.035] overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[30%] h-48 w-48 -translate-x-1/2 rounded-full blur-3xl" style={{ background: colors.glow }} />
        <div className="absolute left-1/2 top-[45%] h-64 w-64 -translate-x-1/2 rounded-full blur-3xl" style={{ background: colors.glow, opacity: 0.5 }} />
      </div>

      {/* SVG overlay for orbit rings + callout lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 520">
        {/* Inner orbit ring */}
        <ellipse cx="260" cy="260" rx={ringRadii.inner} ry={ringRadii.inner * 0.55}
          fill="none" stroke={colors.ring} strokeWidth="1.5" strokeDasharray="4 4" />
        {/* Outer orbit ring */}
        <ellipse cx="260" cy="260" rx={ringRadii.outer} ry={ringRadii.outer * 0.55}
          fill="none" stroke={colors.ring} strokeWidth="1" strokeDasharray="4 6" />

        {/* Callout lines from nodes to labels */}
        {nodePositions.map((node) => {
          const nodeCx = 260 + node.x;
          const nodeCy = 260 + node.y;
          const offset = getLabelOffset(node.calloutSide || 'right');
          const labelCx = nodeCx + offset.x;
          const labelCy = nodeCy + offset.y;
          const isActive = node.id === activeNodeId;

          // 2-segment line: node → elbow → label
          const midX = nodeCx + offset.x * 0.4;
          const midY = nodeCy + offset.y * 0.4;

          return (
            <g key={node.id}>
              {/* Leader line */}
              <path
                d={`M ${nodeCx} ${nodeCy} L ${midX} ${midY} L ${labelCx} ${labelCy}`}
                fill="none"
                stroke={isActive ? colors.accent : colors.line}
                strokeWidth={isActive ? 1.5 : 1}
                opacity={isActive ? 0.8 : 0.4}
              />
              {/* Dot at node end */}
              <circle cx={nodeCx} cy={nodeCy} r={isActive ? 3 : 2}
                fill={isActive ? colors.accent : colors.line} opacity={isActive ? 1 : 0.6} />
              {/* Dot at label end */}
              <circle cx={labelCx} cy={labelCy} r={2}
                fill={isActive ? colors.accent : colors.line} opacity={isActive ? 0.8 : 0.4} />
            </g>
          );
        })}
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] shadow-lg"
          style={{ boxShadow: `0 0 32px ${colors.glow}` }}>
          {centerIcon}
        </div>
        <p className="text-sm font-semibold text-white">{centerTitle}</p>
        {centerSubtitle && <p className="mt-0.5 text-[10px] text-gray-400 max-w-[140px]">{centerSubtitle}</p>}
      </div>

      {/* Orbit nodes with labels */}
      {nodePositions.map((node) => {
        const isActive = node.id === activeNodeId;
        const offset = getLabelOffset(node.calloutSide || 'right');

        return (
          <div
            key={node.id}
            className="absolute left-1/2 top-1/2 pointer-events-none z-20"
            style={{
              transform: `translate(${node.x}px, ${node.y}px) translate(-50%, -50%) scale(${node.scale})`,
              opacity: node.opacity,
            }}
          >
            {/* Node bubble */}
            <div className={[
              'flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300',
              isActive
                ? 'border-white/30 bg-white/15 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                : 'border-white/10 bg-white/[0.06]',
            ].join(' ')}>
              {node.icon}
            </div>

            {/* Label chip — offset from node */}
            <div
              className="absolute whitespace-nowrap"
              style={{
                left: `calc(50% + ${offset.x}px)`,
                top: `calc(50% + ${offset.y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={[
                'rounded-lg border px-2.5 py-1 backdrop-blur-xl transition-all duration-300',
                isActive
                  ? 'border-white/20 bg-white/[0.1] shadow-[0_0_16px_rgba(124,58,237,0.2)]'
                  : 'border-white/[0.08] bg-white/[0.04]',
              ].join(' ')}>
                <p className={['text-[10px] font-semibold', isActive ? 'text-white' : 'text-gray-300'].join(' ')}>
                  {node.title}
                </p>
                {node.subtitle && (
                  <p className={['text-[8px]', isActive ? 'text-gray-300' : 'text-gray-500'].join(' ')}>
                    {node.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
