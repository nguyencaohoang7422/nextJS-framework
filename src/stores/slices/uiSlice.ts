import { StateCreator } from 'zustand';

import { StoreState, UISlice } from '../types';

/**
 * UI Slice
 * Manages UI state (sidebar, header, menu)
 */
export const createUISlice: StateCreator<StoreState, [], [], UISlice> = (
  set,
  get,
) => ({
  // Initial state
  sidebarOpen: true,
  headerVisible: true,
  menuItems: [],
  menuLoading: false,

  // Actions
  toggleSidebar: () =>
    set((state) => ({
      ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
    })),

  setSidebarOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, sidebarOpen: open },
    })),

  toggleHeader: () =>
    set((state) => ({
      ui: { ...state.ui, headerVisible: !state.ui.headerVisible },
    })),

  setHeaderVisible: (visible) =>
    set((state) => ({
      ui: { ...state.ui, headerVisible: visible },
    })),

  setMenuItems: (items) =>
    set((state) => ({
      ui: { ...state.ui, menuItems: items },
    })),

  setMenuLoading: (loading) =>
    set((state) => ({
      ui: { ...state.ui, menuLoading: loading },
    })),

  loadMenuData: async () => {
    const state = get();
    const { menuItems } = state.ui;

    // Only load if not already loaded
    if (menuItems.length > 0) return;

    set((state) => ({
      ui: { ...state.ui, menuLoading: true },
    }));

    try {
      const isDev = process.env.NODE_ENV === 'development';

      if (isDev) {
        // Load from local file in development
        const { menuData } = await import('@/data/menuData');
        set((state) => ({
          ui: { ...state.ui, menuItems: menuData.items, menuLoading: false },
        }));
      } else {
        // Load from API in production
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        try {
          const response = await fetch('/api/menu', {
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          const data = await response.json();
          set((state) => ({
            ui: {
              ...state.ui,
              menuItems: data.items || [],
              menuLoading: false,
            },
          }));
        } catch (fetchError) {
          clearTimeout(timeoutId);
          throw fetchError;
        }
      }
    } catch (error) {
      console.error(
        'Failed to load menu data, falling back to mock data:',
        error,
      );
      // Fallback to mock data
      try {
        const { menuData } = await import('@/data/menuData');
        set((state) => ({
          ui: { ...state.ui, menuItems: menuData.items, menuLoading: false },
        }));
      } catch (fallbackError) {
        console.error('Failed to load fallback menu data:', fallbackError);
        set((state) => ({
          ui: { ...state.ui, menuItems: [], menuLoading: false },
        }));
      }
    }
  },
});
