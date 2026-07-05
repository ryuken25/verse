'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ModuleProgress {
  completed: boolean;
  quizScore: number | null;
  completedAt: string | null;
}

export interface CourseProgress {
  enrolled: boolean;
  enrolledAt: string | null;
  modules: Record<string, ModuleProgress>;
  certificateEarned: boolean;
}

export interface LearningState {
  courses: Record<string, CourseProgress>;
}

const STORAGE_KEY = 'verse_learning_progress';

function getStorageKey(address: string): string {
  return `${STORAGE_KEY}_${address.toLowerCase()}`;
}

export function useLearningProgress(address: string | undefined) {
  const [progress, setProgress] = useState<LearningState>({ courses: {} });
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (!address) { setLoaded(true); return; }
    try {
      const stored = localStorage.getItem(getStorageKey(address));
      if (stored) setProgress(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, [address]);

  // Save to localStorage
  const save = useCallback((newProgress: LearningState) => {
    if (!address) return;
    setProgress(newProgress);
    localStorage.setItem(getStorageKey(address), JSON.stringify(newProgress));
  }, [address]);

  const enrollCourse = useCallback((courseId: string) => {
    if (!address) return;
    const newProgress = { ...progress };
    if (!newProgress.courses[courseId]) {
      newProgress.courses[courseId] = {
        enrolled: true,
        enrolledAt: new Date().toISOString(),
        modules: {},
        certificateEarned: false,
      };
    }
    save(newProgress);
  }, [address, progress, save]);

  const completeModule = useCallback((courseId: string, moduleId: string, quizScore: number) => {
    if (!address) return;
    const newProgress = { ...progress };
    const course = newProgress.courses[courseId];
    if (!course) return;
    
    course.modules[moduleId] = {
      completed: true,
      quizScore,
      completedAt: new Date().toISOString(),
    };

    // Check if all modules completed
    const allCompleted = Object.values(course.modules).every(m => m.completed);
    if (allCompleted) course.certificateEarned = true;

    save(newProgress);
  }, [address, progress, save]);

  const getCourseProgress = useCallback((courseId: string): CourseProgress | null => {
    return progress.courses[courseId] || null;
  }, [progress]);

  const getModuleProgress = useCallback((courseId: string, moduleId: string): ModuleProgress | null => {
    return progress.courses[courseId]?.modules[moduleId] || null;
  }, [progress]);

  const getCompletionPercentage = useCallback((courseId: string, totalModules: number): number => {
    const course = progress.courses[courseId];
    if (!course || totalModules === 0) return 0;
    const completed = Object.values(course.modules).filter(m => m.completed).length;
    return Math.round((completed / totalModules) * 100);
  }, [progress]);

  return {
    progress,
    loaded,
    enrollCourse,
    completeModule,
    getCourseProgress,
    getModuleProgress,
    getCompletionPercentage,
  };
}
