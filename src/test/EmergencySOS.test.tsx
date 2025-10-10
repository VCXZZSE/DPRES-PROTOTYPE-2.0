import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmergencySOS } from '../components/EmergencySOS';
import { AlertProvider } from '../components/shared/AlertContext';
import { LanguageProvider } from '../components/LanguageContext';

// Mock the context providers
const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <LanguageProvider>
      <AlertProvider>
        {children}
      </AlertProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe('EmergencySOS Component', () => {
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnConfirm.mockClear();
  });

  it('renders emergency SOS button', () => {
    render(
      <MockProviders>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <button>Emergency SOS</button>
        </EmergencySOS>
      </MockProviders>
    );

    expect(screen.getByText('Emergency SOS')).toBeInTheDocument();
  });

  it('opens modal when button is clicked', () => {
    render(
      <MockProviders>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <button>Emergency SOS</button>
        </EmergencySOS>
      </MockProviders>
    );

    const button = screen.getByText('Emergency SOS');
    fireEvent.click(button);

    // Should show emergency types in modal
    expect(screen.getByText(/medical emergency/i)).toBeInTheDocument();
  });

  it('calls onConfirm when emergency is confirmed', () => {
    render(
      <MockProviders>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <button>Emergency SOS</button>
        </EmergencySOS>
      </MockProviders>
    );

    const button = screen.getByText('Emergency SOS');
    fireEvent.click(button);

    // Select emergency type
    const medicalButton = screen.getByText(/medical emergency/i);
    fireEvent.click(medicalButton);

    // Find and click confirm button
    const confirmButton = screen.getByText(/confirm emergency/i);
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });
});