'use client';

import type { UserProgress } from './progress';

export const PROGRESS_UPDATED_EVENT = 'verse:progress-updated';

export type ProgressUpdatePayload = {
  address: string;
  oldProgress: UserProgress;
  newProgress: UserProgress;
  deltaXP: number;
  oldLevel: number;
  newLevel: number;
  leveledUp: boolean;
  lessonId?: string;
  reason: 'lesson_read' | 'quiz_passed' | 'streak' | 'course_completed';
};

export function emitProgressUpdated(payload: ProgressUpdatePayload) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PROGRESS_UPDATED_EVENT, { detail: payload }));
}

export function onProgressUpdated(callback: (payload: ProgressUpdatePayload) => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => callback((e as CustomEvent).detail);
  window.addEventListener(PROGRESS_UPDATED_EVENT, handler);
  return () => window.removeEventListener(PROGRESS_UPDATED_EVENT, handler);
}
