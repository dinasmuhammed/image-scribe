import React from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('light')}
        title="Light Mode"
        className="transition-colors"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        className="transition-colors"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={theme === 'vibrant' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('vibrant')}
        title="Vibrant Mode"
        className="transition-colors"
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};

export default ThemeToggle;
