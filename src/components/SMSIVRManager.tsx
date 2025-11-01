import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Languages,
  Settings,
  Volume2,
  Mail,
  Calendar,
  Download
} from 'lucide-react';
import { allInstitutions, mockSMSTemplates, SMSIVRLog, SMSTemplate } from './shared/institutionsData';
import { useAlerts } from './shared/AlertContext';
import { useCommunication } from './shared/CommunicationContext';

interface BulkMessage {
  institutions: string[];
  messageType: 'sms' | 'ivr' | 'both';
  alertType: 'emergency' | 'evacuation' | 'weather' | 'drill' | 'general';
  title: string;
  message: string;
  language: 'en' | 'hi' | 'ta' | 'te' | 'mr';
  recipients: {
    students: boolean;
    parents: boolean;
    staff: boolean;
    emergency: boolean;
  };
  priority: 'high' | 'medium' | 'low';
  scheduleFor?: string;
}

export function SMSIVRManager() {
  const { alerts } = useAlerts();
  const { smsIVRLogs, addSMSIVRLog } = useCommunication();
  const [activeTab, setActiveTab] = useState('logs');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sms' | 'ivr' | 'both'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'sent' | 'sending' | 'failed'>('all');
  const [showBulkMessage, setShowBulkMessage] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<SMSIVRLog | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<SMSTemplate | null>(null);
  
  const [bulkMessage, setBulkMessage] = useState<BulkMessage>({
    institutions: [],
    messageType: 'both',
    alertType: 'general',
    title: '',
    message: '',
    language: 'en',
    recipients: {
      students: true,
      parents: true,
      staff: true,
      emergency: false
    },
    priority: 'medium'
  });

  // Filter logs
  const filteredLogs = smsIVRLogs.filter(log => {
    const matchesSearch = log.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || log.messageType === filterType;
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Statistics
  const stats = {
    totalSent: smsIVRLogs.reduce((sum, log) => sum + log.delivery.sent, 0),
    totalDelivered: smsIVRLogs.reduce((sum, log) => sum + log.delivery.delivered, 0),
    totalFailed: smsIVRLogs.reduce((sum, log) => sum + log.delivery.failed, 0),
    totalCost: smsIVRLogs.reduce((sum, log) => sum + log.cost, 0),
    averageDeliveryRate: smsIVRLogs.length > 0 ? Math.round(
      smsIVRLogs.reduce((sum, log) => sum + (log.delivery.delivered / log.delivery.sent * 100), 0) / smsIVRLogs.length
    ) : 0
  };

  const calculateEstimatedRecipients = () => {
    const selectedInstitutions = allInstitutions.filter(inst => 
      bulkMessage.institutions.includes(inst.id)
    );
    
    let total = 0;
    selectedInstitutions.forEach(inst => {
      if (bulkMessage.recipients.students) total += inst.contacts.students.length;
      if (bulkMessage.recipients.parents) total += inst.contacts.parents.length;
      if (bulkMessage.recipients.staff) total += inst.contacts.staff.length;
      if (bulkMessage.recipients.emergency) total += inst.contacts.emergency.length;
    });
    
    return total;
  };

  const calculateEstimatedCost = () => {
    const recipients = calculateEstimatedRecipients();
    const smsRate = 0.30; // ₹0.30 per SMS
    const ivrRate = 0.50; // ₹0.50 per IVR call
    
    if (bulkMessage.messageType === 'sms') return recipients * smsRate;
    if (bulkMessage.messageType === 'ivr') return recipients * ivrRate;
    if (bulkMessage.messageType === 'both') return recipients * (smsRate + ivrRate);
    return 0;
  };

  const handleBulkSend = () => {
    // Create SMS/IVR logs for each selected institution
    bulkMessage.institutions.forEach(institutionId => {
      const institution = allInstitutions.find(inst => inst.id === institutionId);
      if (!institution) return;

      const totalRecipients = calculateEstimatedRecipients();
      const estimatedDelivered = Math.floor(totalRecipients * 0.96); // 96% delivery rate
      const estimatedFailed = Math.floor(totalRecipients * 0.02); // 2% failure rate
      const estimatedPending = totalRecipients - estimatedDelivered - estimatedFailed;

      const logData = {
        institutionId: institution.id,
        institutionName: institution.name,
        messageType: bulkMessage.messageType,
        alertType: bulkMessage.alertType,
        title: bulkMessage.title,
        message: bulkMessage.message,
        language: bulkMessage.language,
        recipients: {
          students: bulkMessage.recipients.students ? institution.contacts.students.length : 0,
          parents: bulkMessage.recipients.parents ? institution.contacts.parents.length : 0,
          staff: bulkMessage.recipients.staff ? institution.contacts.staff.length : 0,
          emergency: bulkMessage.recipients.emergency ? institution.contacts.emergency.length : 0,
          total: totalRecipients
        },
        delivery: {
          sent: totalRecipients,
          delivered: estimatedDelivered,
          failed: estimatedFailed,
          pending: estimatedPending
        },
        responses: {
          acknowledged: Math.floor(totalRecipients * 0.65),
          callbacks: Math.floor(totalRecipients * 0.03),
          unsubscribed: 0
        },
        priority: bulkMessage.priority,
        status: 'sent' as const,
        cost: calculateEstimatedCost(),
        campaignId: `BULK-${institution.code}-${Date.now()}`
      };

      addSMSIVRLog(logData);
    });

    alert(`Bulk message sent to ${bulkMessage.institutions.length} institutions. Check communication logs for delivery status.`);
    setShowBulkMessage(false);
    
    // Reset form
    setBulkMessage({
      institutions: [],
      messageType: 'both',
      alertType: 'general',
      title: '',
      message: '',
      language: 'en',
      recipients: {
        students: true,
        parents: true,
        staff: true,
        emergency: false
      },
      priority: 'medium'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'sending': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'scheduled': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'sending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">SMS/IVR Communication Center</h2>
          <p className="text-sm text-muted-foreground">Manage bulk communications and alert delivery</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={showBulkMessage} onOpenChange={setShowBulkMessage}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Send Bulk Message
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="bulk-message-description">
              <DialogHeader>
                <DialogTitle>Send Bulk Message</DialogTitle>
                <DialogDescription id="bulk-message-description">
                  Send SMS/IVR messages to multiple institutions
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Institution Selection */}
                <div>
                  <Label>Select Institutions</Label>
                  <Select 
                    value=""
                    onValueChange={(value) => {
                      if (!bulkMessage.institutions.includes(value)) {
                        setBulkMessage(prev => ({
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
                        .filter(inst => !bulkMessage.institutions.includes(inst.id))
                        .map((inst) => (
                        <SelectItem key={inst.id} value={inst.id}>
                          {inst.name} ({inst.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Selected Institutions */}
                  {bulkMessage.institutions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {bulkMessage.institutions.map((instId) => {
                        const inst = allInstitutions.find(i => i.id === instId);
                        return (
                          <Badge key={instId} variant="secondary" className="flex items-center gap-1">
                            {inst?.name}
                            <button
                              onClick={() => setBulkMessage(prev => ({
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

                {/* Message Configuration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Message Type</Label>
                    <Select 
                      value={bulkMessage.messageType} 
                      onValueChange={(value: any) => setBulkMessage(prev => ({ ...prev, messageType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS Only</SelectItem>
                        <SelectItem value="ivr">IVR Only</SelectItem>
                        <SelectItem value="both">SMS + IVR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Alert Type</Label>
                    <Select 
                      value={bulkMessage.alertType} 
                      onValueChange={(value: any) => setBulkMessage(prev => ({ ...prev, alertType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="evacuation">Evacuation</SelectItem>
                        <SelectItem value="weather">Weather Alert</SelectItem>
                        <SelectItem value="drill">Safety Drill</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Language</Label>
                    <Select 
                      value={bulkMessage.language} 
                      onValueChange={(value: any) => setBulkMessage(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="mr">Marathi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Priority</Label>
                    <Select 
                      value={bulkMessage.priority} 
                      onValueChange={(value: any) => setBulkMessage(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <Label>Title</Label>
                  <Input
                    value={bulkMessage.title}
                    onChange={(e) => setBulkMessage(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter message title..."
                  />
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    value={bulkMessage.message}
                    onChange={(e) => setBulkMessage(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter your message..."
                    className="min-h-24"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Characters: {bulkMessage.message.length}/160 {bulkMessage.message.length > 160 && '(Will be sent as multiple SMS)'}
                  </p>
                </div>

                {/* Recipients */}
                <div>
                  <Label>Recipients</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(bulkMessage.recipients).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => setBulkMessage(prev => ({
                            ...prev,
                            recipients: { ...prev.recipients, [key]: checked }
                          }))}
                        />
                        <Label className="capitalize">{key}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Stats */}
                {bulkMessage.institutions.length > 0 && (
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{calculateEstimatedRecipients()}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Recipients</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{calculateEstimatedCost().toFixed(2)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Cost</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5-10</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Minutes ETA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowBulkMessage(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleBulkSend}
                    disabled={!bulkMessage.title || !bulkMessage.message || bulkMessage.institutions.length === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Messages Sent</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalSent.toLocaleString()}</p>
              </div>
              <Send className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Delivered</p>
                <p className="text-lg lg:text-2xl font-bold text-green-600">{stats.totalDelivered.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Failed</p>
                <p className="text-lg lg:text-2xl font-bold text-red-600">{stats.totalFailed}</p>
              </div>
              <XCircle className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-lg lg:text-2xl font-bold text-blue-600">{stats.averageDeliveryRate}%</p>
              </div>
              <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Total Cost</p>
                <p className="text-lg lg:text-2xl font-bold text-purple-600">₹{stats.totalCost.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logs">Communication Logs</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          {/* Search and Filter */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Search Messages</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by institution, title, or message..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="type-filter">Message Type</Label>
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sms">SMS Only</SelectItem>
                      <SelectItem value="ivr">IVR Only</SelectItem>
                      <SelectItem value="both">SMS + IVR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="sending">Sending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Logs Table */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Recent Communications</CardTitle>
              <CardDescription>View all sent messages and their delivery status</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-48">Institution</TableHead>
                      <TableHead className="min-w-32">Title</TableHead>
                      <TableHead className="min-w-20">Type</TableHead>
                      <TableHead className="min-w-20">Language</TableHead>
                      <TableHead className="min-w-24">Recipients</TableHead>
                      <TableHead className="min-w-32">Delivery Rate</TableHead>
                      <TableHead className="min-w-20">Status</TableHead>
                      <TableHead className="min-w-28">Timestamp</TableHead>
                      <TableHead className="min-w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{log.institutionName}</p>
                            <Badge className={`${getPriorityColor(log.priority)} text-xs mt-1`}>
                              {log.priority}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium truncate max-w-32 text-gray-900 dark:text-gray-100">{log.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{log.alertType}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {log.messageType === 'sms' && <MessageSquare className="h-4 w-4 text-blue-500" />}
                            {log.messageType === 'ivr' && <Phone className="h-4 w-4 text-green-500" />}
                            {log.messageType === 'both' && (
                              <>
                                <MessageSquare className="h-3 w-3 text-blue-500" />
                                <Phone className="h-3 w-3 text-green-500" />
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                            {log.language.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900 dark:text-gray-100">
                          {log.recipients.total.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={(log.delivery.delivered / log.delivery.sent) * 100} 
                              className="w-16 h-2" 
                            />
                            <span className="text-sm font-medium">
                              {Math.round((log.delivery.delivered / log.delivery.sent) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(log.status)} flex items-center gap-1`}>
                            {getStatusIcon(log.status)}
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
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
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          {/* Templates Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Message Templates</h3>
              <p className="text-sm text-gray-600">Create and manage reusable message templates</p>
            </div>
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg" aria-describedby="template-dialog-description">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription id="template-dialog-description">
                    Create a reusable message template for quick communication
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input placeholder="Enter template name..." />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <Select defaultValue="general">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="evacuation">Evacuation</SelectItem>
                          <SelectItem value="weather">Weather Alert</SelectItem>
                          <SelectItem value="drill">Safety Drill</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="te">Telugu</SelectItem>
                          <SelectItem value="mr">Marathi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Template Message</Label>
                    <Textarea 
                      placeholder="Enter template message with variables like {SCHOOL_NAME}, {TIME}, etc..."
                      className="min-h-24"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use variables like {'{SCHOOL_NAME}'}, {'{TIME}'}, {'{ALERT_TYPE}'} for dynamic content
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Active Template</Label>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowTemplateDialog(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button className="flex-1">
                      Create Template
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSMSTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs capitalize ${
                          template.type === 'emergency' ? 'bg-red-100 text-red-700' :
                          template.type === 'weather' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {template.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.language.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <Switch checked={template.isActive} />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{template.template}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{template.characterCount} chars</span>
                    <span>Used {template.usageCount} times</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SMS Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  SMS Configuration
                </CardTitle>
                <CardDescription>Configure SMS delivery settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable SMS</Label>
                    <p className="text-sm text-gray-600">Allow SMS message delivery</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>SMS Rate (per message)</Label>
                  <Input value="₹0.30" readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Daily SMS Limit</Label>
                  <Input defaultValue="50,000" />
                </div>
                <div>
                  <Label>Sender ID</Label>
                  <Input defaultValue="DPRES" />
                </div>
              </CardContent>
            </Card>

            {/* IVR Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  IVR Configuration
                </CardTitle>
                <CardDescription>Configure IVR call settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable IVR</Label>
                    <p className="text-sm text-gray-600">Allow IVR call delivery</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>IVR Rate (per call)</Label>
                  <Input value="₹0.50" readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Daily IVR Limit</Label>
                  <Input defaultValue="10,000" />
                </div>
                <div>
                  <Label>Call Duration Limit (seconds)</Label>
                  <Input defaultValue="60" />
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Language Support
                </CardTitle>
                <CardDescription>Manage supported languages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { code: 'en', name: 'English', enabled: true },
                  { code: 'hi', name: 'Hindi', enabled: true },
                  { code: 'ta', name: 'Tamil', enabled: true },
                  { code: 'te', name: 'Telugu', enabled: true },
                  { code: 'mr', name: 'Marathi', enabled: true }
                ].map((lang) => (
                  <div key={lang.code} className="flex items-center justify-between">
                    <div>
                      <Label>{lang.name}</Label>
                      <p className="text-sm text-gray-600">{lang.code.toUpperCase()}</p>
                    </div>
                    <Switch defaultChecked={lang.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Settings
                </CardTitle>
                <CardDescription>Configure emergency communication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-send on SOS</Label>
                    <p className="text-sm text-gray-600">Automatically send alerts for SOS emergencies</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>High Priority Bypass</Label>
                    <p className="text-sm text-gray-600">Bypass rate limits for high priority messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Emergency Template</Label>
                  <Select defaultValue="tmpl-001">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tmpl-001">Emergency SOS Alert</SelectItem>
                      <SelectItem value="tmpl-002">Emergency SOS Alert - Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Message Details Dialog */}
      {selectedLog && (
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="message-details-description">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
              <DialogDescription id="message-details-description">
                View detailed information about sent message
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Message Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Institution</Label>
                  <p className="font-medium">{selectedLog.institutionName}</p>
                </div>
                <div>
                  <Label>Message Type</Label>
                  <div className="flex items-center gap-2">
                    {selectedLog.messageType === 'sms' && <MessageSquare className="h-4 w-4 text-blue-500" />}
                    {selectedLog.messageType === 'ivr' && <Phone className="h-4 w-4 text-green-500" />}
                    {selectedLog.messageType === 'both' && (
                      <>
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <Phone className="h-4 w-4 text-green-500" />
                      </>
                    )}
                    <span className="capitalize">{selectedLog.messageType}</span>
                  </div>
                </div>
                <div>
                  <Label>Language</Label>
                  <Badge variant="outline">{selectedLog.language.toUpperCase()}</Badge>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Badge className={getPriorityColor(selectedLog.priority)}>
                    {selectedLog.priority}
                  </Badge>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <Label>Title</Label>
                <p className="font-medium">{selectedLog.title}</p>
              </div>
              
              <div>
                <Label>Message</Label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{selectedLog.message}</p>
                </div>
              </div>

              {/* Delivery Stats */}
              <div>
                <Label className="text-lg font-medium mb-4 block">Delivery Statistics</Label>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center bg-blue-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{selectedLog.delivery.sent}</p>
                    <p className="text-sm text-gray-600">Sent</p>
                  </div>
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{selectedLog.delivery.delivered}</p>
                    <p className="text-sm text-gray-600">Delivered</p>
                  </div>
                  <div className="text-center bg-red-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{selectedLog.delivery.failed}</p>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                  <div className="text-center bg-yellow-50 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{selectedLog.delivery.pending}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </div>

              {/* Response Stats */}
              {selectedLog.responses && (
                <div>
                  <Label className="text-lg font-medium mb-4 block">Response Statistics</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-purple-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{selectedLog.responses.acknowledged}</p>
                      <p className="text-sm text-gray-600">Acknowledged</p>
                    </div>
                    <div className="text-center bg-orange-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{selectedLog.responses.callbacks}</p>
                      <p className="text-sm text-gray-600">Callbacks</p>
                    </div>
                    <div className="text-center bg-gray-50 p-3 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">{selectedLog.responses.unsubscribed}</p>
                      <p className="text-sm text-gray-600">Unsubscribed</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cost Info */}
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <Label>Total Cost</Label>
                  <p className="text-lg font-bold">₹{selectedLog.cost}</p>
                </div>
                <div>
                  <Label>Campaign ID</Label>
                  <p className="text-sm font-mono">{selectedLog.campaignId}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend Failed
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}