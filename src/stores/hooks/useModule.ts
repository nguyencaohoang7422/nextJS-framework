"use client";

import { useEffect, useState } from "react";
import { useModuleRegistry, useStore } from "../index";
import { ModuleSlice } from "../types";

/**
 * Hook to dynamically load and use a module
 *
 * @param moduleId - The ID of the module to load
 * @param loader - Optional loader function (if not already registered)
 * @returns Module state with loading, error, and loaded flags
 *
 * @example
 * ```tsx
 * import { useModule } from '@/stores/hooks/useModule';
 * import { loadDashboardModule } from '@/stores/modules/dashboard/dashboardSlice';
 *
 * function DashboardPage() {
 *   const { loading, error, loaded } = useModule('dashboard', loadDashboardModule);
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *
 *   return <div>Dashboard loaded!</div>;
 * }
 * ```
 */
export function useModule<T extends ModuleSlice = ModuleSlice>(
  moduleId: string,
  loader?: () => Promise<T>,
) {
  const [mounted, setMounted] = useState(false);
  const registry = useModuleRegistry();

  const moduleEntry = useStore(
    (state) => state._moduleRegistry.modules[moduleId],
  );

  const loading = moduleEntry?.loading || false;
  const error = moduleEntry?.error || null;
  const loaded = moduleEntry?.loaded || false;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Register module if loader provided and not already registered
    if (loader && !moduleEntry) {
      registry.registerModule(moduleId, loader);
    }

    // Load module if registered but not loaded
    if (moduleEntry && !loaded && !loading) {
      registry.loadModule(moduleId);
    }
  }, [mounted, moduleId, loader, moduleEntry, loaded, loading, registry]);

  // Cleanup: unload module when component unmounts
  useEffect(() => {
    return () => {
      if (mounted && loaded) {
        // Optional: uncomment to auto-unload modules on unmount
        // registry.unloadModule(moduleId);
      }
    };
  }, [mounted, moduleId, loaded, registry]);

  return {
    loading,
    error,
    loaded,
    module: useStore((state) => state.modules[moduleId] as T | undefined),
  };
}

/**
 * Hook to check if a module is loaded
 */
export function useModuleLoaded(moduleId: string): boolean {
  return useStore(
    (state) => state._moduleRegistry.modules[moduleId]?.loaded || false,
  );
}

/**
 * Hook to get module loading state
 */
export function useModuleLoading(moduleId: string): boolean {
  return useStore(
    (state) => state._moduleRegistry.modules[moduleId]?.loading || false,
  );
}

/**
 * Hook to get module error
 */
export function useModuleError(moduleId: string): string | null {
  return useStore(
    (state) => state._moduleRegistry.modules[moduleId]?.error || null,
  );
}
