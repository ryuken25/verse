'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, ReactNode } from 'react';
import StoryStepCard, { type StoryStep } from './StoryStepCard';

type StoryShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: StoryStep[];
  visual: (args: { activeStep: number; scrollYProgress: any }) => ReactNode;
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
  minHeightClass = 'min-h-[280vh] lg:min-h-[320vh]',
}: StoryShellProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.floor(v * steps.length));
    setActiveStep(Math.max(0, next));
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-28 overflow-hidden ${minHeightClass}`}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.14),transparent_35%),radial-gradient(circle_at_80%_55%,rgba(34,211,238,0.10),transparent_30%)]" />

      <div className="sticky top-24 flex min-h-[calc(100vh-6rem)] items-center py-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Text side */}
          <div className="order-2 flex min-h-[calc(100vh-8rem)] flex-col justify-center lg:order-1">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-purple-200 w-fit">
              {eyebrow}
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              {title}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              {description}
            </p>

            <div className="relative mt-8 space-y-4 pl-5">
              {/* Progress rail */}
              <div className="absolute left-0 top-0 h-full w-px bg-white/10">
                <motion.div
                  style={{ scaleY: scrollYProgress }}
                  className="h-full w-px origin-top bg-gradient-to-b from-purple-400 via-blue-400 to-cyan-300"
                />
              </div>

              {steps.map((step, index) => (
                <StoryStepCard
                  key={step.id}
                  step={step}
                  active={index === activeStep}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  stepCount={steps.length}
                />
              ))}

              {ctas && <div className="pt-4">{ctas}</div>}
            </div>
          </div>

          {/* Visual side */}
          <div className="order-1 flex min-h-[360px] items-center justify-center lg:order-2 lg:min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-[560px]">
              {visual({ activeStep, scrollYProgress })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
