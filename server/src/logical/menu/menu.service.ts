import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu.interface';

@Injectable()
export class MenuService {
  private routes: MenuItem[] = [
    {
      name: '首页',
      url: '/home',
    },
    {
      name: '志愿活动',
      url: '/active',
    },
    {
      name: '志愿团队',
      url: '/team',
    },
    {
      name: '志愿动态',
      url: '/discuss',
    },
    {
      name: '学习',
      url: '/study',
    },

    // {
    //   name: '商店',
    //   url: '/store',
    // },
  ];
  private team = [
    {
      name: '团队管理',
      url: '/team_manager',
    },
  ];
  private admin = [
    {
      path: '/admin',
      component: () => '/views/admin/AdminControl.vue',
      meta: { roles: ['admin'] },
      children: [
        {
          path: '',
          redirect: () => `/admin/system_control`,
        },
        {
          path: 'system_log',
          component: () => '/views/admin/SystemLog.vue',
        },
        {
          path: 'actives_control',
          component: () => '/views/admin/ActivesControl.vue',
        },
        {
          path: 'system_control',
          component: () => '/views/admin/SystemControl.vue',
        },
        {
          path: 'user_control',
          component: () => '/views/admin/UserControl.vue',
        },
        {
          path: 'team_control',
          component: () => '/views/admin/TeamControl.vue',
        },
        {
          path: 'views_control',
          component: () => '/views/admin/ViewsControl.vue',
        },
        {
          path: 'articles_control',
          component: () => '/views/admin/ArticleControl.vue',
        },
      ],
    },
  ];
  getRoutes(): MenuItem[] {
    return this.routes;
  }
  getRoleRoutes(role: string) {
    return role === 'team_admin' ? this.team : this.admin;
  }
}
