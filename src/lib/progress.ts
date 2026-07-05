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
}

export interface UserProgress {
  address: string; // 'guest' or wallet address lowercase
  lessons: Record<string, LessonProgress>;
  totalXP: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: number;
  completedQuizzes: number;
}

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

// XP constants
export const XP_READ_LESSON = 10;
export const XP_PASS_QUIZ = 50;
export const XP_PERFECT_BONUS = 30;
export const XP_FIRST_TRY_BONUS = 20;
export const XP_DAILY_STREAK = 5;
export const PASS_THRESHOLD = 80;
export const XP_PER_LEVEL = 200;

export function calcLevel(totalXP: number): number {
  return 1 + Math.floor(totalXP / XP_PER_LEVEL);
}

export function calcLevelProgress(totalXP: number): number {
  return (totalXP % XP_PER_LEVEL) / XP_PER_LEVEL;
}

export function markLessonRead(address: string, lessonId: string): UserProgress {
  const progress = loadProgress(address);
  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = { lessonId, read: false, quizCompleted: false, quizPassed: false, xpEarned: 0, firstTryPass: false };
  }
  if (!progress.lessons[lessonId].read) {
    progress.lessons[lessonId].read = true;
    progress.lessons[lessonId].readAt = new Date().toISOString();
    progress.totalXP += XP_READ_LESSON;
    progress.lessons[lessonId].xpEarned += XP_READ_LESSON;
    progress.level = calcLevel(progress.totalXP);
    updateCounts(progress);
    saveProgress(progress);
  }
  return progress;
}

export function submitQuiz(address: string, lessonId: string, score: number, isFirstAttempt: boolean): UserProgress {
  const progress = loadProgress(address);
  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = { lessonId, read: false, quizCompleted: false, quizPassed: false, xpEarned: 0, firstTryPass: false };
  }
  const lp = progress.lessons[lessonId];
  lp.quizCompleted = true;
  lp.quizScore = score;

  if (score >= PASS_THRESHOLD) {
    if (!lp.quizPassed) {
      // First time passing
      lp.quizPassed = true;
      lp.completedAt = new Date().toISOString();
      lp.firstTryPass = isFirstAttempt;
      progress.totalXP += XP_PASS_QUIZ;
      lp.xpEarned += XP_PASS_QUIZ;
      if (score === 100) {
        progress.totalXP += XP_PERFECT_BONUS;
        lp.xpEarned += XP_PERFECT_BONUS;
      }
      if (isFirstAttempt) {
        progress.totalXP += XP_FIRST_TRY_BONUS;
        lp.xpEarned += XP_FIRST_TRY_BONUS;
      }
    }
    // Update streak
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (progress.lastActiveDate === yesterday) {
        progress.streak += 1;
      } else if (progress.lastActiveDate !== today) {
        progress.streak = 1;
      }
      progress.lastActiveDate = today;
      if (progress.streak > 1) {
        progress.totalXP += XP_DAILY_STREAK;
      }
    }
  }

  progress.level = calcLevel(progress.totalXP);
  updateCounts(progress);
  saveProgress(progress);
  return progress;
}

function updateCounts(progress: UserProgress) {
  progress.completedLessons = Object.values(progress.lessons).filter(l => l.read).length;
  progress.completedQuizzes = Object.values(progress.lessons).filter(l => l.quizPassed).length;
}

export function mergeGuestProgress(walletAddress: string): UserProgress {
  const guest = loadProgress('guest');
  const wallet = loadProgress(walletAddress);
  // Merge guest lessons into wallet (wallet takes precedence)
  for (const [id, lp] of Object.entries(guest.lessons)) {
    if (!wallet.lessons[id]) {
      wallet.lessons[id] = lp;
    }
  }
  updateCounts(wallet);
  wallet.level = calcLevel(wallet.totalXP);
  saveProgress(wallet);
  // Clear guest
  localStorage.removeItem(getStorageKey('guest'));
  return wallet;
}
