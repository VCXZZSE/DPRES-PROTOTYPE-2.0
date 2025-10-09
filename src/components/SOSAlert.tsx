import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, Send, X, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { useAlerts } from './shared/AlertContext';
import { useCommunication } from './shared/CommunicationContext';
import { getInstitutionById } from './shared/institutionsData';

interface SOSAlertProps {
  userData: {
    schoolName: string;
    schoolCode: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  } | null;
}

export function SOSAlert({ userData }: SOSAlertProps) {
  const { addAlert } = useAlerts();
  const { sendEmergencySMS } = useCommunication();
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'high' | 'medium' | 'low'>('high');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const alertTypes = [
    'Medical Emergency',
    'Fire Alert',
    'Security Threat',
    'Earthquake Alert',
    'Flood Alert',
    'General Emergency'
  ];

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountingDown(false);
            setShowConfirmDialog(false);
            setCountdown(5);
            // Trigger the actual submission
            handleActualSubmit();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdown]);

  const handleConfirmAlert = () => {
    if (!userData || !alertType || !location || !description) {
      return;
    }
    setShowConfirmDialog(true);
    setIsCountingDown(true);
    setCountdown(5);
  };

  const handleCancelCountdown = () => {
    setIsCountingDown(false);
    setShowConfirmDialog(false);
    setCountdown(5);
  };

  const handleActualSubmit = async () => {
    if (!userData || !alertType || !location || !description) {
      return;
    }

    setIsSubmitting(true);

    // Find the institution data
    const institutions = await import('./shared/institutionsData');
    const institutionData = institutions.allInstitutions.find(
      inst => inst.name === userData.schoolName && inst.code === userData.schoolCode
    );

    // Create alert data
    const alertData = {
      institution: userData.schoolName,
      institutionId: institutionData?.id || 'unknown',
      district: institutionData?.district || 'Unknown',
      state: institutionData?.state || 'Unknown',
      studentName: userData.studentName,
      type: alertType as any,
      status: 'active' as const,
      location,
      severity,
      description,
      coordinates: institutionData?.coordinates
    };

    // Add alert to global context
    addAlert(alertData);

    // Automatically send SMS/IVR notifications to all contacts
    sendEmergencySMS({
      institutionId: institutionData?.id || 'unknown',
      alertType: alertType,
      message: `EMERGENCY ALERT: ${alertType} reported at ${userData.schoolName}. Student: ${userData.studentName}. Location: ${location}. Description: ${description}. Emergency services have been notified.`,
      priority: severity === 'high' ? 'high' : severity === 'medium' ? 'medium' : 'low'
    });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowDialog(false);
    
    // Reset form
    setAlertType('');
    setLocation('');
    setDescription('');
    setSeverity('high');

    // Show confirmation
    alert('SOS Alert sent successfully! Emergency response and all contacts have been notified via SMS/IVR.');
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-700 animate-pulse"
          size="lg"
        >
          <AlertTriangle className="h-5 w-5 mr-2" />
          SOS Emergency Alert
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md" aria-describedby="sos-alert-description">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Emergency SOS Alert
          </DialogTitle>
          <DialogDescription id="sos-alert-description">
            Send an immediate alert to emergency response team and administrators.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* User Information Display */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm space-y-1">
              <div><strong>Student:</strong> {userData?.studentName}</div>
              <div><strong>Institution:</strong> {userData?.schoolName}</div>
              <div><strong>Code:</strong> {userData?.schoolCode}</div>
            </div>
          </div>

          {/* Alert Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="alert-type">Emergency Type *</Label>
            <Select value={alertType} onValueChange={setAlertType}>
              <SelectTrigger>
                <SelectValue placeholder="Select emergency type" />
              </SelectTrigger>
              <SelectContent>
                {alertTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity Selection */}
          <div className="space-y-2">
            <Label htmlFor="severity">Severity Level *</Label>
            <Select value={severity} onValueChange={(value: 'high' | 'medium' | 'low') => setSeverity(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">🔴 High - Immediate Response Required</SelectItem>
                <SelectItem value="medium">🟠 Medium - Response Needed Soon</SelectItem>
                <SelectItem value="low">🟡 Low - Non-Critical Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <Label htmlFor="location">Current Location *</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                placeholder="e.g., Classroom 3A, Library, Cafeteria"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setLocation(`GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
                      },
                      () => {
                        alert('Unable to get GPS location. Please enter location manually.');
                      }
                    );
                  }
                }}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe the emergency situation..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAlert}
              disabled={!alertType || !location || !description || isSubmitting || isCountingDown}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send SOS Alert
                </>
              )}
            </Button>
          </div>

          {/* Emergency Contact Info */}
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <div className="flex items-center text-red-700 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">Emergency Contacts</span>
            </div>
            <div className="text-sm text-red-600 space-y-1">
              <div>📞 Emergency Services: 112</div>
              <div>🚑 Medical Emergency: 108</div>
              <div>🔥 Fire Department: 101</div>
              <div>👮 Police: 100</div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Confirmation Dialog with Countdown */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are you sure?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will send an emergency alert to all administrators and emergency contacts.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-red-700">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    Auto-sending in {countdown} seconds
                  </span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancelCountdown}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsCountingDown(false);
                    setShowConfirmDialog(false);
                    setCountdown(5);
                    handleActualSubmit();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  Send Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}