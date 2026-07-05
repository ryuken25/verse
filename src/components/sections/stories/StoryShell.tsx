'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import StoryStepCard, { type StoryStep } from './StoryStepCard';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { usePageVisible } from '@/hooks/usePageVisible';

type VisualArgs = {
  activeStep: number;
  scrollYProgress: any;
  paused: boolean;
  compact: boolean;
};

type StoryShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: StoryStep[];
  visual: (args: VisualArgs) => ReactNode;
  ctas?: ReactNode;
  minHeightClass?: string;
};

export default function StoryShell({
  id,
  eyebrow,
  title,
  description,
  steps,
  visual,
  ctas,
  minHeightClass = 'min-h-[300vh] lg:min-h-[340vh]',
}: StoryShellProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const inView = useIsInViewport(ref, '240px');
  const pageVisible = usePageVisible();
  const reduceMotion = useReducedMotion();
  const paused = !inView || !pageVisible || !!reduceMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActiveStep(next);
  });

  return (
    <section
      ref={ref}
      id={id}
      data-testid={`story-${id}`}
      className={`relative scroll-mt-24 overflow-hidden ${minHeightClass} ${paused ? 'animation-paused' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_25%,rgba(124,58,237,0.13),transparent_35%),radial-gradient(circle_at_80%_55%,rgba(34,211,238,0.08),transparent_30%)]" />

      {/* Desktop sticky story */}
      <div className="hidden lg:block">
        <div className="sticky top-[72px] min-h-[calc(100vh-72px)]">
          <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl grid-cols-[0.95fr_1.05fr] gap-10 px-6">
            <div className="flex min-h-[calc(100vh-72px)] flex-col justify-center py-10">
              <div>
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-200">{eyebrow}</span>
                <h2 className="mt-4 text-5xl font-bold tracking-tight text-white">{title}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">{description}</p>
              </div>
              <div className="relative mt-9 pl-6">
                <div className="absolute left-0 top-2 h-[calc(100%-0.5rem)] w-px bg-white/10">
                  <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-px origin-top bg-gradient-to-b from-purple-400 via-blue-400 to-cyan-300" />
                </div>
                <div className="space-y-5">
                  {steps.map((step, index) => (
                    <StoryStepCard key={step.id} step={step} index={index} active={index === activeStep} scrollYProgress={scrollYProgress} stepCount={steps.length} />
                  ))}
                </div>
                <div className={`mt-6 ${activeStep >= steps.length - 1 ? 'opacity-100' : 'opacity-40'}`}>{ctas}</div>
              </div>
            </div>
            <div data-testid={`story-visual-${id}`} className="flex min-h-[calc(100vh-72px)] items-center justify-center py-10">
              {visual({ activeStep, scrollYProgress, paused, compact: false })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback */}
      <div className="lg:hidden px-4 py-16">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-200">{eyebrow}</span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">{title}</h2>
        <p className="mt-4 text-base leading-7 text-gray-300">{description}</p>
        <div data-testid={`story-visual-mobile-${id}`} className="sticky top-[64px] z-10 -mx-2 mt-8 rounded-3xl bg-[#080b1e]/85 py-4 backdrop-blur-sm">
          {visual({ activeStep, scrollYProgress, paused, compact: true })}
        </div>
        <div className="mt-8 space-y-4">
          {steps.map((step, index) => (
            <StoryStepCard key={step.id} step={step} index={index} active={index === activeStep} scrollYProgress={scrollYProgress} stepCount={steps.length} compact />
          ))}
        </div>
        <div className="mt-6">{ctas}</div>
      </div>
    </section>
  );
}
