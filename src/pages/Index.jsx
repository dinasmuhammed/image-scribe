import React, { useState, useEffect } from 'react';
import ImageOCR from '../components/ImageOCR';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Image OCR Application</h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
        <ImageOCR />
      </div>
    </div>
  );
};

export default Index;
