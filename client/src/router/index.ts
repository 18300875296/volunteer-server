import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import useRouteStore from '../store/route';
import useUserStore from '../store/user';
import useArticleStore from '@/store/article';

const Error = () => import('../views/Error.vue');
const whiteList: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  { path: '/:catchAll(.*)', name: '404', component: Error },
  { path: '/404', name: '404', component: Error },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...whiteList],
});

let isAddRoutes = false; // 用于判断动态路由是否加载
router.beforeEach(async (to) => {
  useRouteStore().getCurrentRoute(to); // 获取当前的路由
  if (!isAddRoutes) {
    isAddRoutes = true;
    await useRouteStore().initRoute();
    return to.fullPath;
  }
  const userStore = useUserStore();
  const validPath = router.hasRoute(to.name); // 验证当前路由是否在路由表中
  if (!validPath) return { name: '404' };
  const isExistToken = !!userStore.token; // 判断token是否存在
  if (!isExistToken) return true;
  // 没有token,但是validPath=true访问路由表中的路由
  const isExpireToken = await userStore.validToken(); // 验证token是否过期
  if (!isExpireToken) return { name: 'home' }; // token失效，跳转到首页
  return true; // 继续访问当前路由
});
router.afterEach(async (to) => {
  // 进入文章模块触发
  const articleStore = useArticleStore();
  if (!useArticleStore().isInitial) await articleStore.initArticleModule(); // 文章模块初始化
});

export { router, whiteList };
