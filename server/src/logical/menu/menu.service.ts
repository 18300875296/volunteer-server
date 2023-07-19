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
      name: '系统管理',
      url: '/admin',
    },
  ];
  getRoutes(): MenuItem[] {
    return this.routes;
  }
  getTeamRoutes() {
    return this.team;
  }
  getAdminRoutes() {
    return this.admin;
  }
}
