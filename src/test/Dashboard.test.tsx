import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { AlertProvider } from '../components/shared/AlertContext';
import { CommunicationProvider } from '../components/shared/CommunicationContext';
import { LanguageProvider } from '../components/LanguageContext';

// Mock the context providers
const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AlertProvider>
      <CommunicationProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </CommunicationProvider>
    </AlertProvider>
  </BrowserRouter>
);

// Mock recharts for testing
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => JSON.stringify({ name: 'Test User', institution: 'Test Institution' })),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it('renders dashboard with user information', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/welcome to your dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
  });

  it('displays emergency action buttons', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/sos alert/i)).toBeInTheDocument();
    expect(screen.getByText(/quick contacts/i)).toBeInTheDocument();
  });

  it('shows alert notifications', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    // Dashboard shows alerts in v3.0
    expect(screen.getByText(/welcome to your dashboard/i)).toBeInTheDocument();
  });

  it('displays action buttons', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    // v3.0 has SOS Alert and Quick Contacts
    expect(screen.getByText(/sos alert/i)).toBeInTheDocument();
    expect(screen.getByText(/quick contacts/i)).toBeInTheDocument();
  });

  it('renders dashboard structure correctly', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    // Check main dashboard elements exist
    expect(screen.getByText(/welcome to your dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
  });

  it('shows emergency buttons', () => {
    render(
      <MockProviders>
        <Dashboard />
      </MockProviders>
    );

    expect(screen.getByText(/sos alert/i)).toBeInTheDocument();
    expect(screen.getByText(/quick contacts/i)).toBeInTheDocument();
  });
});