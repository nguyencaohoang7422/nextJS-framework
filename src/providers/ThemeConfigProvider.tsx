'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DefaultTheme, ThemeColors } from '@/config/theme';

interface ThemeConfigContextType {
  themeConfig: ThemeColors;
  applyThemeConfig: (theme: Partial<ThemeColors>) => void;
  resetThemeConfig: () => void;
}

const ThemeConfigContext = createContext<ThemeConfigContextType | undefined>(
  undefined,
);

export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  if (!context) {
    throw new Error('useThemeConfig must be used within a ThemeConfigProvider');
  }
  return context;
};

export const ThemeConfigProvider = ({ children }: { children: ReactNode }) => {
  const [themeConfig, setThemeConfig] = useState<ThemeColors>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('user_theme_config');
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);
          return { ...DefaultTheme, ...parsedTheme };
        }
      } catch (e) {
        console.error('Failed to parse theme config from local storage', e);
      }
    }
    return DefaultTheme;
  });

  const mapThemeToCssVariables = (themeConfig: ThemeColors) => {
    const root = document.documentElement;
    // Map specific keys to CSS variables
    root.style.setProperty('--color-primary', themeConfig.primary);
    root.style.setProperty('--color-secondary', themeConfig.secondary);
    root.style.setProperty('--color-success', themeConfig.success);
    root.style.setProperty('--color-warning', themeConfig.warning);
    root.style.setProperty('--color-error', themeConfig.error);

    // Map others if needed or generic mapping
    root.style.setProperty('--bg-primary', themeConfig.background);
    root.style.setProperty('--border-color', themeConfig.border);

    // You can add more mappings here based on your variables.css
  };

  useEffect(() => {
    mapThemeToCssVariables(themeConfig);
  }, [themeConfig]);

  const applyThemeConfig = useCallback((newTheme: Partial<ThemeColors>) => {
    setThemeConfig((prevTheme) => {
      const mergedTheme = { ...prevTheme, ...newTheme } as ThemeColors;
      localStorage.setItem('user_theme_config', JSON.stringify(mergedTheme));
      return mergedTheme;
    });
  }, []);

  const resetThemeConfig = useCallback(() => {
    setThemeConfig(DefaultTheme);
    localStorage.removeItem('user_theme_config');
  }, []);

  const value = useMemo(
    () => ({
      themeConfig,
      applyThemeConfig,
      resetThemeConfig,
    }),
    [themeConfig, applyThemeConfig, resetThemeConfig],
  );

  return (
    <ThemeConfigContext.Provider value={value}>
      {children}
    </ThemeConfigContext.Provider>
  );
};
