import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BookOpen, 
  FileText, 
  Shield, 
  Zap, 
  Play,
  Clock,
  Users,
  CheckCircle,
  Lock,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
  institutionType: 'school' | 'college';
}

interface ModulesPageProps {
  userData: UserData | null;
}

export function ModulesPage({ userData }: ModulesPageProps) {
  const { t } = useLanguage();
  const [selectedFriend, setSelectedFriend] = useState<string>('');

  // Mock progress data
  const progressData = {
    student: {
      overall: 68,
      modules: 4,
      totalModules: 6,
      vrTrainings: 2,
      totalVrTrainings: 3,
      averageQuiz: 85
    },
    schoolAverage: {
      overall: 72,
      averageQuiz: 78
    },
    friends: [
      { name: 'Aditi Sharma', overall: 58, averageQuiz: 82 },
      { name: 'Rohan Patel', overall: 75, averageQuiz: 88 },
      { name: 'Priya Mehta', overall: 62, averageQuiz: 76 },
      { name: 'Arjun Singh', overall: 80, averageQuiz: 91 }
    ]
  };

  const selectedFriendData = progressData.friends.find(f => f.name === selectedFriend);

  const getProgressMessage = (studentScore: number, schoolAverage: number) => {
    if (studentScore > schoolAverage) {
      return t('modules.aheadOfAverage');
    } else if (studentScore >= schoolAverage - 10) {
      return t('modules.catchingUp');
    } else {
      return t('modules.keepGoing');
    }
  };

  const modules = [
    {
      id: 1,
      title: 'Guided Disaster Risk Management Plan',
      description: 'Learn to identify and assess disaster risks in your environment, and create effective management strategies.',
      progress: 100,
      duration: '45 min',
      students: 234,
      status: 'completed',
      type: 'video',
      topics: ['Risk Assessment', 'Vulnerability Analysis', 'Mitigation Strategies']
    },
    {
      id: 2,
      title: 'Operational Plans',
      description: 'Master emergency response protocols and learn to create actionable plans for various disaster scenarios.',
      progress: 75,
      duration: '60 min',
      students: 198,
      status: 'in-progress',
      type: 'interactive',
      topics: ['Emergency Protocols', 'Resource Management', 'Communication Plans']
    },
    {
      id: 3,
      title: 'Disaster Deduction & Management',
      description: 'Advanced techniques for predicting disasters and managing crises effectively when they occur.',
      progress: 30,
      duration: '90 min',
      students: 156,
      status: 'in-progress',
      type: 'mixed',
      topics: ['Early Warning Systems', 'Crisis Management', 'Recovery Planning']
    },
    {
      id: 4,
      title: 'Experimental Preparedness Training',
      description: 'Hands-on practical training for earthquake and fire scenarios with real-world simulations.',
      progress: 0,
      duration: '120 min',
      students: 89,
      status: 'locked',
      type: 'simulation',
      topics: ['Earthquake Response', 'Fire Safety', 'Evacuation Procedures']
    },
    {
      id: 5,
      title: 'Community Response Coordination',
      description: 'Learn to coordinate with local authorities and community groups during emergency situations.',
      progress: 0,
      duration: '75 min',
      students: 67,
      status: 'locked',
      type: 'interactive',
      topics: ['Community Engagement', 'Authority Coordination', 'Public Communication']
    },
    {
      id: 6,
      title: 'Recovery & Rehabilitation',
      description: 'Understand post-disaster recovery processes and how to help communities rebuild effectively.',
      progress: 0,
      duration: '90 min',
      students: 45,
      status: 'locked',
      type: 'mixed',
      topics: ['Recovery Planning', 'Rehabilitation Strategies', 'Long-term Sustainability']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
      case 'in-progress': return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300';
      case 'locked': return 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3.5 w-3.5" />;
      case 'in-progress': return <Zap className="h-3.5 w-3.5" />;
      case 'locked': return <Lock className="h-3.5 w-3.5" />;
      default: return <BookOpen className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl sm:text-4xl mb-2 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            {t('modules.title')}
          </h1>
          <p className="text-muted-foreground">{t('modules.subtitle')}</p>
        </div>

        {/* Progress Dashboard */}
        <div className="mb-8 animate-fadeInUp delay-100">
          <Card className="bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border border-blue-100 dark:border-blue-900/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/50 dark:to-blue-900/30 rounded-lg shadow-md">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">{t('modules.journey')}</CardTitle>
                  <CardDescription className="text-sm">
                    {getProgressMessage(progressData.student.overall, progressData.schoolAverage.overall)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Your Progress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                      {t('modules.yourProgress')}
                    </h3>
                    <span className="text-2xl">{progressData.student.overall}%</span>
                  </div>
                  <Progress value={progressData.student.overall} className="h-2" />
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-muted-foreground text-xs mb-1">{t('modules.modules')}</div>
                      <div className="font-medium">{progressData.student.modules}/{progressData.student.totalModules}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="text-muted-foreground text-xs mb-1">{t('modules.quizAverage')}</div>
                      <div className="font-medium">{progressData.student.averageQuiz}%</div>
                    </div>
                  </div>
                </div>

                {/* School/College Average */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                      {userData?.institutionType === 'college' ? t('modules.collegeAverage') : t('modules.schoolAverage')}
                    </h3>
                    <span className="text-2xl">{progressData.schoolAverage.overall}%</span>
                  </div>
                  <Progress value={progressData.schoolAverage.overall} className="h-2" />
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="text-muted-foreground text-xs mb-1">
                      {userData?.institutionType === 'college' ? t('modules.college') : t('modules.school')}
                    </div>
                    <div className="font-medium text-sm truncate">
                      {userData?.schoolName || (userData?.institutionType === 'college' ? 'Your College' : 'Your School')}
                    </div>
                  </div>
                </div>

                {/* Friend Comparison */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    {t('modules.friendComparison')}
                  </h3>
                  <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder={t('modules.selectFriend')} />
                    </SelectTrigger>
                    <SelectContent>
                      {progressData.friends.map((friend) => (
                        <SelectItem key={friend.name} value={friend.name}>
                          {friend.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedFriendData && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">{t('modules.overall')}</span>
                        <span className="font-medium">{selectedFriendData.overall}%</span>
                      </div>
                      <Progress value={selectedFriendData.overall} className="h-2" />
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-xs text-muted-foreground">
                        {progressData.student.overall > selectedFriendData.overall 
                          ? `${t('modules.aheadOfFriend').replace('{percent}', (progressData.student.overall - selectedFriendData.overall).toString())} ahead`
                          : `${t('modules.behindFriend').replace('{percent}', (selectedFriendData.overall - progressData.student.overall).toString())} behind`
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <Card 
              key={module.id}
              className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/50 dark:to-blue-900/30 rounded-lg text-sm font-medium shadow-sm text-blue-700 dark:text-blue-300">
                        {module.id}
                      </div>
                      <Badge className={`${getStatusColor(module.status)} border-0 text-xs`}>
                        {getStatusIcon(module.status)}
                        <span className="ml-1.5 capitalize">
                          {module.status === 'in-progress' ? t('modules.inProgress') : 
                           module.status === 'completed' ? t('modules.completed') : 
                           t('modules.locked')}
                        </span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 leading-tight">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{t('modules.progress')}</span>
                    <span className="font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>

                {/* Module Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <Clock className="h-4 w-4 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {module.duration.replace('min', t('modules.minutesShort'))}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                    <Users className="h-4 w-4 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {module.students}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center">
                    {module.type === 'video' && <FileText className="h-4 w-4 mx-auto mb-1 text-gray-500 dark:text-gray-400" />}
                    {module.type === 'interactive' && <Zap className="h-4 w-4 mx-auto mb-1 text-gray-500 dark:text-gray-400" />}
                    {module.type === 'mixed' && <BookOpen className="h-4 w-4 mx-auto mb-1 text-gray-500 dark:text-gray-400" />}
                    {module.type === 'simulation' && <Shield className="h-4 w-4 mx-auto mb-1 text-gray-500 dark:text-gray-400" />}
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {module.type === 'video' ? t('modules.video') : 
                       module.type === 'interactive' ? t('modules.interactive') : 
                       module.type === 'mixed' ? t('modules.mixed') : 
                       module.type === 'simulation' ? t('modules.simulation') : module.type}
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('modules.keyTopics')}:</div>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="text-xs bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {module.status === 'completed' ? (
                    <Button 
                      variant="outline" 
                      className="w-full group/btn border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 dark:text-green-300 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t('modules.reviewModule')}
                      <ChevronRight className="h-4 w-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  ) : module.status === 'in-progress' ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn animate-subtleGlow"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {t('modules.continueLearning')}
                      <ChevronRight className="h-4 w-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-700"
                      disabled
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {t('modules.completePrevious')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-8 animate-fadeInUp delay-400">
          <Card className="bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-slate-900 dark:via-orange-950/10 dark:to-slate-900 border border-orange-100 dark:border-orange-900/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/50 dark:to-orange-900/30 rounded-lg shadow-md">
                  <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-xl">
                  {t('modules.additionalResources')}
                </CardTitle>
              </div>
              <CardDescription>{t('modules.resourcesDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: FileText, label: t('modules.resourceLibrary'), color: 'blue' },
                  { icon: BookOpen, label: t('modules.bestPractices'), color: 'orange' },
                  { icon: Shield, label: t('modules.caseStudies'), color: 'purple' }
                ].map((resource, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="outline" 
                      className={`h-20 flex flex-col items-center justify-center gap-2 border-${resource.color}-200 dark:border-${resource.color}-800 bg-gradient-to-br from-${resource.color}-50 to-${resource.color}-100/50 dark:from-${resource.color}-950/30 dark:to-${resource.color}-900/20 hover:bg-${resource.color}-100 dark:hover:bg-${resource.color}-900/40 shadow-md hover:shadow-lg transition-all duration-300 w-full`}
                    >
                      <resource.icon className={`h-6 w-6 text-${resource.color}-600 dark:text-${resource.color}-400`} />
                      <span className={`font-medium text-sm text-${resource.color}-700 dark:text-${resource.color}-300`}>{resource.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
