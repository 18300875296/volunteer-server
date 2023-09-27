import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import { getRoutesAPI, getMenusAPI } from '../api/menu';
import { router } from '../router/index';
import { RouteItem, MenuItem, FirstMenuItem } from '../types/menu';
import { flatData } from '../utils/flatData';

const modules = import.meta.glob('../views/**/*.vue');
const useRouteStore = defineStore('routeStore', {
  state: () => ({
    menus: ref<MenuItem[]>([]),
    firstMenus: ref<FirstMenuItem[]>([]), // 一级菜单栏
    currentRoute: ref<RouteLocationNormalized>(),
  }),
  actions: {
    // 初始化路由表
    async initRoute(): Promise<void> {
      await this.getRoutes(); // 获取基础路由
      await this.getMenus();
      this.filterFirstMenus();
    },

    // 将获取的路由转化成vue-router中的路由类型
    transformVueRoute(route: RouteItem): RouteRecordRaw {
      const { name, path, children, component, meta, props, redirect, alias, ...rest } = route;
      const transformChildren: RouteRecordRaw[] | null = [];
      const url = `../views/${component}`;
      if (children.length) children.forEach((item) => transformChildren.push(this.transformVueRoute(item)));
      const routeItem: RouteRecordRaw = {
        name,
        path: path || '',
        meta: Object.assign(meta, rest),
        children: transformChildren || undefined,
        component: modules[url],
        props,
        redirect,
      };
      if (alias) Object.assign(routeItem, { alias });
      return routeItem;
    },
    // 获取路由
    async getRoutes(isUserinfoExist = false): Promise<void> {
      try {
        let routes: RouteItem[];
        if (!isUserinfoExist) {
          routes = (await getRoutesAPI()).data;
        } else {
          routes = (await getRoutesAPI()).data;
        }
        for (const item of routes) {
          const vueRoute = this.transformVueRoute(item);
          router.addRoute(vueRoute);
        }
        console.log(router.getRoutes());
      } catch (error) {
        throw Error(`获取路由出错,${error}`);
      }
    },
    // 获取菜单栏
    async getMenus(isUserinfoExist = false): Promise<void> {
      try {
        let menus: MenuItem[];
        if (!isUserinfoExist) {
          menus = (await getMenusAPI()).data;
        } else {
          menus = (await getMenusAPI()).data;
        }
        this.menus.push(...menus);
      } catch (error) {
        throw Error(`获取菜单出错,${error}`);
      }
    },
    // 筛选一级菜单栏
    filterFirstMenus(): void {
      const _menus = this.menus;
      for (const menu of _menus) {
        if (menu.meta.menu && !menu.meta.hidden) {
          const { children, ...rest } = menu;
          this.firstMenus.push(rest);
        }
      }
    },
    // 获取某个节点路由的所有孩子(depth用于控制扁平程度)
    async getCurrentMenuChildren(menuName: string, depth: number): Promise<MenuItem[] | null> {
      const filterMenu = this.menus.find((menu) => menuName === menu.name);
      return filterMenu?.children && filterMenu?.children.length
        ? flatData(filterMenu.children, depth, 'children')
        : null;
    },
    // 删除权限路由
    // removePermissionRoutes(routes: RouteRecordRaw[], permissionMenus: RouteRecordRaw[]): void {
    //   const filterRoutes = routes.filter((route) => {
    //     if (route.children && route.children.length > 0) this.removePermissionRoutes(route.children, permissionMenus);
    //     if (route.name && route.meta && route.meta.hidden) router.removeRoute(route.name);
    //     return true;
    //   });
    //   this.routes = filterRoutes;
    //   this.menus = this.menus.filter((menu) => !(menu.meta && menu.meta.hidden));
    // },
    // 获得当前路由
    getCurrentRoute(to: RouteLocationNormalized): void {
      this.currentRoute = to;
    },
  },
});

export default useRouteStore;
