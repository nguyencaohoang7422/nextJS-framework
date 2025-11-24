import { routeAccountMenuArray, routeMainMenuArray } from "@/config/routes";
import { MenuData, MenuItem } from "@/types/menu";
import { RouteConfig } from "@/types/route";

// Convert RouteConfig to MenuItem
const routeToMenuItem = (route: RouteConfig): MenuItem => ({
  id: route.id,
  label: route.label,
  icon: route.icon,
  path: route.path,
  permission: route.permission,
  children: route.children?.map(routeToMenuItem),
});

// Generate menu from route configuration
export const menuData: MenuData = {
  items: routeMainMenuArray().map(routeToMenuItem),
};

// Account menu (for user dropdown or account section)
export const accountMenuData: MenuData = {
  items: routeAccountMenuArray().map(routeToMenuItem),
};
