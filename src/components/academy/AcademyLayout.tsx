'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, ChevronDown, Search, CheckCircle, Lock, Clock, Star, Award, Menu, X, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { courses, type Course, type Module, type Lesson } from '@/data/courses';
import { loadProgress, markLessonRead, submitQuiz, PASS_THRESHOLD, calcLevel, calcLevelProgress, XP_PASS_QUIZ } from '@/lib/progress';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Hash alias map: homepage slugs → lesson IDs
const HASH_ALIASES: Record<string, string> = {
  'crypto-basics': 'history-of-money',
  'bitcoin-deep-dive': 'what-is-bitcoin',
  'ethereum-evm': 'ethereum-vs-bitcoin',
  'defi-basics': 'dex-and-amm',
  'wallet-security': 'seed-phrase-safety',
  'build-web3': 'connect-wallet',
  'smart-contracts': 'setting-up',
  'verse-ecosystem': 'what-is-defi',
};

// Find lesson by ID across all courses
function findLesson(id: string): { course: Course; module: Module; lesson: Lesson; lessonIndex: number; moduleIndex: number; courseIndex: number } | null {
  for (let ci = 0; ci < courses.length; ci++) {
    for (let mi = 0; mi < courses[ci].modules.length; mi++) {
      for (let li = 0; li < courses[ci].modules[mi].lessons.length; li++) {
        if (courses[ci].modules[mi].lessons[li].id === id) {
          return { course: courses[ci], module: courses[ci].modules[mi], lesson: courses[ci].modules[mi].lessons[li], lessonIndex: li, moduleIndex: mi, courseIndex: ci };
        }
      }
    }
  }
  return null;
}

// Get flat lesson list for prev/next
function getFlatLessons(): Lesson[] {
  return courses.flatMap(c => c.modules.flatMap(m => m.lessons));
}

// ============================================================
// Sidebar
// ============================================================
function Sidebar({ activeId, onSelect, search, onSearch, completed, onClose }: {
  activeId: string | null; onSelect: (id: string) => void; search: string; onSearch: (q: string) => void;
  completed: Set<string>; onClose?: () => void;
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
      })).filter(m => m.lessons.length > 0),
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
                    <button type="button" onClick={() => toggle(openModules, mod.id, setOpenModules)}
                      className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5">
                      <ChevronRight className={`w-3 h-3 transition-transform ${openModules.has(mod.id) ? 'rotate-90' : ''}`} />
                      <span>{mod.title}</span>
                    </button>
                    {openModules.has(mod.id) && (
                      <div>
                        {mod.lessons.map(lesson => {
                          const isActive = activeId === lesson.id;
                          const done = completed.has(lesson.id);
                          return (
                            <button key={lesson.id} type="button" onClick={() => { onSelect(lesson.id); onClose?.(); }}
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
// Reader with react-markdown
// ============================================================
function Reader({ lesson, onStartQuiz, completed, progress, onNext, onPrev, hasNext, hasPrev }: {
  lesson: Lesson; onStartQuiz: (l: Lesson) => void; completed: Set<string>;
  progress: any; onNext: () => void; onPrev: () => void; hasNext: boolean; hasPrev: boolean;
}) {
  const done = completed.has(lesson.id);
  const ref = useRef<HTMLDivElement>(null);

  // Mark as read
  useEffect(() => {
    if (progress?.address) markLessonRead(progress.address, lesson.id);
  }, [lesson.id, progress?.address]);

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{lesson.title}</h1>
        {done && <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 inline-flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Completed</span>}
      </div>

      {/* Content with react-markdown */}
      <div className="prose prose-invert prose-purple max-w-none mb-8
        prose-headings:text-white prose-headings:font-bold
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base
        prose-li:text-gray-300 prose-li:text-sm md:prose-li:text-base
        prose-strong:text-white
        prose-code:text-purple-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
        prose-a:text-purple-400 hover:prose-a:text-purple-300
        prose-blockquote:border-purple-500/30 prose-blockquote:bg-purple-500/5 prose-blockquote:rounded-xl
        prose-table:text-sm
        prose-th:text-white prose-th:font-semibold
        prose-td:text-gray-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
      </div>

      {/* Quiz CTA */}
      {lesson.quiz.length > 0 && (
        <div className="glass p-6 rounded-xl text-center mb-8">
          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">{done ? 'Quiz Completed' : 'Ready for the Quiz?'}</h3>
          <p className="text-sm text-gray-400 mb-4">{done ? 'You have already passed this quiz.' : `Test your knowledge. ${PASS_THRESHOLD}% to pass. Wallet connection required.`}</p>
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
// Quiz Modal (fixed scoring + shuffle)
// ============================================================
function QuizModal({ lesson, onClose, onComplete }: { lesson: Lesson; onClose: () => void; onComplete: (id: string, score: number, firstTry: boolean) => void }) {
  const { isConnected } = useAccount();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  // Shuffle questions and options on start
  const shuffled = useMemo(() => {
    return lesson.quiz.map(q => {
      const options = [...q.options];
      const correctAnswer = options[q.correctIndex];
      // Fisher-Yates shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const newCorrectIndex = options.indexOf(correctAnswer);
      return { ...q, options, correctIndex: newCorrectIndex };
    });
  }, [lesson.id, started]); // Re-shuffle on retry

  const q = shuffled[currentQ];
  const isCorrect = selected === q.correctIndex;
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const a = [...answers];
    a[currentQ] = idx;
    setAnswers(a);
  };

  const handleNext = () => {
    if (currentQ < shuffled.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Finish quiz
      const correct = answers.filter((a, i) => a === shuffled[i].correctIndex).length;
      const score = Math.round((correct / shuffled.length) * 100);
      setFinished(true);
      onComplete(lesson.id, score, true);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
    setAnswers([]);
    // Re-shuffle by toggling started
    setStarted(false);
    setTimeout(() => setStarted(true), 0);
  };

  if (!isConnected) return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass p-8 rounded-t-2xl sm:rounded-2xl max-w-md w-full text-center">
        <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet Required</h3>
        <p className="text-gray-400 text-sm mb-6">Connect your wallet to take quizzes and earn XP.</p>
        <ConnectWalletButton className="w-full justify-center" />
        <button type="button" onClick={onClose} className="w-full mt-3 py-3 text-gray-400 hover:text-white text-sm">Cancel</button>
      </motion.div>
    </div>
  );

  if (finished) {
    const correct = answers.filter((a, i) => a === shuffled[i].correctIndex).length;
    const score = Math.round((correct / shuffled.length) * 100);
    const passed = score >= PASS_THRESHOLD;

    return (
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass p-8 rounded-t-2xl sm:rounded-2xl max-w-md w-full text-center">
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

  // Quiz questions
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass p-6 md:p-8 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto">
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
            {currentQ < shuffled.length - 1 ? 'Next' : 'Finish Quiz'}
          </button>
        )}
        {!showResult && (
          <button type="button" disabled className="w-full py-3 bg-white/5 rounded-xl text-gray-500 font-semibold cursor-not-allowed">
            Select an answer
          </button>
        )}
      </motion.div>
    </div>
  );
}

// ============================================================
// Main Academy Layout
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

  // Load progress
  useEffect(() => {
    const addr = isConnected && address ? address : 'guest';
    setProgress(loadProgress(addr));
  }, [isConnected, address]);

  // Resolve hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Try alias first
      const resolved = HASH_ALIASES[hash] || hash;
      setActiveId(resolved);
    } else {
      const first = courses[0]?.modules[0]?.lessons[0];
      if (first) setActiveId(first.id);
    }
  }, []);

  // Update URL hash
  useEffect(() => {
    if (activeId) window.history.replaceState(null, '', `#${activeId}`);
  }, [activeId]);

  const selectLesson = useCallback((id: string) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Refresh progress
    const addr = isConnected && address ? address : 'guest';
    setProgress(loadProgress(addr));
  }, [isConnected, address]);

  // Flat lessons for prev/next
  const flatLessons = useMemo(() => getFlatLessons(), []);
  const currentIndex = flatLessons.findIndex(l => l.id === activeId);
  const hasNext = currentIndex < flatLessons.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNext = useCallback(() => {
    if (hasNext) selectLesson(flatLessons[currentIndex + 1].id);
  }, [currentIndex, hasNext, flatLessons, selectLesson]);

  const handlePrev = useCallback(() => {
    if (hasPrev) selectLesson(flatLessons[currentIndex - 1].id);
  }, [currentIndex, hasPrev, flatLessons, selectLesson]);

  const handleQuizComplete = useCallback((lessonId: string, score: number, firstTry: boolean) => {
    const addr = isConnected && address ? address : 'guest';
    const updated = submitQuiz(addr, lessonId, score, firstTry);
    setProgress(updated);
    setQuizLesson(null);
  }, [isConnected, address]);

  const activeLesson = activeId ? findLesson(activeId) : null;

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      {quizLesson && <QuizModal lesson={quizLesson} onClose={() => setQuizLesson(null)} onComplete={handleQuizComplete} />}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg active:scale-95">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="pt-16 md:pt-20 flex">
        <aside className={`fixed lg:sticky top-16 md:top-20 left-0 h-[calc(100vh-4rem)] w-72 bg-[#0a0e27]/95 backdrop-blur-xl border-r border-white/5 z-30 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar activeId={activeId} onSelect={selectLesson} search={search} onSearch={setSearch} completed={completed} onClose={() => setSidebarOpen(false)} />
        </aside>
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-w-0 p-6 md:p-10 lg:p-12">
          {/* Hero */}
          <div className="mb-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-purple-400" /><span className="text-xs text-gray-300">VERSE Academy • Free Learning</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Learn Web3</h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">Master blockchain, DeFi, and Web3. All materials free. Wallet only for quizzes, certificates, and rewards.</p>
          </div>

          {activeLesson ? (
            <Reader
              lesson={activeLesson.lesson}
              onStartQuiz={setQuizLesson}
              completed={completed}
              progress={progress}
              onNext={handleNext}
              onPrev={handlePrev}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Select a lesson from the sidebar to begin.</p>
              <button type="button" onClick={() => selectLesson(courses[0]?.modules[0]?.lessons[0]?.id || '')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-sm">
                Start with first lesson
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
