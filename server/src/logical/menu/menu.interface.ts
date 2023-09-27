interface RouteItem {
  route_id: number;
  name: string;
  component: string;
  path: string;
  redirect: string;
  props: boolean;
  children: RouteItem[];
  alias?: string | string[];
  meta: {
    displayName: string;
    hidden: boolean;
    roles: string[];
  };
}
interface MenuItem {
  menu_id: number;
  name: string;
  path: string;
  children: MenuItem[];
  meta: {
    displayName: string;
    hidden: boolean;
    roles: string[];
    menu: boolean;
  };
}
export { MenuItem, RouteItem };
