'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, ChevronDown, Search, CheckCircle, Lock, Clock, Star, Award, Menu, X, ExternalLink, ArrowLeft, ArrowRight, GraduationCap, Target } from 'lucide-react';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { courses, type Course, type Module, type Lesson } from '@/data/courses';
import { loadProgress, markLessonRead, submitQuiz, PASS_THRESHOLD, calcLevel, calcLevelProgress, XP_PASS_QUIZ } from '@/lib/progress';
import { emitProgressUpdated } from '@/lib/progress-events';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Hash alias map
const HASH_ALIASES: Record<string, string> = {
  'crypto-basics': 'what-is-blockchain',
  'bitcoin-deep-dive': 'bitcoin-basics',
  'ethereum-evm': 'ethereum-smart-contracts',
  'defi-basics': 'understanding-defi',
  'wallet-security': 'wallets-security',
  'build-web3': 'solidity-basics',
  'smart-contracts': 'solidity-basics',
  'verse-ecosystem': 'understanding-defi',
};

// Node resolver
type AcademyNode =
  | { type: 'module'; course: Course; module: Module; courseIndex: number; moduleIndex: number }
  | { type: 'lesson'; course: Course; module: Module; lesson: Lesson; courseIndex: number; moduleIndex: number; lessonIndex: number };

function findAcademyNode(id: string): AcademyNode | null {
  for (let ci = 0; ci < courses.length; ci++) {
    for (let mi = 0; mi < courses[ci].modules.length; mi++) {
      const mod = courses[ci].modules[mi];
      if (mod.id === id) return { type: 'module', course: courses[ci], module: mod, courseIndex: ci, moduleIndex: mi };
      for (let li = 0; li < mod.lessons.length; li++) {
        if (mod.lessons[li].id === id) return { type: 'lesson', course: courses[ci], module: mod, lesson: mod.lessons[li], courseIndex: ci, moduleIndex: mi, lessonIndex: li };
      }
    }
  }
  return null;
}

function getFlatLessons(): Lesson[] {
  return courses.flatMap(c => c.modules.flatMap(m => m.lessons));
}

// ============================================================
// Custom markdown components
// ============================================================
const markdownComponents = {
  p: ({ children }: any) => <p className="text-gray-300 leading-8 text-[15px] md:text-base mb-5">{children}</p>,
  strong: ({ children }: any) => (
    <strong className="font-semibold text-white bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-[length:100%_2px] bg-no-repeat bg-left-bottom pb-0.5">{children}</strong>
  ),
  h2: ({ children }: any) => <h2 className="mt-12 mb-5 text-2xl md:text-3xl font-bold text-white tracking-tight">{children}</h2>,
  h3: ({ children }: any) => <h3 className="mt-8 mb-3 text-xl font-semibold text-white">{children}</h3>,
  table: ({ children }: any) => <div className="my-6 overflow-x-auto rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm">{children}</table></div>,
  th: ({ children }: any) => <th className="bg-white/5 px-4 py-3 text-left font-semibold text-white">{children}</th>,
  td: ({ children }: any) => <td className="px-4 py-3 text-gray-300 align-top">{children}</td>,
  ul: ({ children }: any) => <ul className="my-5 space-y-3 pl-0 list-none">{children}</ul>,
  ol: ({ children }: any) => <ol className="my-5 space-y-3 pl-0 list-decimal list-inside">{children}</ol>,
  li: ({ children }: any) => <li className="flex gap-3 text-gray-300 leading-7"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-300 shrink-0" /><span>{children}</span></li>,
  blockquote: ({ children }: any) => <blockquote className="my-6 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 text-gray-300">{children}</blockquote>,
  code: ({ inline, children, className }: any) => {
    if (inline) return <code className="rounded-md bg-purple-500/10 px-1.5 py-0.5 text-purple-200 text-sm">{children}</code>;
    return <pre className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#050816] p-4 text-sm text-gray-100"><code className={className}>{children}</code></pre>;
  },
};

// ============================================================
// Sidebar
// ============================================================
function Sidebar({ activeId, onSelectModule, onSelectLesson, search, onSearch, completed, onClose }: {
  activeId: string | null;
  onSelectModule: (id: string) => void;
  onSelectLesson: (id: string) => void;
  search: string;
  onSearch: (q: string) => void;
  completed: Set<string>;
  onClose?: () => void;
}) {
  const [openCourses, setOpenCourses] = useState<Set<string>>(new Set([courses[0]?.id]));
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const toggle = (s: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); setter(n);
  };

  const filtered = useMemo(() => {
    if (!search) return courses;
    const q = search.toLowerCase();
    return courses.map(c => ({
      ...c,
      modules: c.modules.map(m => ({
        ...m,
        lessons: m.lessons.filter(l => l.title.toLowerCase().includes(q) || l.content.toLowerCase().includes(q)),
      })).filter(m => m.lessons.length > 0 || m.title.toLowerCase().includes(q)),
    })).filter(c => c.modules.length > 0);
  }, [search]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search lessons..." value={search} onChange={e => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {filtered.map(course => (
          <div key={course.id}>
            <button type="button" onClick={() => toggle(openCourses, course.id, setOpenCourses)}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5">
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openCourses.has(course.id) ? '' : '-rotate-90'}`} />
              <span>{course.title}</span>
            </button>
            {openCourses.has(course.id) && (
              <div className="ml-2">
                {course.modules.map(mod => (
                  <div key={mod.id}>
                    <div className="flex items-center">
                      {/* Module title — click opens overview */}
                      <button type="button" onClick={() => { onSelectModule(mod.id); onClose?.(); }}
                        className={`flex-1 text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          activeId === mod.id ? 'text-purple-300 bg-purple-600/20 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}>
                        {mod.title}
                      </button>
                      {/* Chevron — expand/collapse only */}
                      <button type="button" onClick={(e) => { e.stopPropagation(); toggle(openModules, mod.id, setOpenModules); }}
                        className="p-1 rounded hover:bg-white/10" aria-label="Toggle lessons">
                        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${openModules.has(mod.id) ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {openModules.has(mod.id) && (
                      <div>
                        {mod.lessons.map(lesson => {
                          const isActive = activeId === lesson.id;
                          const done = completed.has(lesson.id);
                          return (
                            <button key={lesson.id} type="button" onClick={() => { onSelectLesson(lesson.id); onClose?.(); }}
                              className={`w-full flex items-center space-x-2 px-6 py-2 rounded-lg text-xs transition-colors ${
                                isActive ? 'bg-purple-600/20 text-purple-300 border-l-2 border-purple-500' :
                                done ? 'text-green-400 hover:bg-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                              }`}>
                              {done ? <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" /> : <div className="w-3 h-3 rounded-full border border-gray-600 flex-shrink-0" />}
                              <span className="truncate">{lesson.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Module Overview
// ============================================================
function ModuleOverview({ course, module: mod, completed, onSelectLesson }: {
  course: Course; module: Module; completed: Set<string>; onSelectLesson: (id: string) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-cyan-500/10 pointer-events-none" />
        <div className="relative z-10">
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 mb-3 inline-block">{course.title}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{mod.title}</h1>
          <p className="text-gray-400 text-sm md:text-base">{mod.description}</p>
        </div>
      </div>

      {/* Overview content */}
      {mod.overviewContent && (
        <div className="mb-8">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{mod.overviewContent}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Learning goals */}
      {mod.learningGoals && mod.learningGoals.length > 0 && (
        <div className="glass p-5 rounded-2xl mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center"><Target className="w-5 h-5 mr-2 text-purple-400" /> Learning Goals</h3>
          <ul className="space-y-2">
            {mod.learningGoals.map((g, i) => (
              <li key={i} className="flex items-start space-x-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" /><span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lesson list */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white mb-4">Lessons in this module</h3>
        {mod.lessons.map((lesson, i) => {
          const done = completed.has(lesson.id);
          return (
            <button key={lesson.id} type="button" onClick={() => onSelectLesson(lesson.id)}
              className="w-full text-left glass p-4 rounded-xl hover:border-purple-500/30 transition-all flex items-center space-x-4 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${done ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'}`}>
                {done ? <CheckCircle className="w-5 h-5" /> : String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">{lesson.title}</p>
                {lesson.summary && <p className="text-gray-500 text-xs mt-1">{lesson.summary}</p>}
                <div className="flex items-center space-x-3 mt-1">
                  {lesson.estimatedMinutes && <span className="text-[10px] text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{lesson.estimatedMinutes} min</span>}
                  {lesson.difficulty && <span className="text-[10px] text-gray-500">{lesson.difficulty}</span>}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// Quiz Prep Card
// ============================================================
function QuizPrepCard({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="my-8 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-5">
      <h3 className="mb-3 text-lg font-semibold text-white flex items-center"><GraduationCap className="w-5 h-5 mr-2 text-purple-400" /> Before you start the quiz</h3>
      <p className="text-sm text-gray-400 mb-3">Make sure you can explain:</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-300">
            <span className="text-cyan-300 mt-0.5">✓</span><span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// Reader
// ============================================================
function Reader({ lesson, module: mod, onStartQuiz, completed, progress, onNext, onPrev, hasNext, hasPrev }: {
  lesson: Lesson; module: Module; onStartQuiz: (l: Lesson) => void; completed: Set<string>;
  progress: any; onNext: () => void; onPrev: () => void; hasNext: boolean; hasPrev: boolean;
}) {
  const done = completed.has(lesson.id);

  useEffect(() => {
    if (progress?.address) markLessonRead(progress.address, lesson.id);
  }, [lesson.id, progress?.address]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Lesson hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-cyan-500/10 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">{mod.title}</span>
            {lesson.difficulty && <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">{lesson.difficulty}</span>}
            {done && <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Completed</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          {lesson.summary && <p className="text-gray-400 text-sm md:text-base mb-3">{lesson.summary}</p>}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            {lesson.estimatedMinutes && <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{lesson.estimatedMinutes} min read</span>}
            <span className="flex items-center"><Award className="w-3 h-3 mr-1" />+20 XP for reading</span>
            {lesson.quiz.length > 0 && <span className="flex items-center"><Star className="w-3 h-3 mr-1" />+100 XP for quiz</span>}
          </div>
        </div>
      </div>

      {/* Key ideas */}
      {lesson.keyIdeas && lesson.keyIdeas.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {lesson.keyIdeas.map((idea, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">{idea}</span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mb-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{lesson.content}</ReactMarkdown>
      </div>

      {/* Quiz prep */}
      {lesson.quizPrep && <QuizPrepCard items={lesson.quizPrep} />}

      {/* Quiz CTA */}
      {lesson.quiz.length > 0 && (
        <div className="glass p-6 rounded-xl text-center mb-8">
          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">{done ? 'Quiz Completed' : 'Ready for the Quiz?'}</h3>
          <p className="text-sm text-gray-400 mb-4">{done ? 'You have already passed this quiz.' : `${PASS_THRESHOLD}% required to pass. Wallet connection required.`}</p>
          <button type="button" onClick={() => onStartQuiz(lesson)} disabled={done}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${done ? 'bg-green-600/20 text-green-400 cursor-default' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25'}`}>
            {done ? '✓ Quiz Passed' : 'Start Quiz'}
          </button>
        </div>
      )}

      {/* Prev / Next */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <button type="button" onClick={onPrev} disabled={!hasPrev}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ArrowLeft className="w-4 h-4" /><span>Previous</span>
        </button>
        <button type="button" onClick={onNext} disabled={!hasNext}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <span>Next</span><ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Quiz Modal (same as before, with attempt model)
// ============================================================
function QuizModal({ lesson, onClose, onComplete }: { lesson: Lesson; onClose: () => void; onComplete: (id: string, score: number, firstTry: boolean) => void }) {
  const { isConnected, address } = useAccount();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const shuffled = useMemo(() => {
    return lesson.quiz.map(q => {
      const options = [...q.options];
      const correctAnswer = options[q.correctIndex];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return { ...q, options, correctIndex: options.indexOf(correctAnswer) };
    });
  }, [lesson.id, started]);

  const q = shuffled[currentQ];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const a = [...answers]; a[currentQ] = idx; setAnswers(a);
  };

  const handleNext = () => {
    if (currentQ < shuffled.length - 1) {
      setCurrentQ(currentQ + 1); setSelected(null); setShowResult(false);
    } else {
      const finalAnswers = [...answers]; finalAnswers[currentQ] = selected;
      const correct = finalAnswers.filter((a, i) => a === shuffled[i].correctIndex).length;
      const score = Math.round((correct / shuffled.length) * 100);
      setFinished(true);
      onComplete(lesson.id, score, true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0); setSelected(null); setShowResult(false); setFinished(false); setAnswers([]);
    setStarted(false); setTimeout(() => setStarted(true), 0);
  };

  if (!isConnected) return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#101322]/95 border border-white/15 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
        <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet Required</h3>
        <p className="text-gray-400 text-sm mb-6">Connect your wallet to take quizzes and earn XP.</p>
        <ConnectWalletButton className="w-full justify-center" />
        <button type="button" onClick={onClose} className="w-full mt-3 py-3 text-gray-400 hover:text-white text-sm">Cancel</button>
      </motion.div>
    </div>
  );

  if (finished) {
    const finalAnswers = [...answers]; finalAnswers[currentQ] = selected;
    const correct = finalAnswers.filter((a, i) => a === shuffled[i].correctIndex).length;
    const score = Math.round((correct / shuffled.length) * 100);
    const passed = score >= PASS_THRESHOLD;
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#101322]/95 border border-white/15 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {passed ? <Award className="w-10 h-10 text-green-400" /> : <Star className="w-10 h-10 text-red-400" />}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{passed ? 'Congratulations!' : 'Keep Learning!'}</h3>
          <p className="text-gray-400 mb-2">Score: {score}% ({correct}/{shuffled.length})</p>
          {passed && <p className="text-green-400 text-sm mb-4">+{XP_PASS_QUIZ} XP earned!</p>}
          {!passed && <p className="text-red-400 text-sm mb-4">Need {PASS_THRESHOLD}% to pass. Review the lesson and try again.</p>}
          <div className="w-full bg-white/10 rounded-full h-3 mb-6"><div className={`h-3 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} /></div>
          <div className="space-y-2">
            {passed ? (
              <button type="button" onClick={onClose} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold">Continue Learning</button>
            ) : (
              <>
                <button type="button" onClick={handleRetry} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold">Retry Quiz</button>
                <button type="button" onClick={onClose} className="w-full py-3 text-gray-400 hover:text-white text-sm">Review Lesson</button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#101322]/95 border border-white/15 p-6 md:p-8 rounded-2xl w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div><p className="text-xs text-gray-400">Quiz • {lesson.title}</p><p className="text-sm text-purple-400">Question {currentQ + 1} of {shuffled.length}</p></div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-6"><div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentQ + 1) / shuffled.length) * 100}%` }} /></div>
        <h4 className="text-lg font-semibold text-white mb-6">{q.question}</h4>
        <div className="space-y-3 mb-6">
          {q.options.map((opt, idx) => {
            let cls = 'bg-white/5 hover:bg-white/10 border-transparent';
            if (showResult) { if (idx === q.correctIndex) cls = 'bg-green-500/20 border-green-500'; else if (idx === selected && !isCorrect) cls = 'bg-red-500/20 border-red-500'; }
            return (
              <button key={idx} type="button" onClick={() => handleSelect(idx)} disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center space-x-3 ${cls}`}>
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs flex-shrink-0">
                  {showResult && idx === q.correctIndex ? <CheckCircle className="w-3 h-3 text-green-400" /> :
                   showResult && idx === selected && !isCorrect ? <X className="w-3 h-3 text-red-400" /> : String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm text-gray-300">{opt}</span>
              </button>
            );
          })}
        </div>
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</p>
            <p className="text-xs text-gray-400">{q.explanation}</p>
          </motion.div>
        )}
        {showResult && (
          <button type="button" onClick={handleNext} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold active:scale-95">
            {currentQ < shuffled.length - 1 ? 'Next Question' : 'Submit Attempt'}
          </button>
        )}
        {!showResult && (
          <button type="button" disabled className="w-full py-3 bg-white/5 rounded-xl text-gray-500 font-semibold cursor-not-allowed">Select an answer</button>
        )}
      </motion.div>
    </div>
  );
}

// ============================================================
// Main Academy
// ============================================================
export default function AcademyLayout() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [quizLesson, setQuizLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<any>(null);
  const { address, isConnected } = useAccount();
  const pathname = usePathname();

  const completed = useMemo(() => {
    return new Set(Object.values(progress?.lessons || {}).filter((l: any) => l.quizPassed).map((l: any) => l.lessonId));
  }, [progress]);

  useEffect(() => {
    const addr = isConnected && address ? address : 'guest';
    setProgress(loadProgress(addr));
  }, [isConnected, address]);

  // Resolve hash with hashchange listener
  useEffect(() => {
    const resolveHash = () => {
      const hash = window.location.hash.slice(1);
      const next = hash ? HASH_ALIASES[hash] || hash : courses[0]?.modules[0]?.id ?? null;
      setActiveId(next);
    };
    resolveHash();
    window.addEventListener('hashchange', resolveHash);
    return () => window.removeEventListener('hashchange', resolveHash);
  }, []);

  // Use pushState on user navigation (not replaceState) so back button works
  const updateHash = useCallback((id: string) => {
    setActiveId(id);
    window.history.pushState(null, '', `#${id}`);
  }, []);

  const selectModule = useCallback((id: string) => { updateHash(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [updateHash]);
  const selectLesson = useCallback((id: string) => {
    updateHash(id); window.scrollTo({ top: 0, behavior: 'smooth' });
    const addr = isConnected && address ? address : 'guest';
    setProgress(loadProgress(addr));
  }, [isConnected, address]);

  const flatLessons = useMemo(() => getFlatLessons(), []);
  const activeNode = activeId ? findAcademyNode(activeId) : null;

  // For prev/next, only consider lessons
  const currentLessonIndex = activeNode?.type === 'lesson' ? flatLessons.findIndex(l => l.id === activeNode.lesson.id) : -1;
  const hasNext = currentLessonIndex < flatLessons.length - 1;
  const hasPrev = currentLessonIndex > 0;

  const handleNext = useCallback(() => { if (hasNext) selectLesson(flatLessons[currentLessonIndex + 1].id); }, [currentLessonIndex, hasNext, flatLessons, selectLesson]);
  const handlePrev = useCallback(() => { if (hasPrev) selectLesson(flatLessons[currentLessonIndex - 1].id); }, [currentLessonIndex, hasPrev, flatLessons, selectLesson]);

  const handleQuizComplete = useCallback((lessonId: string, score: number, firstTry: boolean) => {
    const addr = isConnected && address ? address : 'guest';
    const oldProgress = loadProgress(addr);
    const result = submitQuiz(addr, lessonId, score, firstTry);
    setProgress(result.progress);
    if (result.deltaXP > 0) {
      emitProgressUpdated({
        address: addr,
        oldProgress,
        newProgress: result.progress,
        deltaXP: result.deltaXP,
        oldLevel: calcLevel(oldProgress.totalXP),
        newLevel: result.progress.level,
        leveledUp: result.leveledUp,
        lessonId,
        reason: 'quiz_passed',
      });
    }
    setQuizLesson(null);
  }, [isConnected, address]);

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      {quizLesson && <QuizModal lesson={quizLesson} onClose={() => setQuizLesson(null)} onComplete={handleQuizComplete} />}

      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg active:scale-95">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="pt-16 md:pt-20 flex">
        <aside className={`fixed lg:sticky top-16 md:top-20 left-0 h-[calc(100vh-4rem)] w-72 bg-[#0a0e27]/95 backdrop-blur-xl border-r border-white/5 z-30 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar activeId={activeId} onSelectModule={selectModule} onSelectLesson={selectLesson} search={search} onSearch={setSearch} completed={completed} onClose={() => setSidebarOpen(false)} />
        </aside>
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-w-0 p-6 md:p-10 lg:p-12">
          {/* Reading progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Progress: {completed.size} lessons completed</span>
              <span>{progress?.totalXP ?? 0} XP</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full transition-all"
                style={{ width: `${flatLessons.length > 0 ? (completed.size / flatLessons.length) * 100 : 0}%` }} />
            </div>
          </div>

          {activeNode?.type === 'module' && (
            <ModuleOverview course={activeNode.course} module={activeNode.module} completed={completed} onSelectLesson={selectLesson} />
          )}
          {activeNode?.type === 'lesson' && (
            <Reader
              lesson={activeNode.lesson}
              module={activeNode.module}
              onStartQuiz={setQuizLesson}
              completed={completed}
              progress={progress}
              onNext={handleNext}
              onPrev={handlePrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          )}
          {!activeNode && (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Select a module or lesson from the sidebar.</p>
              <button type="button" onClick={() => selectModule(courses[0]?.modules[0]?.id || '')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-sm">
                Start with first module
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
