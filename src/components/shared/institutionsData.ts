// Shared institutions data across the application
export interface Institution {
  id: string;
  name: string;
  code: string;
  type: 'school' | 'college';
  district: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  students: number;
  avgProgress: number;
  activeAlerts: number;
  lastActive: string;
  contact?: string;
  email?: string;
  // New compliance and communication fields
  compliance: {
    trainingModulesCompleted: number;
    totalTrainingModules: number;
    safetyDrillsCompleted: number;
    requiredSafetyDrills: number;
    complianceScore: number;
    lastAuditDate: string;
    certificateStatus: 'issued' | 'pending' | 'expired' | 'not-eligible';
    certificateIssueDate?: string;
    certificateExpiryDate?: string;
    certificateId?: string;
  };
  contacts: {
    students: ContactInfo[];
    parents: ContactInfo[];
    staff: ContactInfo[];
    emergency: ContactInfo[];
  };
}

export interface ContactInfo {
  id: string;
  name: string;
  phone: string;
  email?: string;
  language: 'en' | 'hi' | 'ta' | 'te' | 'mr';
  type: 'student' | 'parent' | 'teacher' | 'admin' | 'emergency';
  verified: boolean;
  lastContactDate?: string;
}

export interface ComplianceCertificate {
  id: string;
  institutionId: string;
  institutionName: string;
  certificateType: 'disaster-readiness' | 'safety-compliance' | 'training-completion';
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'revoked';
  complianceScore: number;
  requirements: {
    trainingModules: { completed: number; total: number };
    safetyDrills: { completed: number; total: number };
    infrastructure: { score: number; maxScore: number };
    staff: { trained: number; total: number };
  };
  downloadUrl?: string;
  qrCode?: string;
}

// Schools data with locations across India
export const schools: Institution[] = [
  { 
    id: 'dps-001', 
    name: 'Delhi Public School', 
    code: 'DPS-001', 
    type: 'school',
    district: 'New Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    students: 1250,
    avgProgress: 85,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 11 2332 4567',
    email: 'contact@dpsdelhi.edu.in',
    compliance: {
      trainingModulesCompleted: 12,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 95,
      lastAuditDate: '2025-01-10',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-15',
      certificateExpiryDate: '2026-01-15',
      certificateId: 'CERT-DPS-001-2025'
    },
    contacts: {
      students: [
        { id: 'st-1', name: 'Rahul Sharma', phone: '+91 98765 43201', email: 'rahul.sharma@student.dps.edu', language: 'en', type: 'student', verified: true },
        { id: 'st-2', name: 'Priya Patel', phone: '+91 98765 43202', language: 'hi', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-1', name: 'Mr. Sharma', phone: '+91 98765 43203', email: 'sharma.father@gmail.com', language: 'hi', type: 'parent', verified: true },
        { id: 'pr-2', name: 'Mrs. Patel', phone: '+91 98765 43204', language: 'hi', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-1', name: 'Dr. Meera Singh', phone: '+91 98765 43205', email: 'principal@dpsdelhi.edu.in', language: 'en', type: 'admin', verified: true },
        { id: 'st-2', name: 'Mr. Kumar', phone: '+91 98765 43206', language: 'hi', type: 'teacher', verified: true }
      ],
      emergency: [
        { id: 'em-1', name: 'Delhi Fire Department', phone: '101', language: 'hi', type: 'emergency', verified: true },
        { id: 'em-2', name: 'Local Police Station', phone: '100', language: 'hi', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'kv-002', 
    name: 'Kendriya Vidyalaya Bandra', 
    code: 'KV-002', 
    type: 'school',
    district: 'Mumbai',
    state: 'Maharashtra',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    students: 980,
    avgProgress: 78,
    activeAlerts: 1,
    lastActive: '2025-01-17',
    contact: '+91 22 2567 8901',
    email: 'kvbandra@kvs.gov.in',
    compliance: {
      trainingModulesCompleted: 10,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 3,
      requiredSafetyDrills: 4,
      complianceScore: 78,
      lastAuditDate: '2025-01-08',
      certificateStatus: 'pending',
      certificateIssueDate: undefined,
      certificateExpiryDate: undefined,
      certificateId: undefined
    },
    contacts: {
      students: [
        { id: 'st-3', name: 'Anjali Desai', phone: '+91 98765 43207', language: 'mr', type: 'student', verified: true },
        { id: 'st-4', name: 'Rohit Joshi', phone: '+91 98765 43208', language: 'hi', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-3', name: 'Mr. Desai', phone: '+91 98765 43209', language: 'mr', type: 'parent', verified: true },
        { id: 'pr-4', name: 'Mrs. Joshi', phone: '+91 98765 43210', language: 'hi', type: 'parent', verified: false }
      ],
      staff: [
        { id: 'st-3', name: 'Mrs. Reddy', phone: '+91 98765 43211', email: 'principal@kvbandra.edu.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-3', name: 'Mumbai Fire Brigade', phone: '101', language: 'mr', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'dav-003', 
    name: 'DAV Public School', 
    code: 'DAV-003', 
    type: 'school',
    district: 'Bengaluru',
    state: 'Karnataka',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    students: 1150,
    avgProgress: 82,
    activeAlerts: 0,
    lastActive: '2025-01-16',
    contact: '+91 80 2345 6789',
    email: 'principal@davbengaluru.edu.in',
    compliance: {
      trainingModulesCompleted: 11,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 88,
      lastAuditDate: '2025-01-12',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-16',
      certificateExpiryDate: '2026-01-16',
      certificateId: 'CERT-DAV-003-2025'
    },
    contacts: {
      students: [
        { id: 'st-5', name: 'Kavya Krishnan', phone: '+91 98765 43212', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-5', name: 'Dr. Krishnan', phone: '+91 98765 43213', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-4', name: 'Mr. Rao', phone: '+91 98765 43214', email: 'principal@davbengaluru.edu.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-4', name: 'Bengaluru Fire Department', phone: '101', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'aps-004', 
    name: 'Army Public School', 
    code: 'APS-004', 
    type: 'school',
    district: 'Pune',
    state: 'Maharashtra',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    students: 890,
    avgProgress: 88,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 20 2678 9012',
    email: 'aps.pune@armyschools.net',
    compliance: {
      trainingModulesCompleted: 12,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 92,
      lastAuditDate: '2025-01-05',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-10',
      certificateExpiryDate: '2026-01-10',
      certificateId: 'CERT-APS-004-2025'
    },
    contacts: {
      students: [
        { id: 'st-6', name: 'Arjun Singh', phone: '+91 98765 43215', language: 'hi', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-6', name: 'Col. Singh', phone: '+91 98765 43216', language: 'hi', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-5', name: 'Mrs. Gupta', phone: '+91 98765 43217', email: 'principal@aps.pune.edu.in', language: 'hi', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-5', name: 'Pune Emergency Services', phone: '112', language: 'hi', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'ryan-005', 
    name: 'Ryan International School', 
    code: 'RYAN-005', 
    type: 'school',
    district: 'Chennai',
    state: 'Tamil Nadu',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    students: 1320,
    avgProgress: 79,
    activeAlerts: 2,
    lastActive: '2025-01-17',
    contact: '+91 44 2789 0123',
    email: 'ryan.chennai@ryangroup.org',
    compliance: {
      trainingModulesCompleted: 9,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 2,
      requiredSafetyDrills: 4,
      complianceScore: 65,
      lastAuditDate: '2025-01-01',
      certificateStatus: 'not-eligible',
      certificateIssueDate: undefined,
      certificateExpiryDate: undefined,
      certificateId: undefined
    },
    contacts: {
      students: [
        { id: 'st-7', name: 'Lakshmi Iyer', phone: '+91 98765 43218', language: 'ta', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-7', name: 'Mr. Iyer', phone: '+91 98765 43219', language: 'ta', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-6', name: 'Dr. Raman', phone: '+91 98765 43220', email: 'principal@ryan.chennai.edu.in', language: 'ta', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-6', name: 'Chennai Fire Service', phone: '101', language: 'ta', type: 'emergency', verified: true }
      ]
    }
  },
  // Kolkata Schools
  { 
    id: 'lmb-006', 
    name: 'La Martiniere for Boys', 
    code: 'LMB-006', 
    type: 'school',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5540, lng: 88.3426 },
    students: 1450,
    avgProgress: 91,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2249 1231',
    email: 'office@lamartiniereforboys.org',
    compliance: {
      trainingModulesCompleted: 12,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 93,
      lastAuditDate: '2025-01-14',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-16',
      certificateExpiryDate: '2026-01-16',
      certificateId: 'CERT-LMB-006-2025'
    },
    contacts: {
      students: [
        { id: 'st-8', name: 'Arjun Ghosh', phone: '+91 98765 43240', email: 'arjun.ghosh@student.lmb.edu', language: 'en', type: 'student', verified: true },
        { id: 'st-9', name: 'Sourav Das', phone: '+91 98765 43241', language: 'bn', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-8', name: 'Mr. Ghosh', phone: '+91 98765 43242', email: 'ghosh.father@gmail.com', language: 'bn', type: 'parent', verified: true },
        { id: 'pr-9', name: 'Mrs. Das', phone: '+91 98765 43243', language: 'bn', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-7', name: 'Dr. Supriyo Sen', phone: '+91 98765 43244', email: 'principal@lamartiniereforboys.org', language: 'en', type: 'admin', verified: true },
        { id: 'st-8', name: 'Mr. Banerjee', phone: '+91 98765 43245', language: 'bn', type: 'teacher', verified: true }
      ],
      emergency: [
        { id: 'em-7', name: 'Kolkata Fire Brigade', phone: '101', language: 'bn', type: 'emergency', verified: true },
        { id: 'em-8', name: 'Kolkata Police', phone: '100', language: 'bn', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'sxcs-007', 
    name: 'St. Xavier\'s Collegiate School', 
    code: 'SXCS-007', 
    type: 'school',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5626, lng: 88.3630 },
    students: 1280,
    avgProgress: 89,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2237 4797',
    email: 'principal@sxccal.edu',
    compliance: {
      trainingModulesCompleted: 11,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 90,
      lastAuditDate: '2025-01-13',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-15',
      certificateExpiryDate: '2026-01-15',
      certificateId: 'CERT-SXCS-007-2025'
    },
    contacts: {
      students: [
        { id: 'st-10', name: 'Anirban Roy', phone: '+91 98765 43246', language: 'en', type: 'student', verified: true },
        { id: 'st-11', name: 'Debojit Saha', phone: '+91 98765 43247', language: 'bn', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-10', name: 'Dr. Roy', phone: '+91 98765 43248', language: 'en', type: 'parent', verified: true },
        { id: 'pr-11', name: 'Mr. Saha', phone: '+91 98765 43249', language: 'bn', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-9', name: 'Fr. Dominic Savio', phone: '+91 98765 43250', email: 'rector@sxccal.edu', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-9', name: 'Park Street Police Station', phone: '+91 33 2249 3500', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'sphs-008', 
    name: 'South Point High School', 
    code: 'SPHS-008', 
    type: 'school',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5311, lng: 88.3503 },
    students: 1650,
    avgProgress: 86,
    activeAlerts: 1,
    lastActive: '2025-01-17',
    contact: '+91 33 2486 4273',
    email: 'info@southpoint.edu.in',
    compliance: {
      trainingModulesCompleted: 10,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 3,
      requiredSafetyDrills: 4,
      complianceScore: 82,
      lastAuditDate: '2025-01-10',
      certificateStatus: 'pending',
      certificateIssueDate: undefined,
      certificateExpiryDate: undefined,
      certificateId: undefined
    },
    contacts: {
      students: [
        { id: 'st-12', name: 'Riya Chatterjee', phone: '+91 98765 43251', language: 'bn', type: 'student', verified: true },
        { id: 'st-13', name: 'Abhijit Mukherjee', phone: '+91 98765 43252', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-12', name: 'Mrs. Chatterjee', phone: '+91 98765 43253', language: 'bn', type: 'parent', verified: true },
        { id: 'pr-13', name: 'Dr. Mukherjee', phone: '+91 98765 43254', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-10', name: 'Mrs. Krishna Dutta', phone: '+91 98765 43255', email: 'principal@southpoint.edu.in', language: 'bn', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-10', name: 'Golpark Fire Station', phone: '+91 33 2486 2233', language: 'bn', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'mbwa-009', 
    name: 'Mahadevi Birla World Academy', 
    code: 'MBWA-009', 
    type: 'school',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5204, lng: 88.3431 },
    students: 950,
    avgProgress: 88,
    activeAlerts: 0,
    lastActive: '2025-01-16',
    contact: '+91 33 2479 4750',
    email: 'info@mbwa.org',
    compliance: {
      trainingModulesCompleted: 12,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 91,
      lastAuditDate: '2025-01-12',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-14',
      certificateExpiryDate: '2026-01-14',
      certificateId: 'CERT-MBWA-009-2025'
    },
    contacts: {
      students: [
        { id: 'st-14', name: 'Kaveri Sen', phone: '+91 98765 43256', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-14', name: 'Mr. Sen', phone: '+91 98765 43257', language: 'bn', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-11', name: 'Dr. Anjali Bose', phone: '+91 98765 43258', email: 'director@mbwa.org', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-11', name: 'Ballygunge Fire Station', phone: '+91 33 2479 1100', language: 'bn', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'blrs-010', 
    name: 'Bishop Lefroy Road School', 
    code: 'BLRS-010', 
    type: 'school',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5580, lng: 88.3498 },
    students: 1120,
    avgProgress: 84,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2237 4521',
    email: 'office@blrs.edu.in',
    compliance: {
      trainingModulesCompleted: 11,
      totalTrainingModules: 12,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 4,
      complianceScore: 87,
      lastAuditDate: '2025-01-11',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-13',
      certificateExpiryDate: '2026-01-13',
      certificateId: 'CERT-BLRS-010-2025'
    },
    contacts: {
      students: [
        { id: 'st-15', name: 'Tanmoy Bhattacharya', phone: '+91 98765 43259', language: 'bn', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-15', name: 'Mrs. Bhattacharya', phone: '+91 98765 43260', language: 'bn', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-12', name: 'Mr. Ashok Kumar', phone: '+91 98765 43261', email: 'principal@blrs.edu.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-12', name: 'Central Avenue Police', phone: '+91 33 2237 2200', language: 'en', type: 'emergency', verified: true }
      ]
    }
  }
];

// Colleges data with locations across India
export const colleges: Institution[] = [
  { 
    id: 'iit-001', 
    name: 'IIT Delhi', 
    code: 'IIT-001', 
    type: 'college',
    district: 'New Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.5458, lng: 77.1932 },
    students: 12000,
    avgProgress: 98,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 11 2659 1000',
    email: 'admin@iitd.ac.in',
    compliance: {
      trainingModulesCompleted: 15,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 98,
      lastAuditDate: '2025-01-14',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-17',
      certificateExpiryDate: '2026-01-17',
      certificateId: 'CERT-IIT-001-2025'
    },
    contacts: {
      students: [
        { id: 'st-8', name: 'Ankit Gupta', phone: '+91 98765 43221', email: 'ankit@iitd.ac.in', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-8', name: 'Mr. Gupta', phone: '+91 98765 43222', language: 'hi', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-7', name: 'Prof. Sharma', phone: '+91 98765 43223', email: 'director@iitd.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-7', name: 'IIT Emergency Response', phone: '+91 11 2659 1100', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'du-002', 
    name: 'Delhi University', 
    code: 'DU-002', 
    type: 'college',
    district: 'New Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6862, lng: 77.2120 },
    students: 45000,
    avgProgress: 87,
    activeAlerts: 1,
    lastActive: '2025-01-17',
    contact: '+91 11 2766 7491',
    email: 'registrar@du.ac.in',
    compliance: {
      trainingModulesCompleted: 13,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 5,
      requiredSafetyDrills: 6,
      complianceScore: 85,
      lastAuditDate: '2025-01-11',
      certificateStatus: 'pending',
      certificateIssueDate: undefined,
      certificateExpiryDate: undefined,
      certificateId: undefined
    },
    contacts: {
      students: [
        { id: 'st-9', name: 'Neha Kapoor', phone: '+91 98765 43224', language: 'hi', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-9', name: 'Mrs. Kapoor', phone: '+91 98765 43225', language: 'hi', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-8', name: 'Dr. Verma', phone: '+91 98765 43226', email: 'vc@du.ac.in', language: 'hi', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-8', name: 'DU Security', phone: '+91 11 2766 7500', language: 'hi', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'nit-003', 
    name: 'NIT Warangal', 
    code: 'NIT-003', 
    type: 'college',
    district: 'Warangal',
    state: 'Telangana',
    coordinates: { lat: 17.9784, lng: 79.5941 },
    students: 8500,
    avgProgress: 94,
    activeAlerts: 0,
    lastActive: '2025-01-16',
    contact: '+91 870 246 2371',
    email: 'registrar@nitw.ac.in',
    compliance: {
      trainingModulesCompleted: 14,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 94,
      lastAuditDate: '2025-01-13',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-16',
      certificateExpiryDate: '2026-01-16',
      certificateId: 'CERT-NIT-003-2025'
    },
    contacts: {
      students: [
        { id: 'st-10', name: 'Rajesh Kumar', phone: '+91 98765 43227', language: 'te', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-10', name: 'Mr. Kumar', phone: '+91 98765 43228', language: 'te', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-9', name: 'Prof. Reddy', phone: '+91 98765 43229', email: 'director@nitw.ac.in', language: 'te', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-9', name: 'NIT Security', phone: '+91 870 246 2400', language: 'te', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'bits-004', 
    name: 'BITS Pilani', 
    code: 'BITS-004', 
    type: 'college',
    district: 'Pilani',
    state: 'Rajasthan',
    coordinates: { lat: 28.3638, lng: 75.5856 },
    students: 6200,
    avgProgress: 92,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 1596 255 652',
    email: 'registrar@pilani.bits-pilani.ac.in',
    compliance: {
      trainingModulesCompleted: 15,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 5,
      requiredSafetyDrills: 6,
      complianceScore: 90,
      lastAuditDate: '2025-01-09',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-12',
      certificateExpiryDate: '2026-01-12',
      certificateId: 'CERT-BITS-004-2025'
    },
    contacts: {
      students: [
        { id: 'st-11', name: 'Vikram Singh', phone: '+91 98765 43230', language: 'hi', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-11', name: 'Dr. Singh', phone: '+91 98765 43231', language: 'hi', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-10', name: 'Prof. Agarwal', phone: '+91 98765 43232', email: 'director@pilani.bits-pilani.ac.in', language: 'hi', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-10', name: 'BITS Emergency', phone: '+91 1596 255 700', language: 'hi', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'iim-005', 
    name: 'IIM Bangalore', 
    code: 'IIM-005', 
    type: 'college',
    district: 'Bengaluru',
    state: 'Karnataka',
    coordinates: { lat: 13.0067, lng: 77.5218 },
    students: 1250,
    avgProgress: 96,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 80 2699 3000',
    email: 'registrar@iimb.ac.in',
    compliance: {
      trainingModulesCompleted: 15,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 96,
      lastAuditDate: '2025-01-15',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-17',
      certificateExpiryDate: '2026-01-17',
      certificateId: 'CERT-IIM-005-2025'
    },
    contacts: {
      students: [
        { id: 'st-12', name: 'Sneha Nair', phone: '+91 98765 43233', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-12', name: 'Mr. Nair', phone: '+91 98765 43234', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-11', name: 'Prof. Krishnan', phone: '+91 98765 43235', email: 'director@iimb.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-11', name: 'IIM Security', phone: '+91 80 2699 3100', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'iisc-006', 
    name: 'IISc Bangalore', 
    code: 'IISC-006', 
    type: 'college',
    district: 'Bengaluru',
    state: 'Karnataka',
    coordinates: { lat: 13.0218, lng: 77.5712 },
    students: 3500,
    avgProgress: 95,
    activeAlerts: 1,
    lastActive: '2025-01-17',
    contact: '+91 80 2293 2001',
    email: 'registrar@iisc.ac.in',
    compliance: {
      trainingModulesCompleted: 14,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 93,
      lastAuditDate: '2025-01-16',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-17',
      certificateExpiryDate: '2026-01-17',
      certificateId: 'CERT-IISC-006-2025'
    },
    contacts: {
      students: [
        { id: 'st-13', name: 'Karthik Rao', phone: '+91 98765 43236', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-13', name: 'Dr. Rao', phone: '+91 98765 43237', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-12', name: 'Prof. Murthy', phone: '+91 98765 43238', email: 'director@iisc.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-12', name: 'IISc Emergency', phone: '+91 80 2293 2100', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  // Kolkata Colleges
  { 
    id: 'pres-007', 
    name: 'Presidency University', 
    code: 'PRES-007', 
    type: 'college',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5813, lng: 88.3665 },
    students: 5500,
    avgProgress: 94,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2241 1459',
    email: 'registrar@presiuniv.ac.in',
    compliance: {
      trainingModulesCompleted: 15,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 96,
      lastAuditDate: '2025-01-15',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-17',
      certificateExpiryDate: '2026-01-17',
      certificateId: 'CERT-PRES-007-2025'
    },
    contacts: {
      students: [
        { id: 'st-16', name: 'Saurav Chakraborty', phone: '+91 98765 43262', email: 'saurav@presiuniv.ac.in', language: 'en', type: 'student', verified: true },
        { id: 'st-17', name: 'Priyanka Dey', phone: '+91 98765 43263', language: 'bn', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-16', name: 'Prof. Chakraborty', phone: '+91 98765 43264', language: 'en', type: 'parent', verified: true },
        { id: 'pr-17', name: 'Mrs. Dey', phone: '+91 98765 43265', language: 'bn', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-13', name: 'Prof. Debashis Roy', phone: '+91 98765 43266', email: 'vc@presiuniv.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-13', name: 'Presidency Security', phone: '+91 33 2241 1500', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'sxc-008', 
    name: 'St. Xavier\'s College Kolkata', 
    code: 'SXC-008', 
    type: 'college',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5540, lng: 88.3548 },
    students: 4200,
    avgProgress: 92,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2237 1806',
    email: 'principal@sxccal.edu',
    compliance: {
      trainingModulesCompleted: 14,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 93,
      lastAuditDate: '2025-01-14',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-16',
      certificateExpiryDate: '2026-01-16',
      certificateId: 'CERT-SXC-008-2025'
    },
    contacts: {
      students: [
        { id: 'st-18', name: 'Rohit Ganguly', phone: '+91 98765 43267', email: 'rohit@sxccal.edu', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-18', name: 'Dr. Ganguly', phone: '+91 98765 43268', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-14', name: 'Fr. Dominic Gomes', phone: '+91 98765 43269', email: 'principal@sxccal.edu', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-14', name: 'SXC Security', phone: '+91 33 2237 1900', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'ju-009', 
    name: 'Jadavpur University', 
    code: 'JU-009', 
    type: 'college',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.4991, lng: 88.3712 },
    students: 8900,
    avgProgress: 89,
    activeAlerts: 1,
    lastActive: '2025-01-17',
    contact: '+91 33 2414 6666',
    email: 'registrar@jaduniv.edu.in',
    compliance: {
      trainingModulesCompleted: 13,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 5,
      requiredSafetyDrills: 6,
      complianceScore: 86,
      lastAuditDate: '2025-01-12',
      certificateStatus: 'pending',
      certificateIssueDate: undefined,
      certificateExpiryDate: undefined,
      certificateId: undefined
    },
    contacts: {
      students: [
        { id: 'st-19', name: 'Anwesha Basu', phone: '+91 98765 43270', language: 'bn', type: 'student', verified: true },
        { id: 'st-20', name: 'Sambit Paul', phone: '+91 98765 43271', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-19', name: 'Dr. Basu', phone: '+91 98765 43272', language: 'bn', type: 'parent', verified: true },
        { id: 'pr-20', name: 'Mrs. Paul', phone: '+91 98765 43273', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-15', name: 'Prof. Chiranjib Bhattacharyya', phone: '+91 98765 43274', email: 'vc@jaduniv.edu.in', language: 'bn', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-15', name: 'JU Campus Security', phone: '+91 33 2414 6700', language: 'bn', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'cu-010', 
    name: 'University of Calcutta', 
    code: 'CU-010', 
    type: 'college',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    students: 15200,
    avgProgress: 85,
    activeAlerts: 2,
    lastActive: '2025-01-17',
    contact: '+91 33 2241 4071',
    email: 'registrar@caluniv.ac.in',
    compliance: {
      trainingModulesCompleted: 12,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 4,
      requiredSafetyDrills: 6,
      complianceScore: 78,
      lastAuditDate: '2025-01-08',
      certificateStatus: 'not-eligible',
      certificateIssueDate: undefined,
      certificateExpiryDate: undefined,
      certificateId: undefined
    },
    contacts: {
      students: [
        { id: 'st-21', name: 'Debarun Sarkar', phone: '+91 98765 43275', language: 'bn', type: 'student', verified: true },
        { id: 'st-22', name: 'Shreya Mitra', phone: '+91 98765 43276', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-21', name: 'Mr. Sarkar', phone: '+91 98765 43277', language: 'bn', type: 'parent', verified: false },
        { id: 'pr-22', name: 'Dr. Mitra', phone: '+91 98765 43278', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-16', name: 'Prof. Sonali Chakravarti Banerjee', phone: '+91 98765 43279', email: 'vc@caluniv.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-16', name: 'CU Security Office', phone: '+91 33 2241 4100', language: 'bn', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'isi-011', 
    name: 'Indian Statistical Institute', 
    code: 'ISI-011', 
    type: 'college',
    district: 'Kolkata',
    state: 'West Bengal',
    coordinates: { lat: 22.5574, lng: 88.3574 },
    students: 1800,
    avgProgress: 97,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2575 2400',
    email: 'registrar@isical.ac.in',
    compliance: {
      trainingModulesCompleted: 15,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 98,
      lastAuditDate: '2025-01-16',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-17',
      certificateExpiryDate: '2026-01-17',
      certificateId: 'CERT-ISI-011-2025'
    },
    contacts: {
      students: [
        { id: 'st-23', name: 'Aritra Banerjee', phone: '+91 98765 43280', email: 'aritra@isical.ac.in', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-23', name: 'Prof. Banerjee', phone: '+91 98765 43281', language: 'en', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-17', name: 'Prof. Sanghamitra Bandyopadhyay', phone: '+91 98765 43282', email: 'director@isical.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-17', name: 'ISI Security', phone: '+91 33 2575 2500', language: 'en', type: 'emergency', verified: true }
      ]
    }
  },
  { 
    id: 'iiest-012', 
    name: 'IIEST Shibpur', 
    code: 'IIEST-012', 
    type: 'college',
    district: 'Howrah',
    state: 'West Bengal',
    coordinates: { lat: 22.5597, lng: 88.3181 },
    students: 4500,
    avgProgress: 91,
    activeAlerts: 0,
    lastActive: '2025-01-17',
    contact: '+91 33 2668 4561',
    email: 'registrar@iiests.ac.in',
    compliance: {
      trainingModulesCompleted: 14,
      totalTrainingModules: 15,
      safetyDrillsCompleted: 6,
      requiredSafetyDrills: 6,
      complianceScore: 92,
      lastAuditDate: '2025-01-13',
      certificateStatus: 'issued',
      certificateIssueDate: '2025-01-15',
      certificateExpiryDate: '2026-01-15',
      certificateId: 'CERT-IIEST-012-2025'
    },
    contacts: {
      students: [
        { id: 'st-24', name: 'Soham Mukherjee', phone: '+91 98765 43283', language: 'en', type: 'student', verified: true }
      ],
      parents: [
        { id: 'pr-24', name: 'Mr. Mukherjee', phone: '+91 98765 43284', language: 'bn', type: 'parent', verified: true }
      ],
      staff: [
        { id: 'st-18', name: 'Prof. Ajoy Kumar Ray', phone: '+91 98765 43285', email: 'director@iiests.ac.in', language: 'en', type: 'admin', verified: true }
      ],
      emergency: [
        { id: 'em-18', name: 'IIEST Emergency', phone: '+91 33 2668 4600', language: 'en', type: 'emergency', verified: true }
      ]
    }
  }
];

// Combined institutions list
export const allInstitutions: Institution[] = [...schools, ...colleges];

// Helper functions
export const getInstitutionsByType = (type: 'school' | 'college'): Institution[] => {
  return type === 'school' ? schools : colleges;
};

export const getInstitutionById = (id: string): Institution | undefined => {
  return allInstitutions.find(institution => institution.id === id);
};

export const getInstitutionsByState = (state: string): Institution[] => {
  return allInstitutions.filter(institution => institution.state === state);
};

export const getInstitutionsByDistrict = (district: string): Institution[] => {
  return allInstitutions.filter(institution => institution.district === district);
};

// States represented in our institutions
export const representedStates = [
  'Delhi',
  'Maharashtra', 
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Rajasthan',
  'West Bengal'
];

// Mock certificates data
export const mockCertificates: ComplianceCertificate[] = [
  {
    id: 'CERT-DPS-001-2025',
    institutionId: 'dps-001',
    institutionName: 'Delhi Public School',
    certificateType: 'disaster-readiness',
    issueDate: '2025-01-15',
    expiryDate: '2026-01-15',
    status: 'active',
    complianceScore: 95,
    requirements: {
      trainingModules: { completed: 12, total: 12 },
      safetyDrills: { completed: 4, total: 4 },
      infrastructure: { score: 95, maxScore: 100 },
      staff: { trained: 45, total: 50 }
    },
    downloadUrl: '/certificates/CERT-DPS-001-2025.pdf',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  },
  {
    id: 'CERT-DAV-003-2025',
    institutionId: 'dav-003',
    institutionName: 'DAV Public School',
    certificateType: 'safety-compliance',
    issueDate: '2025-01-16',
    expiryDate: '2026-01-16',
    status: 'active',
    complianceScore: 88,
    requirements: {
      trainingModules: { completed: 11, total: 12 },
      safetyDrills: { completed: 4, total: 4 },
      infrastructure: { score: 90, maxScore: 100 },
      staff: { trained: 38, total: 42 }
    },
    downloadUrl: '/certificates/CERT-DAV-003-2025.pdf'
  },
  {
    id: 'CERT-IIT-001-2025',
    institutionId: 'iit-001',
    institutionName: 'IIT Delhi',
    certificateType: 'disaster-readiness',
    issueDate: '2025-01-17',
    expiryDate: '2026-01-17',
    status: 'active',
    complianceScore: 98,
    requirements: {
      trainingModules: { completed: 15, total: 15 },
      safetyDrills: { completed: 6, total: 6 },
      infrastructure: { score: 98, maxScore: 100 },
      staff: { trained: 120, total: 125 }
    },
    downloadUrl: '/certificates/CERT-IIT-001-2025.pdf'
  },
  {
    id: 'CERT-LMB-006-2025',
    institutionId: 'lmb-006',
    institutionName: 'La Martiniere for Boys',
    certificateType: 'safety-compliance',
    issueDate: '2025-01-16',
    expiryDate: '2026-01-16',
    status: 'active',
    complianceScore: 93,
    requirements: {
      trainingModules: { completed: 12, total: 12 },
      safetyDrills: { completed: 4, total: 4 },
      infrastructure: { score: 92, maxScore: 100 },
      staff: { trained: 58, total: 62 }
    },
    downloadUrl: '/certificates/CERT-LMB-006-2025.pdf'
  },
  {
    id: 'CERT-PRES-007-2025',
    institutionId: 'pres-007',
    institutionName: 'Presidency University',
    certificateType: 'disaster-readiness',
    issueDate: '2025-01-17',
    expiryDate: '2026-01-17',
    status: 'active',
    complianceScore: 96,
    requirements: {
      trainingModules: { completed: 15, total: 15 },
      safetyDrills: { completed: 6, total: 6 },
      infrastructure: { score: 96, maxScore: 100 },
      staff: { trained: 145, total: 150 }
    },
    downloadUrl: '/certificates/CERT-PRES-007-2025.pdf'
  },
  {
    id: 'CERT-ISI-011-2025',
    institutionId: 'isi-011',
    institutionName: 'Indian Statistical Institute',
    certificateType: 'disaster-readiness',
    issueDate: '2025-01-17',
    expiryDate: '2026-01-17',
    status: 'active',
    complianceScore: 98,
    requirements: {
      trainingModules: { completed: 15, total: 15 },
      safetyDrills: { completed: 6, total: 6 },
      infrastructure: { score: 98, maxScore: 100 },
      staff: { trained: 95, total: 98 }
    },
    downloadUrl: '/certificates/CERT-ISI-011-2025.pdf'
  }
];

// SMS/IVR Communication interfaces
export interface SMSIVRLog {
  id: string;
  alertId?: string;
  institutionId: string;
  institutionName: string;
  messageType: 'sms' | 'ivr' | 'both';
  alertType: 'emergency' | 'evacuation' | 'weather' | 'drill' | 'general';
  title: string;
  message: string;
  language: 'en' | 'hi' | 'ta' | 'te' | 'mr';
  recipients: {
    students: number;
    parents: number;
    staff: number;
    emergency: number;
    total: number;
  };
  delivery: {
    sent: number;
    delivered: number;
    failed: number;
    pending: number;
  };
  responses?: {
    acknowledged: number;
    callbacks: number;
    unsubscribed: number;
  };
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status: 'sent' | 'sending' | 'failed' | 'scheduled';
  scheduledFor?: string;
  cost: number;
  campaignId?: string;
}

export interface SMSTemplate {
  id: string;
  name: string;
  type: 'emergency' | 'evacuation' | 'weather' | 'drill' | 'general';
  language: 'en' | 'hi' | 'ta' | 'te' | 'mr';
  template: string;
  variables: string[];
  characterCount: number;
  isActive: boolean;
  lastUsed?: string;
  usageCount: number;
}

// Mock SMS/IVR logs
export const mockSMSIVRLogs: SMSIVRLog[] = [
  {
    id: 'sms-001',
    alertId: 'alert-001',
    institutionId: 'ryan-005',
    institutionName: 'Ryan International School',
    messageType: 'both',
    alertType: 'emergency',
    title: 'Emergency SOS Alert',
    message: 'EMERGENCY: Medical emergency reported at Ryan International School. Emergency services have been notified. Please stay calm and follow safety protocols.',
    language: 'en',
    recipients: {
      students: 1320,
      parents: 1320,
      staff: 85,
      emergency: 5,
      total: 2730
    },
    delivery: {
      sent: 2730,
      delivered: 2698,
      failed: 15,
      pending: 17
    },
    responses: {
      acknowledged: 1205,
      callbacks: 67,
      unsubscribed: 3
    },
    timestamp: '2025-01-17 14:35:22',
    priority: 'high',
    status: 'sent',
    cost: 819.0,
    campaignId: 'EMRG-RYAN-005-20250117'
  },
  {
    id: 'sms-002',
    institutionId: 'kv-002',
    institutionName: 'Kendriya Vidyalaya Bandra',
    messageType: 'sms',
    alertType: 'weather',
    title: 'Heavy Rainfall Alert',
    message: 'मौसम चेतावनी: कल भारी बारिश की संभावना। स्कूल बंद रहेगा। सभी छात्र घर पर रहें। अपडेट के लिए स्कूल की वेबसाइट देखें।',
    language: 'hi',
    recipients: {
      students: 980,
      parents: 980,
      staff: 65,
      emergency: 3,
      total: 2028
    },
    delivery: {
      sent: 2028,
      delivered: 2015,
      failed: 8,
      pending: 5
    },
    responses: {
      acknowledged: 892,
      callbacks: 23,
      unsubscribed: 1
    },
    timestamp: '2025-01-16 18:20:15',
    priority: 'medium',
    status: 'sent',
    cost: 608.4
  },
  {
    id: 'sms-003',
    institutionId: 'dps-001',
    institutionName: 'Delhi Public School',
    messageType: 'ivr',
    alertType: 'drill',
    title: 'Fire Drill Announcement',
    message: 'This is an automated message from Delhi Public School. Fire drill scheduled for tomorrow at 10 AM. All students and staff must participate. Duration: 15 minutes.',
    language: 'en',
    recipients: {
      students: 1250,
      parents: 1250,
      staff: 75,
      emergency: 0,
      total: 2575
    },
    delivery: {
      sent: 2575,
      delivered: 2543,
      failed: 18,
      pending: 14
    },
    responses: {
      acknowledged: 1876,
      callbacks: 12,
      unsubscribed: 2
    },
    timestamp: '2025-01-15 16:45:30',
    priority: 'low',
    status: 'sent',
    cost: 1287.5
  },
  {
    id: 'sms-004',
    institutionId: 'iit-001',
    institutionName: 'IIT Delhi',
    messageType: 'sms',
    alertType: 'general',
    title: 'Safety Training Completion',
    message: 'Congratulations! IIT Delhi has successfully completed all disaster preparedness training modules. Digital compliance certificate has been issued. Download from student portal.',
    language: 'en',
    recipients: {
      students: 12000,
      parents: 8000,
      staff: 1200,
      emergency: 10,
      total: 21210
    },
    delivery: {
      sent: 21210,
      delivered: 21156,
      failed: 32,
      pending: 22
    },
    responses: {
      acknowledged: 15678,
      callbacks: 45,
      unsubscribed: 8
    },
    timestamp: '2025-01-17 11:30:45',
    priority: 'low',
    status: 'sent',
    cost: 6363.0
  },
  {
    id: 'sms-005',
    institutionId: 'sphs-008',
    institutionName: 'South Point High School',
    messageType: 'both',
    alertType: 'weather',
    title: 'Cyclone Alert - Kolkata',
    message: 'ঘূর্ণিঝড় সতর্কতা: আগামীকাল প্রবল ঘূর্ণিঝড়ের সম্ভাবনা। স্কুল বন্ধ থাকবে। সবাই ঘরে নিরাপদে থাকুন। আপডেটের জন্য স্কুলের ওয়েবসাইট দেখুন।',
    language: 'bn',
    recipients: {
      students: 1650,
      parents: 1650,
      staff: 95,
      emergency: 5,
      total: 3400
    },
    delivery: {
      sent: 3400,
      delivered: 3378,
      failed: 12,
      pending: 10
    },
    responses: {
      acknowledged: 2145,
      callbacks: 89,
      unsubscribed: 2
    },
    timestamp: '2025-01-16 19:15:30',
    priority: 'high',
    status: 'sent',
    cost: 1020.0,
    campaignId: 'CYCLONE-SPHS-008-20250116'
  },
  {
    id: 'sms-006',
    institutionId: 'pres-007',
    institutionName: 'Presidency University',
    messageType: 'sms',
    alertType: 'drill',
    title: 'Emergency Drill Notice',
    message: 'Emergency evacuation drill scheduled for tomorrow 11:00 AM. All students and faculty must participate. Meet at designated assembly points. Duration: 20 minutes.',
    language: 'en',
    recipients: {
      students: 5500,
      parents: 3200,
      staff: 380,
      emergency: 8,
      total: 9088
    },
    delivery: {
      sent: 9088,
      delivered: 9045,
      failed: 25,
      pending: 18
    },
    responses: {
      acknowledged: 6234,
      callbacks: 34,
      unsubscribed: 5
    },
    timestamp: '2025-01-15 17:45:12',
    priority: 'medium',
    status: 'sent',
    cost: 2726.4
  },
  {
    id: 'sms-007',
    institutionId: 'ju-009',
    institutionName: 'Jadavpur University',
    messageType: 'ivr',
    alertType: 'emergency',
    title: 'Campus Security Alert',
    message: 'নিরাপত্তা সতর্কতা: ক্যাম্পাসে অস্বাভাবিক কার্যকলাপ দেখা গেছে। সবাই সতর্ক থাকুন এবং সন্দেহজনক কিছু দেখলে নিরাপত্তা বিভাগে জানান।',
    language: 'bn',
    recipients: {
      students: 8900,
      parents: 6200,
      staff: 520,
      emergency: 12,
      total: 15632
    },
    delivery: {
      sent: 15632,
      delivered: 15589,
      failed: 28,
      pending: 15
    },
    responses: {
      acknowledged: 8934,
      callbacks: 156,
      unsubscribed: 7
    },
    timestamp: '2025-01-17 15:22:45',
    priority: 'high',
    status: 'sent',
    cost: 7816.0,
    campaignId: 'SEC-ALERT-JU-009-20250117'
  }
];

// Mock SMS templates
export const mockSMSTemplates: SMSTemplate[] = [
  {
    id: 'tmpl-001',
    name: 'Emergency SOS Alert',
    type: 'emergency',
    language: 'en',
    template: 'EMERGENCY: {ALERT_TYPE} reported at {SCHOOL_NAME}. Emergency services notified. Stay calm and follow safety protocols. Time: {TIME}',
    variables: ['ALERT_TYPE', 'SCHOOL_NAME', 'TIME'],
    characterCount: 145,
    isActive: true,
    lastUsed: '2025-01-17',
    usageCount: 12
  },
  {
    id: 'tmpl-002',
    name: 'Emergency SOS Alert - Hindi',
    type: 'emergency',
    language: 'hi',
    template: 'आपातकाल: {SCHOOL_NAME} में {ALERT_TYPE} की सूचना। आपातकालीन सेवाएं सूचित। शांत रहें और सुरक्षा प्रोटोकॉल का पालन करें। समय: {TIME}',
    variables: ['ALERT_TYPE', 'SCHOOL_NAME', 'TIME'],
    characterCount: 132,
    isActive: true,
    lastUsed: '2025-01-16',
    usageCount: 8
  },
  {
    id: 'tmpl-003',
    name: 'Weather Alert',
    type: 'weather',
    language: 'en',
    template: 'WEATHER ALERT: {WEATHER_TYPE} expected. {SCHOOL_NAME} will be {STATUS} tomorrow. Stay safe and check school website for updates.',
    variables: ['WEATHER_TYPE', 'SCHOOL_NAME', 'STATUS'],
    characterCount: 128,
    isActive: true,
    lastUsed: '2025-01-15',
    usageCount: 25
  },
  {
    id: 'tmpl-004',
    name: 'Fire Drill',
    type: 'drill',
    language: 'en',
    template: '{SCHOOL_NAME}: Fire drill scheduled for {DATE} at {TIME}. Duration: {DURATION}. All students and staff must participate.',
    variables: ['SCHOOL_NAME', 'DATE', 'TIME', 'DURATION'],
    characterCount: 118,
    isActive: true,
    lastUsed: '2025-01-14',
    usageCount: 18
  },
  {
    id: 'tmpl-005',
    name: 'Evacuation Notice',
    type: 'evacuation',
    language: 'en',
    template: 'EVACUATION NOTICE: {SCHOOL_NAME} - Immediate evacuation required due to {REASON}. Follow evacuation procedures. Assembly point: {LOCATION}',
    variables: ['SCHOOL_NAME', 'REASON', 'LOCATION'],
    characterCount: 142,
    isActive: true,
    lastUsed: '2025-01-10',
    usageCount: 3
  }
];