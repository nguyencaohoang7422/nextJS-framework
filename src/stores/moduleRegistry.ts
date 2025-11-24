import { StateCreator } from "zustand";
import { ModuleRegistry, ModuleSlice, StoreState } from "./types";

/**
 * Module Registry Slice
 * Manages dynamic module loading and lifecycle
 */
export const createModuleRegistry: StateCreator<
  StoreState,
  [],
  [],
  { _moduleRegistry: ModuleRegistry }
> = (set, get) => ({
  _moduleRegistry: {
    modules: {},

    // Register a new module
    registerModule: <T extends ModuleSlice>(
      id: string,
      loader: () => Promise<T>,
    ) => {
      set((state) => ({
        _moduleRegistry: {
          ...state._moduleRegistry,
          modules: {
            ...state._moduleRegistry.modules,
            [id]: {
              id,
              loader,
              loaded: false,
              loading: false,
              error: null,
            },
          },
        },
      }));
    },

    // Load a module
    loadModule: async (id: string) => {
      const state = get();
      const moduleEntry = state._moduleRegistry.modules[id];

      if (!moduleEntry) {
        console.error(`Module "${id}" not registered`);
        return;
      }

      if (moduleEntry.loaded || moduleEntry.loading) {
        return; // Already loaded or loading
      }

      // Set loading state
      set((state) => ({
        _moduleRegistry: {
          ...state._moduleRegistry,
          modules: {
            ...state._moduleRegistry.modules,
            [id]: {
              ...moduleEntry,
              loading: true,
              error: null,
            },
          },
        },
      }));

      try {
        // Load the module
        const slice = await moduleEntry.loader();

        // Set loaded state and add slice to modules
        set((state) => ({
          _moduleRegistry: {
            ...state._moduleRegistry,
            modules: {
              ...state._moduleRegistry.modules,
              [id]: {
                ...moduleEntry,
                slice,
                loaded: true,
                loading: false,
                error: null,
              },
            },
          },
          modules: {
            ...state.modules,
            [id]: slice,
          },
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        // Set error state
        set((state) => ({
          _moduleRegistry: {
            ...state._moduleRegistry,
            modules: {
              ...state._moduleRegistry.modules,
              [id]: {
                ...moduleEntry,
                loading: false,
                error: errorMessage,
              },
            },
          },
        }));

        console.error(`Failed to load module "${id}":`, error);
      }
    },

    // Unload a module
    unloadModule: (id: string) => {
      set((state) => {
        const { [id]: removed, ...remainingModules } = state.modules;

        return {
          _moduleRegistry: {
            ...state._moduleRegistry,
            modules: {
              ...state._moduleRegistry.modules,
              [id]: {
                ...state._moduleRegistry.modules[id],
                loaded: false,
                slice: undefined,
              },
            },
          },
          modules: remainingModules,
        };
      });
    },

    // Check if module is loaded
    isModuleLoaded: (id: string) => {
      const state = get();
      return state._moduleRegistry.modules[id]?.loaded || false;
    },
  },
});
