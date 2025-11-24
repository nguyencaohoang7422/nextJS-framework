import { create } from "zustand";

/**
 * Loading State Types
 */
export type LoadingType = "full" | "main";

export interface LoadingState {
  // Full page loading
  isFullLoading: boolean;
  fullLoadingMessage?: string;

  // Main content loading
  isMainLoading: boolean;
  mainLoadingMessage?: string;

  // Actions
  showFullLoading: (message?: string) => void;
  hideFullLoading: () => void;
  showMainLoading: (message?: string) => void;
  hideMainLoading: () => void;
  hideAllLoading: () => void;
}

/**
 * Loading Store
 * Manages global loading states for full page and main content
 */
export const useLoadingStore = create<LoadingState>((set) => ({
  // Initial state
  isFullLoading: false,
  fullLoadingMessage: undefined,
  isMainLoading: false,
  mainLoadingMessage: undefined,

  // Full page loading
  showFullLoading: (message) =>
    set({
      isFullLoading: true,
      fullLoadingMessage: message,
    }),

  hideFullLoading: () =>
    set({
      isFullLoading: false,
      fullLoadingMessage: undefined,
    }),

  // Main content loading
  showMainLoading: (message) =>
    set({
      isMainLoading: true,
      mainLoadingMessage: message,
    }),

  hideMainLoading: () =>
    set({
      isMainLoading: false,
      mainLoadingMessage: undefined,
    }),

  // Hide all loading states
  hideAllLoading: () =>
    set({
      isFullLoading: false,
      fullLoadingMessage: undefined,
      isMainLoading: false,
      mainLoadingMessage: undefined,
    }),
}));

/**
 * Helper functions for easier usage
 */
export const loading = {
  /**
   * Show full page loading
   */
  showFull: (message?: string) => {
    useLoadingStore.getState().showFullLoading(message);
  },

  /**
   * Hide full page loading
   */
  hideFull: () => {
    useLoadingStore.getState().hideFullLoading();
  },

  /**
   * Show main content loading
   */
  showMain: (message?: string) => {
    useLoadingStore.getState().showMainLoading(message);
  },

  /**
   * Hide main content loading
   */
  hideMain: () => {
    useLoadingStore.getState().hideMainLoading();
  },

  /**
   * Hide all loading states
   */
  hideAll: () => {
    useLoadingStore.getState().hideAllLoading();
  },
};
