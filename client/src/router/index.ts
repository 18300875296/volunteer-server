import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import useRouteStore from '../store/route';
import useUserStore from '../store/user';
import { MenuItem } from '@/assets/interface';
import { hasRoute, transformRotes } from '../hooks/route';

const Home = () => import('../views/Home.vue');
const whiteList: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: Home },
  // { path: '/:pathMatch(.*)*', name: '404', component: Error },
  // { path: '/404', name: '404', component: Error },
];
// 刷新页面
const getBaseRoute = async () => {
  const headers = new Headers();
  const { token } = localStorage.getItem('userStore'); // 如果token 存在，则给请求头加token
  console.log(token);
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  const response = await fetch('http://127.0.0.1:8080/api/menu', { method: 'GET', headers });
  const { data }: { data: MenuItem[] } = await response.json();
  const routes: RouteRecordRaw[] = [];
  const menus: MenuItem[] = [];
  for (const item of data) {
    const routeRecord: RouteRecordRaw = transformRotes(item);
    routes.push(routeRecord);
    if (item.meta.menu) {
      menus.push(item);
    }
  }

  return { routes, menus };
};
const { routes, menus } = await getBaseRoute();
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...whiteList, ...routes],
});
// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const routeStore = useRouteStore();
  await routeStore.initRoute(menus);
  const validPath = router.hasRoute(to.name); // 验证当前路由是否在路由表中
  if (!userStore.getToken()) {
    // token不存在
    if (validPath) {
      next(); // 没有token时访问路由表中的路由就放行
    } else {
      next('/404');
    }
  } else {
    const tokenIsValid = await userStore.validToken();
    if (tokenIsValid) {
      if (validPath) {
        next(); // 继续访问当前路由
      } else {
        next('/404');
      }
    } else {
      next('/home'); // token失效，跳转到首页
    }
  }
});

export { router, whiteList };
