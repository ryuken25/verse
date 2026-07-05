'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useConnect } from 'wagmi';
import { useLearningProgress } from '@/lib/learning-store';
import { BookOpen, Award, Clock, Users, Coins, Code2, TrendingUp, Shield, ArrowRight, CheckCircle, ChevronDown, ChevronRight, Lock, Wallet, Star, Trophy, Zap, X, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Minimal course structure for type safety (full data loaded from courses.ts)
interface QuizQ { question: string; options: string[]; correctIndex: number; explanation: string; }
interface Lesson { id: string; title: string; content: string; quiz: QuizQ[]; }
interface Mod { id: string; title: string; description: string; lessons: Lesson[]; }
interface Crs { id: string; title: string; description: string; difficulty: string; duration: string; students: string; rating: number; icon: any; color: string; prerequisites: string[]; modules: Mod[]; }

// We'll load courses dynamically
let COURSES: Crs[] = [];

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = { Beginner: 'bg-green-500/20 text-green-400', Intermediate: 'bg-yellow-500/20 text-yellow-400', Advanced: 'bg-red-500/20 text-red-400' };
  return <span className={`text-xs px-2 py-1 rounded-full ${colors[level] || colors.Beginner}`}>{level}</span>;
}

function QuizModal({ lesson, onClose, onComplete }: { lesson: Lesson; onClose: () => void; onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(lesson.quiz.length).fill(null));
  const [finished, setFinished] = useState(false);

  const q = lesson.quiz[currentQ];
  const isCorrect = selected === q.correctIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < lesson.quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const correct = answers.filter((a, i) => a === lesson.quiz[i].correctIndex).length;
      const score = Math.round((correct / lesson.quiz.length) * 100);
      setFinished(true);
      onComplete(score);
    }
  };

  if (finished) {
    const correct = answers.filter((a, i) => a === lesson.quiz[i].correctIndex).length;
    const score = Math.round((correct / lesson.quiz.length) * 100);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-2xl max-w-md w-full text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${score >= 70 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {score >= 70 ? <Trophy className="w-10 h-10 text-green-400" /> : <Zap className="w-10 h-10 text-red-400" />}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{score >= 70 ? 'Congratulations!' : 'Keep Learning!'}</h3>
          <p className="text-gray-400 mb-4">You scored {score}% ({correct}/{lesson.quiz.length})</p>
          <div className="w-full bg-white/10 rounded-full h-3 mb-6">
            <div className={`h-3 rounded-full ${score >= 70 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
          </div>
          <button type="button" onClick={onClose} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold">
            {score >= 70 ? 'Continue' : 'Try Again'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-6 md:p-8 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-gray-400">Quiz • {lesson.title}</p>
            <p className="text-sm text-purple-400">Question {currentQ + 1} of {lesson.quiz.length}</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
          <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentQ + 1) / lesson.quiz.length) * 100}%` }} />
        </div>

        <h4 className="text-lg font-semibold text-white mb-6">{q.question}</h4>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, idx) => {
            let cls = 'bg-white/5 hover:bg-white/10 border-transparent';
            if (showResult) {
              if (idx === q.correctIndex) cls = 'bg-green-500/20 border-green-500';
              else if (idx === selected && !isCorrect) cls = 'bg-red-500/20 border-red-500';
            } else if (idx === selected) {
              cls = 'bg-purple-500/20 border-purple-500';
            }
            return (
              <button type="button" key={idx} onClick={() => handleSelect(idx)} disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center space-x-3 ${cls}`}>
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs flex-shrink-0">
                  {showResult && idx === q.correctIndex ? <Check className="w-3 h-3 text-green-400" /> :
                   showResult && idx === selected && !isCorrect ? <X className="w-3 h-3 text-red-400" /> :
                   String.fromCharCode(65 + idx)}
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
            {currentQ < lesson.quiz.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </motion.div>
    </div>
  );
}

function LessonModal({ lesson, onClose, onComplete }: { lesson: Lesson; onClose: () => void; onComplete: (score: number) => void }) {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) return <QuizModal lesson={lesson} onClose={onClose} onComplete={onComplete} />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-6 md:p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="prose prose-invert max-w-none mb-8">
          {lesson.content.split('\n').map((p, i) => p.trim() ? <p key={i} className="text-gray-300 text-sm leading-relaxed mb-4">{p}</p> : null)}
        </div>
        <button type="button" onClick={() => setShowQuiz(true)} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold active:scale-95 flex items-center justify-center space-x-2">
          <span>Take Quiz</span><ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}

export default function AcademyPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { progress, loaded, enrollCourse, completeModule, getCourseProgress, getCompletionPercentage } = useLearningProgress(address);
  const [courses, setCourses] = useState<Crs[]>([]);
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    import('@/data/courses').then(mod => { setCourses(mod.courses); setCoursesLoaded(true); }).catch(() => setCoursesLoaded(true));
  }, []);

  const handleEnroll = (courseId: string) => {
    if (!isConnected) { const inj = connectors.find(c => c.id === 'injected'); if (inj) connect({ connector: inj }); return; }
    enrollCourse(courseId);
  };

  const handleLessonComplete = (courseId: string, moduleId: string, score: number) => {
    if (!address) return;
    completeModule(courseId, moduleId, score);
    setActiveLesson(null);
  };

  const iconMap: Record<string, any> = { BookOpen, Coins, Code2: BookOpen, Shield, TrendingUp, Wallet, Lock, Award, Zap, Star };

  if (!coursesLoaded) return <div className="min-h-screen bg-[#0a0e27]"><Navbar /><div className="pt-32 text-center text-white">Loading courses...</div></div>;

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      {activeLesson && <LessonModal lesson={activeLesson} onClose={() => setActiveLesson(null)} onComplete={(s) => {
        // Find which module this lesson belongs to
        for (const c of courses) {
          for (const m of c.modules) {
            if (m.lessons.find(l => l.id === activeLesson.id)) {
              handleLessonComplete(c.id, m.id, s);
              return;
            }
          }
        }
        setActiveLesson(null);
      }} />}

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">36,000+ Students • 46 Modules • 192 Quiz Questions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">VERSE <span className="gradient-text">Academy</span></h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">Master Web3 from zero to hero. Connect your wallet to track progress and earn NFT certificates.</p>
            {!isConnected && (
              <button type="button" onClick={() => { const inj = connectors.find(c => c.id === 'injected'); if (inj) connect({ connector: inj }); }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all inline-flex items-center space-x-2">
                <Wallet className="w-5 h-5" /><span>Connect Wallet to Start Learning</span>
              </button>
            )}
            {isConnected && (
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400 text-sm">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {courses.map((course, ci) => {
            const cp = getCourseProgress(course.id);
            const pct = getCompletionPercentage(course.id, course.modules.reduce((a, m) => a + m.lessons.length, 0));
            const isEnrolled = cp?.enrolled || false;
            const isExpanded = expandedCourse === course.id;
            const Icon = iconMap[course.icon] || BookOpen;

            return (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.1 }}>
                <div className={`glass rounded-2xl overflow-hidden transition-all ${isExpanded ? 'border-purple-500/30' : ''}`}>
                  {/* Course Header */}
                  <button type="button" onClick={() => setExpandedCourse(isExpanded ? null : course.id)} className="w-full p-5 md:p-6 text-left flex items-start space-x-4 hover:bg-white/5 transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1 flex-wrap gap-1">
                        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                        <DifficultyBadge level={course.difficulty} />
                        {isEnrolled && pct === 100 && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">✓ Completed</span>}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{course.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{course.duration}</span>
                        <span className="flex items-center"><Users className="w-3 h-3 mr-1" />{course.students}</span>
                        <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-yellow-400" />{course.rating}</span>
                        <span>{course.modules.length} modules • {course.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons</span>
                      </div>
                      {isEnrolled && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span><span>{pct}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 md:px-6 pb-6 space-y-4">
                          {!isEnrolled ? (
                            <button type="button" onClick={() => handleEnroll(course.id)}
                              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold active:scale-95 flex items-center justify-center space-x-2">
                              <Wallet className="w-4 h-4" /><span>Connect Wallet & Enroll — Free</span>
                            </button>
                          ) : null}

                          {course.prerequisites.length > 0 && (
                            <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                              <p className="text-xs text-yellow-400 font-medium mb-1">Prerequisites</p>
                              <p className="text-xs text-gray-400">{course.prerequisites.join(', ')}</p>
                            </div>
                          )}

                          {/* Modules */}
                          {course.modules.map((mod, mi) => {
                            const isModExpanded = expandedModule === mod.id;
                            const modLessons = mod.lessons;
                            const completedLessons = modLessons.filter(l => getCourseProgress(course.id)?.modules[l.id]?.completed).length;

                            return (
                              <div key={mod.id} className="rounded-xl bg-white/5 overflow-hidden">
                                <button type="button" onClick={() => setExpandedModule(isModExpanded ? null : mod.id)}
                                  className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-all">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">{mi + 1}</div>
                                    <div>
                                      <p className="text-sm font-medium text-white">{mod.title}</p>
                                      <p className="text-xs text-gray-500">{mod.description} • {modLessons.length} lessons</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {isEnrolled && <span className="text-xs text-gray-500">{completedLessons}/{modLessons.length}</span>}
                                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isModExpanded ? 'rotate-90' : ''}`} />
                                  </div>
                                </button>

                                <AnimatePresence>
                                  {isModExpanded && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                      <div className="px-4 pb-4 space-y-2">
                                        {modLessons.map((lesson, li) => {
                                          const isCompleted = getCourseProgress(course.id)?.modules[lesson.id]?.completed;
                                          const quizScore = getCourseProgress(course.id)?.modules[lesson.id]?.quizScore;
                                          return (
                                            <button type="button" key={lesson.id} onClick={() => isEnrolled && setActiveLesson(lesson)} disabled={!isEnrolled}
                                              className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all ${
                                                !isEnrolled ? 'opacity-50 cursor-not-allowed' :
                                                isCompleted ? 'bg-green-500/10 hover:bg-green-500/15' : 'bg-white/5 hover:bg-white/10'
                                              }`}>
                                              <div className="flex items-center space-x-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                  isCompleted ? 'bg-green-500' : 'bg-white/10'
                                                }`}>
                                                  {isCompleted ? <CheckCircle className="w-3 h-3 text-white" /> : <span className="text-xs text-gray-400">{li + 1}</span>}
                                                </div>
                                                <div>
                                                  <p className="text-sm text-white">{lesson.title}</p>
                                                  <p className="text-xs text-gray-500">{lesson.quiz.length} quiz questions</p>
                                                </div>
                                              </div>
                                              {isCompleted && quizScore !== null && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${(quizScore ?? 0) >= 70 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                  {quizScore}%
                                                </span>
                                              )}
                                              {!isEnrolled && <Lock className="w-3 h-3 text-gray-500" />}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-8 md:p-12 rounded-2xl text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Earn NFT Certificates</h3>
            <p className="text-gray-400 mb-6">Complete all modules in a course to earn an on-chain NFT certificate. Verified on Polygon blockchain.</p>
            <div className="inline-block p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <div className="w-48 h-36 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Award className="w-8 h-8 text-white mx-auto mb-1" />
                  <p className="text-white text-xs font-bold">VERSE ACADEMY</p>
                  <p className="text-white/70 text-[10px]">Certificate of Completion</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">Sample Certificate • On-chain verified</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
