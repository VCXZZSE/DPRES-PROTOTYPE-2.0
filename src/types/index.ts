/**
 * Shared Types
 * 
 * Central location for all TypeScript types and interfaces used across the application.
 * This helps maintain type consistency and makes it easy to update shared types globally.
 */

// ==================== User Types ====================

export interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
  institutionType: 'school' | 'college';
}

export interface AdminData {
  email: string;
  password: string;
  displayName?: string;
}

export interface InstitutionAdminData {
  institutionId: string;
  adminName: string;
  role: string;
}

// ==================== Institution Types ====================

export interface Institution {
  id: string;
  name: string;
  code: string;
  type: 'school' | 'college';
  district: string;
  state: string;
  students: number;
  avgProgress: number;
  compliance: ComplianceInfo;
}

export interface ComplianceInfo {
  certificateStatus: 'issued' | 'pending' | 'expired' | 'not-eligible';
  lastUpdated: string;
  complianceScore: number;
}

// ==================== Certificate Types ====================

export interface ComplianceCertificate {
  id: string;
  institutionId: string;
  institutionName: string;
  issueDate: string;
  expiryDate: string;
  certificateNumber: string;
  status: 'issued' | 'pending' | 'expired';
  generatedBy: string;
}

// ==================== Emergency Types ====================

export interface EmergencyAlert {
  id: string;
  type: 'cyclone' | 'flood' | 'earthquake' | 'tsunami' | 'custom';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedRegions: string[];
  targetInstitutions: string[];
  timestamp: string;
  status: 'active' | 'resolved' | 'archived';
  responseTime: string;
  actions: string[];
}

export interface SOSAlert {
  id: string;
  studentId: string;
  studentName: string;
  institutionId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  severity: 'low' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'responded' | 'resolved';
}

// ==================== Learning Module Types ====================

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'disaster-management' | 'preparedness' | 'response' | 'recovery';
  duration: number; // in minutes
  lessons: Lesson[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  studentCount: number;
  avgCompletion: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
  videoUrl?: string;
  order: number;
}

export interface ModuleProgress {
  studentId: string;
  moduleId: string;
  completionPercentage: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

// ==================== Community Types ====================

export interface CommunityPost {
  id: string;
  author: string;
  authorId: string;
  institutionId: string;
  module: string;
  content: string;
  timestamp: string;
  status: 'active' | 'reported' | 'moderated';
  replies: PostReply[];
  reportCount: number;
}

export interface PostReply {
  id: string;
  author: string;
  authorId: string;
  isOfficial: boolean;
  content: string;
  timestamp: string;
}

// ==================== Communication Types ====================

export interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: 'alert' | 'reminder' | 'confirmation';
}

export interface IVRSetting {
  id: string;
  language: 'hindi' | 'english' | 'local';
  voicePreset: string;
  retryCount: number;
  timeoutDuration: number;
}

// ==================== VR Training Types ====================

export interface VRScenario {
  id: string;
  title: string;
  description: string;
  type: 'evacuation' | 'assembly' | 'communication' | 'medical';
  duration: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
}

export interface VRSession {
  id: string;
  studentId: string;
  scenarioId: string;
  startTime: string;
  endTime?: string;
  score?: number;
  performanceMetrics?: {
    timeToComplete: number;
    accuracy: number;
    decisionQuality: number;
  };
  status: 'in-progress' | 'completed' | 'failed';
}

// ==================== Analytics Types ====================

export interface DashboardStats {
  totalInstitutions: number;
  totalStudents: number;
  avgComplianceScore: number;
  activeSOSAlerts: number;
  trainingCompletion: number;
  certificateIssuanceRate: number;
}

export interface PerformanceMetric {
  district: string;
  schools: number;
  colleges: number;
  totalProgress: number;
  timestamp: string;
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ==================== Language Types ====================

export type LanguageCode = 'en' | 'hi';

export interface LanguageStrings {
  [key: string]: string | LanguageStrings;
}
