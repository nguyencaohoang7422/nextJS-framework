'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeTogglerTwo() {
  const { setTheme, theme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
