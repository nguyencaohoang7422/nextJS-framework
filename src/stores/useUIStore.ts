import { MenuItem } from "@/types/menu";
import { create } from "zustand";
import { logger } from "./middleware/logger";

interface UIState {
  sidebarOpen: boolean;
  headerVisible: boolean;
  menuItems: MenuItem[];
  menuLoading: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleHeader: () => void;
  setHeaderVisible: (visible: boolean) => void;
  setMenuItems: (items: MenuItem[]) => void;
  setMenuLoading: (loading: boolean) => void;
  loadMenuData: () => Promise<void>;
}

export const useUIStore = create<UIState>()(
  logger((set, get) => ({
    sidebarOpen: false,
    headerVisible: true,
    menuItems: [],
    menuLoading: false,

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

    toggleHeader: () =>
      set((state) => ({ headerVisible: !state.headerVisible })),
    setHeaderVisible: (visible: boolean) => set({ headerVisible: visible }),

    setMenuItems: (items: MenuItem[]) => set({ menuItems: items }),
    setMenuLoading: (loading: boolean) => set({ menuLoading: loading }),

    loadMenuData: async () => {
      const { menuItems } = get();

      // Only load if not already loaded
      if (menuItems.length > 0) return;

      set({ menuLoading: true });

      try {
        const isDev = process.env.NODE_ENV === "development";

        if (isDev) {
          // Load from local file in development
          const { menuData } = await import("@/data/menuData");
          set({ menuItems: menuData.items });
        } else {
          // Load from API in production
          const response = await fetch("/api/menu");
          const data = await response.json();
          set({ menuItems: data.items || [] });
        }
      } catch (error) {
        console.error("Failed to load menu data:", error);
        set({ menuItems: [] });
      } finally {
        set({ menuLoading: false });
      }
    },
  })),
);
