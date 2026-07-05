'use client';

import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';

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
  index = 0,
  active,
  scrollYProgress,
  stepCount = 1,
  compact = false,
  storySlide = false,
}: {
  step: StoryStep;
  index?: number;
  active: boolean;
  scrollYProgress?: MotionValue<number>;
  stepCount?: number;
  compact?: boolean;
  storySlide?: boolean;
}) {
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;
  const start = index / stepCount;
  const mid = (index + 0.5) / stepCount;
  const end = (index + 1) / stepCount;
  const opacity = useTransform(progress, [start, mid, end], [0.48, 1, 0.48]);
  const y = useTransform(progress, [start, mid, end], [24, 0, -14]);
  const scale = useTransform(progress, [start, mid, end], [0.98, 1, 0.99]);

  if (storySlide) {
    return (
      <motion.article
        data-testid={`story-step-${step.id}`}
        initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="rounded-3xl border border-cyan-300/25 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(34,211,238,0.10)]"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">{step.kicker}</div>
        <h3 className="mt-3 text-2xl font-bold text-white">{step.title}</h3>
        <p className="mt-4 text-base leading-8 text-gray-300">{step.body}</p>
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

  return (
    <motion.article
      data-testid={`story-step-${step.id}`}
      style={compact ? undefined : { opacity, y, scale }}
      className={[
        'rounded-2xl border transition-colors duration-300',
        compact ? 'p-4' : 'p-5',
        active ? 'border-cyan-300/45 bg-cyan-300/[0.08] shadow-[0_0_32px_rgba(34,211,238,0.12)]' : 'border-white/10 bg-white/[0.035]',
      ].join(' ')}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">{step.kicker}</div>
      <h3 className={compact ? 'mt-2 text-lg font-semibold text-white' : 'mt-2 text-xl font-semibold text-white'}>{step.title}</h3>
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
