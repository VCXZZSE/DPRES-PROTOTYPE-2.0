import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import {
  MessageSquare,
  Flag,
  Eye,
  Trash2,
  Edit3,
  Video,
  Upload,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Shield,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export function CommunityOversight() {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [officialReply, setOfficialReply] = useState('');

  // Sample community stats
  const stats = {
    activeDiscussions: 324,
    postsThisWeek: 87,
    reportedPosts: 3,
    verifiedMentors: 5
  };

  // Sample activity data for chart
  const activityData = [
    { name: 'Mon', Operational: 12, Risk: 8, Disaster: 5 },
    { name: 'Tue', Operational: 15, Risk: 10, Disaster: 7 },
    { name: 'Wed', Operational: 20, Risk: 14, Disaster: 9 },
    { name: 'Thu', Operational: 18, Risk: 12, Disaster: 11 },
    { name: 'Fri', Operational: 22, Risk: 16, Disaster: 13 },
    { name: 'Sat', Operational: 14, Risk: 9, Disaster: 6 },
    { name: 'Sun', Operational: 10, Risk: 7, Disaster: 4 }
  ];

  // Sample posts data
  const posts = [
    {
      id: 'P001',
      author: 'Rahul K.',
      authorAge: 18,
      institution: 'St. Xavier\'s College, Kolkata',
      module: 'Operational Plans',
      content: 'What are the most effective evacuation protocols for multi-story buildings?',
      status: 'Active',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 'P002',
      author: 'Priya M.',
      authorAge: 16,
      institution: 'La Martiniere for Girls',
      module: 'Risk Management',
      content: 'How can we better communicate disaster preparedness to our school community?',
      status: 'Active',
      timestamp: '2024-01-15 12:15'
    },
    {
      id: 'P003',
      author: 'Anonymous',
      authorAge: 15,
      institution: 'South Point High School',
      module: 'Disaster Management',
      content: '[FLAGGED] Inappropriate content',
      status: 'Reported',
      timestamp: '2024-01-15 10:00'
    }
  ];

  // Sample GriD Corps videos
  const gridCorpsVideos = [
    {
      id: 'V001',
      title: 'Effective Evacuation Protocols',
      duration: '18:32',
      uploadedBy: 'Dr. Anil Kumar',
      module: 'Operational Plans',
      uploadDate: '2024-01-10'
    },
    {
      id: 'V002',
      title: 'Youth Role in Crisis Communication',
      duration: '15:45',
      uploadedBy: 'Meera Singh',
      module: 'Risk Management',
      uploadDate: '2024-01-08'
    },
    {
      id: 'V003',
      title: 'Building Community Resilience',
      duration: '22:10',
      uploadedBy: 'Rajesh Verma',
      module: 'Disaster Management',
      uploadDate: '2024-01-05'
    }
  ];

  // Moderation settings
  const [moderationSettings, setModerationSettings] = useState({
    autoFilter: true,
    ageSegmentation: true,
    anonymousPosting: true,
    dailySummary: true
  });

  const handleViewPost = (post: any) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleOfficialReply = () => {
    if (officialReply.trim()) {
      console.log('Posting official reply:', officialReply);
      setOfficialReply('');
      setShowPostDetail(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="threads" className="data-[state=active]:bg-red-600">
            <MessageSquare className="w-4 h-4 mr-2" />
            Active Threads
          </TabsTrigger>
          <TabsTrigger value="reported" className="data-[state=active]:bg-red-600">
            <Flag className="w-4 h-4 mr-2" />
            Reported Posts
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-red-600">
            <Video className="w-4 h-4 mr-2" />
            GriD Corps Videos
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
            <Shield className="w-4 h-4 mr-2" />
            Moderation
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="admin-glass border-slate-700/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Discussions</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.activeDiscussions}</p>
                  </div>
                  <MessageSquare className="w-10 h-10 text-blue-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="admin-glass border-slate-700/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Posts This Week</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.postsThisWeek}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="admin-glass border-red-700/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Reported Posts</p>
                    <p className="text-3xl font-bold text-red-400 mt-2">{stats.reportedPosts}</p>
                  </div>
                  <Flag className="w-10 h-10 text-red-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="admin-glass border-slate-700/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Mentors</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.verifiedMentors}</p>
                  </div>
                  <Users className="w-10 h-10 text-purple-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Chart */}
          <Card className="admin-glass border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Activity by Module</CardTitle>
              <CardDescription className="text-gray-400">Daily post activity across different modules</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Operational" fill="#3b82f6" />
                  <Bar dataKey="Risk" fill="#f97316" />
                  <Bar dataKey="Disaster" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Threads Tab */}
        <TabsContent value="threads" className="space-y-4">
          <Card className="admin-glass border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Discussion Management</CardTitle>
              <CardDescription className="text-gray-400">Monitor and moderate active community discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Post ID</TableHead>
                    <TableHead className="text-gray-300">Author</TableHead>
                    <TableHead className="text-gray-300">Institution</TableHead>
                    <TableHead className="text-gray-300">Module</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.filter(p => p.status !== 'Reported').map((post) => (
                    <TableRow key={post.id} className="border-slate-700">
                      <TableCell className="text-white font-mono">{post.id}</TableCell>
                      <TableCell className="text-gray-300">
                        {post.authorAge < 18 ? 'Anonymous (U18)' : post.author}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">{post.institution}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          {post.module}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => handleViewPost(post)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reported Posts Tab */}
        <TabsContent value="reported" className="space-y-4">
          <Card className="admin-glass border-red-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Reported Posts
              </CardTitle>
              <CardDescription className="text-gray-400">Review and take action on flagged content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Post ID</TableHead>
                    <TableHead className="text-gray-300">Author</TableHead>
                    <TableHead className="text-gray-300">Content</TableHead>
                    <TableHead className="text-gray-300">Reports</TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.filter(p => p.status === 'Reported').map((post) => (
                    <TableRow key={post.id} className="border-slate-700 bg-red-950/20">
                      <TableCell className="text-white font-mono">{post.id}</TableCell>
                      <TableCell className="text-gray-300">Anonymous (U18)</TableCell>
                      <TableCell className="text-gray-400">{post.content}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-red-500 text-red-400">
                          3 reports
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-green-600 text-green-400 hover:bg-green-950/20">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-950/20">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GriD Corps Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <Card className="admin-glass border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">GriD Corps Video Management</CardTitle>
                  <CardDescription className="text-gray-400">Manage pre-recorded mentor sessions</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Video
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Video ID</TableHead>
                    <TableHead className="text-gray-300">Title</TableHead>
                    <TableHead className="text-gray-300">Duration</TableHead>
                    <TableHead className="text-gray-300">Instructor</TableHead>
                    <TableHead className="text-gray-300">Module</TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gridCorpsVideos.map((video) => (
                    <TableRow key={video.id} className="border-slate-700">
                      <TableCell className="text-white font-mono">{video.id}</TableCell>
                      <TableCell className="text-gray-300">{video.title}</TableCell>
                      <TableCell className="text-gray-400">{video.duration}</TableCell>
                      <TableCell className="text-gray-300">{video.uploadedBy}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-purple-500 text-purple-400">
                          {video.module}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="admin-glass border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Moderation Settings</CardTitle>
              <CardDescription className="text-gray-400">Configure automated moderation and safety features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-slate-700">
                <div className="space-y-1">
                  <Label className="text-white">Auto-filter offensive words</Label>
                  <p className="text-sm text-gray-400">Automatically flag posts with inappropriate language</p>
                </div>
                <Switch
                  checked={moderationSettings.autoFilter}
                  onCheckedChange={(checked) =>
                    setModerationSettings(prev => ({ ...prev, autoFilter: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-700">
                <div className="space-y-1">
                  <Label className="text-white">Age-based community segmentation</Label>
                  <p className="text-sm text-gray-400">Separate discussions for different age groups</p>
                </div>
                <Switch
                  checked={moderationSettings.ageSegmentation}
                  onCheckedChange={(checked) =>
                    setModerationSettings(prev => ({ ...prev, ageSegmentation: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-700">
                <div className="space-y-1">
                  <Label className="text-white">Anonymous posting for users under 18</Label>
                  <p className="text-sm text-gray-400">Protect minors by hiding their identity</p>
                </div>
                <Switch
                  checked={moderationSettings.anonymousPosting}
                  onCheckedChange={(checked) =>
                    setModerationSettings(prev => ({ ...prev, anonymousPosting: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <Label className="text-white">Daily moderator summary email</Label>
                  <p className="text-sm text-gray-400">Receive daily reports of community activity</p>
                </div>
                <Switch
                  checked={moderationSettings.dailySummary}
                  onCheckedChange={(checked) =>
                    setModerationSettings(prev => ({ ...prev, dailySummary: checked }))
                  }
                />
              </div>

              <div className="pt-4">
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  <Shield className="w-3 h-3 mr-1" />
                  AI-assisted moderation enabled
                </Badge>
                <p className="text-sm text-gray-400 mt-2">
                  DPRES AI Safety System automatically reviews all posts for policy violations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Post Detail Modal */}
      <Dialog open={showPostDetail} onOpenChange={setShowPostDetail}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              View full thread and post official response
            </DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-gray-400">{selectedPost.id}</span>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {selectedPost.module}
                  </Badge>
                </div>
                <p className="text-white mb-2">{selectedPost.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{selectedPost.authorAge < 18 ? 'Anonymous (U18)' : selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.institution}</span>
                  <span>•</span>
                  <span>{selectedPost.timestamp}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Reply as GriD Corps Official</Label>
                <Textarea
                  placeholder="Type your official response..."
                  value={officialReply}
                  onChange={(e) => setOfficialReply(e.target.value)}
                  rows={4}
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowPostDetail(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleOfficialReply}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Post Official Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
