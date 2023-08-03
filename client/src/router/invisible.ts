const invisible = [
  {
    path: '',
    redirect: () => ({ path: '/home' }),
    children: [],
  },
  {
    path: '/home',
    name: 'home',
    children: [],
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/active',
    name: 'active',
    children: [],
    component: () => import('../views/Active.vue'),
  },
  {
    path: '/study',
    name: 'study',
    children: [],
    component: () => import('../views/Study.vue'),
  },
  {
    path: '/team',
    name: 'team',
    children: [],
    component: () => import('../views/Team.vue'),
  },
  {
    path: '/active/:active_id',
    component: () => import('../views/ActiveDetail.vue'),
    props: true,
    children: [],
  },
  {
    path: '/discuss',
    component: () => import('../views/Discuss.vue'),
    children: [
      { path: '', redirect: '/discuss/interact' },
      {
        path: 'interact',
        component: () => import('../views/ArticleList.vue'),
        props: true,
        children: [
          { path: '', redirect: '/discuss/interact/hottest' },
          { path: ':type', component: () => import('../components/discuss/DiscussHottest.vue'), props: true },
        ],
      },
      {
        path: 'information',
        component: () => import('../views/ArticleList.vue'),
        children: [
          { path: '', redirect: '/discuss/information/hottest' },
          { path: ':type', component: () => import('../components/discuss/DiscussHottest.vue'), props: true },
        ],
      },
      {
        path: 'elegant',
        component: () => import('../views/ArticleList.vue'),
        children: [
          { path: '', redirect: '/discuss/elegant/hottest' },
          { path: ':type', component: () => import('../components/discuss/DiscussHottest.vue'), props: true },
        ],
      },
      {
        path: 'team',
        component: () => import('../views/ArticleList.vue'),
        children: [
          { path: '', redirect: '/discuss/team/hottest' },
          { path: ':type', component: () => import('../components/discuss/DiscussHottest.vue'), props: true },
        ],
      },
    ],
  },
  {
    path: '/discuss/:article_id',
    component: () => import('../views/DiscussContent.vue'),
    props: true,
    children: [],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/Error.vue'),
    children: [],
  },
  // {
  //   path: '/:currentPath(.*)*', // 路由未匹配到
  //   redirect: () => ({ path: '/404' }),
  // },
];
export default invisible;
