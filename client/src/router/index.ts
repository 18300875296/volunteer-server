import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import useRouteStore from '../store/route';
import useUserStore from '../store/user';

const Error = () => import('../views/Error.vue');
const whiteList: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/:catchAll(.*)', name: '404', component: Error },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...whiteList],
});

let isAddRoutes = false; // 用于判断动态路由是否加载
router.beforeEach(async (to, from) => {
  if (!isAddRoutes) {
    isAddRoutes = true;
    await useRouteStore().initRoute();
    return to.fullPath;
  }
  const userStore = useUserStore();
  const validPath = router.hasRoute(to.name); // 验证当前路由是否在路由表中
  if (!validPath) return { name: '404' };
  const isExistToken = userStore.getToken(); // 判断token是否存在
  if (!isExistToken) return true; // 没有token,但是validPath=true访问路由表中的路由
  const isExpireToken = await userStore.validToken(); // 验证token是否过期
  if (!isExpireToken) return { name: 'home' }; // token失效，跳转到首页
  return true; // 继续访问当前路由
});
export { router, whiteList };
