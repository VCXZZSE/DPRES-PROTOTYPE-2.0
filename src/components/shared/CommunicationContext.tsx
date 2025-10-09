import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SMSIVRLog, ComplianceCertificate, mockSMSIVRLogs, mockCertificates } from './institutionsData';

interface CommunicationContextType {
  // SMS/IVR Management
  smsIVRLogs: SMSIVRLog[];
  addSMSIVRLog: (log: Omit<SMSIVRLog, 'id' | 'timestamp'>) => void;
  updateSMSIVRLog: (id: string, updates: Partial<SMSIVRLog>) => void;
  
  // Certificate Management
  certificates: ComplianceCertificate[];
  addCertificate: (certificate: Omit<ComplianceCertificate, 'id'>) => void;
  updateCertificate: (id: string, updates: Partial<ComplianceCertificate>) => void;
  
  // Automatic SMS/IVR on SOS Alerts
  sendEmergencySMS: (alertData: {
    institutionId: string;
    alertType: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
  }) => void;
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined);

export function CommunicationProvider({ children }: { children: ReactNode }) {
  const [smsIVRLogs, setSMSIVRLogs] = useState<SMSIVRLog[]>(mockSMSIVRLogs);
  const [certificates, setCertificates] = useState<ComplianceCertificate[]>(mockCertificates);

  const addSMSIVRLog = (logData: Omit<SMSIVRLog, 'id' | 'timestamp'>) => {
    const newLog: SMSIVRLog = {
      ...logData,
      id: `sms-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setSMSIVRLogs(prev => [newLog, ...prev]);
  };

  const updateSMSIVRLog = (id: string, updates: Partial<SMSIVRLog>) => {
    setSMSIVRLogs(prev => prev.map(log => 
      log.id === id ? { ...log, ...updates } : log
    ));
  };

  const addCertificate = (certificateData: Omit<ComplianceCertificate, 'id'>) => {
    const newCertificate: ComplianceCertificate = {
      ...certificateData,
      id: `CERT-${certificateData.institutionId.toUpperCase()}-${Date.now()}`
    };
    setCertificates(prev => [newCertificate, ...prev]);
  };

  const updateCertificate = (id: string, updates: Partial<ComplianceCertificate>) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === id ? { ...cert, ...updates } : cert
    ));
  };

  const sendEmergencySMS = (alertData: {
    institutionId: string;
    alertType: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
  }) => {
    // Find institution from allInstitutions
    import('./institutionsData').then(({ allInstitutions }) => {
      const institution = allInstitutions.find(inst => inst.id === alertData.institutionId);
      if (!institution) return;

      // Calculate recipients
      const totalRecipients = institution.contacts.students.length + 
                             institution.contacts.parents.length + 
                             institution.contacts.staff.length + 
                             institution.contacts.emergency.length;

      // Create automatic SMS/IVR log
      const emergencyLog: Omit<SMSIVRLog, 'id' | 'timestamp'> = {
        alertId: `alert-${Date.now()}`,
        institutionId: institution.id,
        institutionName: institution.name,
        messageType: 'both',
        alertType: 'emergency',
        title: `Emergency Alert - ${alertData.alertType}`,
        message: alertData.message,
        language: 'en', // Default to English, could be made configurable
        recipients: {
          students: institution.contacts.students.length,
          parents: institution.contacts.parents.length,
          staff: institution.contacts.staff.length,
          emergency: institution.contacts.emergency.length,
          total: totalRecipients
        },
        delivery: {
          sent: totalRecipients,
          delivered: Math.floor(totalRecipients * 0.95), // 95% delivery rate
          failed: Math.floor(totalRecipients * 0.03), // 3% failure rate
          pending: Math.floor(totalRecipients * 0.02) // 2% pending
        },
        responses: {
          acknowledged: Math.floor(totalRecipients * 0.7), // 70% acknowledgment rate
          callbacks: Math.floor(totalRecipients * 0.05), // 5% callback rate
          unsubscribed: 0
        },
        priority: alertData.priority,
        status: 'sent',
        cost: totalRecipients * 0.80, // ₹0.30 SMS + ₹0.50 IVR
        campaignId: `EMRG-${institution.code}-${Date.now()}`
      };

      addSMSIVRLog(emergencyLog);
    });
  };

  const value: CommunicationContextType = {
    smsIVRLogs,
    addSMSIVRLog,
    updateSMSIVRLog,
    certificates,
    addCertificate,
    updateCertificate,
    sendEmergencySMS
  };

  return (
    <CommunicationContext.Provider value={value}>
      {children}
    </CommunicationContext.Provider>
  );
}

export function useCommunication() {
  const context = useContext(CommunicationContext);
  if (context === undefined) {
    throw new Error('useCommunication must be used within a CommunicationProvider');
  }
  return context;
}