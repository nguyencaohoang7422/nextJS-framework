import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createModuleRegistry } from "./moduleRegistry";
import { createAppSlice } from "./slices/appSlice";
import { createAuthSlice } from "./slices/authSlice";
import { createUISlice } from "./slices/uiSlice";
import { StoreState } from "./types";

import { logger } from "./middleware/logger";

/**
 * Main Store
 * Combines all core slices and module registry
 */
export const useStore = create<StoreState>()(
  logger(
    devtools(
      (...a) => ({
        // Core slices
        auth: createAuthSlice(...a),
        ui: createUISlice(...a),
        app: createAppSlice(...a),

        // Module registry
        ...createModuleRegistry(...a),

        // Dynamic modules (empty initially)
        modules: {},
      }),
      {
        name: "app-store",
      },
    ),
  ),
);

// ============================================================================
// Selectors (for performance optimization)
// ============================================================================

// Auth selectors
export const selectUser = (state: StoreState) => state.auth.user;
export const selectAuthLoading = (state: StoreState) => state.auth.loading;
export const selectAuthError = (state: StoreState) => state.auth.error;

// UI selectors
export const selectSidebarOpen = (state: StoreState) => state.ui.sidebarOpen;
export const selectHeaderVisible = (state: StoreState) =>
  state.ui.headerVisible;
export const selectMenuItems = (state: StoreState) => state.ui.menuItems;
export const selectMenuLoading = (state: StoreState) => state.ui.menuLoading;

// App selectors
export const selectTheme = (state: StoreState) => state.app.theme;
export const selectLanguage = (state: StoreState) => state.app.language;
export const selectNotifications = (state: StoreState) =>
  state.app.notifications;

// Module selectors
export const selectModule =
  <T>(moduleId: string) =>
  (state: StoreState) =>
    state.modules[moduleId] as T | undefined;

export const selectModuleLoaded = (moduleId: string) => (state: StoreState) =>
  state._moduleRegistry.modules[moduleId]?.loaded || false;

export const selectModuleLoading = (moduleId: string) => (state: StoreState) =>
  state._moduleRegistry.modules[moduleId]?.loading || false;

export const selectModuleError = (moduleId: string) => (state: StoreState) =>
  state._moduleRegistry.modules[moduleId]?.error || null;

// ============================================================================
// Convenience Hooks
// ============================================================================

/**
 * Hook to access auth state
 */
export const useAuth = () => useStore((state) => state.auth);

/**
 * Hook to access UI state
 */
export const useUI = () => useStore((state) => state.ui);

/**
 * Hook to access app state
 */
export const useApp = () => useStore((state) => state.app);

/**
 * Hook to access module registry
 */
export const useModuleRegistry = () =>
  useStore((state) => state._moduleRegistry);
