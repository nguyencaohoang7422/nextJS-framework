export interface RouteConfig {
  id: string;
  path: string;
  label: string;
  icon?: string;
  requireAuth: boolean;
  renderSidebar: boolean;
  showInMore?: boolean;
  showInAccountManagement?: boolean;
  onboarding?: boolean;
  isGlobal?: boolean;
  permission?: string;
  children?: RouteConfig[];
}

export type RouteMap = Record<string, RouteConfig>;
