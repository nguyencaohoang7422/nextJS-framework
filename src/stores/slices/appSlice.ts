import { StateCreator } from "zustand";
import { AppSlice, StoreState } from "../types";

/**
 * App Slice
 * Manages app-level state (theme, language, notifications)
 */
export const createAppSlice: StateCreator<StoreState, [], [], AppSlice> = (
  set,
) => ({
  // Initial state
  theme: "system",
  language: "en",
  notifications: [],

  // Actions
  setTheme: (theme) =>
    set((state) => ({
      app: { ...state.app, theme },
    })),

  setLanguage: (language) =>
    set((state) => ({
      app: { ...state.app, language },
    })),

  addNotification: (notification) =>
    set((state) => ({
      app: {
        ...state.app,
        notifications: [...state.app.notifications, notification],
      },
    })),

  removeNotification: (id) =>
    set((state) => ({
      app: {
        ...state.app,
        notifications: state.app.notifications.filter((n) => n.id !== id),
      },
    })),

  clearNotifications: () =>
    set((state) => ({
      app: { ...state.app, notifications: [] },
    })),
});
