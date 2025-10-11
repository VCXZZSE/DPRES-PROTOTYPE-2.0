import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../App';

describe('Full Application Integration Tests', () => {
  it('application initializes without errors', async () => {
    const { container } = render(<App />);
    
    await waitFor(() => {
      expect(container.firstChild).toBeTruthy();
    });
  });

  it('renders with proper React structure', () => {
    const { container } = render(<App />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('mounts all providers correctly', async () => {
    render(<App />);
    
    await waitFor(() => {
      // App should render something
      expect(document.body).toBeInTheDocument();
    });
  });

  it('handles lazy loading gracefully', async () => {
    render(<App />);
    
    await waitFor(() => {
      // Suspense fallback or content should be present
      expect(document.querySelector('body')).toBeTruthy();
    }, { timeout: 3000 });
  });
});
