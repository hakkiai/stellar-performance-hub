
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleToggle}
      disabled={isAnimating}
      aria-label="Toggle theme"
      className={`rounded-full relative overflow-hidden transition-all duration-300 ${
        isAnimating ? 'animate-pulse' : ''
      } ${theme === 'dark' 
        ? 'bg-secondary/20 hover:bg-secondary/40' 
        : 'bg-primary/10 hover:bg-primary/20'}`}
    >
      <div className={`absolute inset-0 ${isAnimating ? 'animate-ripple' : ''} rounded-full`} />
      
      <div className="relative z-10 flex items-center">
        {theme === 'dark' ? (
          <Moon size={18} className={`text-primary ${isAnimating ? 'animate-spin-slow' : ''}`} />
        ) : (
          <Sun size={18} className={`text-amber-500 ${isAnimating ? 'animate-spin-slow' : ''}`} />
        )}
        <span className="sr-only md:not-sr-only md:ml-2 transition-all">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </div>
    </Button>
  );
};

export default ThemeToggle;
