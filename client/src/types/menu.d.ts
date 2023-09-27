import { RouteMeta } from 'vue-router';
import { Role } from './permission';
// 扩展 RouteRecordRaw 接口
declare module 'vue-router' {
  export interface RouteMeta {
    title: string;
    hidden: boolean;
    roles: null | Role[];
    menu: boolean;
    tabs?: MenuTab[];
  }
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
interface FirstMenuItem {
  menu_id: number;
  name: string;
  path: string;
  meta: {
    displayName: string;
    hidden: boolean;
    roles: string[];
    menu: boolean;
  };
}
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

export { MenuItem, RouteItem, FirstMenuItem };
