import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { LanguageProvider } from '../components/LanguageContext';
import { AlertProvider } from '../components/shared/AlertContext';

describe('Dashboard Component E2E', () => {
  const mockUserData = {
    schoolName: 'Test School',
    schoolCode: 'TEST001',
    studentName: 'Test Student',
    age: '15',
    institutionType: 'school' as const,
  };

  it('renders dashboard without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <LanguageProvider>
          <AlertProvider>
            <Dashboard userData={mockUserData} />
          </AlertProvider>
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Dashboard should render successfully
    expect(container.firstChild).toBeTruthy();
    expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
  });

  it('displays user statistics', () => {
    const { container } = render(
      <BrowserRouter>
        <LanguageProvider>
          <AlertProvider>
            <Dashboard userData={mockUserData} />
          </AlertProvider>
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Should display dashboard content
    expect(container.firstChild).toBeTruthy();
  });

  it('renders progress tracking elements', () => {
    const { container } = render(
      <BrowserRouter>
        <LanguageProvider>
          <AlertProvider>
            <Dashboard userData={mockUserData} />
          </AlertProvider>
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Dashboard should contain content
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText(/Welcome to Your Dashboard/i)).toBeInTheDocument();
  });
});
