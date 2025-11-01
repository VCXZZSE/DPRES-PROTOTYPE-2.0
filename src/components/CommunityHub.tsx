import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  MessageSquare, 
  ThumbsUp, 
  Flag, 
  Send, 
  Shield, 
  TrendingUp,
  Users,
  GraduationCap,
  Bell,
  Search,
  Settings,
  PlayCircle,
  CheckCircle,
  Lock,
  X,
  AlertCircle,
  ArrowLeft,
  Filter,
  Video,
  Home,
  Sparkles,
  Star,
  Bookmark,
  Share2,
  MoreVertical,
  BellDot,
  CheckCheck
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useIsMobile } from './hooks/useIsMobile';
import { toast } from 'sonner@2.0.3';

interface CommunityHubProps {
  userData: {
    schoolName: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  } | null;
  moduleFilter?: string;
  onClose?: () => void;
}

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  isVerified: boolean;
}

interface Post {
  id: string;
  author: string;
  institution: string;
  content: string;
  module: string;
  upvotes: number;
  replies: Reply[];
  timestamp: string;
  isVerified: boolean;
  isOfficial?: boolean;
  upvotedBy: string[];
  bookmarkedBy: string[];
  circle?: 'my-institution' | 'verified-schools' | 'college-networks' | 'grid-corps' | 'general';
}

interface GridCorpsVideo {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  module: string;
  thumbnail: string;
  description: string;
  views: number;
}

export function CommunityHub({ userData, moduleFilter, onClose }: CommunityHubProps) {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedModule, setSelectedModule] = useState(moduleFilter || 'all');
  const [activeCircle, setActiveCircle] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<GridCorpsVideo | null>(null);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showAgeRestriction, setShowAgeRestriction] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [canSkipVideo, setCanSkipVideo] = useState(false);
  const [activeView, setActiveView] = useState<'feed' | 'trending' | 'bookmarks'>('feed');
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'upvote', user: 'Priya Singh', content: 'upvoted your post about evacuation protocols', time: '5m ago', read: false },
    { id: '2', type: 'reply', user: 'Lt. Verma - GriD Corps', content: 'replied to your question', time: '1h ago', read: false },
    { id: '3', type: 'official', user: 'DPRES System', content: 'New training module available: Advanced Fire Safety', time: '2h ago', read: false },
    { id: '4', type: 'mention', user: 'Rahul Kumar', content: 'mentioned you in a discussion', time: '5h ago', read: true },
    { id: '5', type: 'badge', user: 'GriD Corps', content: 'You earned the "Community Helper" badge', time: '1d ago', read: true },
  ]);
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    hideName: false,
    limitReplies: true,
    restrictDMs: true,
    showOnlineStatus: false
  });

  const userAge = userData ? parseInt(userData.age) : 0;
  const canParticipate = userAge >= 17;
  const currentUserName = userData?.studentName || 'Anonymous';

  // Sample posts with state management
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Dr. Sharma - GriD Corps',
      institution: 'National Disaster Response Team',
      content: '🚨 Emergency Preparedness Week: This week, let\'s focus on creating comprehensive emergency kits for your families and institutions. Remember the essentials: water (1 gallon per person per day for 3 days), non-perishable food, flashlight, first aid kit, whistle, dust masks, and copies of important documents.',
      module: 'General',
      upvotes: 247,
      replies: [],
      timestamp: '3 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '2',
      author: 'Rahul Kumar',
      institution: 'St. Xavier\'s College, Kolkata',
      content: 'Our college is implementing new evacuation protocols for our 8-story building. What are the best practices for managing evacuation routes during earthquakes? Especially concerned about stairwell safety and assembly point organization.',
      module: 'Operational Plans',
      upvotes: 34,
      replies: [
        {
          id: 'r1',
          author: 'Priya Singh',
          content: 'Make sure to have multiple assembly points and clearly mark primary and secondary evacuation routes. We did this at our college and it improved response time by 40%.',
          timestamp: '2 hours ago',
          upvotes: 12,
          isVerified: true
        },
        {
          id: 'r2',
          author: 'Lt. Verma - GriD Corps',
          content: 'Essential points: 1) Keep stairwells clear at all times 2) Install glow-in-the-dark markers 3) Conduct monthly drills 4) Assign floor wardens 5) Have backup communication systems',
          timestamp: '1 hour ago',
          upvotes: 28,
          isVerified: true
        }
      ],
      timestamp: '5 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'college-networks'
    },
    {
      id: '3',
      author: 'Ananya Mukherjee',
      institution: 'La Martiniere for Girls, Kolkata',
      content: 'Looking for creative ways to engage younger students (grades 6-8) with disaster preparedness concepts. Traditional lectures aren\'t working well. Any success stories with gamification or interactive methods?',
      module: 'Risk Management',
      upvotes: 18,
      replies: [
        {
          id: 'r3',
          author: 'Arjun Das',
          content: 'We created a disaster preparedness escape room challenge. Students loved it and retention was much higher!',
          timestamp: '6 hours ago',
          upvotes: 9,
          isVerified: true
        }
      ],
      timestamp: '1 day ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'verified-schools'
    },
    {
      id: '4',
      author: 'Kolkata SDMA Coordinator',
      institution: 'State Disaster Management Authority',
      content: '📢 Upcoming cyclone season preparedness: Western Bengal schools and colleges should review their cyclone response protocols. Updated guidelines available on the SDMA portal. Stay prepared, stay safe! #CyclonePreparedness',
      module: 'Disaster Management',
      upvotes: 156,
      replies: [],
      timestamp: '2 days ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '5',
      author: 'Sneha Chatterjee',
      institution: 'Presidency University, Kolkata',
      content: 'Just completed Phase 3 of DPRES training! The crisis communication module was incredibly valuable. Has anyone applied these techniques in real scenarios? Would love to hear experiences.',
      module: 'Risk Management',
      upvotes: 22,
      replies: [],
      timestamp: '3 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'college-networks'
    },
    {
      id: '6',
      author: 'Debanjan Roy',
      institution: 'Jadavpur University, Kolkata',
      content: 'We organized a campus-wide earthquake drill last week and the participation was amazing! 98% of students and faculty took part. Key learning: having dedicated student volunteers as "drill coordinators" made a huge difference. They helped guide everyone and report back issues. Highly recommend this approach!',
      module: 'Operational Plans',
      upvotes: 67,
      replies: [
        {
          id: 'r4',
          author: 'Kavya Menon',
          content: 'This is great! How did you recruit and train the drill coordinators? We\'re planning something similar.',
          timestamp: '1 day ago',
          upvotes: 8,
          isVerified: true
        },
        {
          id: 'r5',
          author: 'Debanjan Roy',
          content: 'We selected students who completed Phase 2+ of DPRES training and gave them a 2-hour workshop on drill management. They wore bright orange vests for visibility.',
          timestamp: '1 day ago',
          upvotes: 15,
          isVerified: true
        }
      ],
      timestamp: '4 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'college-networks'
    },
    {
      id: '7',
      author: 'Dr. Anjali Kapoor - GriD Corps',
      institution: 'National Institute of Disaster Management',
      content: '⚡ Quick Tip Tuesday: Create a "Go Bag" that stays packed and ready near your door. Include: medications, phone charger + power bank, copies of important documents in waterproof bag, cash, change of clothes, water bottle, and snacks. Update it every 6 months. Your future self will thank you!',
      module: 'General',
      upvotes: 189,
      replies: [
        {
          id: 'r6',
          author: 'Ishita Banerjee',
          content: 'Adding to this - include a list of emergency contacts written on paper, not just on your phone!',
          timestamp: '4 hours ago',
          upvotes: 23,
          isVerified: true
        }
      ],
      timestamp: '6 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '8',
      author: 'Riya Ghosh',
      institution: 'Scottish Church College, Kolkata',
      content: 'Question: How do we make disaster preparedness training accessible for students with disabilities? Our college has several wheelchair users and visually impaired students. Looking for inclusive evacuation strategies and training materials.',
      module: 'Risk Management',
      upvotes: 43,
      replies: [
        {
          id: 'r7',
          author: 'Capt. Nair - GriD Corps',
          content: 'Excellent question! 1) Assign buddy pairs 2) Create accessible evacuation routes 3) Use tactile signage 4) Audio announcements 5) Designated safe zones on each floor. Happy to share detailed guidelines if needed.',
          timestamp: '8 hours ago',
          upvotes: 31,
          isVerified: true
        },
        {
          id: 'r8',
          author: 'Amit Joshi',
          content: 'We implemented "evacuation chairs" for our multi-story building. Game changer for wheelchair users. Worth the investment!',
          timestamp: '7 hours ago',
          upvotes: 18,
          isVerified: true
        }
      ],
      timestamp: '12 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'college-networks'
    },
    {
      id: '9',
      author: 'Kolkata Municipal Corporation',
      institution: 'Disaster Management Cell',
      content: '🌊 Monsoon Alert: With heavy rainfall predicted for next week, please review flood preparedness measures. Key areas: ensure proper drainage around your institution, move important documents to higher floors, check emergency pumping systems, and have sandbags ready. Report waterlogging issues to our helpline: 1070.',
      module: 'Disaster Management',
      upvotes: 128,
      replies: [],
      timestamp: '1 day ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'grid-corps'
    },
    {
      id: '10',
      author: 'Vikram Sethi',
      institution: 'Indian Institute of Engineering Science and Technology',
      content: 'Sharing our college\'s innovative approach: we integrated disaster preparedness into our student orientation program. Every fresher now gets a 2-hour workshop covering basics, campus evacuation routes, and emergency contacts. Result? 100% awareness rate among new students vs 30% before. Small change, big impact!',
      module: 'Operational Plans',
      upvotes: 91,
      replies: [
        {
          id: 'r9',
          author: 'Prof. Chatterjee',
          content: 'This is brilliant! Could you share your workshop curriculum? We want to implement this at our institution.',
          timestamp: '2 days ago',
          upvotes: 14,
          isVerified: true
        }
      ],
      timestamp: '3 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'college-networks'
    },
    {
      id: '11',
      author: 'Sanjana Dutta',
      institution: 'Bethune College, Kolkata',
      content: 'PSA: Fire extinguisher training is NOT optional! Last month our hostel kitchen had a small fire. Because our warden was trained, she handled it in 30 seconds before it spread. Everyone should know how to use a fire extinguisher. Request your institution to organize hands-on training!',
      module: 'Operational Plans',
      upvotes: 76,
      replies: [
        {
          id: 'r10',
          author: 'Firefighter Rao - GriD Corps',
          content: 'Remember PASS: Pull the pin, Aim at base of fire, Squeeze the handle, Sweep side to side. Practice makes perfect!',
          timestamp: '5 days ago',
          upvotes: 42,
          isVerified: true
        }
      ],
      timestamp: '5 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'verified-schools'
    },
    {
      id: '12',
      author: 'Aditya Banerjee',
      institution: 'Heritage Institute of Technology, Kolkata',
      content: 'Has anyone used the DPRES VR training module? I just tried it and WOW - experiencing a simulated earthquake evacuation in VR is intense and incredibly educational. The stress management techniques they teach during the simulation are practical. 10/10 recommend!',
      module: 'General',
      upvotes: 54,
      replies: [
        {
          id: 'r11',
          author: 'Meera Patel',
          content: 'The VR module helped me overcome my panic response during drills. It\'s amazing how realistic practice helps!',
          timestamp: '1 week ago',
          upvotes: 21,
          isVerified: true
        }
      ],
      timestamp: '1 week ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'college-networks'
    },
    {
      id: '13',
      author: 'West Bengal Fire Services',
      institution: 'Government of West Bengal',
      content: '🔥 Fire Safety Month Campaign: This November, we\'re conducting FREE fire safety audits for educational institutions across Kolkata. Check fire exits, alarm systems, extinguishers, and emergency lighting. Register your institution at wbfire.gov.in. First 50 institutions get priority scheduling!',
      module: 'Disaster Management',
      upvotes: 203,
      replies: [
        {
          id: 'r12',
          author: 'Principal Reddy',
          content: 'Just registered our school. This is a great initiative! Thank you for prioritizing educational institutions.',
          timestamp: '2 hours ago',
          upvotes: 16,
          isVerified: true
        }
      ],
      timestamp: '4 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '14',
      author: 'Nisha Sharma',
      institution: 'St. Xavier\'s College, Kolkata',
      content: 'Mental health aspect of disaster preparedness needs more attention! The psychological impact of disasters is real. Are there any DPRES modules covering post-disaster mental health support and trauma counseling? We should be preparing for emotional resilience too.',
      module: 'Risk Management',
      upvotes: 38,
      replies: [
        {
          id: 'r13',
          author: 'Dr. Malhotra - Psychologist',
          content: 'Absolutely crucial point. Phase 4 of DPRES has a mental health component. Also recommend organizations have counselors on disaster response teams.',
          timestamp: '1 day ago',
          upvotes: 25,
          isVerified: true
        }
      ],
      timestamp: '2 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'college-networks'
    },
    {
      id: '15',
      author: 'Rohan Mishra',
      institution: 'Calcutta University',
      content: 'Pro tip from recent experience: Keep digital copies of all important documents (IDs, certificates, insurance) in encrypted cloud storage. During last year\'s floods, many students lost physical documents. Having digital backups saved them months of hassle in document recovery. #DisasterPreparedness',
      module: 'General',
      upvotes: 29,
      replies: [],
      timestamp: '6 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'general'
    },
    {
      id: '16',
      author: 'Tanvi Bhattacharya',
      institution: 'Loreto College, Kolkata',
      content: 'Question for the community: How do you balance disaster preparedness training with regular academic workload? Our college wants to implement mandatory DPRES modules but students are concerned about time management. Any institutions that have successfully integrated this?',
      module: 'General',
      upvotes: 15,
      replies: [
        {
          id: 'r14',
          author: 'Amit Sen',
          content: 'We integrated short 15-minute sessions during assembly time and it worked great! Students don\'t feel overwhelmed and retention is actually better.',
          timestamp: '3 hours ago',
          upvotes: 7,
          isVerified: true
        }
      ],
      timestamp: '8 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'verified-schools'
    },
    {
      id: '17',
      author: 'Emergency Response Team - Kolkata',
      institution: 'District Disaster Management Authority',
      content: '📣 IMPORTANT: Upcoming earthquake drill for all educational institutions in Kolkata metropolitan area on November 20th at 11:00 AM. This is a mandatory participation drill. Please ensure all students and staff are briefed about "Drop, Cover, and Hold On" procedures. Detailed guidelines sent to all registered institutions.',
      module: 'Disaster Management',
      upvotes: 312,
      replies: [
        {
          id: 'r15',
          author: 'Principal Das',
          content: 'Received the guidelines. We will be conducting preparatory sessions this week. Thank you for organizing this!',
          timestamp: '2 hours ago',
          upvotes: 18,
          isVerified: true
        }
      ],
      timestamp: '3 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '18',
      author: 'Kabir Malhotra',
      institution: 'St. James School, Kolkata',
      content: 'Does anyone have experience with teaching disaster preparedness to students with special needs? We have several students with autism and ADHD in our school, and standard evacuation drills tend to cause anxiety. Looking for inclusive, sensory-friendly approaches.',
      module: 'Risk Management',
      upvotes: 26,
      replies: [
        {
          id: 'r16',
          author: 'Dr. Sunita Rao - Special Educator',
          content: 'Visual schedules and social stories work wonders! Create picture cards showing each step of evacuation. Practice in small groups first, then gradually increase to full drills. Also, consider noise-canceling headphones for sensitive students.',
          timestamp: '4 hours ago',
          upvotes: 19,
          isVerified: true
        }
      ],
      timestamp: '7 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'verified-schools'
    },
    {
      id: '19',
      author: 'Shreya Nair',
      institution: 'NSHM Knowledge Campus, Kolkata',
      content: 'Just finished organizing our college\'s first Disaster Preparedness Hackathon! Students created apps for emergency alerts, crowd management during evacuations, and resource mapping. The innovation and enthusiasm were incredible. Highly recommend this approach for engaging tech-savvy students! 💡',
      module: 'General',
      upvotes: 41,
      replies: [],
      timestamp: '1 day ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'college-networks'
    },
    {
      id: '20',
      author: 'Col. Krishnan - GriD Corps',
      institution: 'National Disaster Response Force',
      content: '⚠️ Monsoon Season Advisory: Heavy rainfall expected across West Bengal this week. Educational institutions should: 1) Check drainage systems 2) Stock emergency supplies 3) Update emergency contact lists 4) Review flood evacuation plans 5) Keep students informed. Stay safe, stay prepared!',
      module: 'Disaster Management',
      upvotes: 187,
      replies: [
        {
          id: 'r17',
          author: 'Facilities Manager - Heritage College',
          content: 'Thanks for the heads up! We\'ve already started preparations and cleared all drainage channels.',
          timestamp: '5 hours ago',
          upvotes: 11,
          isVerified: true
        }
      ],
      timestamp: '6 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '21',
      author: 'Neha Reddy',
      institution: 'Modern High School for Girls, Kolkata',
      content: 'Success story to share! Last month we had a real power outage during exams. Thanks to our emergency preparedness training, staff activated backup systems smoothly, students remained calm, and we continued exams with minimal disruption. Training really works when you need it most! 🙌',
      module: 'Operational Plans',
      upvotes: 58,
      replies: [
        {
          id: 'r18',
          author: 'Admin Coordinator',
          content: 'This is exactly why we invest in these training programs. Real-world proof of effectiveness!',
          timestamp: '1 day ago',
          upvotes: 14,
          isVerified: true
        }
      ],
      timestamp: '2 days ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'verified-schools'
    },
    {
      id: '22',
      author: 'Ayush Bose',
      institution: 'Jadavpur University, Kolkata',
      content: 'Quick survey for fellow students: How many of you know the location of the nearest fire extinguisher in your classroom/hostel? Be honest! I realized during our last drill that only 30% of students knew. We need better awareness campaigns. What has worked at your institution?',
      module: 'Operational Plans',
      upvotes: 33,
      replies: [
        {
          id: 'r19',
          author: 'Ritu Sharma',
          content: 'We put up glow-in-the-dark stickers with arrows pointing to fire extinguishers. Simple but effective - everyone notices them now!',
          timestamp: '6 hours ago',
          upvotes: 22,
          isVerified: true
        }
      ],
      timestamp: '10 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'college-networks'
    },
    {
      id: '23',
      author: 'Dr. Malini Iyer - GriD Corps',
      institution: 'National Institute of Disaster Management',
      content: '🎓 New Research Findings: Students who participate in VR-based disaster training show 67% better retention of safety procedures compared to traditional methods. The immersive experience creates stronger memory anchors. If your institution has VR capabilities, definitely incorporate them into training programs!',
      module: 'Risk Management',
      upvotes: 94,
      replies: [
        {
          id: 'r20',
          author: 'Tech Coordinator - St. Xavier\'s',
          content: 'Just requested budget approval for VR equipment. This data will definitely help our case!',
          timestamp: '8 hours ago',
          upvotes: 16,
          isVerified: true
        }
      ],
      timestamp: '12 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    {
      id: '24',
      author: 'Prateek Ghoshal',
      institution: 'South City International School, Kolkata',
      content: 'Parent engagement is crucial! We started including parents in our disaster preparedness workshops and saw a huge improvement in family emergency planning. Students now have proper go-bags at home and families have communication plans. It takes a village to build true preparedness! 👨‍👩‍👧‍👦',
      module: 'General',
      upvotes: 47,
      replies: [],
      timestamp: '1 day ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'verified-schools'
    },
    {
      id: '25',
      author: 'West Bengal Education Department',
      institution: 'Government of West Bengal',
      content: '📢 Policy Update: Starting January 2025, all schools and colleges must have at least one certified Disaster Management Coordinator on staff. Free certification training provided by SDMA. Registration opens December 1st. Check your institution email for details. Let\'s build a safer education ecosystem! 🏫',
      module: 'Disaster Management',
      upvotes: 268,
      replies: [
        {
          id: 'r21',
          author: 'Vice Principal - Multiple Institutions',
          content: 'Excellent initiative! We\'ll be nominating our PE teachers and counselors for this certification.',
          timestamp: '4 hours ago',
          upvotes: 31,
          isVerified: true
        },
        {
          id: 'r22',
          author: 'Student Council President',
          content: 'Can senior students also get this certification? Many of us are interested in disaster management as a career path.',
          timestamp: '3 hours ago',
          upvotes: 24,
          isVerified: true
        }
      ],
      timestamp: '5 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'grid-corps'
    },
    // Additional posts for "My Institution" circle
    {
      id: '26',
      author: userData?.studentName || 'Fellow Student',
      institution: userData?.schoolName || 'Your Institution',
      content: `🎯 Our institution just completed a successful fire drill! Great coordination between all departments. Evacuation time: 4 minutes 32 seconds. We're getting better with each practice session. Proud of our ${userData?.institutionType === 'school' ? 'school' : 'college'} community! 🔥`,
      module: 'Operational Plans',
      upvotes: 12,
      replies: [],
      timestamp: '30 minutes ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'my-institution'
    },
    {
      id: '27',
      author: 'Safety Coordinator',
      institution: userData?.schoolName || 'Your Institution',
      content: `📋 Reminder to all ${userData?.institutionType === 'school' ? 'students' : 'students and faculty'}: Please update your emergency contact information in the student portal. This is crucial for effective communication during emergencies. Deadline: This Friday!`,
      module: 'General',
      upvotes: 8,
      replies: [],
      timestamp: '2 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [],
      circle: 'my-institution'
    },
    {
      id: '28',
      author: 'Student Council',
      institution: userData?.schoolName || 'Your Institution',
      content: `🌟 Excited to announce that our institution will be hosting a Disaster Preparedness Workshop next week! GriD Corps trainers will be conducting hands-on sessions. All ${userData?.institutionType === 'school' ? 'students' : 'students and staff'} are encouraged to attend. Registration link in bio!`,
      module: 'General',
      upvotes: 24,
      replies: [
        {
          id: 'r23',
          author: 'Interested Student',
          content: 'This sounds amazing! Already registered. Can\'t wait!',
          timestamp: '1 hour ago',
          upvotes: 5,
          isVerified: true
        }
      ],
      timestamp: '4 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: [currentUserName],
      circle: 'my-institution'
    }
  ]);

  // GriD Corps videos
  const gridCorpsVideos: GridCorpsVideo[] = [
    {
      id: 'v1',
      title: 'Advanced Evacuation Protocols for Multi-Story Buildings',
      duration: '24:15',
      instructor: 'Dr. Anil Kumar - Senior GriD Corps Trainer',
      module: 'Operational Plans',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800',
      description: 'Comprehensive guide to planning and executing evacuation procedures in high-rise buildings during various disaster scenarios.',
      views: 3420
    },
    {
      id: 'v2',
      title: 'Youth Leadership in Crisis Communication',
      duration: '18:42',
      instructor: 'Meera Singh - Crisis Communication Specialist',
      module: 'Risk Management',
      thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
      description: 'Learn how young leaders can effectively communicate during disasters and coordinate community response efforts.',
      views: 2890
    },
    {
      id: 'v3',
      title: 'Building Resilient Communities: A Student\'s Guide',
      duration: '31:20',
      instructor: 'Rajesh Verma - Community Safety Officer',
      module: 'Disaster Management',
      thumbnail: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800',
      description: 'Strategies for creating stronger, more disaster-resilient communities through student engagement and local partnerships.',
      views: 4150
    },
    {
      id: 'v4',
      title: 'First Aid Essentials for Disaster Response',
      duration: '22:35',
      instructor: 'Dr. Priya Kapoor - Emergency Medicine Expert',
      module: 'Operational Plans',
      thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800',
      description: 'Critical first aid skills every disaster response volunteer should know, from basic wound care to CPR.',
      views: 5280
    }
  ];

  // Handle post submission
  const handlePostSubmit = () => {
    if (!canParticipate) {
      setShowAgeRestriction(true);
      return;
    }
    
    if (postContent.trim()) {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: privacySettings.hideName ? 'Anonymous Student' : currentUserName,
        institution: userData?.schoolName || 'Anonymous Institution',
        content: postContent,
        module: selectedModule === 'all' ? 'General' : selectedModule,
        upvotes: 0,
        replies: [],
        timestamp: 'Just now',
        isVerified: true,
        isOfficial: false,
        upvotedBy: [],
        bookmarkedBy: [],
        circle: 'my-institution' // All user-created posts go to their institution circle
      };
      
      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedModule('all'); // Reset to General Discussion after posting
      toast.success('Your post has been published!');
    } else {
      toast.error('Please write something before posting');
    }
  };

  // Handle upvote
  const handleUpvote = (postId: string) => {
    if (!canParticipate) {
      toast.error('You must be 17+ to interact with posts');
      return;
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.upvotedBy.includes(currentUserName);
        return {
          ...post,
          upvotes: hasUpvoted ? post.upvotes - 1 : post.upvotes + 1,
          upvotedBy: hasUpvoted 
            ? post.upvotedBy.filter(name => name !== currentUserName)
            : [...post.upvotedBy, currentUserName]
        };
      }
      return post;
    }));

    const post = posts.find(p => p.id === postId);
    if (post) {
      const hasUpvoted = post.upvotedBy.includes(currentUserName);
      toast.success(hasUpvoted ? 'Upvote removed' : 'Post upvoted!');
    }
  };

  // Handle bookmark
  const handleBookmark = (postId: string) => {
    if (!canParticipate) {
      toast.error('You must be 17+ to bookmark posts');
      return;
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasBookmarked = post.bookmarkedBy.includes(currentUserName);
        return {
          ...post,
          bookmarkedBy: hasBookmarked 
            ? post.bookmarkedBy.filter(name => name !== currentUserName)
            : [...post.bookmarkedBy, currentUserName]
        };
      }
      return post;
    }));

    const post = posts.find(p => p.id === postId);
    if (post) {
      const hasBookmarked = post.bookmarkedBy.includes(currentUserName);
      toast.success(hasBookmarked ? 'Bookmark removed' : 'Post bookmarked!');
    }
  };

  // Handle reply
  const handleReply = (post: Post) => {
    if (!canParticipate) {
      toast.error('You must be 17+ to reply to posts');
      return;
    }
    setSelectedPost(post);
    setShowReplyDialog(true);
  };

  const handleSubmitReply = () => {
    if (!selectedPost || !replyContent.trim()) {
      toast.error('Please write a reply');
      return;
    }

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      author: privacySettings.hideName ? 'Anonymous Student' : currentUserName,
      content: replyContent,
      timestamp: 'Just now',
      upvotes: 0,
      isVerified: true
    };

    setPosts(posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    }));

    setReplyContent('');
    setShowReplyDialog(false);
    toast.success('Reply posted successfully!');
  };

  // Handle report
  const handleReport = (post: Post) => {
    setSelectedPost(post);
    setShowReportDialog(true);
  };

  const handleSubmitReport = () => {
    if (!reportReason.trim()) {
      toast.error('Please select a reason for reporting');
      return;
    }

    toast.success('Report submitted. Our team will review it shortly.');
    setReportReason('');
    setShowReportDialog(false);
  };

  // Handle video play
  const handleVideoPlay = (video: GridCorpsVideo) => {
    setCurrentVideo(video);
    setShowVideoPlayer(true);
    setVideoProgress(0);
    setCanSkipVideo(false);
    
    // Simulate video progress
    const interval = setInterval(() => {
      setVideoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCanSkipVideo(true);
          return 100;
        }
        return prev + 2;
      });
    }, 500);
  };

  const handleCloseVideo = () => {
    if (canSkipVideo || videoProgress >= 100) {
      setShowVideoPlayer(false);
      setCurrentVideo(null);
      setVideoProgress(0);
      toast.success('Video session completed!');
    } else {
      toast.error('Please watch the entire video before closing');
    }
  };

  // Handle notification actions
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleMarkRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Filter posts based on active view and circle
  const filteredPosts = posts.filter(post => {
    // First, filter by circle if one is selected
    if (activeCircle) {
      if (post.circle !== activeCircle) {
        return false;
      }
    }
    
    // Then filter by view
    if (activeView === 'feed') {
      return true; // Show all posts in All Posts feed
    } else if (activeView === 'trending') {
      return post.upvotes > 20; // Show posts with >20 upvotes
    } else if (activeView === 'bookmarks') {
      return post.bookmarkedBy.includes(currentUserName); // Show bookmarked posts
    }
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isMobile) {
    return <CommunityHubMobile userData={userData} moduleFilter={moduleFilter} onClose={onClose} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white">DPRES Community Hub</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Connect, Learn, Prepare Together</p>
              </div>
            </div>
            {moduleFilter && (
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                <Filter className="w-3 h-3 mr-1" />
                {moduleFilter}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search discussions, mentors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500"
              />
            </div>
            <Popover open={showNotifications} onOpenChange={setShowNotifications}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleMarkAllRead}
                      className="text-xs"
                    >
                      <CheckCheck className="w-4 h-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="p-2">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-sm text-slate-500">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleMarkRead(notification.id)}
                          className={`w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all mb-1 ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-950/30' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              !notification.read ? 'bg-blue-500' : 'bg-transparent'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">{notification.user}</span>
                                {notification.type === 'official' && (
                                  <Badge className="text-xs bg-blue-500 text-white">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Official
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {notification.content}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowPrivacySettings(true)}
              className="hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              <Settings className="w-5 h-5" />
            </Button>
            {onClose && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden w-full max-w-[1800px] mx-auto">
        {/* Left Sidebar */}
        <div className="w-72 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-r border-slate-200/50 dark:border-slate-700/50 overflow-y-auto flex-shrink-0">
          <ScrollArea className="h-full">
            <div className="p-5 space-y-6">
              {/* Navigation */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-3">
                  Navigation
                </h3>
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveView('feed')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                      activeView === 'feed' 
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 font-medium' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Home className="w-4 h-4" />
                      <span>Feed</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveView('trending')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                      activeView === 'trending' 
                        ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 font-medium' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveView('bookmarks')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                      activeView === 'bookmarks' 
                        ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Bookmark className="w-4 h-4" />
                      <span>Bookmarks</span>
                    </div>
                  </button>
                </div>
              </div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              {/* My Circles */}
              <div>
                <div className="flex items-center justify-between mb-3 px-3">
                  <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    My Circles
                  </h3>
                  {activeCircle && (
                    <button
                      onClick={() => setActiveCircle(null)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveCircle(activeCircle === 'my-institution' ? null : 'my-institution')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group ${
                      activeCircle === 'my-institution'
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 font-medium ring-2 ring-blue-500/50 dark:ring-blue-400/50'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>My Institution</span>
                      </div>
                      <Badge variant="secondary" className={`text-xs ${
                        activeCircle === 'my-institution'
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        {posts.filter(p => p.circle === 'my-institution').length}
                      </Badge>
                    </div>
                  </button>
                  {userData?.institutionType === 'school' && userAge < 18 && (
                    <button 
                      onClick={() => setActiveCircle(activeCircle === 'verified-schools' ? null : 'verified-schools')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group ${
                        activeCircle === 'verified-schools'
                          ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 font-medium ring-2 ring-green-500/50 dark:ring-green-400/50'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span>Verified Schools</span>
                        </div>
                        <Badge variant="secondary" className={`text-xs ${
                          activeCircle === 'verified-schools'
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                            : 'bg-slate-200 dark:bg-slate-700'
                        }`}>
                          {posts.filter(p => p.circle === 'verified-schools').length}
                        </Badge>
                      </div>
                    </button>
                  )}
                  {(userData?.institutionType === 'college' || userAge >= 17) && (
                    <button 
                      onClick={() => setActiveCircle(activeCircle === 'college-networks' ? null : 'college-networks')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group ${
                        activeCircle === 'college-networks'
                          ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-medium ring-2 ring-purple-500/50 dark:ring-purple-400/50'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span>College Networks</span>
                        </div>
                        <Badge variant="secondary" className={`text-xs ${
                          activeCircle === 'college-networks'
                            ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                            : 'bg-slate-200 dark:bg-slate-700'
                        }`}>
                          {posts.filter(p => p.circle === 'college-networks').length}
                        </Badge>
                      </div>
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveCircle(activeCircle === 'grid-corps' ? null : 'grid-corps')}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group ${
                      activeCircle === 'grid-corps'
                        ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 font-medium ring-2 ring-orange-500/50 dark:ring-orange-400/50'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span>GriD Corps Official</span>
                      </div>
                      <Badge variant="secondary" className={`text-xs ${
                        activeCircle === 'grid-corps'
                          ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                          : 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300'
                      }`}>
                        {posts.filter(p => p.circle === 'grid-corps').length}
                      </Badge>
                    </div>
                  </button>
                </div>
              </div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/50">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Your Impact
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700 dark:text-blue-300">Posts</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">
                      {posts.filter(p => p.author === currentUserName).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700 dark:text-blue-300">Helpful Votes</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">
                      {posts.filter(p => p.author === currentUserName).reduce((sum, p) => sum + p.upvotes, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Center - Community Feed */}
        <div className="flex-1 overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="max-w-3xl mx-auto p-6 space-y-6">
              {/* Post Composer */}
              {canParticipate ? (
                <Card className="border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white dark:bg-slate-900">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="border-2 border-blue-500">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            {currentUserName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{privacySettings.hideName ? 'Anonymous' : currentUserName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{userData?.schoolName}</p>
                        </div>
                      </div>
                      <Textarea
                        placeholder="Share your insights, ask questions, or discuss disaster preparedness strategies..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={4}
                        className="resize-none bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Label className="text-sm text-slate-600 dark:text-slate-400">Category:</Label>
                          <Select value={selectedModule} onValueChange={setSelectedModule}>
                            <SelectTrigger className="w-56 bg-slate-50 dark:bg-slate-800/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">General Discussion</SelectItem>
                              <SelectItem value="Operational Plans">Operational Plans</SelectItem>
                              <SelectItem value="Risk Management">Risk Management</SelectItem>
                              <SelectItem value="Disaster Management">Disaster Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          onClick={handlePostSubmit}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Publish Post
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                          Community Discussions (17+ Only)
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                          You'll be able to participate in community discussions when you turn 17. For now, explore verified GriD Corps training videos in the sidebar!
                        </p>
                        <Button 
                          size="sm"
                          onClick={() => handleVideoPlay(gridCorpsVideos[0])}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Watch Training Videos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* View Tabs */}
              {canParticipate && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={activeView === 'feed' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveView('feed')}
                      className={activeView === 'feed' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      <Home className="w-4 h-4 mr-2" />
                      All Posts
                    </Button>
                    <Button
                      variant={activeView === 'trending' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveView('trending')}
                      className={activeView === 'trending' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Trending
                    </Button>
                    <Button
                      variant={activeView === 'bookmarks' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveView('bookmarks')}
                      className={activeView === 'bookmarks' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Saved
                    </Button>
                  </div>
                  
                  {/* Active Circle Filter Indicator */}
                  {activeCircle && (
                    <Card className={`border-2 ${
                      activeCircle === 'my-institution' ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20' :
                      activeCircle === 'verified-schools' ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' :
                      activeCircle === 'college-networks' ? 'border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/20' :
                      'border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/20'
                    }`}>
                      <CardContent className="py-3 px-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Filter className={`w-4 h-4 ${
                              activeCircle === 'my-institution' ? 'text-blue-600 dark:text-blue-400' :
                              activeCircle === 'verified-schools' ? 'text-green-600 dark:text-green-400' :
                              activeCircle === 'college-networks' ? 'text-purple-600 dark:text-purple-400' :
                              'text-orange-600 dark:text-orange-400'
                            }`} />
                            <span className="text-sm font-medium">
                              Viewing: {
                                activeCircle === 'my-institution' ? 'My Institution' :
                                activeCircle === 'verified-schools' ? 'Verified Schools' :
                                activeCircle === 'college-networks' ? 'College Networks' :
                                'GriD Corps Official'
                              }
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setActiveCircle(null)}
                            className="h-7 text-xs"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Clear Filter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Feed */}
              <div className="space-y-5">
                {filteredPosts.length === 0 ? (
                  <Card className="border-slate-200 dark:border-slate-700">
                    <CardContent className="py-12 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <MessageSquare className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400">
                          {activeCircle ? 'No posts in this circle yet' : 
                           activeView === 'trending' ? 'No trending posts yet' :
                           activeView === 'bookmarks' ? 'No saved posts yet' :
                           'No posts found'}
                        </p>
                        <p className="text-sm text-slate-500">
                          {activeCircle ? 'Be the first to start a discussion in this circle!' :
                           activeView === 'bookmarks' ? 'Bookmark posts to see them here' :
                           'Check back soon for new content'}
                        </p>
                        {activeCircle && canParticipate && (
                          <Button
                            onClick={() => setActiveCircle(null)}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            View All Posts
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className={`border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-xl transition-all bg-white dark:bg-slate-900 ${
                        post.isOfficial ? 'ring-2 ring-blue-400 dark:ring-blue-600 ring-offset-2 dark:ring-offset-slate-950' : ''
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className={`border-2 ${post.isOfficial ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'}`}>
                            <AvatarFallback className={post.isOfficial ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'}>
                              {post.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {post.author}
                              </span>
                              {post.isVerified && (
                                <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                              {post.isOfficial && (
                                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Official
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {post.institution} • {post.timestamp}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.module !== 'General' && post.module !== 'all' && (
                                <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800/50">
                                  {post.module}
                                </Badge>
                              )}
                              {post.circle && (
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs cursor-pointer hover:opacity-80 transition-opacity ${
                                    post.circle === 'my-institution' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' :
                                    post.circle === 'verified-schools' ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' :
                                    post.circle === 'college-networks' ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' :
                                    post.circle === 'grid-corps' ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800' :
                                    'bg-slate-50 dark:bg-slate-800/50'
                                  }`}
                                  onClick={() => setActiveCircle(post.circle || null)}
                                >
                                  {post.circle === 'my-institution' && <Users className="w-3 h-3 mr-1" />}
                                  {post.circle === 'verified-schools' && <Shield className="w-3 h-3 mr-1" />}
                                  {post.circle === 'college-networks' && <GraduationCap className="w-3 h-3 mr-1" />}
                                  {post.circle === 'grid-corps' && <Sparkles className="w-3 h-3 mr-1" />}
                                  {post.circle === 'my-institution' ? 'My Institution' :
                                   post.circle === 'verified-schools' ? 'Verified Schools' :
                                   post.circle === 'college-networks' ? 'College Networks' :
                                   post.circle === 'grid-corps' ? 'GriD Corps' :
                                   'General'}
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-700 dark:text-slate-200 mb-4 leading-relaxed">{post.content}</p>
                            
                            {/* Replies Preview */}
                            {post.replies.length > 0 && (
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4 space-y-3">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                                </p>
                                {post.replies.slice(0, 2).map((reply) => (
                                  <div key={reply.id} className="border-l-2 border-blue-400 dark:border-blue-600 pl-3">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-sm font-medium text-slate-900 dark:text-white">{reply.author}</span>
                                      {reply.isVerified && <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
                                      <span className="text-xs text-slate-500">• {reply.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{reply.content}</p>
                                  </div>
                                ))}
                                {post.replies.length > 2 && (
                                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    View all {post.replies.length} replies
                                  </button>
                                )}
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleUpvote(post.id)}
                                className={`hover:bg-blue-50 dark:hover:bg-blue-950/30 ${
                                  post.upvotedBy.includes(currentUserName) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30' : ''
                                }`}
                              >
                                <ThumbsUp className={`w-4 h-4 mr-2 ${post.upvotedBy.includes(currentUserName) ? 'fill-current' : ''}`} />
                                {post.upvotes}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleReply(post)}
                                disabled={!canParticipate}
                                className="hover:bg-green-50 dark:hover:bg-green-950/30"
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Reply
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleBookmark(post.id)}
                                className={`hover:bg-purple-50 dark:hover:bg-purple-950/30 ${
                                  post.bookmarkedBy.includes(currentUserName) ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30' : ''
                                }`}
                              >
                                <Bookmark className={`w-4 h-4 mr-2 ${post.bookmarkedBy.includes(currentUserName) ? 'fill-current' : ''}`} />
                                Save
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleReport(post)}
                                className="hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400"
                              >
                                <Flag className="w-4 h-4 mr-2" />
                                Report
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-l border-slate-200/50 dark:border-slate-700/50 overflow-y-auto flex-shrink-0">
          <ScrollArea className="h-full">
            <div className="p-5 space-y-6">
              {/* Featured Video */}
              <Card className="border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white">
                  <h3 className="font-semibold flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    Featured Training
                  </h3>
                </div>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md" onClick={() => handleVideoPlay(gridCorpsVideos[0])}>
                      <img src={gridCorpsVideos[0].thumbnail} alt={gridCorpsVideos[0].title} className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center group-hover:from-black/80 transition-all">
                        <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/50 text-white border-0">
                          {gridCorpsVideos[0].duration}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{gridCorpsVideos[0].title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{gridCorpsVideos[0].instructor}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">{gridCorpsVideos[0].module}</Badge>
                        <span className="text-xs text-slate-500">{gridCorpsVideos[0].views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" size="sm" onClick={() => handleVideoPlay(gridCorpsVideos[0])}>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* More Videos */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                    More GriD Corps Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gridCorpsVideos.slice(1, 4).map((video) => (
                      <button
                        key={video.id}
                        onClick={() => handleVideoPlay(video)}
                        className="w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative w-20 h-14 rounded overflow-hidden flex-shrink-0">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
                              <PlayCircle className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-xs line-clamp-2 text-slate-900 dark:text-white mb-1">{video.title}</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{video.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Discussions */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-orange-500" />
                    Trending Now
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {posts.filter(p => p.upvotes > 20).slice(0, 3).map((post) => (
                      <div key={post.id} className="pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <p className="text-sm font-medium line-clamp-2 text-slate-900 dark:text-white mb-2">{post.content}</p>
                        <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {post.upvotes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {post.replies.length}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Guidelines */}
              <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center text-blue-900 dark:text-blue-100">
                    <Shield className="w-4 h-4 mr-2" />
                    Community Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-blue-800 dark:text-blue-200">
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Be respectful and professional</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>No personal information sharing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Stay focused on disaster preparedness</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Report inappropriate content</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                    onClick={() => setShowPrivacySettings(true)}
                  >
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={showVideoPlayer} onOpenChange={handleCloseVideo}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{currentVideo?.title}</DialogTitle>
            <DialogDescription className="flex items-center space-x-2">
              <span>{currentVideo?.instructor}</span>
              <span>•</span>
              <span>{currentVideo?.duration}</span>
              <span>•</span>
              <Badge variant="outline">{currentVideo?.module}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video shadow-2xl">
              <img src={currentVideo?.thumbnail} alt={currentVideo?.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent">
                <div className="text-center text-white">
                  <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-90" />
                  <p className="text-lg font-medium">Training Video Player</p>
                </div>
              </div>
            </div>
            
            {!canSkipVideo && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-amber-900 dark:text-amber-100 font-medium flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Please watch the complete video
                  </p>
                  <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">{videoProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out shadow-lg"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                  You cannot skip or close this video until completion
                </p>
              </div>
            )}
            
            {canSkipVideo && (
              <div className="flex items-center justify-center space-x-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Video completed! You may now close this window.</span>
              </div>
            )}

            {currentVideo && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                <h4 className="font-medium mb-2">About this training</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{currentVideo.description}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to {selectedPost?.author}</DialogTitle>
            <DialogDescription>Share your thoughts and contribute to the discussion</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPost && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">{selectedPost.author}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{selectedPost.content}</p>
              </div>
            )}
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReply} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Post Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Content</DialogTitle>
            <DialogDescription>Help us maintain a safe community by reporting inappropriate content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={reportReason} onValueChange={setReportReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">Spam or misleading</SelectItem>
                <SelectItem value="harassment">Harassment or bullying</SelectItem>
                <SelectItem value="inappropriate">Inappropriate content</SelectItem>
                <SelectItem value="misinformation">Misinformation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReport} className="bg-red-600 hover:bg-red-700">
                <Flag className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Settings Modal */}
      <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Privacy & Safety Settings
            </DialogTitle>
            <DialogDescription>Control how you interact with the community</DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="space-y-0.5">
                <Label className="text-base">Hide my name</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Display as "Anonymous Student" in posts</p>
              </div>
              <Switch
                checked={privacySettings.hideName}
                onCheckedChange={(checked) => {
                  setPrivacySettings(prev => ({ ...prev, hideName: checked }));
                  toast.success(checked ? 'Identity hidden' : 'Identity visible');
                }}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="space-y-0.5">
                <Label className="text-base">Limit replies</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Only verified users can reply</p>
              </div>
              <Switch
                checked={privacySettings.limitReplies}
                onCheckedChange={(checked) => {
                  setPrivacySettings(prev => ({ ...prev, limitReplies: checked }));
                  toast.success(checked ? 'Reply restrictions enabled' : 'Reply restrictions disabled');
                }}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="space-y-0.5">
                <Label className="text-base">Restrict direct messages</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Prevent private messages</p>
              </div>
              <Switch
                checked={privacySettings.restrictDMs}
                onCheckedChange={(checked) => {
                  setPrivacySettings(prev => ({ ...prev, restrictDMs: checked }));
                  toast.success(checked ? 'Direct messages blocked' : 'Direct messages allowed');
                }}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="space-y-0.5">
                <Label className="text-base">Show online status</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Let others see when you're active</p>
              </div>
              <Switch
                checked={privacySettings.showOnlineStatus}
                onCheckedChange={(checked) => {
                  setPrivacySettings(prev => ({ ...prev, showOnlineStatus: checked }));
                  toast.success(checked ? 'Online status visible' : 'Online status hidden');
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Age Restriction Modal */}
      <Dialog open={showAgeRestriction} onOpenChange={setShowAgeRestriction}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Age Restriction Notice</DialogTitle>
            <DialogDescription>Community posting is restricted to users 17 years and older</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-100 mb-2">Community Discussions (17+ Only)</p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  You'll be able to post and participate in community discussions when you turn 17. For now, you can watch verified GriD Corps training videos and learn from expert mentors!
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowAgeRestriction(false)} className="flex-1">
                Close
              </Button>
              <Button 
                onClick={() => {
                  setShowAgeRestriction(false);
                  if (gridCorpsVideos.length > 0) {
                    handleVideoPlay(gridCorpsVideos[0]);
                  }
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Video className="w-4 h-4 mr-2" />
                Watch Videos
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mobile version component
function CommunityHubMobile({ userData, moduleFilter, onClose }: CommunityHubProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'videos' | 'settings'>('feed');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<GridCorpsVideo | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [canSkipVideo, setCanSkipVideo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Dr. Sharma - GriD Corps',
      institution: 'National Disaster Response Team',
      content: '🚨 Emergency Preparedness Week starts today! Focus on building your emergency kits.',
      module: 'General',
      upvotes: 247,
      replies: [],
      timestamp: '3 hours ago',
      isVerified: true,
      isOfficial: true,
      upvotedBy: [],
      bookmarkedBy: []
    },
    {
      id: '2',
      author: 'Rahul Kumar',
      institution: 'St. Xavier\'s College, Kolkata',
      content: 'What are best evacuation practices for 8-story buildings during earthquakes?',
      module: 'Operational Plans',
      upvotes: 34,
      replies: [],
      timestamp: '5 hours ago',
      isVerified: true,
      isOfficial: false,
      upvotedBy: [],
      bookmarkedBy: []
    }
  ]);

  const userAge = userData ? parseInt(userData.age) : 0;
  const canParticipate = userAge >= 17;
  const currentUserName = userData?.studentName || 'Anonymous';

  const gridCorpsVideos: GridCorpsVideo[] = [
    {
      id: 'v1',
      title: 'Advanced Evacuation Protocols',
      duration: '24:15',
      instructor: 'Dr. Anil Kumar',
      module: 'Operational Plans',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600',
      description: 'Learn comprehensive evacuation procedures',
      views: 3420
    },
    {
      id: 'v2',
      title: 'Crisis Communication',
      duration: '18:42',
      instructor: 'Meera Singh',
      module: 'Risk Management',
      thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600',
      description: 'Youth leadership in disasters',
      views: 2890
    }
  ];

  const handleUpvote = (postId: string) => {
    if (!canParticipate) {
      toast.error('You must be 17+ to interact');
      return;
    }
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.upvotedBy.includes(currentUserName);
        return {
          ...post,
          upvotes: hasUpvoted ? post.upvotes - 1 : post.upvotes + 1,
          upvotedBy: hasUpvoted 
            ? post.upvotedBy.filter(name => name !== currentUserName)
            : [...post.upvotedBy, currentUserName]
        };
      }
      return post;
    }));
  };

  const handleVideoPlay = (video: GridCorpsVideo) => {
    setCurrentVideo(video);
    setShowVideoPlayer(true);
    setVideoProgress(0);
    setCanSkipVideo(false);
    
    const interval = setInterval(() => {
      setVideoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCanSkipVideo(true);
          return 100;
        }
        return prev + 2;
      });
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Community Hub</h1>
              <p className="text-xs text-slate-500">DPRES Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-4 h-4" />
            </Button>
            {onClose && (
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {showSearch && (
          <div className="mt-3">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'feed' && (
          <div className="p-4 space-y-4">
            {!canParticipate && (
              <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Age Restriction</p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">17+ to participate. Watch training videos below!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {posts.map((post) => (
              <Card key={post.id} className={post.isOfficial ? 'border-blue-300 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-950/10' : ''}>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={post.isOfficial ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : ''}>
                          {post.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="font-medium text-sm">{post.author}</span>
                          {post.isVerified && <CheckCircle className="w-3 h-3 text-blue-600" />}
                          {post.isOfficial && (
                            <Badge className="text-xs bg-blue-600 text-white">Official</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mb-2">{post.timestamp}</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{post.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-8"
                        onClick={() => handleUpvote(post.id)}
                      >
                        <ThumbsUp className={`w-3 h-3 mr-1 ${post.upvotedBy.includes(currentUserName) ? 'fill-current text-blue-600' : ''}`} />
                        {post.upvotes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs h-8" disabled={!canParticipate}>
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs h-8">
                        <Flag className="w-3 h-3 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="p-4 space-y-4">
            {gridCorpsVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full bg-white/90 hover:bg-white text-black"
                      onClick={() => handleVideoPlay(video)}
                    >
                      <PlayCircle className="w-6 h-6" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-sm mb-1">{video.title}</h3>
                  <p className="text-xs text-slate-500">{video.instructor}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">{video.module}</Badge>
                    <span className="text-xs text-slate-500">{video.views.toLocaleString()} views</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Hide my name</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Limit replies</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-700 px-2 py-2 flex-shrink-0">
        <div className="flex items-center justify-around">
          <Button
            variant={activeTab === 'feed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('feed')}
            className="flex-col h-auto py-2"
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs">Feed</span>
          </Button>
          <Button
            variant={activeTab === 'videos' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('videos')}
            className="flex-col h-auto py-2"
          >
            <Video className="w-5 h-5 mb-1" />
            <span className="text-xs">Videos</span>
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('settings')}
            className="flex-col h-auto py-2"
          >
            <Settings className="w-5 h-5 mb-1" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={showVideoPlayer} onOpenChange={() => {}}>
        <DialogContent className="max-w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-sm">{currentVideo?.title}</DialogTitle>
            <DialogDescription className="text-xs">{currentVideo?.instructor}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              <img src={currentVideo?.thumbnail} alt={currentVideo?.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white opacity-80" />
              </div>
            </div>
            {!canSkipVideo && (
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium">Watch to completion</p>
                  <span className="text-xs font-semibold">{videoProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-500"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              </div>
            )}
            {canSkipVideo && (
              <Button 
                onClick={() => {
                  setShowVideoPlayer(false);
                  toast.success('Video completed!');
                }} 
                className="w-full"
              >
                Close Video
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
