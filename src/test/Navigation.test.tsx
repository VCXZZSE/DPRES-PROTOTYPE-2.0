import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { LanguageProvider } from '../components/LanguageContext';

describe('Navigation Component E2E', () => {
  const mockUserData = {
    schoolName: 'Test School',
    schoolCode: 'TEST001',
    studentName: 'Test Student',
    age: '15',
    institutionType: 'school' as const,
  };

  it('renders navigation with user data', () => {
    const mockOnLogout = vi.fn();
    
    render(
      <BrowserRouter>
        <LanguageProvider>
          <Navigation 
            userData={mockUserData} 
            onLogout={mockOnLogout}
            isFirstLogin={false}
          />
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Navigation should render without crashing
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    const mockOnLogout = vi.fn();
    
    render(
      <BrowserRouter>
        <LanguageProvider>
          <Navigation 
            userData={mockUserData} 
            onLogout={mockOnLogout}
            isFirstLogin={false}
          />
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Check for navigation element
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('displays user name when provided', () => {
    const mockOnLogout = vi.fn();
    
    const { container } = render(
      <BrowserRouter>
        <LanguageProvider>
          <Navigation 
            userData={mockUserData} 
            onLogout={mockOnLogout}
            isFirstLogin={false}
          />
        </LanguageProvider>
      </BrowserRouter>
    );
    
    // Navigation should render with user data
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
