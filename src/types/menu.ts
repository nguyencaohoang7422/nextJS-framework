export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  permission?: string;
}

export interface MenuData {
  items: MenuItem[];
}
