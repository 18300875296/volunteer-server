import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu.interface';
import { Role } from '../role/role.enum';

@Injectable()
export class MenuService {
  private routes: MenuItem[] = [
    {
      id: 1000,
      parent_id: 0,
      level: 0,
      name: 'home',
      path: '/home',
      component: 'Home.vue',
      meta: { title: '首页', hidden: false, roles: null, menu: true },
      children: [],
    },
    {
      id: 2000,
      parent_id: 0,
      name: 'active',
      path: '/active',
      level: 0,
      meta: { title: '志愿活动', hidden: false, roles: null, menu: true },
      component: 'Active.vue',
      children: [],
    },
    {
      id: 3000,
      parent_id: 0,
      level: 0,
      name: 'team',
      path: '/team',
      meta: { title: '志愿团队', hidden: false, roles: null, menu: true },
      children: [],
      component: 'Team.vue',
    },
    {
      id: 4000,
      parent_id: 0,
      level: 0,
      name: 'article',
      path: '/article',
      meta: { title: '志愿动态', hidden: false, roles: null, menu: true },
      redirect: '/article/interact',
      component: 'Article.vue',
      children: [
        {
          id: 4100,
          parent_id: 4000,
          level: 1,
          name: 'interact',
          path: 'interact',
          meta: { title: '志愿动态', hidden: false, roles: null, menu: false },
          component: 'ArticleList.vue',
          props: true,
          children: [
            {
              id: 4110,
              parent_id: 4100,
              level: 2,
              name: 'interact_hottest',
              path: '/article/interact/hottest',
              meta: {
                title: '热门活动',
                hidden: false,
                roles: null,
                menu: false,
              },
              component: 'ArticleHottest.vue',
              props: true,
              children: [],
            },
          ],
        },
        {
          id: 4200,
          parent_id: 4000,
          level: 1,
          name: 'information',
          path: 'information',
          meta: { title: '志愿动态', hidden: false, roles: null, menu: false },
          component: 'ArticleList.vue',
          props: true,
          redirect: '/article/information/hottest',
          children: [
            {
              id: 4210,
              parent_id: 4200,
              level: 2,
              name: 'information_hottest',
              path: '/article/information/hottest',
              meta: {
                title: '热门动态',
                hidden: false,
                roles: null,
                menu: false,
              },
              component: 'ArticleHottest.vue',
              props: true,
              children: [],
            },
          ],
        },
        {
          id: 4300,
          parent_id: 4000,
          level: 1,
          name: 'elegant',
          path: 'elegant',
          meta: { title: '志愿风采', hidden: false, roles: null, menu: false },
          component: 'ArticleList.vue',
          props: true,
          redirect: '/article/elegant/hottest',
          children: [
            {
              id: 4210,
              parent_id: 4200,
              level: 2,
              name: 'elegant_hottest',
              path: '/article/elegant/hottest',
              meta: {
                title: '热门风采',
                hidden: false,
                roles: null,
                menu: false,
              },
              component: 'ArticleHottest.vue',
              props: true,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 5000,
      parent_id: 0,
      name: 'active_detail',
      path: '/active/:active_id',
      level: 0,
      meta: { title: '志愿活动详情', hidden: false, roles: null, menu: false },
      children: [],
      component: 'ActiveDetail.vue',
    },
    {
      id: 6000,
      parent_id: 0,
      level: 0,
      name: 'article_detail',
      path: '/article/:article_id',
      meta: { title: '志愿动态详情', hidden: false, roles: null, menu: false },
      children: [],
      component: 'ArticleDetail.vue',
    },
    {
      id: 7000,
      parent_id: 0,
      name: 'team_detail',
      path: '/team/:team_id',
      level: 0,
      meta: { title: '志愿团队详情', hidden: false, roles: null, menu: false },
      children: [],
      component: 'TeamDetail.vue',
    },
    {
      id: 8000,
      parent_id: 0,
      level: 0,
      name: 'admin',
      path: '/admin',
      meta: {
        title: '系统管理',
        hidden: true,
        roles: [Role.Admin, Role.SuperAdmin],
        menu: true,
      },
      redirect: '/admin/system_control',
      children: [
        {
          id: 8100,
          parent_id: 8000,
          level: 1,
          name: 'permission_control',
          path: 'permission_control',
          component: 'admin/PermissionControl.vue',
          meta: {
            title: '权限管理',
            hidden: true,
            roles: [Role.Admin, Role.SuperAdmin],
            menu: false,
          },
          children: [],
        },
        {
          id: 8200,
          parent_id: 8000,
          level: 1,
          name: 'system_log',
          path: 'system_log',
          component: 'admin/SystemLog.vue',
          meta: {
            title: '系统日志',
            hidden: true,
            roles: [Role.Admin, Role.SuperAdmin],
            menu: false,
          },
          children: [],
        },
        {
          id: 8300,
          parent_id: 8000,
          level: 1,
          name: 'actives_control',
          path: 'actives_control',
          component: 'admin/ActivesControl.vue',
          meta: {
            title: '活动管理',
            hidden: true,
            roles: [Role.Admin, Role.SuperAdmin],
            menu: false,
          },
          children: [],
        },
        {
          id: 8400,
          parent_id: 8000,
          level: 1,
          name: 'system_control',
          path: 'system_control',
          component: 'admin/SystemControl.vue',
          meta: {
            title: '系统管理',
            hidden: true,
            roles: [Role.Admin, Role.SuperAdmin],
            menu: false,
          },
          children: [],
        },
      ],
      component: 'admin/AdminControl.vue',

      //
      //       { path: 'system_control', component: () => import('../views/admin/SystemControl.vue') },
      //       { path: 'user_control', component: () => import('../views/admin/UserControl.vue') },
      //       { path: 'team_control', component: () => import('../views/admin/TeamControl.vue') },
      //       { path: 'views_control', component: () => import('../views/admin/ViewsControl.vue') },
      //       { path: 'articles_control', component: () => import('../views/admin/ArticleControl.vue') },
      //     ],
      //   },
      // ];
    },
    {
      id: 9000,
      parent_id: 0,
      name: 'active_resume',
      path: '/active/:active_id/resume',
      level: 0,
      meta: {
        title: '志愿活动报名',
        hidden: true,
        roles: [Role.Admin, Role.TeamAdmin, Role.User, Role.SuperAdmin],
        menu: false,
      },
      children: [],
      component: 'resume.vue',
    },

    {
      id: 10000,
      parent_id: 0,
      name: 'active_edit',
      path: '/active/:active_id/edit',
      level: 0,
      meta: {
        title: '志愿活动修改',
        hidden: true,
        roles: [Role.Admin, Role.TeamAdmin, Role.SuperAdmin],
        menu: false,
      },
      children: [],
      component: 'teamManger/ActivePublish.vue',
    },
    // {
    //   id: 11000,
    //   parent_id: 0,
    //   name: 'active_publish',
    //   path: '/active/:team_id/publish',
    //   level: 2,
    //   meta: {
    //     title: '志愿活动发布页',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin],
    //   },
    //   children: [],
    //   component: 'teamManger/ActivePublish.vue',
    // },

    // {
    //   id: 3110,
    //   parent_id: 3100,
    //   name: 'team_actives',
    //   path: '/team/:team_id/actives',
    //   level: 2,
    //   meta: { title: '团队活动', hidden: false, roles: null },
    //   children: [],
    //   component: 'TeamActives.vue',
    // },
    // {
    //   id: 3120,
    //   parent_id: 3100,
    //   name: 'team_members',
    //   path: '/team/:team_id/team_members',
    //   level: 2,
    //   meta: { title: '团队成员', hidden: false, roles: null },
    //   children: [],
    //   component: 'TeamMembers.vue',
    // },
    // {
    //   id: 3130,
    //   parent_id: 3100,
    //   name: 'team_elegant',
    //   path: '/team/:team_id/team_elegant',
    //   level: 2,
    //   meta: { title: '团队风采', hidden: false, roles: null },
    //   children: [],
    //   component: 'TeamElegant.vue',
    // },
    // {
    //   id: 3140,
    //   parent_id: 3100,
    //   name: 'member_application',
    //   path: '/team/:team_id/member_application',
    //   level: 2,
    //   meta: {
    //     title: '申请加入团队',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin, Role.User],
    //   },
    //   children: [],
    //   component: 'MemberApplication.vue',
    // },
    // {
    //   id: 3200,
    //   parent_id: 3000,
    //   name: 'team_application',
    //   path: '/team/Application',
    //   level: 1,
    //   meta: {
    //     title: '创建团队申请',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin, Role.User],
    //   },
    //   children: [],
    //   component: 'TeamApplication.vue',
    // },
    // {
    //   id: 3210,
    //   parent_id: 3200,
    //   name: 'team_application_detail',
    //   path: '/team/Application/:team_application_id',
    //   level: 2,
    //   meta: {
    //     title: '创建团队申请详情页',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin, Role.User],
    //   },
    //   // props:true,
    //   children: [],
    //   component: 'TeamApplication.vue',
    // },
    // {
    //   id: 4000,
    //   parent_id: 0,
    //   name: 'team_manager_list',
    //   path: '/team_manager',
    //   level: 0,
    //   meta: {
    //     title: '团队管理列表',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin],
    //   },
    //   children: [],
    //   component: 'teamManger/TeamList.vue',
    // },
    // {
    //   id: 4100,
    //   parent_id: 4000,
    //   name: 'team_manager_detail',
    //   path: '/team_manager/:team_id',
    //   level: 1,
    //   meta: {
    //     title: '团队管理详情页',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin],
    //   },
    //   children: [],
    //   component: 'teamManger/TeamControl.vue',
    // },
    // {
    //   id: 4110,
    //   parent_id: 4100,
    //   name: 'team_information',
    //   path: '/team_manager/:team_id/team_information',
    //   level: 2,
    //   meta: {
    //     title: '团队信息',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin],
    //   },
    //   component: 'teamManger/TeamInfo.vue',
    //   children: [],
    // },
    // {
    //   id: 4120,
    //   parent_id: 4100,
    //   name: 'team_member',
    //   path: '/team_manager/:team_id/team_member',
    //   level: 2,
    //   meta: {
    //     title: '团队成员',
    //     hidden: true,
    //     roles: [Role.Admin, Role.TeamAdmin],
    //   },
    //   component: 'teamManger/TeamMember.vue',
    //   children: [],
    // },

    {
      id: 20000,
      parent_id: 0,
      level: 0,
      name: 'study',
      path: '/study',
      meta: { title: '学习', hidden: false, roles: null, menu: true },
      children: [],
      component: 'Study.vue',
    },
    {
      id: Infinity,
      parent_id: 0,
      level: 0,
      name: '404',
      path: '/404',
      component: 'Error.vue',
      meta: { title: '404', hidden: false, roles: null, menu: false },
      children: [],
    },
  ];

  // 过滤路由
  filterRouter(routes: MenuItem[], role?: Role): MenuItem[] {
    return routes.filter((route: MenuItem) => {
      if (route.meta.hidden && !role) {
        return false; // 路由需要权限并且角色为访客,拒绝访问该路由
      }
      if (route.meta.hidden && role) {
        if (route.meta.roles.includes(role)) {
          return true; // 路由需要权限并且角色不为访客，需要验证roles是否有这个角色
        } else {
          return false;
        }
      }
      if (route.children && route.children.length) {
        route.children = this.filterRouter(route.children);
      }
      return true;
    });
  }
  // 获取基本路由
  getRoutes(): MenuItem[] {
    return this.filterRouter(this.routes);
  }
  // 根据角色获取路由
  getRoleRoutes(role: Role) {
    return this.filterRouter(this.routes, role);
  }
}
