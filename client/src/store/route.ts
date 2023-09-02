import { ref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { getMenuAPI, getRoleMenuAPI } from '../api/menu';
import { router } from '../router/index';
import { MenuItem } from '../types/menu';
import { flatData } from '../utils/flatData';

const modules = import.meta.glob('../views/**/*.vue');
const useRouteStore = defineStore('routeStore', {
  state: () => ({
    routes: ref<RouteRecordRaw[]>([]),
    menus: ref<RouteRecordRaw[]>([]),
  }),
  actions: {
    // 初始化路由表
    async initRoute(): Promise<void> {
      await this.getRoutes(); // 获取基础路由
    },
    // 判断路由是否存在
    hasRoute(name: string, routes: RouteRecordRaw[]): boolean {
      if (!routes || !name) return false;
      for (const item of routes) {
        if (item.name === name) return true;
        if (item.children && item.children.length > 0) {
          const hasChildRoute = this.hasRoute(name, item.children);
          if (hasChildRoute) return true; // 如果子路由中有匹配的，返回 true
        }
      }
      return false;
    },
    // 将获取的路由转化成vue-router中的路由类型
    transformVueRoute(route: MenuItem): RouteRecordRaw {
      const { name, path, children, component, meta, props, ...rest } = route;
      const transformChildren: RouteRecordRaw[] | null = [];
      const url = `../views/${component}`;
      if (children.length) children.forEach((item) => transformChildren.push(this.transformVueRoute(item)));
      console.log(url, modules[url]);
      return {
        name,
        path,
        meta: Object.assign(meta, rest),
        children: transformChildren || undefined,
        component: modules[url],
        props,
      };
    },
    // 获取路由
    async getRoutes(isUserinfoExist = false): Promise<void> {
      try {
        let routes: MenuItem[];
        if (!isUserinfoExist) {
          routes = (await getMenuAPI()).data;
        } else {
          routes = (await getRoleMenuAPI()).data;
        }
        routes.forEach((item) => {
          const isRouteExist = this.hasRoute(item.name, this.routes);
          if (!isRouteExist) {
            const realRoute = this.transformVueRoute(item);
            if (item.meta.menu) this.menus.push(realRoute);
            this.routes.push(realRoute);
            router.addRoute(realRoute);
          }
        });
        console.log(router.getRoutes());
      } catch (error) {
        throw Error(`获取路由出错,${error}`);
      }
    },
    // 获取某个节点路由的所有孩子(depth用于控制扁平程度)
    async getCurrentRouteChildren(routeName: string, depth: number): Promise<RouteRecordRaw[] | null> {
      const filterRoute = this.routes.find((route) => routeName === route.name);
      return filterRoute?.children && filterRoute?.children.length
        ? flatData(filterRoute.children, depth, 'children')
        : null;
    },
    // 删除权限路由
    removePermissionRoutes(routes: RouteRecordRaw[], permissionMenus: RouteRecordRaw[]): void {
      const filterRoutes = routes.filter((route) => {
        if (route.children && route.children.length > 0) this.removePermissionRoutes(route.children, permissionMenus);
        if (route.name && route.meta && route.meta.hidden) router.removeRoute(route.name);
        return true;
      });
      this.routes = filterRoutes;
      this.menus = this.menus.filter((menu) => !(menu.meta && menu.meta.hidden));
    },
  },
});

export default useRouteStore;
