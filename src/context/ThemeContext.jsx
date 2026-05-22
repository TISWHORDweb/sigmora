import { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark' ? darkTheme : lightTheme;
    }
    // Default to dark theme
    return darkTheme;
  });

  const toggleTheme = () => {
    const newTheme = theme.name === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.name);
    
    // Apply theme to document root for CSS variables
    document.documentElement.setAttribute('data-theme', newTheme.name);
  };

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.setAttribute('data-theme', theme.name);
    
    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--surface', theme.colors.backgroundTertiary);
    root.style.setProperty('--foreground', theme.colors.text);
    root.style.setProperty('--brand', theme.colors.secondary);
    root.style.setProperty('--brand-foreground', theme.colors.primary);
    root.style.setProperty('--danger', theme.colors.danger);
    root.style.setProperty('--muted-foreground', theme.colors.textSecondary);
    root.style.setProperty('--border-slate', theme.colors.border);
    root.style.setProperty('--label-slate', theme.colors.textTertiary);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    isDark: theme.name === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

