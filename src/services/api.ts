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
  readonly VITE_AUTH_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dpres-backend.onrender.com/api';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL || 'https://dpres-backend.onrender.com/api/auth';

interface ApiErrorPayload {
  detail?: string;
  message?: string;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return {} as T;
  }
  return response.json() as Promise<T>;
}

async function authRequest<T>(
  path: string,
  method: HttpMethod,
  body?: unknown,
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${AUTH_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await parseJsonResponse<ApiErrorPayload & T>(response);

  if (!response.ok) {
    const errorMessage = payload?.detail || payload?.message || 'Request failed';
    throw new ApiError(errorMessage, response.status);
  }

  return payload as T;
}

export interface StudentRegisterPayload {
  email: string;
  password: string;
  institution_id: number;
  full_name: string;
  age?: number;
}

export interface StudentLoginPayload {
  email: string;
  password: string;
}

export interface SdmaAdminLoginPayload {
  email: string;
  password: string;
}

export interface SignupInitiatePayload {
  institution_id: number;
  email: string;
  id_card_number: string;
  full_name: string;
  age: number;
}

export interface SignupInitiateApiResponse {
  message: string;
  verification_token?: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
}

export interface SdmaAdminLoginResponse {
  access_token: string;
  token_type: string;
  email: string;
  display_name: string;
}

export interface MeResponse {
  id: number;
  email: string;
  full_name: string;
  role: string;
  institution_id: number;
  email_verified_at: string | null;
}

export interface SOSTriggerPayload {
  latitude: number;
  longitude: number;
  location_text?: string;
  accuracy_meters?: number;
}

export interface SOSTriggerApiResponse {
  message: string;
  event_id: number;
  created_at: string;
}

// ==================== Authentication Services ====================

export const authService = {
  signupInitiate: (payload: SignupInitiatePayload) =>
    authRequest<SignupInitiateApiResponse>('/signup-initiate', 'POST', payload),

  verifyEmail: (token: string) =>
    authRequest<{ message: string }>('/verify-email', 'POST', { token }),

  completeSignup: (token: string, password: string) =>
    authRequest<{ message: string; user_id: number }>('/complete-signup', 'POST', { token, password }),

  registerStudent: (payload: StudentRegisterPayload) =>
    authRequest<{ message: string; user_id: number }>('/register-student', 'POST', payload),

  loginStudent: async (payload: StudentLoginPayload) => {
    const data = await authRequest<AuthTokenResponse>('/login-student', 'POST', payload);
    localStorage.setItem('dpres_access_token', data.access_token);
    return data;
  },

  getMe: (token?: string) => {
    const accessToken = token || localStorage.getItem('dpres_access_token') || '';
    return authRequest<MeResponse>('/me', 'GET', undefined, accessToken);
  },

  forgotPassword: (payload: { email: string; idCardNumber: string }) =>
    authRequest<{ message: string }>('/forgot-password', 'POST', {
      email: payload.email,
      id_card_number: payload.idCardNumber,
    }),

  resetPassword: (token: string, newPassword: string) =>
    authRequest<{ message: string }>('/reset-password', 'POST', { token, new_password: newPassword }),

  setToken: (token: string) => {
    localStorage.setItem('dpres_access_token', token);
  },

  getToken: () => localStorage.getItem('dpres_access_token'),

  clearToken: () => {
    localStorage.removeItem('dpres_access_token');
  },

  // Backward compatible alias while login UI migration is in progress.
  studentLogin: (email: string, password: string) =>
    authService.loginStudent({ email, password }),

  sdmaAdminLogin: (payload: SdmaAdminLoginPayload) =>
    authRequest<SdmaAdminLoginResponse>('/login-sdma-admin', 'POST', payload).then((data) => {
      localStorage.setItem('dpres_access_token', data.access_token);
      return data;
    }),

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

  logout: () => {
    authService.clearToken();
    return Promise.resolve({ message: 'Logged out locally' });
  },
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

export const sosService = {
  trigger: async (payload: SOSTriggerPayload, token?: string): Promise<SOSTriggerApiResponse> => {
    const accessToken = token || authService.getToken() || '';
    if (!accessToken) {
      throw new ApiError('Authentication required before sending SOS', 401);
    }

    const response = await fetch(`${API_BASE_URL}/sos/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonResponse<ApiErrorPayload & SOSTriggerApiResponse>(response);
    if (!response.ok) {
      const errorMessage = data?.detail || data?.message || 'Failed to send SOS';
      throw new ApiError(errorMessage, response.status);
    }

    return data as SOSTriggerApiResponse;
  },
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
