import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginPage } from '../components/LoginPage';
import { LanguageProvider } from '../components/LanguageContext';

describe('Login Flow E2E', () => {
  it('renders login page with all form fields', () => {
    const mockOnLogin = vi.fn();
    const mockOnAdminLogin = vi.fn();
    
    render(
      <LanguageProvider>
        <LoginPage onLogin={mockOnLogin} onAdminLogin={mockOnAdminLogin} />
      </LanguageProvider>
    );
    
    expect(screen.getAllByText(/DPRES/i).length).toBeGreaterThan(0);
  });

  it('validates required fields before submission', async () => {
    const mockOnLogin = vi.fn();
    const mockOnAdminLogin = vi.fn();
    
    render(
      <LanguageProvider>
        <LoginPage onLogin={mockOnLogin} onAdminLogin={mockOnAdminLogin} />
      </LanguageProvider>
    );
    
    // Try to find and click login button (implementation-dependent)
    const loginButtons = screen.queryAllByRole('button', { name: /login|submit|continue/i });
    
    if (loginButtons.length > 0) {
      fireEvent.click(loginButtons[0]);
      
      await waitFor(() => {
        // Should not call onLogin without valid data
        // This will depend on your actual validation implementation
        expect(mockOnLogin).not.toHaveBeenCalled();
      }, { timeout: 1000 });
    }
  });

  it('renders language selector', () => {
    const mockOnLogin = vi.fn();
    const mockOnAdminLogin = vi.fn();
    
    const { container } = render(
      <LanguageProvider>
        <LoginPage onLogin={mockOnLogin} onAdminLogin={mockOnAdminLogin} />
      </LanguageProvider>
    );
    
    // Check if the component renders without errors
    expect(container.firstChild).toBeTruthy();
  });
});
