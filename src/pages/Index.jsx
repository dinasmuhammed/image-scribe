import React, { useState, useEffect } from 'react';
import ImageOCR from '../components/ImageOCR';
import ThemeToggle from '../components/ThemeToggle';
import AuthForm from '../components/AuthForm';
import { Button } from "@/components/ui/button";
import { User, LogOut } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Image OCR App</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground"><User className="inline-block mr-1" size={16} />{user.email}</span>
                <Button onClick={handleLogout} variant="outline" size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        </header>
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
