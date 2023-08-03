import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import CookieLoading from '../components/cookie-loading/CookieLoading.vue';
import useUserStore from '../store/user';
import { getRoleMenuAPI } from '../api/user';
import invisible from './invisible';

interface ListNode {
  path: string;
  redirect?: () => { path: string };
  name?: string;
  component: () => Promise<typeof import('*.vue')>;
  props?: boolean;
  children: ListNode[] | null;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/active/:active_id/resume',
    component: () => import('../views/resume.vue'),
    props: true,
  },
  {
    path: '/team/:team_id',
    component: () => import('../views/TeamDetail.vue'),
    props: true,
    children: [
      {
        path: '',
        redirect: (to) => `/team/${to.params.team_id}/team_actives`,
      },
      { path: 'team_actives', component: () => import('../views/TeamActives.vue'), props: true },
      { path: 'team_members', component: () => import('../views/TeamMembers.vue'), props: true },
      { path: 'team_elegant', component: () => import('../views/TeamElegant.vue'), props: true },
    ],
  },
  { path: '/active/:team_id/publish', component: () => import('../views/teamManger/ActivePublish.vue'), props: true },
  { path: '/active/:active_id/edit', component: () => import('../views/teamManger/ActivePublish.vue'), props: true },
  { path: '/team/:team_id/member_application', component: () => import('../views/MemberApplication.vue'), props: true },
  {
    path: '/team/Application',
    component: () => import('../views/TeamApplication.vue'),
  },
  {
    path: '/team/Application/:team_application_id',
    component: () => import('../views/TeamApplication.vue'),
    props: true,
  },

  {
    path: '/team_manager',
    component: () => import('../views/teamManger/TeamList.vue'),
    meta: {
      auth: true,
    },
  },

  {
    path: '/team_manager/:team_id',
    component: () => import('../views/teamManger/TeamControl.vue'),
    children: [
      {
        path: '',
        redirect: (to) => `/team_manager/${to.params.team_id}/team_information`,
      },
      { path: 'team_information', component: () => import('../views/teamManger/TeamInfo.vue'), props: true },
      { path: 'team_member', component: () => import('../views/teamManger/TeamMember.vue'), props: true },
      {
        path: 'team_active',
        component: () => import('../views/teamManger/ActiveControl.vue'),
        props: true,
        children: [
          {
            path: ':active_id/application',
            component: () => import('../views/teamManger/ActiveApplicationControl.vue'),
            props: true,
          },
        ],
      },

      {
        path: 'team_admin_control',
        component: () => import('../views/teamManger/TeamAdminControl.vue'),
        props: true,
      },
      {
        path: 'team_stats',
        component: () => import('../views/teamManger/TeamStats.vue'),
        props: true,
      },
      {
        path: 'team_log',
        component: () => import('../views/teamManger/TeamLog.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/user/UserControl.vue'),
    children: [
      { path: 'my_application', component: () => import('../views/user/MyApplication.vue') },
      { path: 'my_team', component: () => import('../views/user/MyTeam.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminControl.vue'),
    children: [
      {
        path: '',
        redirect: () => `/admin/system_control`,
      },
      { path: 'system_log', component: () => import('../views/admin/SystemLog.vue') },
      { path: 'actives_control', component: () => import('../views/admin/ActivesControl.vue') },
      { path: 'system_control', component: () => import('../views/admin/SystemControl.vue') },
      { path: 'user_control', component: () => import('../views/admin/UserControl.vue') },
      { path: 'team_control', component: () => import('../views/admin/TeamControl.vue') },
      { path: 'views_control', component: () => import('../views/admin/ViewsControl.vue') },
      { path: 'articles_control', component: () => import('../views/admin/ArticleControl.vue') },
    ],
  },
];

//  创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...invisible, ...routes],
});

// 权限判断
function hasPermission(roles, permission): Boolean {
  return true;
}
// 判断Token是否存在
function existToken(): Boolean {
  const userStore = useUserStore();
  return !!userStore.token;
}

// 查询白名单
function getWhiteList(path: string): Boolean {
  function getPath(whiteList: ListNode[]): Boolean {
    for (const route of whiteList) {
      console.log(route);
      if (path === route.path) return true;
      if (route.children && route.children.length) {
        getPath(route.children);
      }
    }
    return false;
  }
  return getPath(invisible);
}
// 路由守卫
router.beforeEach(async (to, from, next) => {
  // no has token
  if (!existToken()) {
    // 访问的路径在白名单中
    if (getWhiteList(to.path)) {
      next();
    } else {
      next('/home'); // 跳转主页
    }
  } else {
    // exist token
    const userStore = useUserStore();
    if (userStore.user.role === '') {
      // 判断用户信息是否可用
      await userStore.getUserInfo();
      const [roleMenuRes] = await Promise.all([getRoleMenuAPI()]);
      router.addRoute(...roleMenuRes); // 动态添加可访问路由表
      next({ ...to, replace: true });
    }
    // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
    if (hasPermission(userStore.user.role, to.meta.roles)) {
      next();
    } else {
      // next({ path: '/404', replace: true, query: { noGoBack: true } });
      next('/404');
    }
  }
});
// router.beforeEach((to, from, next) => {
//   // // 在导航开始时显示Loading组件
//   // const loadingInstance = createApp(CookieLoading).mount(document.createElement('div'));
//   // document.body.appendChild(loadingInstance.$el);
//   // // 页面加载完成后隐藏Loading组件
//   // router.isReady().then(() => {
//   //   console.log(loadingInstance);
//   //   document.body.removeChild(loadingInstance.$el);
//   //   next();
//   // });
// });

export default router;
