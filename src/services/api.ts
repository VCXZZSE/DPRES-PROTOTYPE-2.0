/**
 * API Service Layer
 * 
 * This module provides the centralized API integration points for the application.
 * All backend communication should go through these service functions.
 * 
 * Configuration:
 * - Set API_BASE_URL environment variable or modify below
 * - API endpoints are organized by feature domain
 */

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ==================== Authentication Services ====================

export const authService = {
  studentLogin: (schoolCode: string, studentName: string, age: string, institutionType: 'school' | 'college') =>
    fetch(`${API_BASE_URL}/auth/student-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schoolCode, studentName, age, institutionType }),
    }).then(res => res.json()),

  adminLogin: (email: string, password: string) =>
    fetch(`${API_BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json()),

  institutionAdminLogin: (institutionId: string, email: string, password: string) =>
    fetch(`${API_BASE_URL}/auth/institution-admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ institutionId, email, password }),
    }).then(res => res.json()),

  logout: () =>
    fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' }).then(res => res.json()),
};

// ==================== Institution Services ====================

export const institutionService = {
  getAll: () =>
    fetch(`${API_BASE_URL}/institutions`).then(res => res.json()),

  getById: (id: string) =>
    fetch(`${API_BASE_URL}/institutions/${id}`).then(res => res.json()),

  getSchools: () =>
    fetch(`${API_BASE_URL}/institutions?type=school`).then(res => res.json()),

  getColleges: () =>
    fetch(`${API_BASE_URL}/institutions?type=college`).then(res => res.json()),

  update: (id: string, data: any) =>
    fetch(`${API_BASE_URL}/institutions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};

// ==================== Certificate Services ====================

export const certificateService = {
  getByInstitution: (institutionId: string) =>
    fetch(`${API_BASE_URL}/certificates?institutionId=${institutionId}`).then(res => res.json()),

  generate: (institutionId: string) =>
    fetch(`${API_BASE_URL}/certificates/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ institutionId }),
    }).then(res => res.json()),

  download: (certificateId: string) =>
    fetch(`${API_BASE_URL}/certificates/${certificateId}/download`).then(res => res.blob()),

  list: (filters?: any) => {
    const params = new URLSearchParams(filters || {});
    return fetch(`${API_BASE_URL}/certificates?${params}`).then(res => res.json());
  },
};

// ==================== Emergency Alert Services ====================

export const emergencyService = {
  createAlert: (alertData: any) =>
    fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    }).then(res => res.json()),

  getAlerts: (filters?: any) => {
    const params = new URLSearchParams(filters || {});
    return fetch(`${API_BASE_URL}/alerts?${params}`).then(res => res.json());
  },

  updateAlert: (alertId: string, data: any) =>
    fetch(`${API_BASE_URL}/alerts/${alertId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  sendSOS: (data: any) =>
    fetch(`${API_BASE_URL}/sos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};

// ==================== Learning Module Services ====================

export const moduleService = {
  getAll: () =>
    fetch(`${API_BASE_URL}/modules`).then(res => res.json()),

  getById: (id: string) =>
    fetch(`${API_BASE_URL}/modules/${id}`).then(res => res.json()),

  getProgress: (studentId: string) =>
    fetch(`${API_BASE_URL}/modules/progress/${studentId}`).then(res => res.json()),

  updateProgress: (studentId: string, moduleId: string, progress: number) =>
    fetch(`${API_BASE_URL}/modules/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, moduleId, progress }),
    }).then(res => res.json()),

  complete: (studentId: string, moduleId: string) =>
    fetch(`${API_BASE_URL}/modules/${moduleId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId }),
    }).then(res => res.json()),
};

// ==================== Community Services ====================

export const communityService = {
  getPosts: (filters?: any) => {
    const params = new URLSearchParams(filters || {});
    return fetch(`${API_BASE_URL}/community/posts?${params}`).then(res => res.json());
  },

  createPost: (data: any) =>
    fetch(`${API_BASE_URL}/community/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  replyToPost: (postId: string, reply: string) =>
    fetch(`${API_BASE_URL}/community/posts/${postId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    }).then(res => res.json()),

  reportPost: (postId: string, reason: string) =>
    fetch(`${API_BASE_URL}/community/posts/${postId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    }).then(res => res.json()),
};

// ==================== SMS/IVR Services ====================

export const communicationService = {
  getSMSTemplates: () =>
    fetch(`${API_BASE_URL}/communication/sms-templates`).then(res => res.json()),

  sendSMS: (data: any) =>
    fetch(`${API_BASE_URL}/communication/send-sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  getIVRSettings: () =>
    fetch(`${API_BASE_URL}/communication/ivr-settings`).then(res => res.json()),

  updateIVRSettings: (settings: any) =>
    fetch(`${API_BASE_URL}/communication/ivr-settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    }).then(res => res.json()),
};

// ==================== Reports & Analytics Services ====================

export const analyticsService = {
  getDashboardStats: () =>
    fetch(`${API_BASE_URL}/analytics/dashboard`).then(res => res.json()),

  getComplianceReport: (filters?: any) => {
    const params = new URLSearchParams(filters || {});
    return fetch(`${API_BASE_URL}/analytics/compliance?${params}`).then(res => res.json());
  },

  getTrainingProgress: (filters?: any) => {
    const params = new URLSearchParams(filters || {});
    return fetch(`${API_BASE_URL}/analytics/training-progress?${params}`).then(res => res.json());
  },

  exportReport: (format: 'pdf' | 'csv' | 'excel', filters?: any) => {
    const params = new URLSearchParams({ format, ...(filters || {}) });
    return fetch(`${API_BASE_URL}/analytics/export?${params}`).then(res => res.blob());
  },
};

// ==================== VR Training Services ====================

export const vrService = {
  getScenarios: () =>
    fetch(`${API_BASE_URL}/vr/scenarios`).then(res => res.json()),

  trackSession: (data: any) =>
    fetch(`${API_BASE_URL}/vr/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  getSessions: (studentId: string) =>
    fetch(`${API_BASE_URL}/vr/sessions?studentId=${studentId}`).then(res => res.json()),
};

// ==================== Error Handling Utility ====================

export const handleApiError = (error: any) => {
  if (error instanceof TypeError) {
    console.error('Network error:', error.message);
    return { error: 'Network error. Please check your connection.' };
  }
  if (error.response) {
    console.error('API error:', error.response.status, error.response.data);
    return { error: error.response.data?.message || 'An error occurred' };
  }
  console.error('Unexpected error:', error);
  return { error: 'An unexpected error occurred' };
};
