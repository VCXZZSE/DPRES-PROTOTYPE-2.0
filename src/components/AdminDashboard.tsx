import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Shield, 
  BarChart3,
  Building2,
  Bell,
  FileText,
  Settings,
  LogOut,
  Menu,
  Activity,
  Award,
  MessageSquare,
  MapPin,
  AlertTriangle,
  Users,
  TrendingUp,
  Radio,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { schools, colleges, allInstitutions } from './shared/institutionsData';
import { useAlerts } from './shared/AlertContext';
import { DashboardOverview } from './admin/DashboardOverview';
import { InstitutionsTable } from './admin/InstitutionsTable';
import { ReportsAnalytics } from './admin/ReportsAnalytics';
import { EmergencyAlertsManager } from './admin/EmergencyAlertsManager';
import { AdminSettings } from './admin/AdminSettings';
import { CertificateManager } from './CertificateManager';
import { SMSIVRManager } from './SMSIVRManager';
import { CommunityOversight } from './admin/CommunityOversight';

interface AdminDashboardProps {
  adminData?: {
    email: string;
    password: string;
    displayName?: string;
  } | null;
  onLogout: () => void;
}

export function AdminDashboard({ adminData, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Always use dark mode for admin portal
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      // Keep dark mode when unmounting
    };
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Navigation handler for quick actions
  const handleNavigation = (section: string) => {
    const sectionMap: { [key: string]: string } = {
      'emergency-alerts': 'alerts',
      'sms-ivr': 'communications',
      'institutions': 'institutions',
      'reports': 'reports'
    };
    
    const targetTab = sectionMap[section];
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };

  const { getActiveAlerts } = useAlerts();
  const activeAlerts = getActiveAlerts();

  // Memoize stats calculation for better performance
  const overviewStats = useMemo(() => ({
    totalSchools: schools.length,
    totalColleges: colleges.length,
    totalStudents: allInstitutions.reduce((sum, inst) => sum + inst.students, 0),
    avgCompletion: Math.round(allInstitutions.reduce((sum, inst) => sum + inst.avgProgress, 0) / allInstitutions.length),
    activeSosAlerts: activeAlerts.length
  }), [activeAlerts.length]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get day of week separately for bigger display
  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-IN', { weekday: 'long' });
  };

  const getDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handler to go back to overview/home
  const handleGoHome = () => {
    setActiveTab('overview');
  };

  // Memoized navigation component for better performance
  const NavigationContent = useMemo(() => {
    const NavButtons = ({ mobile = false }) => (
      <div className="space-y-1.5">
        <button
          onClick={() => {
            setActiveTab('overview');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 group ${
            activeTab === 'overview'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <BarChart3 className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Command Center</span>
          {activeTab === 'overview' && (
            <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('institutions');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'institutions'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <Building2 className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Institutions</span>
          <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm">
            {allInstitutions.length}
          </Badge>
        </button>

        <button
          onClick={() => {
            setActiveTab('alerts');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'alerts'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <AlertTriangle className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Emergency Alerts</span>
          {activeAlerts.length > 0 && (
            <Badge className="ml-auto bg-red-500 text-white border-0 text-sm animate-pulse">
              {activeAlerts.length}
            </Badge>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('communications');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'communications'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <Radio className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">SMS/IVR</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('community');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'community'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <MessageSquare className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Community</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('certificates');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'certificates'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <Award className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Certificates</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('reports');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'reports'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <FileText className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Analytics</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('settings');
            mobile && setSidebarOpen(false);
          }}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-150 ${
            activeTab === 'settings'
              ? 'bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/20'
              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
          }`}
        >
          <Settings className="h-5 w-5 mr-3" />
          <span className="font-semibold text-base">Settings</span>
        </button>
      </div>
    );
    return NavButtons;
  }, [activeTab, activeAlerts.length, allInstitutions.length]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sophisticated Header */}
      <div className="border-b border-slate-800 bg-linear-to-r from-slate-900 via-slate-900 to-slate-900 sticky top-0 z-40 backdrop-blur-xl bg-opacity-90">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu trigger */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-slate-900 border-slate-800">
                  <div className="p-5">
                    <div className="mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-linear-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="font-bold text-white text-lg">SDMA Portal</h2>
                          <p className="text-xs text-slate-400">State Disaster Management</p>
                        </div>
                      </div>
                    </div>
                    <NavigationContent mobile={true} />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo and branding */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight flex items-center">
                    SDMA Command Center
                    <span className="ml-2 px-2 py-0.5 bg-red-600/20 border border-red-500/30 rounded text-xs text-red-400 font-normal">
                      LIVE
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">State Disaster Management Authority</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Enhanced Time Display - Bigger fonts for older users */}
              <div className="hidden md:flex flex-col items-end bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                <div className="text-orange-400 font-semibold text-lg">{getDayOfWeek(currentTime)}</div>
                <div className="text-slate-300 text-sm mb-1">{getDate(currentTime)}</div>
                <div className="text-white font-mono font-bold text-2xl tracking-wide">{formatTime(currentTime)}</div>
              </div>

              {/* Admin info */}
              {adminData?.displayName && (
                <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-base text-slate-200 font-medium">{adminData.displayName}</span>
                </div>
              )}

              {/* Status badge */}
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1.5 text-sm">
                <Activity className="h-4 w-4 mr-1.5" />
                Online
              </Badge>

              {/* Logout button - Bigger for easier clicking */}
              <Button 
                variant="outline" 
                size="default"
                onClick={onLogout}
                className="text-red-400 hover:text-red-300 border-red-900 hover:border-red-700 hover:bg-red-950/50 px-5 py-2 text-base font-semibold"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-r border-slate-800 bg-slate-900 min-h-screen sticky top-18.25">
          <div className="p-4">
            {/* Quick stats in sidebar */}
            <div className="mb-6 space-y-3">
              <div className="bg-linear-to-br from-blue-600/20 to-blue-700/10 border border-blue-600/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-blue-300 mb-1">Total Students</div>
                    <div className="text-2xl font-bold text-white">{overviewStats.totalStudents.toLocaleString()}</div>
                  </div>
                  <Users className="h-8 w-8 text-blue-400 opacity-50" />
                </div>
              </div>

              <div className="bg-linear-to-br from-orange-600/20 to-orange-700/10 border border-orange-600/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-orange-300 mb-1">Institutions</div>
                    <div className="text-2xl font-bold text-white">{allInstitutions.length}</div>
                  </div>
                  <Building2 className="h-8 w-8 text-orange-400 opacity-50" />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-800 mb-4" />

            <NavigationContent />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 max-w-full overflow-hidden bg-slate-950">
          {/* Home/Back Button - Always visible when not on overview */}
          {activeTab !== 'overview' && (
            <div className="mb-4">
              <Button
                onClick={handleGoHome}
                size="lg"
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-6 py-3 text-base font-semibold"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Back to Command Center
              </Button>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview">
              <DashboardOverview overviewStats={overviewStats} onNavigation={handleNavigation} />
            </TabsContent>

            <TabsContent value="institutions">
              <InstitutionsTable />
            </TabsContent>

            <TabsContent value="certificates">
              <CertificateManager />
            </TabsContent>

            <TabsContent value="communications">
              <SMSIVRManager />
            </TabsContent>

            <TabsContent value="community">
              <CommunityOversight />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 lg:space-y-6">
              <EmergencyAlertsManager />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsAnalytics />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 lg:space-y-6">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
