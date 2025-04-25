
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
  toggleAnimations: boolean;
  setToggleAnimations: (value: boolean) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark', 
  storageKey = 'flowstate-theme' 
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme);
  const [toggleAnimations, setToggleAnimations] = useLocalStorage<boolean>('flowstate-animations', true);
  const [highContrast, setHighContrast] = useLocalStorage<boolean>('flowstate-high-contrast', false);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');
  
  // Track system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set the initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Add listener for changes
    const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  // Calculate effective theme (what's actually applied)
  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the appropriate class based on effective theme
    root.classList.add(effectiveTheme);
    
    // Add animation and contrast classes
    if (!toggleAnimations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [effectiveTheme, toggleAnimations, highContrast]);

  const value = {
    theme,
    setTheme,
    effectiveTheme,
    toggleAnimations,
    setToggleAnimations,
    highContrast,
    setHighContrast
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
