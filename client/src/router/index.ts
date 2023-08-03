import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { createApp } from 'vue';
import CookieLoading from '../components/cookie-loading/CookieLoading.vue';
import useUserStore from '../store/user';
import invisible from './invisible';

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
        redirect: (to) => `/admin/system_control`,
      },
      // { path: 'permission_control', component: () => import('../views/admin/PermissionControl.vue') },
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
const invisibleMap = new Map();
invisible.forEach((item, index) => {
  if (item.name) {
    invisibleMap.set(item.name, index);
  }
});

// 路由守卫
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
