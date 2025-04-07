
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors"
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
      <span className="sr-only md:not-sr-only md:ml-2">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </Button>
  );
};

export default ThemeToggle;
