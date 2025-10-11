import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmergencySOS } from '../components/EmergencySOS';
import { LanguageProvider } from '../components/LanguageContext';

describe('Emergency SOS Component E2E', () => {
  it('renders SOS wrapper component', () => {
    const mockOnConfirm = vi.fn();
    const { container } = render(
      <LanguageProvider>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <button>SOS Button</button>
        </EmergencySOS>
      </LanguageProvider>
    );
    
    // SOS component should render with children
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText('SOS Button')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const mockOnConfirm = vi.fn();
    const { container } = render(
      <LanguageProvider>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <div data-testid="sos-child">Test Content</div>
        </EmergencySOS>
      </LanguageProvider>
    );
    
    // Component renders successfully
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByTestId('sos-child')).toBeInTheDocument();
  });

  it('accepts onConfirm callback', () => {
    const mockOnConfirm = vi.fn();
    const { container } = render(
      <LanguageProvider>
        <EmergencySOS onConfirm={mockOnConfirm}>
          <span>Emergency Content</span>
        </EmergencySOS>
      </LanguageProvider>
    );
    
    // Component should render successfully
    expect(container.firstChild).toBeTruthy();
  });
});
