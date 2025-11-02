import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Shield,
  BarChart3,
  Calendar,
  FileText,
  Download,
  LogOut,
  Bell,
  Activity,
  MapPin,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Medal,
  Users2,
  GraduationCap,
  ShieldCheck,
  ClipboardList,
  Siren,
  CheckCheck,
  Lightbulb,
  LineChart,
  PieChart as PieChartIcon,
  Globe,
  Flame,
  Wind,
  Droplets,
  Zap,
  Radio,
  Phone,
  Mail,
  ChevronRight,
  TrendingDown,
  AlertCircle,
  XCircle,
  Send,
  MessageSquare,
  Lock
} from 'lucide-react';
import { getInstitutionById } from './shared/institutionHelpers';
import { useIsMobile } from './hooks/useIsMobile';
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { toast } from 'sonner';

interface InstitutionAdminData {
  institutionId: string;
  adminName: string;
  role: string;
}

interface InstitutionAdminDashboardProps {
  adminData: InstitutionAdminData | null;
  onLogout: () => void;
}

export function InstitutionAdminDashboard({ adminData, onLogout }: InstitutionAdminDashboardProps) {
  const isMobile = useIsMobile(1024);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const institution = useMemo(() => {
    if (!adminData?.institutionId) return null;
    return getInstitutionById(adminData.institutionId);
  }, [adminData?.institutionId]);

  // Block mobile access completely
  if (isMobile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-slate-900">
              Desktop Access Required
            </CardTitle>
            <CardDescription className="text-base">
              Institution Admin Dashboard requires a desktop device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 mb-2">
                <strong>Access Restrictions:</strong>
              </p>
              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>Minimum screen width: 1024px</li>
                <li>Desktop or laptop computer</li>
                <li>Tablet in landscape mode (1024px+)</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-600">
                The Institution Admin Dashboard contains comprehensive data visualizations and management tools that require a larger display for optimal functionality and security.
              </p>
            </div>
            <Button onClick={onLogout} variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!institution || !adminData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Dashboard</CardTitle>
            <CardDescription>Unable to load institution data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onLogout} variant="outline" className="w-full">
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate key metrics
  const complianceScore = institution.compliance.complianceScore;
  const trainingCompletion = Math.round((institution.compliance.trainingModulesCompleted / institution.compliance.totalTrainingModules) * 100);
  const drillCompletion = Math.round((institution.compliance.safetyDrillsCompleted / institution.compliance.requiredSafetyDrills) * 100);
  const activeStudents = Math.round(institution.students * 0.92);
  const certifiedStudents = Math.round(institution.students * 0.68);

  // Mock data for charts
  const performanceTrend = [
    { month: 'Aug', score: 75, drills: 70, training: 80 },
    { month: 'Sep', score: 78, drills: 75, training: 82 },
    { month: 'Oct', score: 82, drills: 80, training: 85 },
    { month: 'Nov', score: 85, drills: 85, training: 87 },
    { month: 'Dec', score: 87, drills: 88, training: 89 },
    { month: 'Jan', score: 90, drills: 92, training: 91 }
  ];

  const moduleCompletion = [
    { name: 'Fire Safety', value: 92, color: '#ef4444' },
    { name: 'Earthquake', value: 88, color: '#8b5cf6' },
    { name: 'Flood Response', value: 85, color: '#3b82f6' },
    { name: 'First Aid', value: 90, color: '#10b981' },
    { name: 'Evacuation', value: 95, color: '#f59e0b' }
  ];

  const recentActivities = [
    { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: 'Fire drill completed - 98% participation', time: '2 hours ago' },
    { icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', text: '45 students completed First Aid module', time: '5 hours ago' },
    { icon: Award, color: 'text-purple-600', bg: 'bg-purple-50', text: 'Readiness certificate renewed', time: '1 day ago' },
    { icon: Users, color: 'text-orange-600', bg: 'bg-orange-50', text: '50 new students enrolled in training', time: '2 days ago' },
    { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Equipment inspection due in 7 days', time: '3 days ago' }
  ];

  const upcomingEvents = [
    { date: 'Jan 25', event: 'Earthquake Drill', participants: 1200, type: 'drill' },
    { date: 'Feb 05', event: 'Fire Safety Training', participants: 150, type: 'training' },
    { date: 'Feb 12', event: 'First Aid Workshop', participants: 80, type: 'training' },
    { date: 'Feb 20', event: 'Equipment Inspection', participants: 10, type: 'inspection' }
  ];

  // Quick Action handlers
  const handleExportReport = () => {
    toast.success('Report Export Started', {
      description: 'Your comprehensive report is being generated. Download will begin shortly.',
    });
  };

  const handleScheduleDrill = () => {
    toast.success('Drill Scheduled', {
      description: 'New safety drill scheduled for next week. All students will be notified.',
    });
  };

  const handleSendNotification = () => {
    toast.success('Notification Sent', {
      description: 'Alert sent to all students and staff members successfully.',
    });
  };

  const TrendIndicator = ({ value }: { value: number }) => {
    const isPositive = value >= 0;
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {Math.abs(value)}%
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo & Institution Name */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="relative">
                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                {institution.activeAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-slate-900 truncate">
                  {institution.name}
                </h1>
                <p className="text-xs text-slate-500">
                  {institution.district}, {institution.state}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="relative" onClick={() => toast.info('Notifications', { description: `${institution.activeAlerts} active alerts` })}>
                <Bell className="w-4 h-4" />
                {institution.activeAlerts > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => toast.info('Settings', { description: 'Settings panel coming soon' })}>
                <Settings className="w-4 h-4" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-2" />
              <Button size="sm" variant="ghost" onClick={onLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back, {adminData.adminName.split(' ')[0]}
          </h2>
          <p className="text-slate-600">
            {adminData.role} • Monitoring {institution.students.toLocaleString()} students
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Compliance Score',
              value: `${complianceScore}%`,
              change: '+5%',
              icon: Target,
              color: 'blue',
              progress: complianceScore
            },
            {
              label: 'Training Progress',
              value: `${trainingCompletion}%`,
              change: '+8%',
              icon: BookOpen,
              color: 'green',
              progress: trainingCompletion
            },
            {
              label: 'Safety Drills',
              value: `${drillCompletion}%`,
              change: '+12%',
              icon: Shield,
              color: 'orange',
              progress: drillCompletion
            },
            {
              label: 'Active Students',
              value: activeStudents.toLocaleString(),
              change: '+3%',
              icon: Users,
              color: 'purple',
              progress: (activeStudents / institution.students) * 100
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${metric.color}-50 flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <TrendIndicator value={parseInt(metric.change)} />
                  </div>
                  <h3 className="text-sm text-slate-600 mb-1">{metric.label}</h3>
                  <p className="text-2xl font-bold text-slate-900 mb-3">{metric.value}</p>
                  <Progress value={metric.progress} className="h-1.5" />
                </CardContent>
              </Card>
            </motion.div>
          ))}</div>

        {/* Quick Actions - Prominent Position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-linear-to-br from-blue-600 to-indigo-700 border-0 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <CardHeader className="relative">
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-blue-100">
                Manage your institution's safety operations
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  onClick={handleExportReport}
                  className="w-full justify-start gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm h-auto py-4"
                  size="lg"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold">Export Report</p>
                    <p className="text-xs text-blue-100 opacity-90">Download analytics</p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Button>

                <Button
                  onClick={handleScheduleDrill}
                  className="w-full justify-start gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm h-auto py-4"
                  size="lg"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Siren className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold">Schedule Drill</p>
                    <p className="text-xs text-blue-100 opacity-90">Plan safety exercise</p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Button>

                <Button
                  onClick={handleSendNotification}
                  className="w-full justify-start gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm h-auto py-4"
                  size="lg"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Send className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold">Send Notification</p>
                    <p className="text-xs text-blue-100 opacity-90">Alert all students</p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="gap-2">
              <Users className="w-4 h-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="drills" className="gap-2">
              <Activity className="w-4 h-4" />
              Drills & Training
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart Area - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Trend */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <LineChart className="w-5 h-5 text-blue-600" />
                          Performance Trend
                        </CardTitle>
                        <CardDescription>6-month overview of key metrics</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {['week', 'month', '6m'].map((period) => (
                          <Button
                            key={period}
                            size="sm"
                            variant={selectedPeriod === period ? 'default' : 'outline'}
                            onClick={() => setSelectedPeriod(period)}
                            className="text-xs"
                          >
                            {period === 'week' ? '7D' : period === 'month' ? '30D' : '6M'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={performanceTrend}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis domain={[0, 100]} stroke="#64748b" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorScore)"
                          name="Overall Score"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="drills"
                          stroke="#f97316"
                          name="Drills"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="training"
                          stroke="#10b981"
                          name="Training"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Module Completion */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5 text-purple-600" />
                      Training Module Completion
                    </CardTitle>
                    <CardDescription>Student completion rates by module type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {moduleCompletion.map((module) => (
                        <div key={module.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{module.name}</span>
                            <span className="text-sm font-semibold text-slate-900">{module.value}%</span>
                          </div>
                          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${module.value}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{ backgroundColor: module.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-6">
                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-3">
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <div className={`w-10 h-10 rounded-lg ${activity.bg} flex items-center justify-center shrink-0`}>
                              <activity.icon className={`w-5 h-5 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-900 mb-1">{activity.text}</p>
                              <p className="text-xs text-slate-500">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="text-center shrink-0">
                            <div className="text-xs font-semibold text-slate-600">
                              {event.date.split(' ')[0]}
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              {event.date.split(' ')[1]}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">{event.event}</p>
                            <p className="text-xs text-slate-500">{event.participants} participants</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* STUDENTS TAB */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Statistics</CardTitle>
                <CardDescription>Comprehensive student engagement and progress data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Users2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-blue-600">{institution.students.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 mt-1">Total Enrolled</p>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-green-600">{activeStudents.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 mt-1">Active Learners</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-purple-600">{certifiedStudents.toLocaleString()}</p>
                    <p className="text-sm text-slate-600 mt-1">Certified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DRILLS TAB */}
          <TabsContent value="drills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Drills & Training Overview</CardTitle>
                <CardDescription>Safety drill performance and training module completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-orange-50 rounded-lg">
                    <Shield className="w-12 h-12 text-orange-600 mb-3" />
                    <p className="text-3xl font-bold text-orange-600">{drillCompletion}%</p>
                    <p className="text-sm text-slate-600 mt-1">Safety Drills Completed</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {institution.compliance.safetyDrillsCompleted} of {institution.compliance.requiredSafetyDrills} required drills
                    </p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-lg">
                    <BookOpen className="w-12 h-12 text-green-600 mb-3" />
                    <p className="text-3xl font-bold text-green-600">{trainingCompletion}%</p>
                    <p className="text-sm text-slate-600 mt-1">Training Modules</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {institution.compliance.trainingModulesCompleted} of {institution.compliance.totalTrainingModules} modules completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REPORTS TAB */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>Download comprehensive reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Compliance Report', icon: ShieldCheck, desc: 'Full compliance status', action: handleExportReport },
                    { title: 'Student Progress', icon: GraduationCap, desc: 'Individual student data', action: handleExportReport },
                    { title: 'Drill Performance', icon: Activity, desc: 'Drill participation data', action: handleExportReport },
                    { title: 'Training Analytics', icon: BookOpen, desc: 'Module completion rates', action: handleExportReport }
                  ].map((report) => (
                    <Button
                      key={report.title}
                      variant="outline"
                      className="h-auto p-4 justify-start text-left hover:bg-blue-50 hover:border-blue-300"
                      onClick={report.action}
                    >
                      <div className="flex gap-3 items-center w-full">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                          <report.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900">{report.title}</p>
                          <p className="text-xs text-slate-500">{report.desc}</p>
                        </div>
                        <Download className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
