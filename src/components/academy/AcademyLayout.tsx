'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, ChevronDown, Search, CheckCircle, Lock, Clock, Star, Award, Menu, X, ExternalLink } from 'lucide-react';
import { useAccount } from 'wagmi';
import { courses, type Course, type Module, type Lesson, type QuizQuestion } from '@/data/courses';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ============================================================
// Sidebar
// ============================================================
function Sidebar({
  activeLessonId,
  onSelect,
  search,
  onSearch,
  completed,
  onClose,
}: {
  activeLessonId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearch: (q: string) => void;
  completed: Set<string>;
  onClose?: () => void;
}) {
  const [openCourses, setOpenCourses] = useState<Set<string>>(new Set([courses[0]?.id]));
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setter(next);
  };

  const filtered = useMemo(() => {
    if (!search) return courses;
    const q = search.toLowerCase();
    return courses.map((c) => ({
      ...c,
      modules: c.modules.map((m) => ({
        ...m,
        lessons: m.lessons.filter((l) => l.title.toLowerCase().includes(q) || l.content.toLowerCase().includes(q)),
      })).filter((m) => m.lessons.length > 0),
    })).filter((c) => c.modules.length > 0);
  }, [search]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search lessons..." value={search} onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {filtered.map((course) => (
          <div key={course.id}>
            <button type="button" onClick={() => toggle(openCourses, course.id, setOpenCourses)}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/5">
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openCourses.has(course.id) ? '' : '-rotate-90'}`} />
              <span>{course.title}</span>
            </button>
            {openCourses.has(course.id) && (
              <div className="ml-2">
                {course.modules.map((mod) => (
                  <div key={mod.id}>
                    <button type="button" onClick={() => toggle(openModules, mod.id, setOpenModules)}
                      className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5">
                      <ChevronRight className={`w-3 h-3 transition-transform ${openModules.has(mod.id) ? 'rotate-90' : ''}`} />
                      <span>{mod.title}</span>
                    </button>
                    {openModules.has(mod.id) && (
                      <div>
                        {mod.lessons.map((lesson) => {
                          const isActive = activeLessonId === lesson.id;
                          const done = completed.has(lesson.id);
                          return (
                            <button key={lesson.id} type="button" onClick={() => { onSelect(lesson.id); onClose?.(); }}
                              className={`w-full flex items-center space-x-2 px-6 py-2 rounded-lg text-xs transition-colors ${
                                isActive ? 'bg-purple-600/20 text-purple-300 border-l-2 border-purple-500' :
                                done ? 'text-green-400 hover:bg-white/5' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                              }`}>
                              {done ? <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" /> :
                               <div className="w-3 h-3 rounded-full border border-gray-600 flex-shrink-0" />}
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
// Lesson Reader
// ============================================================
function Reader({ lesson, onStartQuiz, completed }: { lesson: Lesson; onStartQuiz: (l: Lesson) => void; completed: Set<string> }) {
  const done = completed.has(lesson.id);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">{lesson.id}</span>
          {done && <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Completed</span>}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{lesson.title}</h1>
      </div>

      <div className="prose prose-invert max-w-none mb-8">
        {lesson.content.split('\n\n').map((block, i) => {
          const t = block.trim();
          if (!t) return null;
          if (t.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-white mt-8 mb-3">{t.slice(4)}</h3>;
          if (t.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">{t.slice(3)}</h2>;
          if (t.startsWith('- ')) {
            return (<ul key={i} className="space-y-2 my-4">{t.split('\n').filter(l => l.trim().startsWith('- ')).map((item, j) => (
              <li key={j} className="flex items-start space-x-2 text-sm text-gray-300"><span className="text-purple-400 mt-1">•</span><span>{item.slice(2)}</span></li>
            ))}</ul>);
          }
          if (/^\d+\./.test(t)) {
            return (<ol key={i} className="space-y-2 my-4 list-decimal list-inside">{t.split('\n').filter(l => /^\d+\./.test(l.trim())).map((item, j) => (
              <li key={j} className="text-sm text-gray-300">{item.replace(/^\d+\.\s*/, '')}</li>
            ))}</ol>);
          }
          if (t.startsWith('> ')) {
            return (<div key={i} className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 my-4"><p className="text-sm text-yellow-200/80">{t.replace(/^>\s*/gm, '')}</p></div>);
          }
          if (t.startsWith('```')) {
            const code = t.replace(/```\w*\n?/g, '').replace(/```$/g, '');
            return (<pre key={i} className="p-4 bg-white/5 rounded-xl my-4 overflow-x-auto"><code className="text-xs text-gray-300 font-mono">{code}</code></pre>);
          }
          return <p key={i} className="text-sm md:text-base text-gray-300 leading-relaxed my-4">{t}</p>;
        })}
      </div>

      {lesson.quiz.length > 0 && (
        <div className="glass p-6 rounded-xl text-center">
          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Ready for the Quiz?</h3>
          <p className="text-sm text-gray-400 mb-4">{done ? 'You have already completed this quiz.' : 'Test your knowledge. Wallet connection required.'}</p>
          <button type="button" onClick={() => onStartQuiz(lesson)} disabled={done}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${done ? 'bg-green-600/20 text-green-400 cursor-default' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25'}`}>
            {done ? '✓ Quiz Completed' : 'Start Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Quiz Modal
// ============================================================
function Quiz({ lesson, onClose, onComplete }: { lesson: Lesson; onClose: () => void; onComplete: (id: string, score: number) => void }) {
  const { isConnected } = useAccount();
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [ans, setAns] = useState<(number | null)[]>(new Array(lesson.quiz.length).fill(null));
  const [done, setDone] = useState(false);

  const q = lesson.quiz[qIdx];
  const ok = sel === q.correctIndex;

  const pick = (i: number) => { if (show) return; setSel(i); setShow(true); const a = [...ans]; a[qIdx] = i; setAns(a); };
  const next = () => {
    if (qIdx < lesson.quiz.length - 1) { setQIdx(qIdx + 1); setSel(null); setShow(false); }
    else { const c = ans.filter((a, i) => a === lesson.quiz[i].correctIndex).length; setDone(true); onComplete(lesson.id, Math.round((c / lesson.quiz.length) * 100)); }
  };

  if (!isConnected) return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-2xl max-w-md w-full text-center">
        <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Connect Wallet Required</h3>
        <p className="text-gray-400 text-sm mb-6">Connect your wallet to take quizzes and track progress.</p>
        <ConnectWalletButton className="w-full justify-center" />
        <button type="button" onClick={onClose} className="w-full mt-3 py-3 text-gray-400 hover:text-white text-sm">Cancel</button>
      </motion.div>
    </div>
  );

  if (done) {
    const c = ans.filter((a, i) => a === lesson.quiz[i].correctIndex).length;
    const score = Math.round((c / lesson.quiz.length) * 100);
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-2xl max-w-md w-full text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${score >= 70 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {score >= 70 ? <Award className="w-10 h-10 text-green-400" /> : <Star className="w-10 h-10 text-red-400" />}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{score >= 70 ? 'Congratulations!' : 'Keep Learning!'}</h3>
          <p className="text-gray-400 mb-4">Score: {score}% ({c}/{lesson.quiz.length})</p>
          <div className="w-full bg-white/10 rounded-full h-3 mb-6"><div className={`h-3 rounded-full ${score >= 70 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} /></div>
          <button type="button" onClick={onClose} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold">{score >= 70 ? 'Continue' : 'Try Again'}</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-6 md:p-8 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div><p className="text-xs text-gray-400">Quiz • {lesson.title}</p><p className="text-sm text-purple-400">Question {qIdx + 1} of {lesson.quiz.length}</p></div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-6"><div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((qIdx + 1) / lesson.quiz.length) * 100}%` }} /></div>
        <h4 className="text-lg font-semibold text-white mb-6">{q.question}</h4>
        <div className="space-y-3 mb-6">
          {q.options.map((opt, idx) => {
            let cls = 'bg-white/5 hover:bg-white/10 border-transparent';
            if (show) { if (idx === q.correctIndex) cls = 'bg-green-500/20 border-green-500'; else if (idx === sel && !ok) cls = 'bg-red-500/20 border-red-500'; }
            else if (idx === sel) cls = 'bg-purple-500/20 border-purple-500';
            return (
              <button key={idx} type="button" onClick={() => pick(idx)} disabled={show}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center space-x-3 ${cls}`}>
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs flex-shrink-0">
                  {show && idx === q.correctIndex ? <CheckCircle className="w-3 h-3 text-green-400" /> :
                   show && idx === sel && !ok ? <X className="w-3 h-3 text-red-400" /> : String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm text-gray-300">{opt}</span>
              </button>
            );
          })}
        </div>
        {show && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl mb-4 ${ok ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <p className={`text-sm font-medium mb-1 ${ok ? 'text-green-400' : 'text-red-400'}`}>{ok ? '✓ Correct!' : '✗ Incorrect'}</p>
            <p className="text-xs text-gray-400">{q.explanation}</p>
          </motion.div>
        )}
        {show && <button type="button" onClick={next} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold active:scale-95">{qIdx < lesson.quiz.length - 1 ? 'Next Question' : 'See Results'}</button>}
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
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [quizLesson, setQuizLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeLesson = useMemo(() => {
    if (!activeId) return null;
    for (const c of courses) for (const m of c.modules) for (const l of m.lessons) if (l.id === activeId) return l;
    return null;
  }, [activeId]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setActiveId(hash);
    else { const first = courses[0]?.modules[0]?.lessons[0]; if (first) setActiveId(first.id); }
  }, []);

  useEffect(() => { if (activeId) window.history.replaceState(null, '', `#${activeId}`); }, [activeId]);

  const selectLesson = useCallback((id: string) => { setActiveId(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  const startQuiz = useCallback((l: Lesson) => setQuizLesson(l), []);
  const completeQuiz = useCallback((id: string, score: number) => { if (score >= 70) setCompleted((p) => new Set([...p, id])); setQuizLesson(null); }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      {quizLesson && <Quiz lesson={quizLesson} onClose={() => setQuizLesson(null)} onComplete={completeQuiz} />}

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg active:scale-95">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="pt-16 md:pt-20 flex">
        <aside className={`fixed lg:sticky top-16 md:top-20 left-0 h-[calc(100vh-4rem)] w-72 bg-[#0a0e27]/95 backdrop-blur-xl border-r border-white/5 z-30 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar activeLessonId={activeId} onSelect={selectLesson} search={search} onSearch={setSearch} completed={completed} onClose={() => setSidebarOpen(false)} />
        </aside>
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-w-0 p-6 md:p-10 lg:p-12">
          <div className="mb-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-purple-400" /><span className="text-xs text-gray-300">VERSE Academy • Free Learning</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Learn Web3</h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">Master blockchain, DeFi, and Web3 development. All materials are free. Wallet only for quizzes and certificates.</p>
          </div>
          {activeLesson ? <Reader lesson={activeLesson} onStartQuiz={startQuiz} completed={completed} /> : (
            <div className="text-center py-20"><BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" /><p className="text-gray-400">Select a lesson from the sidebar.</p></div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
