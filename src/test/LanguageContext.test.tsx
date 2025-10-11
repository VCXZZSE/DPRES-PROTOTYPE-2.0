import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../components/LanguageContext';

// Test component to use the context
const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <p data-testid="current-language">{language}</p>
      <p data-testid="translated-text">{t('welcome')}</p>
      <button onClick={() => setLanguage('hi')}>Switch to Hindi</button>
      <button onClick={() => setLanguage('en')}>Switch to English</button>
    </div>
  );
};

describe('LanguageContext', () => {
  it('provides default language as English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
  });

  it('allows language switching', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const hindiButton = screen.getByText('Switch to Hindi');
    fireEvent.click(hindiButton);
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('hi');
  });

  it('provides translation function', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const translatedText = screen.getByTestId('translated-text');
    expect(translatedText).toBeInTheDocument();
  });

  it('persists language across re-renders', () => {
    const { rerender } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const hindiButton = screen.getByText('Switch to Hindi');
    fireEvent.click(hindiButton);
    
    rerender(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('current-language')).toHaveTextContent('hi');
  });

  it('switches back to English', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    const hindiButton = screen.getByText('Switch to Hindi');
    fireEvent.click(hindiButton);
    expect(screen.getByTestId('current-language')).toHaveTextContent('hi');
    
    const englishButton = screen.getByText('Switch to English');
    fireEvent.click(englishButton);
    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
  });
});
