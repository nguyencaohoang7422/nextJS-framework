"use client";

import { DefaultTheme, ThemeColors } from "@/config/theme";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextType {
  theme: ThemeColors;
  applyTheme: (theme: Partial<ThemeColors>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeColors>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("user_theme");
        if (savedTheme) {
          const parsedTheme = JSON.parse(savedTheme);
          return { ...DefaultTheme, ...parsedTheme };
        }
      } catch (e) {
        console.error("Failed to parse theme from local storage", e);
      }
    }
    return DefaultTheme;
  });

  const mapThemeToCssVariables = (themeConfig: ThemeColors) => {
    const root = document.documentElement;
    // Map specific keys to CSS variables
    root.style.setProperty("--color-primary", themeConfig.primary);
    root.style.setProperty("--color-secondary", themeConfig.secondary);
    root.style.setProperty("--color-success", themeConfig.success);
    root.style.setProperty("--color-warning", themeConfig.warning);
    root.style.setProperty("--color-error", themeConfig.error);

    // Map others if needed or generic mapping
    root.style.setProperty("--bg-primary", themeConfig.background);
    root.style.setProperty("--border-color", themeConfig.border);

    // You can add more mappings here based on your variables.css
  };

  useEffect(() => {
    mapThemeToCssVariables(theme);
  }, [theme]);

  const applyTheme = useCallback((newTheme: Partial<ThemeColors>) => {
    setTheme((prevTheme) => {
      const mergedTheme = { ...prevTheme, ...newTheme } as ThemeColors;
      localStorage.setItem("user_theme", JSON.stringify(mergedTheme));
      return mergedTheme;
    });
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(DefaultTheme);
    localStorage.removeItem("user_theme");
  }, []);

  const value = useMemo(
    () => ({
      theme,
      applyTheme,
      resetTheme,
    }),
    [theme, applyTheme, resetTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
