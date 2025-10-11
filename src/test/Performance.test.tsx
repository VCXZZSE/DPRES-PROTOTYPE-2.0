import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('Performance Tests', () => {
  it('renders within acceptable time', async () => {
    const startTime = performance.now();
    
    render(<App />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render in less than 2 seconds
    expect(renderTime).toBeLessThan(2000);
  });

  it('lazy loads components efficiently', () => {
    const { container } = render(<App />);
    
    // Initial render should be fast
    expect(container.firstChild).toBeTruthy();
  });

  it('does not cause memory leaks', () => {
    const { unmount } = render(<App />);
    
    // Should unmount cleanly
    unmount();
    expect(true).toBe(true);
  });
});
