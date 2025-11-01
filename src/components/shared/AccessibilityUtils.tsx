/**
 * Accessibility Utility Components and Hooks for DPRES
 * Following WCAG 2.1 AA Guidelines
 */

import React from 'react';

/**
 * VisuallyHidden - Hides content visually but keeps it for screen readers
 * Use for: Icon button labels, form labels, skip links
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * FocusTrap - Traps focus within a component (for modals/dialogs)
 */
export function useFocusTrap(isActive: boolean) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return ref;
}

/**
 * useEscapeKey - Handles escape key press
 */
export function useEscapeKey(callback: () => void, isActive = true) {
  React.useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, isActive]);
}

/**
 * useRestoreFocus - Restores focus to previous element when component unmounts
 */
export function useRestoreFocus(isActive: boolean) {
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (isActive) {
      previousFocus.current = document.activeElement as HTMLElement;
    }

    return () => {
      if (isActive && previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [isActive]);
}

/**
 * SkipLink - Creates a skip navigation link
 */
interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
    >
      {children}
    </a>
  );
}

/**
 * getAriaSort - Returns ARIA sort value for table headers
 */
export function getAriaSort(
  columnName: string,
  currentSort: string,
  currentOrder: 'asc' | 'desc'
): 'ascending' | 'descending' | 'none' {
  if (columnName !== currentSort) return 'none';
  return currentOrder === 'asc' ? 'ascending' : 'descending';
}

/**
 * getAriaExpanded - Returns proper aria-expanded value
 */
export function getAriaExpanded(isExpanded: boolean | undefined): 'true' | 'false' | undefined {
  if (isExpanded === undefined) return undefined;
  return isExpanded ? 'true' : 'false';
}

/**
 * Landmark - Semantic landmark wrapper
 */
interface LandmarkProps {
  type: 'banner' | 'navigation' | 'main' | 'complementary' | 'contentinfo' | 'region' | 'search';
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function Landmark({ type, label, children, className }: LandmarkProps) {
  const roleMap = {
    banner: 'banner',
    navigation: 'navigation',
    main: 'main',
    complementary: 'complementary',
    contentinfo: 'contentinfo',
    region: 'region',
    search: 'search',
  };

  const TagMap = {
    banner: 'header',
    navigation: 'nav',
    main: 'main',
    complementary: 'aside',
    contentinfo: 'footer',
    region: 'section',
    search: 'search',
  } as const;

  const Tag = TagMap[type];

  return (
    <Tag
      role={roleMap[type]}
      aria-label={label}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * formatAriaLabel - Formats text for ARIA labels
 */
export function formatAriaLabel(text: string): string {
  return text
    .replace(/[_-]/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase();
}

/**
 * getSeverityAnnouncement - Gets screen reader friendly severity announcement
 */
export function getSeverityAnnouncement(severity: 'low' | 'medium' | 'high' | 'critical'): string {
  const announcements = {
    low: 'low priority',
    medium: 'medium priority',
    high: 'high priority, attention required',
    critical: 'critical priority, immediate action required',
  };
  return announcements[severity];
}

/**
 * Icon button with proper ARIA
 */
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  isLoading?: boolean;
}

export function IconButton({ icon, label, isLoading, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      aria-busy={isLoading}
      className={className}
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement, { 'aria-hidden': true })}
      <span className="sr-only">{label}</span>
    </button>
  );
}

/**
 * Progress with ARIA
 */
interface AccessibleProgressProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
}

export function AccessibleProgress({ 
  value, 
  max = 100, 
  label, 
  showValue = true 
}: AccessibleProgressProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="w-full">
      {showValue && (
        <div className="flex justify-between mb-1">
          <span className="text-sm">{label}</span>
          <span className="text-sm">{percentage}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="w-full h-2 bg-muted rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        >
          <span className="sr-only">{percentage}% complete</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading state with ARIA
 */
interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading, please wait' }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-2">
        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
      <span className="sr-only">{message}</span>
    </div>
  );
}

/**
 * Error message with ARIA
 */
interface ErrorMessageProps {
  message: string;
  id?: string;
}

export function ErrorMessage({ message, id }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      id={id}
      className="text-sm text-destructive mt-1"
    >
      {message}
    </div>
  );
}

/**
 * Success message with ARIA
 */
interface SuccessMessageProps {
  message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="text-sm text-green-600 mt-1"
    >
      {message}
    </div>
  );
}
