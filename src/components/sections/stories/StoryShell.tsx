'use client';

import { ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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

  const visualOpacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(
      steps.length - 1,
      Math.max(0, Math.round(v * (steps.length - 1))),
    );
    setActiveStep(next);
  });

  const active = steps[activeStep];

  return (
    <section
      ref={ref}
      id={id}
      data-testid={`story-${id}`}
      className={`relative scroll-mt-24 overflow-hidden ${minHeightClass} ${paused ? 'animation-paused' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_25%,rgba(124,58,237,0.13),transparent_35%),radial-gradient(circle_at_80%_55%,rgba(34,211,238,0.08),transparent_30%)]" />

      <div className="hidden lg:block">
        <div className="sticky top-[72px] min-h-[calc(100vh-72px)]">
          <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl grid-cols-[0.95fr_1.05fr] gap-10 px-6">
            <motion.div style={{ opacity: contentOpacity }} className="flex min-h-[calc(100vh-72px)] flex-col justify-center py-10">
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-200">{eyebrow}</span>
              <h2 className="mt-4 text-5xl font-bold tracking-tight text-white">{title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">{description}</p>

              <div className="mt-8">
                <div className="mb-4 min-h-6 text-sm text-gray-500">
                  {activeStep > 0 ? `↑ ${steps[activeStep - 1].title}` : ''}
                </div>

                <AnimatePresence mode="wait">
                  <StoryStepCard
                    key={active.id}
                    step={active}
                    index={activeStep}
                    active
                    storySlide
                  />
                </AnimatePresence>

                <div className="mt-4 min-h-6 text-sm text-gray-500">
                  {activeStep < steps.length - 1 ? `↓ ${steps[activeStep + 1].title}` : 'End of story'}
                </div>

                <div className={activeStep >= steps.length - 1 ? 'mt-6 opacity-100 transition-opacity' : 'mt-6 opacity-30 transition-opacity'}>
                  {ctas}
                </div>
              </div>
            </motion.div>

            <motion.div style={{ opacity: visualOpacity }} data-testid={`story-visual-${id}`} className="flex min-h-[calc(100vh-72px)] items-center justify-center py-10">
              {visual({ activeStep, scrollYProgress, paused, compact: false })}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 py-16">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-200">{eyebrow}</span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">{title}</h2>
        <p className="mt-4 text-base leading-7 text-gray-300">{description}</p>
        <div data-testid={`story-visual-mobile-${id}`} className="mt-8 rounded-3xl bg-[#080b1e]/85 py-4 backdrop-blur-sm">
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
