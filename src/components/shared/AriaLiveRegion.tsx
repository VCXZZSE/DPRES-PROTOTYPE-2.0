import React, { useEffect, useState } from 'react';

interface AriaLiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive' | 'off';
  clearAfter?: number;
}

/**
 * ARIA Live Region component for screen reader announcements
 * Use 'polite' for general updates, 'assertive' for urgent alerts
 */
export function AriaLiveRegion({ 
  message, 
  politeness = 'polite',
  clearAfter = 5000 
}: AriaLiveRegionProps) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);

      // Clear announcement after specified time
      if (clearAfter > 0) {
        const timer = setTimeout(() => {
          setAnnouncement('');
        }, clearAfter);

        return () => clearTimeout(timer);
      }
    }
  }, [message, clearAfter]);

  return (
    <div
      role={politeness === 'assertive' ? 'alert' : 'status'}
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

/**
 * Hook for managing announcements
 */
export function useAriaAnnounce() {
  const [announcement, setAnnouncement] = useState('');
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite');

  const announce = (message: string, urgent = false) => {
    setPoliteness(urgent ? 'assertive' : 'polite');
    setAnnouncement(message);
  };

  return {
    announcement,
    politeness,
    announce,
  };
}
