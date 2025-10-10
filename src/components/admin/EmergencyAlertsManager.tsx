import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  AlertTriangle, 
  Bell, 
  Users, 
  Clock, 
  CheckCircle,
  Search,
  Eye,
  RefreshCw,
  MapPin,
  Activity,
  Archive
} from 'lucide-react';
import { useAlerts } from '../shared/AlertContext';
import { allInstitutions } from '../shared/institutionsData';

interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  type: 'earthquake' | 'fire' | 'flood' | 'cyclone' | 'weather' | 'general';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedRegions: string[];
  institutions: string[];
  status: 'active' | 'resolved' | 'monitoring';
  timestamp: string;
  estimatedAffectedPeople: number;
  responseTime?: string;
  actions: string[];
}

export function EmergencyAlertsManager() {
  const { } = useAlerts();
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'earthquake' | 'fire' | 'flood' | 'weather' | 'general'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    type: 'general' as const,
    severity: 'medium' as const,
    affectedRegions: [] as string[],
    institutions: [] as string[],
    estimatedAffectedPeople: 0
  });

  // Mock emergency alerts data
  const [emergencyAlerts] = useState<EmergencyAlert[]>([
    {
      id: 'alert-001',
      title: 'Cyclone Michaung Alert',
      description: 'Severe cyclonic storm approaching Chennai coast. Expected landfall in 6 hours.',
      type: 'cyclone',
      severity: 'critical',
      affectedRegions: ['Chennai', 'Tiruvallur', 'Chengalpattu'],
      institutions: ['DPS-001', 'KV-002', 'DAV-003'],
      status: 'active',
      timestamp: '2024-12-04T14:30:00Z',
      estimatedAffectedPeople: 45000,
      responseTime: '2 minutes',
      actions: ['Evacuation orders issued', 'Emergency shelters activated', 'Alert sent to all institutions']
    },
    {
      id: 'alert-002',
      title: 'Earthquake Tremors Detected',
      description: 'Minor earthquake (4.2 magnitude) detected near Bangalore. Aftershocks possible.',
      type: 'earthquake',
      severity: 'medium',
      affectedRegions: ['Bangalore Urban', 'Bangalore Rural'],
      institutions: ['APS-004', 'RIS-005'],
      status: 'monitoring',
      timestamp: '2024-12-04T09:15:00Z',
      estimatedAffectedPeople: 12000,
      responseTime: '45 seconds',
      actions: ['Seismic monitoring increased', 'Safety protocols reviewed']
    },
    {
      id: 'alert-003',
      title: 'Heavy Rainfall Warning',
      description: 'Heavy to very heavy rainfall expected in Mumbai region for next 24 hours.',
      type: 'weather',
      severity: 'high',
      affectedRegions: ['Mumbai', 'Thane', 'Navi Mumbai'],
      institutions: ['DPS-006', 'KV-007'],
      status: 'resolved',
      timestamp: '2024-12-03T18:00:00Z',
      estimatedAffectedPeople: 28000,
      responseTime: '1 minute',
      actions: ['Flood preparedness activated', 'Schools advised to suspend outdoor activities']
    }
  ]);

  const filteredAlerts = emergencyAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.affectedRegions.some(region => region.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const getActiveAlerts = () => filteredAlerts.filter(alert => alert.status === 'active');
  const getResolvedAlerts = () => filteredAlerts.filter(alert => alert.status === 'resolved');
  const getMonitoringAlerts = () => filteredAlerts.filter(alert => alert.status === 'monitoring');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'monitoring': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'earthquake': return '🌍';
      case 'fire': return '🔥';
      case 'flood': return '🌊';
      case 'cyclone': return '🌀';
      case 'weather': return '⛈️';
      default: return '⚠️';
    }
  };

  const handleCreateAlert = () => {
    // Mock alert creation
    const alertData = {
      ...newAlert,
      id: `alert-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'active' as const,
      responseTime: '1 minute',
      actions: ['Alert created and distributed']
    };
    
    console.log('Creating new emergency alert:', alertData);
    alert('Emergency alert created and sent to all selected institutions.');
    setShowCreateAlert(false);
    
    // Reset form
    setNewAlert({
      title: '',
      description: '',
      type: 'general',
      severity: 'medium',
      affectedRegions: [],
      institutions: [],
      estimatedAffectedPeople: 0
    });
  };

  const stats = {
    activeAlerts: getActiveAlerts().length,
    totalAlertsToday: emergencyAlerts.filter(alert => 
      new Date(alert.timestamp).toDateString() === new Date().toDateString()
    ).length,
    avgResponseTime: '1.5 min',
    totalAffected: emergencyAlerts.reduce((sum, alert) => sum + alert.estimatedAffectedPeople, 0)
  };

  const regions = ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Emergency Alerts Management</h2>
          <p className="text-sm text-muted-foreground">Monitor and manage emergency alerts across all institutions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="create-alert-description">
              <DialogHeader>
                <DialogTitle>Create Emergency Alert</DialogTitle>
                <DialogDescription id="create-alert-description">
                  Create and send emergency alerts to institutions
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Alert Type</Label>
                    <Select 
                      value={newAlert.type} 
                      onValueChange={(value: any) => setNewAlert(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="earthquake">🌍 Earthquake</SelectItem>
                        <SelectItem value="fire">🔥 Fire</SelectItem>
                        <SelectItem value="flood">🌊 Flood</SelectItem>
                        <SelectItem value="cyclone">🌀 Cyclone</SelectItem>
                        <SelectItem value="weather">⛈️ Weather</SelectItem>
                        <SelectItem value="general">⚠️ General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Severity</Label>
                    <Select 
                      value={newAlert.severity} 
                      onValueChange={(value: any) => setNewAlert(prev => ({ ...prev, severity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Alert Title</Label>
                  <Input
                    value={newAlert.title}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter alert title..."
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={newAlert.description}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter detailed alert description..."
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label>Affected Regions</Label>
                  <Select 
                    value=""
                    onValueChange={(value) => {
                      if (!newAlert.affectedRegions.includes(value)) {
                        setNewAlert(prev => ({
                          ...prev,
                          affectedRegions: [...prev.affectedRegions, value]
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add regions..." />
                    </SelectTrigger>
                    <SelectContent>
                      {regions
                        .filter(region => !newAlert.affectedRegions.includes(region))
                        .map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {newAlert.affectedRegions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newAlert.affectedRegions.map((region) => (
                        <Badge key={region} variant="secondary" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {region}
                          <button
                            onClick={() => setNewAlert(prev => ({
                              ...prev,
                              affectedRegions: prev.affectedRegions.filter(r => r !== region)
                            }))}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Target Institutions</Label>
                  <Select 
                    value=""
                    onValueChange={(value) => {
                      if (!newAlert.institutions.includes(value)) {
                        setNewAlert(prev => ({
                          ...prev,
                          institutions: [...prev.institutions, value]
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add institutions..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allInstitutions
                        .filter(inst => !newAlert.institutions.includes(inst.id))
                        .map((inst) => (
                        <SelectItem key={inst.id} value={inst.id}>
                          {inst.name} ({inst.code}) - {inst.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {newAlert.institutions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newAlert.institutions.map((instId) => {
                        const inst = allInstitutions.find(i => i.id === instId);
                        return (
                          <Badge key={instId} variant="secondary" className="flex items-center gap-1">
                            {inst?.name}
                            <button
                              onClick={() => setNewAlert(prev => ({
                                ...prev,
                                institutions: prev.institutions.filter(id => id !== instId)
                              }))}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Estimated Affected People</Label>
                  <Input
                    type="number"
                    value={newAlert.estimatedAffectedPeople}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, estimatedAffectedPeople: parseInt(e.target.value) || 0 }))}
                    placeholder="Enter estimated number..."
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowCreateAlert(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateAlert}
                    disabled={!newAlert.title || !newAlert.description || newAlert.institutions.length === 0}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Create & Send Alert
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-lg lg:text-2xl font-bold text-red-600">{stats.activeAlerts}</p>
              </div>
              <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Alerts Today</p>
                <p className="text-lg lg:text-2xl font-bold">{stats.totalAlertsToday}</p>
              </div>
              <Bell className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Avg Response</p>
                <p className="text-lg lg:text-2xl font-bold text-green-600">{stats.avgResponseTime}</p>
              </div>
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">People Affected</p>
                <p className="text-lg lg:text-2xl font-bold text-purple-600">{stats.totalAffected.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Alerts</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by title, description, or region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Alert Type</Label>
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Severity</Label>
              <Select value={filterSeverity} onValueChange={(value: any) => setFilterSeverity(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Alerts ({getActiveAlerts().length})</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring ({getMonitoringAlerts().length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({getResolvedAlerts().length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <AlertsTable alerts={getActiveAlerts()} onViewDetails={setSelectedAlert} />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <AlertsTable alerts={getMonitoringAlerts()} onViewDetails={setSelectedAlert} />
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <AlertsTable alerts={getResolvedAlerts()} onViewDetails={setSelectedAlert} />
        </TabsContent>
      </Tabs>

      {/* Alert Details Dialog */}
      {selectedAlert && (
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto" aria-describedby="alert-details-description">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">{getTypeIcon(selectedAlert.type)}</span>
                {selectedAlert.title}
              </DialogTitle>
              <DialogDescription id="alert-details-description">
                Emergency alert details and response information
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Alert Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Badge className={`${getStatusColor(selectedAlert.status)} capitalize`}>
                    {selectedAlert.status}
                  </Badge>
                </div>
                <div>
                  <Label>Severity</Label>
                  <Badge className={`${getSeverityColor(selectedAlert.severity)} capitalize`}>
                    {selectedAlert.severity}
                  </Badge>
                </div>
                <div>
                  <Label>Response Time</Label>
                  <p className="font-medium">{selectedAlert.responseTime}</p>
                </div>
                <div>
                  <Label>People Affected</Label>
                  <p className="font-medium">{selectedAlert.estimatedAffectedPeople.toLocaleString()}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label>Description</Label>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p>{selectedAlert.description}</p>
                </div>
              </div>

              {/* Affected Regions */}
              <div>
                <Label>Affected Regions</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.affectedRegions.map((region: string) => (
                    <Badge key={region} variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Affected Institutions */}
              <div>
                <Label>Affected Institutions ({selectedAlert.institutions.length})</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedAlert.institutions.map((instId: string) => {
                    const inst = allInstitutions.find(i => i.id === instId);
                    return (
                      <div key={instId} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div>
                          <p className="text-sm font-medium">{inst?.name}</p>
                          <p className="text-xs text-gray-600">{inst?.code} • {inst?.district}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Notified
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Response Actions */}
              <div>
                <Label>Response Actions</Label>
                <div className="space-y-2">
                  {selectedAlert.actions.map((action: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <p className="text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Alert
                </Button>
                {selectedAlert.status === 'active' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Resolved
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Reusable AlertsTable component
function AlertsTable({ alerts, onViewDetails }: { alerts: EmergencyAlert[], onViewDetails: (alert: EmergencyAlert) => void }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'monitoring': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'earthquake': return '🌍';
      case 'fire': return '🔥';
      case 'flood': return '🌊';
      case 'cyclone': return '🌀';
      case 'weather': return '⛈️';
      default: return '⚠️';
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">No alerts found</h3>
          <p className="text-gray-600 dark:text-gray-400">No emergency alerts match your current filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Alerts</CardTitle>
        <CardDescription>Monitor and manage emergency situations</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-64">Alert</TableHead>
                <TableHead className="min-w-24">Type</TableHead>
                <TableHead className="min-w-24">Severity</TableHead>
                <TableHead className="min-w-32">Affected Regions</TableHead>
                <TableHead className="min-w-24">Institutions</TableHead>
                <TableHead className="min-w-24">People Affected</TableHead>
                <TableHead className="min-w-24">Status</TableHead>
                <TableHead className="min-w-32">Timestamp</TableHead>
                <TableHead className="min-w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{getTypeIcon(alert.type)}</span>
                      <div>
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{alert.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getSeverityColor(alert.severity)} capitalize`}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {alert.affectedRegions.slice(0, 2).map((region) => (
                        <Badge key={region} variant="outline" className="text-xs block">
                          <MapPin className="h-2 w-2 mr-1" />
                          {region}
                        </Badge>
                      ))}
                      {alert.affectedRegions.length > 2 && (
                        <p className="text-xs text-gray-500">+{alert.affectedRegions.length - 2} more</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{alert.institutions.length}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{alert.estimatedAffectedPeople.toLocaleString()}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(alert.status)} capitalize`}>
                      {alert.status === 'active' && <Activity className="h-3 w-3 mr-1" />}
                      {alert.status === 'monitoring' && <Eye className="h-3 w-3 mr-1" />}
                      {alert.status === 'resolved' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(alert.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(alert)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}