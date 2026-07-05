'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

export type StoryStep = {
  id: string;
  visualNodeId?: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
};

export default function StoryStepCard({
  step,
  index,
  active,
  scrollYProgress,
  stepCount,
  compact = false,
}: {
  step: StoryStep;
  index: number;
  active: boolean;
  scrollYProgress: MotionValue<number>;
  stepCount: number;
  compact?: boolean;
}) {
  const start = index / stepCount;
  const mid = (index + 0.5) / stepCount;
  const end = (index + 1) / stepCount;

  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.48, 1, 0.48]);
  const y = useTransform(scrollYProgress, [start, mid, end], [24, 0, -14]);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.98, 1, 0.99]);

  return (
    <motion.article
      data-testid={`story-step-${step.id}`}
      style={compact ? undefined : { opacity, y, scale }}
      className={[
        'rounded-2xl border transition-colors duration-300',
        compact ? 'p-4' : 'p-5',
        active
          ? 'border-cyan-300/45 bg-cyan-300/[0.08] shadow-[0_0_32px_rgba(34,211,238,0.12)]'
          : 'border-white/10 bg-white/[0.035]',
      ].join(' ')}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
        {step.kicker}
      </div>
      <h3 className={compact ? 'mt-2 text-lg font-semibold text-white' : 'mt-2 text-xl font-semibold text-white'}>
        {step.title}
      </h3>
      <p className="mt-3 leading-7 text-gray-300 text-sm md:text-base">{step.body}</p>
      {step.bullets?.length ? (
        <ul className="mt-4 space-y-2">
          {step.bullets.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-gray-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </motion.article>
  );
}
