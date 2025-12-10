'use client';

import { useThemeConfig } from '@/providers/ThemeConfigProvider';
import { useTheme } from '@/providers/ThemeProvider';

/**
 * Demo component sử dụng cả ThemeProvider và ThemeConfigProvider
 *
 * - ThemeProvider: Quản lý dark/light mode
 * - ThemeConfigProvider: Quản lý theme colors (primary, secondary, etc.)
 */
export default function ThemeDemo() {
  // Hook cho dark/light mode
  const { theme, toggleTheme, setTheme } = useTheme();

  // Hook cho theme colors
  const { themeConfig, applyThemeConfig, resetThemeConfig } = useThemeConfig();

  return (
    <div className="p-8 space-y-8 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          🎨 Theme Configuration Demo
        </h1>

        {/* Dark/Light Mode Section */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🌓 Dark/Light Mode
          </h2>
          <div className="flex items-center gap-4">
            <p className="text-gray-700 dark:text-gray-300">
              Current mode: <strong>{theme}</strong>
            </p>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Toggle Theme
            </button>
            <button
              onClick={() => setTheme('light')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
            >
              Dark
            </button>
          </div>
        </section>

        {/* Theme Colors Section */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            🎨 Theme Colors Configuration
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(themeConfig).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) =>
                      applyThemeConfig({ [key]: e.target.value })
                    }
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      applyThemeConfig({ [key]: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetThemeConfig}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Reset Colors to Default
          </button>
        </section>

        {/* Color Preview */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            👁️ Color Preview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.primary }}
            >
              Primary
            </div>
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.secondary }}
            >
              Secondary
            </div>
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.success }}
            >
              Success
            </div>
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.warning }}
            >
              Warning
            </div>
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.error }}
            >
              Error
            </div>
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.link }}
            >
              Link
            </div>
            <div
              className="h-20 rounded flex items-center justify-center"
              style={{
                backgroundColor: themeConfig.background,
                border: `2px solid ${themeConfig.border}`,
                color: themeConfig.secondary,
              }}
            >
              Background
            </div>
            <div
              className="h-20 rounded flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: themeConfig.disabled }}
            >
              Disabled
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
