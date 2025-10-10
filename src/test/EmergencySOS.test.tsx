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

    // Should show SOS modal with description and confirm button
    expect(screen.getByText(/are you sure you want to trigger sos/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm sos/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it('calls onConfirm when emergency is confirmed', async () => {
    render(
      <MockProviders>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <button>Emergency SOS</button>
        </EmergencySOS>
      </MockProviders>
    );

    const button = screen.getByText('Emergency SOS');
    fireEvent.click(button);

    // Wait for modal to appear and find confirm button
    const confirmButton = await screen.findByRole('button', { name: /confirm sos/i });
    fireEvent.click(confirmButton);

    // After confirming, look for "Send Now" button in countdown dialog
    const sendNowButton = await screen.findByRole('button', { name: /send now/i });
    fireEvent.click(sendNowButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });
});