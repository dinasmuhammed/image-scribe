import React, { useState, useEffect } from 'react';
import ImageOCR from '../components/ImageOCR';
import ThemeToggle from '../components/ThemeToggle';
import AuthForm from '../components/AuthForm';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'vibrant');
    root.classList.add(theme);
  }, [theme]);

  const handleLogin = (email) => {
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${theme}`}>
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Image OCR Application</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            {user && (
              <Button onClick={handleLogout} variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                Logout
              </Button>
            )}
          </div>
        </div>
        {user ? (
          <ImageOCR />
        ) : (
          <AuthForm onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Index;
