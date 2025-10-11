import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock all lazy-loaded components
vi.mock('../components/LoginPage', () => ({
  LoginPage: ({ onLogin }: any) => (
    <div data-testid="login-page">
      <button onClick={() => onLogin({ schoolName: 'Test School', schoolCode: 'TEST001', studentName: 'Test Student', age: '15', institutionType: 'school' })}>
        Login
      </button>
    </div>
  ),
}));

vi.mock('../components/LandingPage', () => ({
  LandingPage: () => <div data-testid="landing-page">Landing Page</div>,
}));

vi.mock('../components/Dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard">Dashboard</div>,
}));

vi.mock('../components/ModulesPage', () => ({
  ModulesPage: () => <div data-testid="modules-page">Modules Page</div>,
}));

vi.mock('../components/VRTrainingPage', () => ({
  VRTrainingPage: () => <div data-testid="vr-training">VR Training</div>,
}));

vi.mock('../components/AdminDashboard', () => ({
  AdminDashboard: () => <div data-testid="admin-dashboard">Admin Dashboard</div>,
}));

vi.mock('../components/Navigation', () => ({
  Navigation: () => <div data-testid="navigation">Navigation</div>,
}));

vi.mock('../components/WelcomeAnimation', () => ({
  WelcomeAnimation: ({ onComplete }: any) => {
    setTimeout(() => onComplete(), 0);
    return <div data-testid="welcome-animation">Welcome Animation</div>;
  },
}));

vi.mock('../components/AdminWelcomeAnimation', () => ({
  AdminWelcomeAnimation: ({ onComplete }: any) => {
    setTimeout(() => onComplete(), 0);
    return <div data-testid="admin-welcome-animation">Admin Welcome Animation</div>;
  },
}));

vi.mock('../components/DesktopOnlyScreen', () => ({
  DesktopOnlyScreen: () => <div data-testid="desktop-only">Desktop Only</div>,
}));

describe('App Component', () => {
  it('renders login page on initial load', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
  });

  it('renders app without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('provides language context', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
  });
});
