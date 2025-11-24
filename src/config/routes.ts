import { RouteConfig, RouteMap } from "@/types/route";

// Path IDs for type-safe routing
export const pathIds = {
  HOME: "home",
  LOGIN: "login",
  DASHBOARD: "dashboard",
  USERS: "users",
  SETTINGS: "settings",
  PROFILE: "profile",
  PREFERENCES: "preferences",
  REPORTS: "reports",
  ACCOUNT: "account",
} as const;

// Route configurations
const routes: RouteMap = {
  [pathIds.HOME]: {
    id: pathIds.HOME,
    path: "/",
    label: "Home",
    icon: "🏠",
    requireAuth: false,
    renderSidebar: false,
    isGlobal: true,
  },
  [pathIds.LOGIN]: {
    id: pathIds.LOGIN,
    path: "/login",
    label: "Login",
    requireAuth: false,
    renderSidebar: false,
    isGlobal: true,
  },
  [pathIds.DASHBOARD]: {
    id: pathIds.DASHBOARD,
    path: "/dashboard",
    label: "Dashboard",
    icon: "📊",
    requireAuth: true,
    renderSidebar: true,
    showInMore: false,
    showInAccountManagement: false,
  },
  [pathIds.USERS]: {
    id: pathIds.USERS,
    path: "/users",
    label: "Users",
    icon: "👥",
    requireAuth: true,
    renderSidebar: true,
    showInMore: false,
    showInAccountManagement: false,
    permission: "users.view",
  },
  [pathIds.REPORTS]: {
    id: pathIds.REPORTS,
    path: "/reports",
    label: "Reports",
    icon: "📈",
    requireAuth: true,
    renderSidebar: true,
    showInMore: false,
    showInAccountManagement: false,
    permission: "reports.view",
  },
  [pathIds.SETTINGS]: {
    id: pathIds.SETTINGS,
    path: "/settings",
    label: "Settings",
    icon: "⚙️",
    requireAuth: true,
    renderSidebar: true,
    showInMore: false,
    showInAccountManagement: false,
    children: [
      {
        id: pathIds.PROFILE,
        path: "/settings/profile",
        label: "Profile",
        requireAuth: true,
        renderSidebar: true,
      },
      {
        id: pathIds.PREFERENCES,
        path: "/settings/preferences",
        label: "Preferences",
        requireAuth: true,
        renderSidebar: true,
      },
    ],
  },
  [pathIds.ACCOUNT]: {
    id: pathIds.ACCOUNT,
    path: "/account",
    label: "Account",
    icon: "👤",
    requireAuth: true,
    renderSidebar: true,
    showInMore: false,
    showInAccountManagement: true,
  },
};

// Helper functions
export const getAllRoutes = (): RouteMap => routes;

export const pathRouting = (id: string): string | undefined => {
  return routes[id]?.path;
};

export const routeMainMenuArray = (): RouteConfig[] =>
  Object.values(getAllRoutes()).filter(
    (route) =>
      route.renderSidebar &&
      !route.showInMore &&
      !route.showInAccountManagement,
  );

export const routeAccountMenuArray = (): RouteConfig[] =>
  Object.values(getAllRoutes()).filter(
    (route) =>
      route.renderSidebar && !route.showInMore && route.showInAccountManagement,
  );

export const routeUnRequireAuthArray = (): RouteConfig[] =>
  Object.values(getAllRoutes()).filter(
    (route) => !route.requireAuth || route.isGlobal,
  );

export const routeRequireAuthArray = (): RouteConfig[] =>
  Object.values(getAllRoutes()).filter(
    (route) => route.requireAuth || route.isGlobal,
  );

export const routeOnboardingArray = (): RouteConfig[] =>
  Object.values(getAllRoutes()).filter(
    (route) => (route.requireAuth && route.onboarding) || route.isGlobal,
  );

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return Object.values(routes).find((route) => route.path === path);
};
