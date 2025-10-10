import { createContext, useContext, useState, ReactNode } from 'react';

export interface SOSAlert {
  id: string;
  institution: string;
  institutionId: string;
  district: string;
  state: string;
  studentName: string;
  type: 'Medical Emergency' | 'Fire Alert' | 'Security Threat' | 'Earthquake Alert' | 'Flood Alert' | 'General Emergency';
  status: 'active' | 'pending' | 'resolved';
  timestamp: string;
  location: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface AlertContextType {
  alerts: SOSAlert[];
  addAlert: (alert: Omit<SOSAlert, 'id' | 'timestamp'>) => void;
  updateAlertStatus: (alertId: string, status: SOSAlert['status']) => void;
  getActiveAlerts: () => SOSAlert[];
  getAlertsByInstitution: (institutionId: string) => SOSAlert[];
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Initial mock alerts
const initialAlerts: SOSAlert[] = [
  {
    id: '1',
    institution: 'Ryan International School',
    institutionId: 'ryan-005',
    district: 'Chennai',
    state: 'Tamil Nadu',
    studentName: 'Priya Sharma',
    type: 'Medical Emergency',
    status: 'active',
    timestamp: '2025-01-17 14:30:15',
    location: 'Classroom 3A',
    severity: 'high',
    description: 'Student fell unconscious during class',
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: '2',
    institution: 'Delhi University',
    institutionId: 'du-002',
    district: 'New Delhi',
    state: 'Delhi',
    studentName: 'Rahul Kumar',
    type: 'Fire Alert',
    status: 'pending',
    timestamp: '2025-01-17 13:45:22',
    location: 'Laboratory Block B',
    severity: 'high',
    description: 'Smoke detected in chemistry lab',
    coordinates: { lat: 28.6862, lng: 77.2120 }
  },
  {
    id: '3',
    institution: 'BITS Pilani',
    institutionId: 'bits-004',
    district: 'Pilani',
    state: 'Rajasthan',
    studentName: 'Anil Reddy',
    type: 'Security Threat',
    status: 'resolved',
    timestamp: '2025-01-17 12:15:08',
    location: 'Main Gate',
    severity: 'medium',
    description: 'Suspicious person reported near campus',
    coordinates: { lat: 28.3638, lng: 75.5856 }
  },
  {
    id: '4',
    institution: 'IISc Bangalore',
    institutionId: 'iisc-006',
    district: 'Bengaluru',
    state: 'Karnataka',
    studentName: 'Kavya Nair',
    type: 'Earthquake Alert',
    status: 'active',
    timestamp: '2025-01-17 11:20:45',
    location: 'Entire Campus',
    severity: 'low',
    description: 'Earthquake drill simulation in progress',
    coordinates: { lat: 13.0218, lng: 77.5712 }
  },
  {
    id: '5',
    institution: 'Kendriya Vidyalaya No. 1',
    institutionId: 'kv-002',
    district: 'Mumbai',
    state: 'Maharashtra',
    studentName: 'Arjun Patel',
    type: 'Flood Alert',
    status: 'pending',
    timestamp: '2025-01-17 10:45:30',
    location: 'Ground Floor',
    severity: 'medium',
    description: 'Water logging detected in ground floor corridors',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  }
];

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<SOSAlert[]>(initialAlerts);

  const addAlert = (alertData: Omit<SOSAlert, 'id' | 'timestamp'>) => {
    const newAlert: SOSAlert = {
      ...alertData,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '-').replace(', ', ' ')
    };

    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  const updateAlertStatus = (alertId: string, status: SOSAlert['status']) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status } : alert
      )
    );
  };

  const getActiveAlerts = () => {
    return alerts.filter(alert => alert.status === 'active' || alert.status === 'pending');
  };

  const getAlertsByInstitution = (institutionId: string) => {
    return alerts.filter(alert => alert.institutionId === institutionId);
  };

  return (
    <AlertContext.Provider value={{
      alerts,
      addAlert,
      updateAlertStatus,
      getActiveAlerts,
      getAlertsByInstitution
    }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}