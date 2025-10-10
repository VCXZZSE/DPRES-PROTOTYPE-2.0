import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { EmergencySOS } from './EmergencySOS';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  
  Phone, 
  MapPin, 
  Shield, 
  Clock,
  Users,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Bell
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAlerts } from './shared/AlertContext';
import { getInstitutionById } from './shared/institutionsData';

interface DashboardProps {
  userData?: {
    schoolName: string;
    schoolCode: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  } | null;
}

export function Dashboard({ userData }: DashboardProps) {
  const { t } = useLanguage();
  const { addAlert } = useAlerts();
  
  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: t('dashboard.alerts.heavyRainfall'),
      description: t('dashboard.alerts.rainfallDesc'),
      time: t('dashboard.alerts.timeAgo2h'),
      region: t('dashboard.alerts.chennaiDistrict')
    },
    {
      id: 2,
      type: 'warning',
      title: t('dashboard.alerts.earthquakeTremors'),
      description: t('dashboard.alerts.seismicDesc'),
      time: t('dashboard.alerts.timeAgo6h'),
      region: t('TamilNadu Region')
    }
  ]);

  // Student's learning progress data
  const [studentProgress] = useState({
    overallProgress: 72,
    modulesCompleted: 4,
    totalModules: 6,
    vrTrainingsCompleted: 2,
    totalVrTrainings: 3,
    latestQuizScore: 85
  });

  // Modal and panel states
  const [contactsSheetOpen, setContactsSheetOpen] = useState(false);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [sosConfirmed, setSosConfirmed] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  // Incident form state
  const [incidentForm, setIncidentForm] = useState({
    type: '',
    location: '',
    description: ''
  });

  // Emergency contacts data
  const emergencyContacts = [
    { name: t('dashboard.emergencyContacts.fire'), number: '101', icon: '🔥' },
    { name: t('dashboard.emergencyContacts.police'), number: '100', icon: '👮' },
    { name: t('dashboard.emergencyContacts.medical'), number: '108', icon: '🚑' },
    { name: t('dashboard.emergencyContacts.disaster'), number: '1070', icon: '🌊' }
  ];

  const handleSosConfirm = () => {
    // Find the institution details
    const institution = getInstitutionById(userData?.schoolCode || '');
    
    if (institution && userData) {
      // Add real SOS alert to AlertContext
      addAlert({
        institution: institution.name,
        institutionId: institution.id,
        district: institution.district,
        state: institution.state,
        studentName: userData.studentName,
        type: 'General Emergency',
        status: 'active',
        location: 'Student Dashboard',
        severity: 'high',
        description: `Emergency SOS alert triggered by student ${userData.studentName}`,
        coordinates: institution.coordinates
      });
    }
    
    setSosConfirmed(true);
    // Reset after 3 seconds
    setTimeout(() => setSosConfirmed(false), 3000);
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the institution details
    const institution = getInstitutionById(userData?.schoolCode || '');
    
    if (institution && userData && incidentForm.type && incidentForm.location && incidentForm.description) {
      // Map incident types to alert types
      const alertTypeMap: Record<string, any> = {
        'fire': 'Fire Alert',
        'earthquake': 'Earthquake Alert',
        'medical': 'Medical Emergency',
        'other': 'General Emergency'
      };
      
      // Add incident report as alert to AlertContext
      addAlert({
        institution: institution.name,
        institutionId: institution.id,
        district: institution.district,
        state: institution.state,
        studentName: userData.studentName,
        type: alertTypeMap[incidentForm.type] || 'General Emergency',
        status: 'pending',
        location: incidentForm.location,
        severity: incidentForm.type === 'fire' || incidentForm.type === 'medical' ? 'high' : 'medium',
        description: incidentForm.description,
        coordinates: institution.coordinates
      });
    }
    
    setIncidentSubmitted(true);
    setIncidentModalOpen(false);
    setIncidentForm({ type: '', location: '', description: '' });
    // Reset after 3 seconds
    setTimeout(() => setIncidentSubmitted(false), 3000);
  };

  const handleCall = (number: string) => {
    // In a real app, this would trigger the device's call functionality
    window.open(`tel:${number}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 lg:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Refined Header */}
        <motion.div 
          className="mb-10 lg:mb-12 animate-fadeInUp"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-2 break-words bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent text-[40px] font-bold">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-muted-foreground max-w-2xl break-words text-[20px]">{t('dashboard.overview')}</p>
        </motion.div>

        {/* Emergency Actions - Clean & Professional */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 lg:mb-12 animate-fadeInUp delay-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <EmergencySOS onConfirm={handleSosConfirm} variant="dashboard">
            <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Button 
                className="h-20 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full"
              >
                <Zap className="h-6 w-6 animate-pulse" />
                <span>{t('landing.sos')}</span>
              </Button>
            </motion.div>
          </EmergencySOS>
          
          <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Button 
              onClick={() => setContactsSheetOpen(true)}
              variant="outline"
              className="h-20 border-2 border-blue-200 dark:border-blue-900 hover:border-blue-500 dark:hover:border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-950/40 flex flex-col items-center justify-center gap-2 w-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">{t('landing.contacts')}</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Button 
              onClick={() => setIncidentModalOpen(true)}
              variant="outline"
              className="h-20 border-2 border-orange-200 dark:border-orange-900 hover:border-orange-500 dark:hover:border-orange-600 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-950/40 flex flex-col items-center justify-center gap-2 w-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              <span className="text-orange-700 dark:text-orange-300">{t('landing.report')}</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Success Messages */}
        {sosConfirmed && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {t('dashboard.sos.success')}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {incidentSubmitted && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                {t('dashboard.incident.success')}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Alerts - Clean Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="animate-fadeInUp delay-200"
            >
              <Card className="shadow-lg border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-white via-orange-50/30 to-white dark:from-slate-900 dark:via-orange-950/10 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/50 dark:to-orange-900/30 rounded-lg shadow-md">
                      <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-foreground break-words">
                        {t('dashboard.alerts.title')}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground break-words">
                        {t('dashboard.alerts.description')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="p-4 rounded-lg border border-orange-100 dark:border-orange-900/30 bg-gradient-to-r from-white to-orange-50/30 dark:from-slate-900 dark:to-orange-950/10 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/50 dark:to-orange-900/30 flex-shrink-0 shadow-sm">
                            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                              <h4 className="text-foreground break-words">{alert.title}</h4>
                              <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0">
                                <MapPin className="h-3 w-3 mr-1" />
                                {alert.region}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm break-words mb-2">
                              {alert.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Access - Minimalist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="animate-fadeInUp delay-300"
            >
              <Card className="shadow-lg border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/10 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/50 dark:to-blue-900/30 rounded-lg shadow-md">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-foreground">
                        {t('dashboard.quickAccess.title')}
                      </CardTitle>
                      <CardDescription>
                        {t('dashboard.quickAccess.description')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Shield, label: t('dashboard.quickAccess.safetyProtocols'), color: 'blue' },
                      { icon: MapPin, label: t('dashboard.quickAccess.evacuationRoutes'), color: 'green' },
                      { icon: Users, label: t('dashboard.quickAccess.emergencyDirectory'), color: 'purple' },
                      { icon: FileText, label: t('dashboard.quickAccess.incidentReports'), color: 'orange' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button 
                          variant="outline" 
                          className="h-20 flex flex-col items-center justify-center gap-2 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 w-full"
                        >
                          <item.icon className={`h-5 w-5 text-${item.color}-600 dark:text-${item.color}-500`} />
                          <span className="text-xs text-center text-muted-foreground">{item.label}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Student's Learning Progress - Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="animate-fadeInUp delay-200"
            >
              <Card className="shadow-lg border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-white via-purple-50/20 to-white dark:from-slate-900 dark:via-purple-950/10 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/50 dark:to-purple-900/30 rounded-lg shadow-md">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-foreground">
                        {t('dashboard.learningProgress')}
                      </CardTitle>
                      <CardDescription>
                        {t('dashboard.progressDesc')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl text-foreground mb-3">
                      {studentProgress.overallProgress}%
                    </div>
                    <Progress value={studentProgress.overallProgress} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { 
                        icon: CheckCircle, 
                        label: t('dashboard.modulesCompleted'), 
                        value: `${studentProgress.modulesCompleted}/${studentProgress.totalModules}`,
                        color: 'green'
                      },
                      { 
                        icon: Target, 
                        label: t('dashboard.vrTrainingsCompleted'), 
                        value: `${studentProgress.vrTrainingsCompleted}/${studentProgress.totalVrTrainings}`,
                        color: 'purple'
                      },
                      { 
                        icon: Award, 
                        label: t('dashboard.latestQuizScore'), 
                        value: `${studentProgress.latestQuizScore}%`,
                        color: 'orange'
                      }
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-500`} />
                          {stat.label}
                        </span>
                        <span className={`text-${stat.color}-600 dark:text-${stat.color}-500`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity - Refined */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="animate-fadeInUp delay-300"
            >
              <Card className="shadow-lg border-green-100 dark:border-green-900/30 bg-gradient-to-br from-white via-green-50/20 to-white dark:from-slate-900 dark:via-green-950/10 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950/50 dark:to-green-900/30 rounded-lg shadow-md">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-foreground">
                        {t('dashboard.recentActivity')}
                      </CardTitle>
                      <CardDescription>
                        {t('dashboard.recentActivityDesc')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { 
                      color: 'green', 
                      title: t('dashboard.recentActivity.module4'), 
                      desc: t('dashboard.recentActivity.keepProgress'),
                      time: t('dashboard.recentActivity.timeAgo1h'),
                      icon: BookOpen
                    },
                    { 
                      color: 'purple', 
                      title: t('dashboard.recentActivity.vrFire'), 
                      desc: t('dashboard.recentActivity.evacuationTime'),
                      time: t('dashboard.recentActivity.timeAgo2d'),
                      icon: Target
                    },
                    { 
                      color: 'orange', 
                      title: t('dashboard.recentActivity.quizEarthquake'), 
                      desc: t('dashboard.recentActivity.performance'),
                      time: t('dashboard.recentActivity.timeAgo3d'),
                      icon: Award
                    }
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                    >
                      <div className={`w-1.5 h-1.5 bg-${activity.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <activity.icon className={`h-4 w-4 text-${activity.color}-600 dark:text-${activity.color}-500 flex-shrink-0`} />
                          <p className="text-sm text-foreground truncate">{activity.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Contacts - Simple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="animate-fadeInUp delay-400"
            >
              <Card className="shadow-lg border-red-100 dark:border-red-900/30 bg-gradient-to-br from-white via-red-50/20 to-white dark:from-slate-900 dark:via-red-950/10 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-950/50 dark:to-red-900/30 rounded-lg shadow-md">
                      <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-foreground">
                        {t('dashboard.emergencyContacts')}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: t('dashboard.emergencyContacts.fire'), number: '101' },
                    { label: t('dashboard.emergencyContacts.police'), number: '100' },
                    { label: t('dashboard.emergencyContacts.medical'), number: '108' },
                    { label: t('dashboard.emergencyContacts.disaster'), number: '1070' }
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <span className="text-sm text-foreground">{contact.label}</span>
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.number}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Contacts Sheet */}
      <Sheet open={contactsSheetOpen} onOpenChange={setContactsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <span>{t('dashboard.emergencyContacts')}</span>
            </SheetTitle>
            <SheetDescription>
              {t('dashboard.emergencyContacts.tapToCall')}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-3">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{contact.icon}</span>
                      <div>
                        <p className="text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.number}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleCall(contact.number)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {t('dashboard.emergencyContacts.call')}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Report Incident Modal */}
      <Dialog open={incidentModalOpen} onOpenChange={setIncidentModalOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby="incident-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600 dark:text-orange-500" />
              <span>{t('dashboard.incident.title')}</span>
            </DialogTitle>
            <DialogDescription id="incident-dialog-description">
              {t('dashboard.incident.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleIncidentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="incident-type">{t('dashboard.incident.type')}</Label>
              <Select
                value={incidentForm.type}
                onValueChange={(value) => setIncidentForm(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger id="incident-type">
                  <SelectValue placeholder={t('dashboard.incident.selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">{t('dashboard.incident.fire')}</SelectItem>
                  <SelectItem value="earthquake">{t('dashboard.incident.earthquake')}</SelectItem>
                  <SelectItem value="medical">{t('dashboard.incident.medical')}</SelectItem>
                  <SelectItem value="other">{t('dashboard.incident.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('dashboard.incident.location')}</Label>
              <Input
                id="location"
                placeholder={t('dashboard.incident.locationPlaceholder')}
                value={incidentForm.location}
                onChange={(e) => setIncidentForm(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('dashboard.incident.descriptionLabel')}</Label>
              <Textarea
                id="description"
                placeholder={t('dashboard.incident.descriptionPlaceholder')}
                value={incidentForm.description}
                onChange={(e) => setIncidentForm(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('dashboard.incident.submit')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIncidentModalOpen(false)}
              >
                {t('common.cancel')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
