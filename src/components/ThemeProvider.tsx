
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage on initial load
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('light-mode', storedTheme === 'light');
    }
    
    // Apply initial theme class to body
    document.body.className = storedTheme === 'light' ? 'light-mode' : 'dark-mode';
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Add transition class
    document.body.classList.add('theme-transition');
    
    // Apply new theme
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light-mode', newTheme === 'light');
    
    // Update body class
    document.body.className = newTheme === 'light' ? 'light-mode theme-transition' : 'dark-mode theme-transition';
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
