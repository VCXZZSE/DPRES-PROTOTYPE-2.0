import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { AlertTriangle, Clock, X } from 'lucide-react';

interface EmergencySOSProps {
  children: React.ReactNode;
  onConfirm: () => void;
  variant?: 'navigation' | 'dashboard';
}

export function EmergencySOS({ children, onConfirm }: EmergencySOSProps) {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountingDown(false);
            setShowConfirmDialog(false);
            setShowModal(false);
            setCountdown(5);
            // Trigger the actual submission
            onConfirm();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdown, onConfirm]);

  const handleInitialClick = () => {
    setShowModal(true);
  };

  const handleConfirmClick = () => {
    setShowModal(false);
    setShowConfirmDialog(true);
    setIsCountingDown(true);
    setCountdown(5);
  };

  const handleCancelCountdown = () => {
    setIsCountingDown(false);
    setShowConfirmDialog(false);
    setShowModal(false);
    setCountdown(5);
  };

  const handleSendNow = () => {
    setIsCountingDown(false);
    setShowConfirmDialog(false);
    setShowModal(false);
    setCountdown(5);
    onConfirm();
  };

  return (
    <>
      {/* Trigger element */}
      <div onClick={handleInitialClick}>
        {children}
      </div>

      {/* Initial confirmation modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white" aria-describedby="sos-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-white">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Emergency SOS</span>
            </DialogTitle>
            <DialogDescription id="sos-dialog-description" className="text-gray-300">
              Are you sure you want to trigger SOS? This will alert the nearest disaster management authorities.
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-3 mt-6">
            <Button
              onClick={handleCancelCountdown}
              variant="outline"
              className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleConfirmClick}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              ✓ Confirm SOS
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Countdown confirmation dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[60]">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-700">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Are you sure?
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  This will send an emergency alert to all administrators and emergency contacts.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-red-400">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    Auto-sending in {countdown} seconds
                  </span>
                </div>
                <div className="w-full bg-red-900/30 rounded-full h-2 mt-3">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancelCountdown}
                  className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendNow}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Send Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}