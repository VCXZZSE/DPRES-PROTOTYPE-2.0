import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  CheckCircle, 
  Lock, 
  Clock, 
  Play,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  TrendingUp,
  FileText,
  RotateCcw,
  Sparkles,
  Target,
  Award,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { toast } from 'sonner';
import { CommunityHub } from './CommunityHub';

interface LearningInterfaceProps {
  userData: any;
}

interface Task {
  id: number;
  titleKey: string;
  status: 'completed' | 'active' | 'locked';
  icon: any;
}

interface QuizQuestion {
  id: number;
  questionKey: string;
  optionKeys: string[];
  correctAnswer: number;
}

const moduleData = {
  'risk-management': {
    titleKey: 'module1.title',
    subtitleKey: 'module1.subtitle',
    videoId: 'jPzUCMCOqkA',
    duration: '45 min',
    tasks: [
      { id: 1, titleKey: 'module1.task1', status: 'completed' as const, icon: CheckCircle },
      { id: 2, titleKey: 'module1.task2', status: 'active' as const, icon: Play },
      { id: 3, titleKey: 'module1.task3', status: 'locked' as const, icon: Lock },
      { id: 4, titleKey: 'module1.task4', status: 'locked' as const, icon: Lock },
    ],
    quiz: {
      titleKey: 'module1.quizTitle',
      questions: [
        {
          id: 1,
          questionKey: 'module1.q1',
          optionKeys: [
            'module1.q1.opt1',
            'module1.q1.opt2',
            'module1.q1.opt3',
            'module1.q1.opt4'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          questionKey: 'module1.q2',
          optionKeys: [
            'module1.q2.opt1',
            'module1.q2.opt2',
            'module1.q2.opt3',
            'module1.q2.opt4'
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          questionKey: 'module1.q3',
          optionKeys: [
            'module1.q3.opt1',
            'module1.q3.opt2',
            'module1.q3.opt3',
            'module1.q3.opt4'
          ],
          correctAnswer: 2
        }
      ]
    },
    instructorNotesKey: 'module1.instructorNotes'
  },
  'operational-plans': {
    titleKey: 'module2.fullTitle',
    subtitleKey: 'module2.subtitle',
    videoId: 'OFDnPgYOC7g',
    duration: '60 min',
    tasks: [
      { id: 1, titleKey: 'module2.task1', status: 'completed' as const, icon: CheckCircle },
      { id: 2, titleKey: 'module2.task2', status: 'active' as const, icon: Play },
      { id: 3, titleKey: 'module2.task3', status: 'locked' as const, icon: Lock },
      { id: 4, titleKey: 'module2.task4', status: 'locked' as const, icon: Lock },
    ],
    quiz: {
      titleKey: 'module2.quizTitle',
      questions: [
        {
          id: 1,
          questionKey: 'module2.q1',
          optionKeys: [
            'module2.q1.opt1',
            'module2.q1.opt2',
            'module2.q1.opt3',
            'module2.q1.opt4'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          questionKey: 'module2.q2',
          optionKeys: [
            'module2.q2.opt1',
            'module2.q2.opt2',
            'module2.q2.opt3',
            'module2.q2.opt4'
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          questionKey: 'module2.q3',
          optionKeys: [
            'module2.q3.opt1',
            'module2.q3.opt2',
            'module2.q3.opt3',
            'module2.q3.opt4'
          ],
          correctAnswer: 1
        }
      ]
    },
    instructorNotesKey: 'module2.instructorNotes'
  },
  'disaster-deduction': {
    titleKey: 'module3.title',
    subtitleKey: 'module3.subtitle',
    videoId: 'K3ZLJf4gk7s',
    duration: '90 min',
    tasks: [
      { id: 1, titleKey: 'module3.task1', status: 'completed' as const, icon: CheckCircle },
      { id: 2, titleKey: 'module3.task2', status: 'active' as const, icon: Play },
      { id: 3, titleKey: 'module3.task3', status: 'locked' as const, icon: Lock },
      { id: 4, titleKey: 'module3.task4', status: 'locked' as const, icon: Lock },
    ],
    quiz: {
      titleKey: 'module3.quizTitle',
      questions: [
        {
          id: 1,
          questionKey: 'module3.q1',
          optionKeys: [
            'module3.q1.opt1',
            'module3.q1.opt2',
            'module3.q1.opt3',
            'module3.q1.opt4'
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          questionKey: 'module3.q2',
          optionKeys: [
            'module3.q2.opt1',
            'module3.q2.opt2',
            'module3.q2.opt3',
            'module3.q2.opt4'
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          questionKey: 'module3.q3',
          optionKeys: [
            'module3.q3.opt1',
            'module3.q3.opt2',
            'module3.q3.opt3',
            'module3.q3.opt4'
          ],
          correctAnswer: 2
        }
      ]
    },
    instructorNotesKey: 'module3.instructorNotes'
  }
};

export function LearningInterface({ userData }: LearningInterfaceProps) {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Check if we're in review mode
  const searchParams = new URLSearchParams(window.location.search);
  const isReviewMode = searchParams.get('mode') === 'review';
  
  const module = moduleData[moduleId as keyof typeof moduleData];
  
  const [videoWatched, setVideoWatched] = useState(isReviewMode);
  const [showQuiz, setShowQuiz] = useState(isReviewMode);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(isReviewMode);
  const [quizScore, setQuizScore] = useState(isReviewMode ? 100 : 0);
  const [currentTask, setCurrentTask] = useState(isReviewMode ? 4 : 2);
  const [moduleProgress, setModuleProgress] = useState(isReviewMode ? 100 : 25);
  const [showCommunityHub, setShowCommunityHub] = useState(false);

  useEffect(() => {
    // In review mode, set all correct answers
    if (isReviewMode && module) {
      const correctAnswers: { [key: number]: number } = {};
      module.quiz.questions.forEach((q) => {
        correctAnswers[q.id] = q.correctAnswer;
      });
      setQuizAnswers(correctAnswers);
    } else {
      // Simulate video end after 5 seconds for demo (normal mode)
      const timer = setTimeout(() => {
        setVideoWatched(true);
        setShowQuiz(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isReviewMode, module]);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">{t('learning.moduleNotFound')}</h2>
          <Button onClick={() => navigate('/modules')}>
            {t('learning.backToModules')}
          </Button>
        </div>
      </div>
    );
  }

  const handleQuizSubmit = () => {
    let correct = 0;
    module.quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = (correct / module.quiz.questions.length) * 100;
    setQuizScore(score);
    setQuizSubmitted(true);
    
    if (score >= 70) {
      toast.success(t('learning.quizPassed'), {
        description: t('learning.scoredWithUnlock').replace('{score}', score.toFixed(0)),
      });
      setModuleProgress(moduleProgress + 25);
    } else {
      toast.error(t('learning.quizFailed'), {
        description: t('learning.scoredNeedMore').replace('{score}', score.toFixed(0)),
      });
    }
  };

  const handleRetry = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Helper function to get task display status in review mode
  const getTaskStatus = (task: Task) => {
    if (isReviewMode) {
      return 'completed';
    }
    return task.status;
  };

  const getTaskIcon = (task: Task) => {
    if (isReviewMode) {
      return CheckCircle;
    }
    return task.icon;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Sidebar - Task Progress */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 shadow-lg overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h3 className="mb-1 text-gray-900 dark:text-white">
                {moduleId === 'operational-plans' 
                  ? t('learning.operationalPlanTasks') 
                  : moduleId === 'risk-management'
                  ? t('learning.riskManagementTasks')
                  : t('learning.disasterManagementTasks')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('learning.trackProgress')}</p>
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {module.tasks.map((task, index) => {
                const displayStatus = getTaskStatus(task);
                const TaskIcon = getTaskIcon(task);
                
                return (
                  <motion.button
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      displayStatus === 'active'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                        : displayStatus === 'completed'
                        ? 'border-green-200 bg-green-50 dark:bg-green-950/20'
                        : 'border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        displayStatus === 'active'
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                          : displayStatus === 'completed'
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-400'
                      }`}>
                        <TaskIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {t('learning.task')} {task.id}
                          </span>
                          {displayStatus === 'completed' && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {t(task.titleKey)}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Return Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/modules')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('learning.returnToOverview')}
            </Button>
          </div>
        </motion.div>

        {/* Center Panel - Video & Quiz */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => navigate('/modules')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('learning.backToModules')}
              </Button>
              <div className="flex items-start gap-3 mb-2">
                <h1 className="flex-1 bg-linear-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  {t(module.titleKey)}
                </h1>
                {isReviewMode && (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t('learning.reviewMode')}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{t(module.subtitleKey)}</p>
            </motion.div>

            {/* Video Player */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden shadow-xl border-blue-100 dark:border-blue-900/30">
                <div className="relative aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${module.videoId}?rel=0&modestbranding=1&controls=1`}
                    title={t(module.titleKey)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* No Skip Badge */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    {t('learning.noSkipping')}
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t('learning.videoProgress')}</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {videoWatched ? '100%' : '0%'}
                      </span>
                    </div>
                    <Progress value={videoWatched ? 100 : 0} className="h-2" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.location.reload()}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {t('learning.rewatchSection')}
                    </Button>
                    {isReviewMode ? (
                      <Button
                        className="flex-1 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                        onClick={() => navigate('/modules')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {t('learning.reviewComplete')}
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 bg-linear-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                        disabled={!videoWatched || !quizSubmitted || quizScore < 70}
                      >
                        {t('learning.nextTask')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>

                  {/* Community Discussion Button */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                      onClick={() => setShowCommunityHub(true)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {t('learning.joinCommunity')}
                    </Button>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                      {t('learning.communityDescription')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quiz Section */}
            <AnimatePresence>
              {showQuiz && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  <Card className="shadow-xl border-orange-100 dark:border-orange-900/30">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 dark:bg-orange-950/30 rounded-lg">
                          <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <CardTitle>{t(module.quiz.titleKey)}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('learning.unlockRequirement')}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {module.quiz.questions.map((question, index) => (
                        <div
                          key={question.id}
                          className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg space-y-3"
                        >
                          <p className="font-medium text-gray-900 dark:text-white">
                            {index + 1}. {t(question.questionKey)}
                          </p>
                          <RadioGroup
                            value={quizAnswers[question.id]?.toString()}
                            onValueChange={(value) =>
                              setQuizAnswers({ ...quizAnswers, [question.id]: parseInt(value) })
                            }
                            disabled={quizSubmitted}
                          >
                            {question.optionKeys.map((optionKey, optionIndex) => {
                              const isCorrect = optionIndex === question.correctAnswer;
                              const isSelected = quizAnswers[question.id] === optionIndex;
                              const showResult = quizSubmitted;

                              return (
                                <div
                                  key={optionIndex}
                                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                                    showResult
                                      ? isCorrect
                                        ? 'bg-green-50 dark:bg-green-950/20 border-2 border-green-500'
                                        : isSelected
                                        ? 'bg-red-50 dark:bg-red-950/20 border-2 border-red-500'
                                        : 'bg-white dark:bg-slate-800'
                                      : 'bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/20'
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={optionIndex.toString()}
                                    id={`q${question.id}-${optionIndex}`}
                                  />
                                  <Label
                                    htmlFor={`q${question.id}-${optionIndex}`}
                                    className="flex-1 cursor-pointer text-sm"
                                  >
                                    {t(optionKey)}
                                  </Label>
                                  {showResult && isCorrect && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </div>
                      ))}

                      {/* Quiz Results */}
                      {quizSubmitted && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <Alert className={quizScore >= 70 ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-red-500 bg-red-50 dark:bg-red-950/20'}>
                            <Award className={`w-4 h-4 ${quizScore >= 70 ? 'text-green-600' : 'text-red-600'}`} />
                            <AlertDescription>
                              <p className="font-medium mb-1">
                                {quizScore >= 70 ? '🎉 Congratulations!' : '📚 Keep Learning'}
                              </p>
                              <p className="text-sm">
                                You scored {quizScore.toFixed(0)}% ({module.quiz.questions.filter((q) => quizAnswers[q.id] === q.correctAnswer).length}/{module.quiz.questions.length} correct)
                                {quizScore >= 70 
                                  ? ' - Next task unlocked!' 
                                  : ' - You need 70% to continue. Try again!'}
                              </p>
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}

                      {/* Quiz Actions */}
                      <div className="flex gap-3">
                        {!quizSubmitted ? (
                          <Button
                            onClick={handleQuizSubmit}
                            disabled={Object.keys(quizAnswers).length < module.quiz.questions.length}
                            className="w-full bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Check Answers
                          </Button>
                        ) : quizScore < 70 ? (
                          <Button onClick={handleRetry} className="w-full" variant="outline">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Retry Quiz
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar - Module Stats */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-gray-50 dark:bg-slate-900 border-l border-gray-200 dark:border-slate-800 shadow-lg overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Module Progress */}
            <Card className="border-blue-200 dark:border-blue-900/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Module Progress</span>
                </div>
                <div className="space-y-2">
                  <Progress value={moduleProgress} className="h-3" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{moduleProgress}%</p>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Time */}
            <Card className="border-orange-200 dark:border-orange-900/30">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Estimated Time</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{module.duration}</p>
              </CardContent>
            </Card>

            {/* Instructor Notes */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">{t('learning.instructorNotes')}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(module.instructorNotesKey)}
                </p>
              </CardContent>
            </Card>

            {/* GIDM Resources */}
            <Card className="bg-linear-to-br from-blue-50 to-orange-50 dark:from-blue-950/20 dark:to-orange-950/20 border-blue-200 dark:border-blue-900/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-white">GIDM Resources</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('https://gidm.gujarat.gov.in/', '_blank')}
                >
                  View Resource Links
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen">
        <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/modules')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {moduleId === 'operational-plans' 
                  ? t('learning.operationalPlans') 
                  : moduleId === 'risk-management'
                  ? t('learning.riskManagement')
                  : t('learning.disasterManagement')}
              </h3>
              {isReviewMode && (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">
                  {t('learning.review')}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
              {moduleProgress}%
            </div>
          </div>

          {/* Task Chips */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
            {module.tasks.map((task) => {
              const displayStatus = getTaskStatus(task);
              return (
                <Badge
                  key={task.id}
                  variant={displayStatus === 'active' ? 'default' : 'outline'}
                  className={`shrink-0 ${
                    displayStatus === 'completed' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' 
                      : displayStatus === 'locked'
                      ? 'opacity-50'
                      : ''
                  }`}
                >
                  {t('learning.task')} {task.id}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${module.videoId}?rel=0&modestbranding=1&controls=1`}
                title={t(module.titleKey)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" />
                No Skip
              </div>
            </div>
          </Card>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 mb-1">
                  <Clock className="w-3 h-3" />
                  Time
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{module.duration}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 mb-1">
                  <TrendingUp className="w-3 h-3" />
                  Progress
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{moduleProgress}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Section (Collapsible) */}
          {showQuiz && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t(module.quiz.titleKey)}</CardTitle>
                <p className="text-xs text-muted-foreground">Answer all questions to proceed</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {module.quiz.questions.map((question, index) => (
                  <div key={question.id} className="space-y-2">
                    <p className="text-sm font-medium">
                      {index + 1}. {t(question.questionKey)}
                    </p>
                    <RadioGroup
                      value={quizAnswers[question.id]?.toString()}
                      onValueChange={(value) =>
                        setQuizAnswers({ ...quizAnswers, [question.id]: parseInt(value) })
                      }
                      disabled={quizSubmitted}
                      className="space-y-2"
                    >
                      {question.optionKeys.map((optionKey, optionIndex) => {
                        const isCorrect = optionIndex === question.correctAnswer;
                        const isSelected = quizAnswers[question.id] === optionIndex;
                        const showResult = quizSubmitted;

                        return (
                          <div
                            key={optionIndex}
                            className={`flex items-center space-x-2 p-2 rounded transition-all text-sm ${
                              showResult
                                ? isCorrect
                                  ? 'bg-green-50 dark:bg-green-950/20 border border-green-500'
                                  : isSelected
                                  ? 'bg-red-50 dark:bg-red-950/20 border border-red-500'
                                  : ''
                                : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <RadioGroupItem
                              value={optionIndex.toString()}
                              id={`mobile-q${question.id}-${optionIndex}`}
                            />
                            <Label
                              htmlFor={`mobile-q${question.id}-${optionIndex}`}
                              className="flex-1 cursor-pointer text-xs"
                            >
                              {t(optionKey)}
                            </Label>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                ))}

                {quizSubmitted && (
                  <Alert className={quizScore >= 70 ? 'border-green-500' : 'border-red-500'}>
                    <AlertDescription className="text-sm">
                      Score: {quizScore.toFixed(0)}% - {quizScore >= 70 ? 'Passed!' : 'Try again'}
                    </AlertDescription>
                  </Alert>
                )}

                {!quizSubmitted ? (
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < module.quiz.questions.length}
                    className="w-full"
                    size="sm"
                  >
                    Check Answers
                  </Button>
                ) : quizScore < 70 ? (
                  <Button onClick={handleRetry} className="w-full" size="sm" variant="outline">
                    Retry Quiz
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Next Task Button */}
          {isReviewMode ? (
            <Button
              className="w-full bg-linear-to-r from-green-600 to-green-700"
              onClick={() => navigate('/modules')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Review Complete
            </Button>
          ) : (
            <Button
              className="w-full bg-linear-to-r from-blue-600 to-orange-600"
              disabled={!videoWatched || !quizSubmitted || quizScore < 70}
            >
              Next Task
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Community Hub Full Screen */}
      {showCommunityHub && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900">
          <CommunityHub
            userData={userData}
            moduleFilter={module ? t(module.titleKey) : undefined}
            onClose={() => setShowCommunityHub(false)}
          />
        </div>
      )}
    </div>
  );
}
