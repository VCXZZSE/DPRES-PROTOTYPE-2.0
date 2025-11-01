/**
 * Dialog Accessibility Helpers
 * 
 * These components ensure all dialogs meet WCAG 2.1 AA accessibility requirements
 * by providing proper descriptions or explicitly indicating when descriptions aren't needed.
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './dialog';

/**
 * AccessibleDialog - A wrapper that ensures proper accessibility
 * 
 * Usage:
 * <AccessibleDialog
 *   title="Dialog Title"
 *   description="Optional description"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   {content}
 * </AccessibleDialog>
 */

interface AccessibleDialogProps {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  /**
   * If true, no description is needed and aria-describedby will be undefined
   * Use for simple confirmation dialogs
   */
  noDescription?: boolean;
}

export function AccessibleDialog({
  title,
  description,
  open,
  onOpenChange,
  children,
  className,
  footer,
  noDescription = false,
}: AccessibleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={className}
        {...(noDescription && !description ? { 'aria-describedby': undefined } : {})}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          {/* If no description provided and noDescription is false, add a screen reader only description */}
          {!description && !noDescription && (
            <DialogDescription className="sr-only">
              {title}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

/**
 * ConfirmDialog - Simple confirmation dialog (no description needed)
 * 
 * Usage:
 * <ConfirmDialog
 *   title="Delete item?"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onConfirm={handleDelete}
 *   onCancel={() => setIsOpen(false)}
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   variant="destructive"
 * />
 */

interface ConfirmDialogProps {
  title: string;
  message?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export function ConfirmDialog({
  title,
  message,
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Simple confirmation dialogs don't need description */}
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <DialogFooter>
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border hover:bg-accent"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg ${
              variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * FormDialog - Dialog with form content (needs description)
 * 
 * Usage:
 * <FormDialog
 *   title="Create New Alert"
 *   description="Fill out the form to create an emergency alert"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSubmit={handleSubmit}
 * >
 *   <form fields>
 * </FormDialog>
 */

interface FormDialogProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  className?: string;
  isLoading?: boolean;
}

export function FormDialog({
  title,
  description,
  open,
  onOpenChange,
  onSubmit,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  className,
  isLoading = false,
}: FormDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children}
          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-lg border hover:bg-accent"
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : submitText}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/**
 * InfoDialog - Information display dialog
 * 
 * Usage:
 * <InfoDialog
 *   title="Alert Details"
 *   description="View complete alert information"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <alert details>
 * </InfoDialog>
 */

interface InfoDialogProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export function InfoDialog({
  title,
  description,
  open,
  onOpenChange,
  children,
  className,
  footer,
}: InfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
