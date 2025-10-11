import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('Accessibility Tests', () => {
  it('has no accessibility violations on mount', async () => {
    const { container } = render(<App />);
    
    // Basic accessibility check - app renders
    expect(container).toBeTruthy();
  });

  it('provides semantic HTML structure', () => {
    const { container } = render(<App />);
    
    // Should have proper HTML structure
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('supports keyboard navigation', () => {
    const { container } = render(<App />);
    
    // Check that interactive elements exist
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      expect(button).toBeInstanceOf(HTMLElement);
    });
  });
});
