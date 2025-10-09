import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  School,
  Building2,
  Users,
  Target,
  AlertTriangle,
  Bell,
  Activity,
  TrendingUp,
  Shield,
  Radio,
  Database,
  Zap,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { allInstitutions } from '../shared/institutionsData';
import { useAlerts } from '../shared/AlertContext';

interface DashboardOverviewProps {
  overviewStats: {
    totalSchools: number;
    totalColleges: number;
    totalStudents: number;
    avgCompletion: number;
    activeSosAlerts: number;
  };
  onNavigation: (section: string) => void;
}

export function DashboardOverview({ overviewStats, onNavigation }: DashboardOverviewProps) {
  const { alerts, getActiveAlerts } = useAlerts();
  const activeAlerts = getActiveAlerts();
  
  // Filter SOS alerts from enrolled institutions only
  const sosAlerts = alerts.filter(alert => 
    allInstitutions.some(inst => inst.id === alert.institutionId)
  );

  return (
    <div className="space-y-6">
      {/* Hero Stats - Command Center Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Institutions */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Building2 className="h-6 w-6 text-blue-400" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                Active
              </Badge>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {overviewStats.totalSchools + overviewStats.totalColleges}
            </div>
            <div className="text-sm text-slate-400">Total Institutions</div>
            <div className="mt-2 flex items-center text-xs text-slate-500">
              <div className="flex items-center mr-3">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1" />
                {overviewStats.totalSchools} Schools
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1" />
                {overviewStats.totalColleges} Colleges
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Students */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {overviewStats.totalStudents.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Enrolled Students</div>
            <div className="mt-2 text-xs text-emerald-400">
              +{Math.round(overviewStats.totalStudents * 0.08)} this month
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30">
                <Target className="h-6 w-6 text-orange-400" />
              </div>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                {overviewStats.avgCompletion}%
              </Badge>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {overviewStats.avgCompletion}%
            </div>
            <div className="text-sm text-slate-400">Avg Completion Rate</div>
            <div className="mt-2 w-full bg-slate-700 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-orange-500 to-orange-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${overviewStats.avgCompletion}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className={`bg-gradient-to-br border-slate-700 shadow-xl ${
          overviewStats.activeSosAlerts > 0 
            ? 'from-red-950 to-red-900 border-red-700' 
            : 'from-slate-900 to-slate-800'
        }`}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                overviewStats.activeSosAlerts > 0
                  ? 'bg-red-500/30 border-red-500/50'
                  : 'bg-slate-700/50 border-slate-600'
              }`}>
                <AlertTriangle className={`h-6 w-6 ${
                  overviewStats.activeSosAlerts > 0 ? 'text-red-400 animate-pulse' : 'text-slate-500'
                }`} />
              </div>
              {overviewStats.activeSosAlerts > 0 && (
                <Zap className="h-5 w-5 text-red-400 animate-pulse" />
              )}
            </div>
            <div className={`text-3xl font-bold mb-1 ${
              overviewStats.activeSosAlerts > 0 ? 'text-red-400' : 'text-white'
            }`}>
              {overviewStats.activeSosAlerts}
            </div>
            <div className="text-sm text-slate-400">Active SOS Alerts</div>
            {overviewStats.activeSosAlerts > 0 && (
              <button
                onClick={() => onNavigation('emergency-alerts')}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
              >
                View all alerts →
              </button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Status & Map */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* System Operations Status */}
        <Card className="xl:col-span-2 bg-slate-900 border-slate-700 shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-400" />
                  System Operations Center
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-1">
                  Real-time monitoring and emergency response
                </CardDescription>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse" />
                All Systems Operational
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* System Status Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-600/10 to-green-700/5 p-4 rounded-xl border border-green-600/20">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div className="text-xs text-green-300 mb-1">Main System</div>
                <div className="text-sm font-semibold text-white">Online</div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-blue-700/5 p-4 rounded-xl border border-blue-600/20">
                <div className="flex items-center justify-between mb-2">
                  <Radio className="h-5 w-5 text-blue-400" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                </div>
                <div className="text-xs text-blue-300 mb-1">SMS Gateway</div>
                <div className="text-sm font-semibold text-white">Active</div>
              </div>

              <div className="bg-gradient-to-br from-orange-600/10 to-orange-700/5 p-4 rounded-xl border border-orange-600/20">
                <div className="flex items-center justify-between mb-2">
                  <Bell className="h-5 w-5 text-orange-400" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                </div>
                <div className="text-xs text-orange-300 mb-1">Alert System</div>
                <div className="text-sm font-semibold text-white">Ready</div>
              </div>

              <div className="bg-gradient-to-br from-purple-600/10 to-purple-700/5 p-4 rounded-xl border border-purple-600/20">
                <div className="flex items-center justify-between mb-2">
                  <Database className="h-5 w-5 text-purple-400" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                </div>
                <div className="text-xs text-purple-300 mb-1">Database</div>
                <div className="text-sm font-semibold text-white">Synced</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <button 
                  onClick={() => onNavigation('emergency-alerts')}
                  className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-lg p-4 border border-red-500/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/20"
                >
                  <div className="relative z-10">
                    <AlertTriangle className="h-5 w-5 text-white mb-2" />
                    <div className="text-sm font-semibold text-white">Emergency</div>
                    <div className="text-xs text-red-100">Send Alert</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => onNavigation('sms-ivr')}
                  className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg p-4 border border-blue-500/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="relative z-10">
                    <Radio className="h-5 w-5 text-white mb-2" />
                    <div className="text-sm font-semibold text-white">Broadcast</div>
                    <div className="text-xs text-blue-100">Send SMS</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => onNavigation('institutions')}
                  className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-lg p-4 border border-green-500/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20"
                >
                  <div className="relative z-10">
                    <Building2 className="h-5 w-5 text-white mb-2" />
                    <div className="text-sm font-semibold text-white">Institutions</div>
                    <div className="text-xs text-green-100">Manage</div>
                  </div>
                </button>
                
                <button 
                  onClick={() => onNavigation('reports')}
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-lg p-4 border border-purple-500/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="relative z-10">
                    <TrendingUp className="h-5 w-5 text-white mb-2" />
                    <div className="text-sm font-semibold text-white">Analytics</div>
                    <div className="text-xs text-purple-100">View Reports</div>
                  </div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Alerts */}
        <Card className="bg-slate-900 border-slate-700 shadow-xl">
          <CardHeader className="pb-4 border-b border-slate-800">
            <CardTitle className="text-lg text-white flex items-center">
              <Bell className="h-5 w-5 mr-2 text-orange-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {sosAlerts.length > 0 ? (
                sosAlerts.slice(0, 5).map((alert, index) => {
                  const institution = allInstitutions.find(inst => inst.id === alert.institutionId);
                  return (
                    <div 
                      key={index}
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
                          <span className="text-xs font-semibold text-red-400">SOS ALERT</span>
                        </div>
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-white font-medium mb-1">{institution?.name}</div>
                      <div className="text-xs text-slate-400">{alert.message}</div>
                      <div className="flex items-center mt-2 text-xs text-slate-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {institution?.district}, Kolkata
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-xs font-semibold text-green-400">SYSTEM UPDATE</span>
                    </div>
                    <div className="text-sm text-white mb-1">Database backup completed</div>
                    <div className="text-xs text-slate-400">All data synced successfully</div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Activity className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-xs font-semibold text-blue-400">TRAINING UPDATE</span>
                    </div>
                    <div className="text-sm text-white mb-1">New batch completion</div>
                    <div className="text-xs text-slate-400">142 students completed Phase 1</div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-xs font-semibold text-purple-400">ENROLLMENT</span>
                    </div>
                    <div className="text-sm text-white mb-1">New institution registered</div>
                    <div className="text-xs text-slate-400">St. Xavier's College - Kolkata</div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400 mr-2" />
                      <span className="text-xs font-semibold text-emerald-400">PERFORMANCE</span>
                    </div>
                    <div className="text-sm text-white mb-1">Completion rate increased</div>
                    <div className="text-xs text-slate-400">+8% improvement this week</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
