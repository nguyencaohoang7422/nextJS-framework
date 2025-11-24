import { StateCreator } from "zustand";
import { AuthSlice, StoreState } from "../types";

/**
 * Auth Slice
 * Manages authentication state
 */
export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  set,
) => ({
  // Initial state
  user: null,
  loading: false,
  error: null,

  // Actions
  setUser: (user) =>
    set((state) => ({
      auth: { ...state.auth, user, error: null },
    })),

  clearUser: () =>
    set((state) => ({
      auth: { ...state.auth, user: null, error: null },
    })),

  setLoading: (loading) =>
    set((state) => ({
      auth: { ...state.auth, loading },
    })),

  setError: (error) =>
    set((state) => ({
      auth: { ...state.auth, error },
    })),
});
