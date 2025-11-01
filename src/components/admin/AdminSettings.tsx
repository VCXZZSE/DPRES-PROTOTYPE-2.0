import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { 
  Settings, 
  Shield, 
  Bell, 
  Users, 
  Database, 
  Globe,
  Mail,
  Phone,
  Lock,
  Key,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Server,
  Monitor,
  Clock,
  Languages,
  Palette,
  Moon,
  Sun
} from 'lucide-react';

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('system');
  const [isDirty, setIsDirty] = useState(false);

  const handleSave = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">System Settings</h2>
          <p className="text-sm text-muted-foreground">Configure system preferences and administrative settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          {/* System Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>Core system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>System Name</Label>
                  <Input defaultValue="DPRES - Disaster Preparedness & Response Education System" />
                </div>
                <div>
                  <Label>Organization</Label>
                  <Input defaultValue="State Disaster Management Authority" />
                </div>
                <div>
                  <Label>System Version</Label>
                  <Input value="v2.1.4" readOnly className="bg-gray-50 dark:bg-gray-800" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Put system in maintenance mode</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable debug logging</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Settings
                </CardTitle>
                <CardDescription>Database configuration and backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Database Status</Label>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">Connected</span>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      Healthy
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Last Backup</Label>
                  <p className="text-sm">2024-12-04 14:30:00 UTC</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Daily automated backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Backup Retention (days)</Label>
                  <Input defaultValue="30" type="number" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Performance Monitoring
                </CardTitle>
                <CardDescription>System performance and health monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">99.9%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">45ms</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Performance Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about performance issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Alert Threshold (response time)</Label>
                  <Input defaultValue="1000" type="number" />
                  <p className="text-xs text-gray-500 mt-1">Alert when response time exceeds this value (ms)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Timezone and regional preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Default Timezone</Label>
                  <Select defaultValue="asia/kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia/kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="asia/mumbai">Asia/Mumbai</SelectItem>
                      <SelectItem value="asia/chennai">Asia/Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Format</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Time Format</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 Hour</SelectItem>
                      <SelectItem value="12">12 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Default Language</Label>
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alert Notifications
                </CardTitle>
                <CardDescription>Configure emergency alert notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive critical emergency notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SOS Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of student SOS triggers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Status</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">System health and maintenance alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Notification Sound</Label>
                  <Select defaultValue="alert1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alert1">Alert Tone 1</SelectItem>
                      <SelectItem value="alert2">Alert Tone 2</SelectItem>
                      <SelectItem value="alert3">Alert Tone 3</SelectItem>
                      <SelectItem value="silent">Silent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Configure email notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Admin Email</Label>
                  <Input defaultValue="admin@sdma.gov.in" type="email" />
                </div>
                <div>
                  <Label>Backup Email</Label>
                  <Input placeholder="backup@sdma.gov.in" type="email" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Reports</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive daily activity summaries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Analytics</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Weekly performance analytics</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Report Time</Label>
                  <Select defaultValue="08:00">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">06:00 AM</SelectItem>
                      <SelectItem value="08:00">08:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="18:00">06:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  SMS Configuration
                </CardTitle>
                <CardDescription>SMS alert configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable SMS Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Send SMS notifications for critical alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Admin Phone Numbers</Label>
                  <div className="space-y-2">
                    <Input defaultValue="+91-9999999999" />
                    <Input placeholder="+91-8888888888 (Optional)" />
                  </div>
                </div>
                <div>
                  <Label>SMS Provider</Label>
                  <Select defaultValue="provider1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="provider1">TextLocal</SelectItem>
                      <SelectItem value="provider2">MSG91</SelectItem>
                      <SelectItem value="provider3">Twilio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Auto-Response Settings
                </CardTitle>
                <CardDescription>Automated response configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Acknowledge SOS</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatically acknowledge SOS alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Response Time Limit (minutes)</Label>
                  <Input defaultValue="5" type="number" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Escalate Unresponded</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Auto-escalate unresponded emergency alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Escalation Time (minutes)</Label>
                  <Input defaultValue="15" type="number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Severity Settings</CardTitle>
                <CardDescription>Configure which alert severities trigger notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { level: 'Critical', color: 'red', description: 'Life-threatening emergencies' },
                  { level: 'High', color: 'orange', description: 'Serious emergency situations' },
                  { level: 'Medium', color: 'yellow', description: 'Important safety alerts' },
                  { level: 'Low', color: 'green', description: 'General information alerts' }
                ].map((severity) => (
                  <div key={severity.level} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${severity.color}-500`}></div>
                        <Label>{severity.level}</Label>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{severity.description}</p>
                    </div>
                    <Switch defaultChecked={severity.level !== 'Low'} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Critical Alerts</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {['Email', 'SMS', 'Push', 'Sound'].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label className="text-sm">{channel}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label className="text-sm font-medium">Regular Alerts</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {['Email', 'SMS', 'Push', 'Sound'].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Switch defaultChecked={channel !== 'SMS'} />
                          <Label className="text-sm">{channel}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiet Hours</CardTitle>
                <CardDescription>Set times when non-critical notifications are suppressed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Quiet Hours</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Suppress non-critical notifications during specified hours</p>
                  </div>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20:00">08:00 PM</SelectItem>
                        <SelectItem value="21:00">09:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Select defaultValue="06:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="05:00">05:00 AM</SelectItem>
                        <SelectItem value="06:00">06:00 AM</SelectItem>
                        <SelectItem value="07:00">07:00 AM</SelectItem>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Override for Emergencies</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Critical alerts bypass quiet hours</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Access Control
                </CardTitle>
                <CardDescription>User access and authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input defaultValue="60" type="number" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable 2FA for admin accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Attempt Logging</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Log all login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Max Login Attempts</Label>
                  <Input defaultValue="3" type="number" />
                </div>
                <div>
                  <Label>Account Lockout Duration (minutes)</Label>
                  <Input defaultValue="30" type="number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Security
                </CardTitle>
                <CardDescription>API access and security configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>API Key Status</Label>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">Active</span>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      Valid
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Rate Limiting</Label>
                  <Input defaultValue="1000" type="number" />
                  <p className="text-xs text-gray-500 mt-1">Requests per hour per IP</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>CORS Protection</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cross-origin request protection</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Whitelisting</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Restrict access to approved IPs</p>
                  </div>
                  <Switch />
                </div>
                <Button className="w-full" variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Regenerate API Key
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Data Protection
                </CardTitle>
                <CardDescription>Data privacy and protection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Encrypt sensitive data at rest</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Data Retention Period (days)</Label>
                  <Input defaultValue="365" type="number" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Log all administrative actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Data Cleanup</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatically clean old logs and data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>Monitor and track security events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">0</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Failed Logins Today</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">156</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">API Requests Today</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of security events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="w-full" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  View Security Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          {/* Communication Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Multi-language Support
                </CardTitle>
                <CardDescription>Configure supported languages for the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { code: 'en', name: 'English', native: 'English', enabled: true },
                  { code: 'hi', name: 'Hindi', native: 'हिंदी', enabled: true },
                  { code: 'bn', name: 'Bengali', native: 'বাংলা', enabled: true },
                  { code: 'ta', name: 'Tamil', native: 'தமிழ்', enabled: true },
                  { code: 'te', name: 'Telugu', native: 'తెలుగు', enabled: true },
                  { code: 'mr', name: 'Marathi', native: 'मराठी', enabled: true },
                  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', enabled: false },
                  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', enabled: false }
                ].map((lang) => (
                  <div key={lang.code} className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Label>{lang.name}</Label>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({lang.native})</span>
                      </div>
                      <p className="text-xs text-gray-500">{lang.code.toUpperCase()}</p>
                    </div>
                    <Switch defaultChecked={lang.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Distribution</CardTitle>
                <CardDescription>Configure how alerts are distributed to institutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Bulk SMS</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Send alerts via SMS to institutions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IVR Calls</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automated voice call alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In-app push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email notifications to administrators</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Content - same as above but repeated for clarity */}
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Security Settings</h3>
            <p className="text-gray-600 dark:text-gray-400">Advanced security configurations are available in the System tab.</p>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          {/* Appearance Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Settings
                </CardTitle>
                <CardDescription>Customize the admin portal appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Theme Mode</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Primary Color</Label>
                  <Select defaultValue="red">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red (SDMA Brand)</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Sidebar Position</Label>
                  <Select defaultValue="left">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reduce spacing and padding</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout</CardTitle>
                <CardDescription>Customize dashboard layout and widgets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Quick Stats</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Display quick statistics cards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Live Alerts Feed</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time alerts in dashboard</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Institution Map</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Show institutions on map</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Default Dashboard Tab</Label>
                  <Select defaultValue="overview">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Dashboard Overview</SelectItem>
                      <SelectItem value="alerts">Emergency Alerts</SelectItem>
                      <SelectItem value="institutions">Institutions</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Changes Banner */}
      {isDirty && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="shadow-lg border-orange-200 dark:border-orange-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">You have unsaved changes</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Don't forget to save your settings</p>
                </div>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}