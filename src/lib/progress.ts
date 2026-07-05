'use client';

const PROGRESS_KEY_PREFIX = 'verse-progress:';

export interface LessonProgress {
  lessonId: string;
  read: boolean;
  readAt?: string;
  quizCompleted: boolean;
  quizScore?: number;
  quizPassed: boolean;
  xpEarned: number;
  completedAt?: string;
  firstTryPass: boolean;
  attempts: number;
}

export interface UserProgress {
  address: string;
  lessons: Record<string, LessonProgress>;
  totalXP: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: number;
  completedQuizzes: number;
}

// Level thresholds
export const LEVELS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400];

// XP constants
export const XP_READ_LESSON = 20;
export const XP_PASS_QUIZ = 100;
export const XP_MODULE_COMPLETE = 150;
export const XP_COURSE_COMPLETE = 300;
export const XP_DAILY_STREAK = 15;
export const PASS_THRESHOLD = 100; // 100% required

function getStorageKey(address: string): string {
  return `${PROGRESS_KEY_PREFIX}${address.toLowerCase()}`;
}

export function loadProgress(address: string = 'guest'): UserProgress {
  if (typeof window === 'undefined') return emptyProgress(address);
  try {
    const stored = localStorage.getItem(getStorageKey(address));
    if (stored) return JSON.parse(stored);
  } catch {}
  return emptyProgress(address);
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(progress.address), JSON.stringify(progress));
  } catch {}
}

function emptyProgress(address: string): UserProgress {
  return { address, lessons: {}, totalXP: 0, level: 1, streak: 0, lastActiveDate: '', completedLessons: 0, completedQuizzes: 0 };
}

export function calcLevel(totalXP: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i]) return i + 1;
  }
  return 1;
}

export function calcLevelProgress(totalXP: number): number {
  const lvl = calcLevel(totalXP);
  if (lvl >= LEVELS.length) return 1; // MAX
  const current = LEVELS[lvl - 1];
  const next = LEVELS[lvl];
  return (totalXP - current) / (next - current);
}

export function isAllComplete(progress: UserProgress, totalLessons: number, totalQuizzes: number): boolean {
  return progress.completedLessons >= totalLessons && progress.completedQuizzes >= totalQuizzes;
}

function updateCounts(progress: UserProgress) {
  progress.completedLessons = Object.values(progress.lessons).filter(l => l.read).length;
  progress.completedQuizzes = Object.values(progress.lessons).filter(l => l.quizPassed).length;
}

export function markLessonRead(address: string, lessonId: string): { progress: UserProgress; deltaXP: number; leveledUp: boolean } {
  const progress = loadProgress(address);
  const oldLevel = calcLevel(progress.totalXP);
  let deltaXP = 0;

  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = { lessonId, read: false, quizCompleted: false, quizPassed: false, xpEarned: 0, firstTryPass: false, attempts: 0 };
  }
  if (!progress.lessons[lessonId].read) {
    progress.lessons[lessonId].read = true;
    progress.lessons[lessonId].readAt = new Date().toISOString();
    progress.totalXP += XP_READ_LESSON;
    progress.lessons[lessonId].xpEarned += XP_READ_LESSON;
    deltaXP = XP_READ_LESSON;
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (progress.lastActiveDate === yesterday) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastActiveDate = today;
    if (progress.streak > 1) {
      progress.totalXP += XP_DAILY_STREAK;
      deltaXP += XP_DAILY_STREAK;
    }
  }

  progress.level = calcLevel(progress.totalXP);
  const leveledUp = progress.level > oldLevel;
  updateCounts(progress);
  saveProgress(progress);

  // Emit event
  try {
    const { emitProgressUpdated } = require('./progress-events');
    emitProgressUpdated({
      address: progress.address,
      oldProgress: { ...progress, totalXP: progress.totalXP - deltaXP },
      newProgress: progress,
      deltaXP,
      oldLevel,
      newLevel: progress.level,
      leveledUp,
      lessonId,
      reason: 'lesson_read',
    });
  } catch {}

  return { progress, deltaXP, leveledUp };
}

export function submitQuiz(address: string, lessonId: string, score: number, isFirstAttempt: boolean): { progress: UserProgress; deltaXP: number; leveledUp: boolean; passed: boolean } {
  const progress = loadProgress(address);
  const oldLevel = calcLevel(progress.totalXP);
  let deltaXP = 0;
  let passed = false;

  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = { lessonId, read: false, quizCompleted: false, quizPassed: false, xpEarned: 0, firstTryPass: false, attempts: 0 };
  }
  const lp = progress.lessons[lessonId];
  lp.quizCompleted = true;
  lp.quizScore = score;
  lp.attempts += 1;

  if (score >= PASS_THRESHOLD) {
    if (!lp.quizPassed) {
      lp.quizPassed = true;
      lp.completedAt = new Date().toISOString();
      lp.firstTryPass = isFirstAttempt && lp.attempts === 1;
      progress.totalXP += XP_PASS_QUIZ;
      lp.xpEarned += XP_PASS_QUIZ;
      deltaXP += XP_PASS_QUIZ;
      passed = true;
    }
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (progress.lastActiveDate === yesterday) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastActiveDate = today;
    if (progress.streak > 1) {
      progress.totalXP += XP_DAILY_STREAK;
      deltaXP += XP_DAILY_STREAK;
    }
  }

  progress.level = calcLevel(progress.totalXP);
  const leveledUp = progress.level > oldLevel;
  updateCounts(progress);
  saveProgress(progress);

  // Emit event only if passed
  if (passed) {
    try {
      const { emitProgressUpdated } = require('./progress-events');
      emitProgressUpdated({
        address: progress.address,
        oldProgress: { ...progress, totalXP: progress.totalXP - deltaXP },
        newProgress: progress,
        deltaXP,
        oldLevel,
        newLevel: progress.level,
        leveledUp,
        lessonId,
        reason: 'quiz_passed',
      });
    } catch {}
  }

  return { progress, deltaXP, leveledUp, passed };
}

export function mergeGuestProgress(walletAddress: string): UserProgress {
  const guest = loadProgress('guest');
  const wallet = loadProgress(walletAddress);
  for (const [id, lp] of Object.entries(guest.lessons)) {
    if (!wallet.lessons[id]) wallet.lessons[id] = lp;
  }
  updateCounts(wallet);
  wallet.level = calcLevel(wallet.totalXP);
  saveProgress(wallet);
  localStorage.removeItem(getStorageKey('guest'));
  return wallet;
}
