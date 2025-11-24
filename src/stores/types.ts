import { User } from "@/shared/types";
import { MenuItem } from "@/types/menu";

// ============================================================================
// Core Slice Types
// ============================================================================

/**
 * Auth Slice State
 */
export interface AuthSlice {
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * UI Slice State
 */
export interface UISlice {
  sidebarOpen: boolean;
  headerVisible: boolean;
  menuItems: MenuItem[];
  menuLoading: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleHeader: () => void;
  setHeaderVisible: (visible: boolean) => void;
  setMenuItems: (items: MenuItem[]) => void;
  setMenuLoading: (loading: boolean) => void;
  loadMenuData: () => Promise<void>;
}

/**
 * App Slice State
 */
export interface AppSlice {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: Notification[];

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  setLanguage: (language: string) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  duration?: number;
}

// ============================================================================
// Module System Types
// ============================================================================

/**
 * Base interface for all dynamic modules
 */
export interface ModuleSlice {
  _moduleId: string;
  _loaded: boolean;
  _loading: boolean;
  _error: string | null;
}

/**
 * Module registry entry
 */
export interface ModuleRegistryEntry<T extends ModuleSlice = ModuleSlice> {
  id: string;
  loader: () => Promise<T>;
  slice?: T;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * Module registry state
 */
export interface ModuleRegistry {
  modules: Record<string, ModuleRegistryEntry>;

  // Actions
  registerModule: <T extends ModuleSlice>(
    id: string,
    loader: () => Promise<T>,
  ) => void;
  loadModule: (id: string) => Promise<void>;
  unloadModule: (id: string) => void;
  isModuleLoaded: (id: string) => boolean;
}

// ============================================================================
// Feature Module Types
// ============================================================================

/**
 * Dashboard Module State
 */
export interface DashboardSlice extends ModuleSlice {
  _moduleId: "dashboard";

  // State
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  filters: DashboardFilters;

  // Actions
  setWidgets: (widgets: DashboardWidget[]) => void;
  updateLayout: (layout: DashboardLayout) => void;
  setFilters: (filters: DashboardFilters) => void;
  resetDashboard: () => void;
}

export interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  data: unknown;
  position: { x: number; y: number; w: number; h: number };
}

export interface DashboardLayout {
  columns: number;
  rowHeight: number;
}

export interface DashboardFilters {
  dateRange?: { start: Date; end: Date };
  category?: string;
  status?: string;
}

/**
 * Users Module State
 */
export interface UsersSlice extends ModuleSlice {
  _moduleId: "users";

  // State
  users: User[];
  selectedUser: User | null;
  filters: UsersFilters;
  pagination: Pagination;

  // Actions
  setUsers: (users: User[]) => void;
  selectUser: (user: User | null) => void;
  setFilters: (filters: UsersFilters) => void;
  setPagination: (pagination: Pagination) => void;
}

export interface UsersFilters {
  search?: string;
  role?: string;
  status?: "active" | "inactive";
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Reports Module State
 */
export interface ReportsSlice extends ModuleSlice {
  _moduleId: "reports";

  // State
  reports: Report[];
  selectedReport: Report | null;
  generating: boolean;
  exportFormat: "pdf" | "excel" | "csv";

  // Actions
  setReports: (reports: Report[]) => void;
  selectReport: (report: Report | null) => void;
  setGenerating: (generating: boolean) => void;
  setExportFormat: (format: "pdf" | "excel" | "csv") => void;
  generateReport: (reportId: string) => Promise<void>;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
  data: unknown;
}

// ============================================================================
// Combined Store Type
// ============================================================================

/**
 * Main store combining all slices
 */
export interface StoreState {
  // Core slices (always loaded)
  auth: AuthSlice;
  ui: UISlice;
  app: AppSlice;

  // Module registry
  _moduleRegistry: ModuleRegistry;

  // Dynamic modules (loaded on-demand)
  modules: {
    dashboard?: DashboardSlice;
    users?: UsersSlice;
    reports?: ReportsSlice;
    [key: string]: ModuleSlice | undefined;
  };
}

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Extract module type from module ID
 */
export type ModuleType<T extends string> = T extends "dashboard"
  ? DashboardSlice
  : T extends "users"
    ? UsersSlice
    : T extends "reports"
      ? ReportsSlice
      : ModuleSlice;

/**
 * Module loader function type
 */
export type ModuleLoader<T extends ModuleSlice> = () => Promise<T>;

/**
 * Store selector type
 */
export type StoreSelector<T> = (state: StoreState) => T;

/**
 * Store action type
 */
export type StoreAction = (state: StoreState) => Partial<StoreState> | void;
