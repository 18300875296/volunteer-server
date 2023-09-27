import { Injectable } from '@nestjs/common';
import { MenuItem, RouteItem } from './menu.interface';
import { Role } from '../role/role.enum';
import { MenuEntity } from './entity/menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuCreateDTO } from './dto/menu.create.dto';
import { RoleService } from '../role/role.service';
import { MenuTagService } from '../menu_tag/menu_tag.service';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    private readonly roleService: RoleService,
    private readonly menuTagService: MenuTagService,
  ) {}

  //     id: 5000,
  //     parent_id: 0,
  //     name: 'active_detail',
  //     path: '/active/:active_id',
  //     level: 0,
  //     meta: { title: '志愿活动详情', hidden: false, roles: null, menu: false },
  //     children: [],
  //     component: 'ActiveDetail.vue',
  //   },
  //   {
  //     id: 6000,
  //     parent_id: 0,
  //     level: 0,
  //     name: 'article_detail',
  //     path: '/article/:article_id',
  //     meta: { title: '志愿动态详情', hidden: false, roles: null, menu: false },
  //     children: [],
  //     props: true,
  //     component: 'article/ArticleDetail.vue',
  //   },
  //   {
  //     id: 7000,
  //     parent_id: 0,
  //     name: 'team_detail',
  //     path: '/team/:team_id',
  //     level: 0,
  //     meta: { title: '志愿团队详情', hidden: false, roles: null, menu: false },
  //     children: [],
  //     component: 'TeamDetail.vue',
  //   },
  //   {
  //     id: 8000,
  //     parent_id: 0,
  //     level: 0,
  //     name: 'admin',
  //     path: '/admin',
  //     meta: {
  //       title: '系统管理',
  //       hidden: true,
  //       roles: [Role.Admin, Role.SuperAdmin],
  //       menu: true,
  //     },
  //     redirect: '/admin/system_control',
  //     children: [
  //       {
  //         id: 8100,
  //         parent_id: 8000,
  //         level: 1,
  //         name: 'permission_control',
  //         path: 'permission_control',
  //         component: 'admin/PermissionControl.vue',
  //         meta: {
  //           title: '权限管理',
  //           hidden: true,
  //           roles: [Role.Admin, Role.SuperAdmin],
  //           menu: false,
  //         },
  //         children: [],
  //       },
  //       {
  //         id: 8200,
  //         parent_id: 8000,
  //         level: 1,
  //         name: 'system_log',
  //         path: 'system_log',
  //         component: 'admin/SystemLog.vue',
  //         meta: {
  //           title: '系统日志',
  //           hidden: true,
  //           roles: [Role.Admin, Role.SuperAdmin],
  //           menu: false,
  //         },
  //         children: [],
  //       },
  //       {
  //         id: 8300,
  //         parent_id: 8000,
  //         level: 1,
  //         name: 'actives_control',
  //         path: 'actives_control',
  //         component: 'admin/ActivesControl.vue',
  //         meta: {
  //           title: '活动管理',
  //           hidden: true,
  //           roles: [Role.Admin, Role.SuperAdmin],
  //           menu: false,
  //         },
  //         children: [],
  //       },
  //       {
  //         id: 8400,
  //         parent_id: 8000,
  //         level: 1,
  //         name: 'system_control',
  //         path: 'system_control',
  //         component: 'admin/SystemControl.vue',
  //         meta: {
  //           title: '系统管理',
  //           hidden: true,
  //           roles: [Role.Admin, Role.SuperAdmin],
  //           menu: false,
  //         },
  //         children: [],
  //       },
  //     ],
  //     component: 'admin/AdminControl.vue',

  //     //
  //     //       { path: 'system_control', component: () => import('../views/admin/SystemControl.vue') },
  //     //       { path: 'user_control', component: () => import('../views/admin/UserControl.vue') },
  //     //       { path: 'team_control', component: () => import('../views/admin/TeamControl.vue') },
  //     //       { path: 'views_control', component: () => import('../views/admin/ViewsControl.vue') },
  //     //       { path: 'articles_control', component: () => import('../views/admin/ArticleControl.vue') },
  //     //     ],
  //     //   },
  //     // ];
  //   },
  //   {
  //     id: 9000,
  //     parent_id: 0,
  //     name: 'active_resume',
  //     path: '/active/:active_id/resume',
  //     level: 0,
  //     meta: {
  //       title: '志愿活动报名',
  //       hidden: true,
  //       roles: [Role.Admin, Role.TeamAdmin, Role.User, Role.SuperAdmin],
  //       menu: false,
  //     },
  //     children: [],
  //     component: 'resume.vue',
  //   },

  //   {
  //     id: 10000,
  //     parent_id: 0,
  //     name: 'active_edit',
  //     path: '/active/:active_id/edit',
  //     level: 0,
  //     meta: {
  //       title: '志愿活动修改',
  //       hidden: true,
  //       roles: [Role.Admin, Role.TeamAdmin, Role.SuperAdmin],
  //       menu: false,
  //     },
  //     children: [],
  //     component: 'teamManger/ActivePublish.vue',
  //   },
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

  //   {
  //     id: 20000,
  //     parent_id: 0,
  //     level: 0,
  //     name: 'study',
  //     path: '/study',
  //     meta: { title: '学习', hidden: false, roles: null, menu: true },
  //     children: [],
  //     component: 'Study.vue',
  //   },
  //   {
  //     id: Infinity,
  //     parent_id: 0,
  //     level: 0,
  //     name: '404',
  //     path: '/404',
  //     component: 'Error.vue',
  //     meta: { title: '404', hidden: false, roles: null, menu: false },
  //     children: [],
  //   },
  // ];
  // 增加菜单栏
  async createMenu(menu: MenuCreateDTO): Promise<void> {
    const { roles, alias, ...rest } = menu;
    try {
      const menuEntity = new MenuEntity();
      Object.assign(menuEntity, { ...rest });
      menuEntity.roles = JSON.stringify(roles);
      menuEntity.alias = JSON.stringify(alias);
      this.menuRepository.save(menuEntity);
    } catch (error) {
      return error;
    }
  }

  // 生成vueRouter中的路由表,需要排除所有的非实例化数据
  async generateVueRouterRecord(): Promise<RouteItem[]> {
    const routes = await this.menuRepository.find({
      where: { is_instance: true },
    });
    return this.generateRouteTree(routes, 0);
  }
  // 将数据库的实体转化为RouteItem
  private transformToRouteItem(entity: MenuEntity): RouteItem {
    const {
      name,
      component,
      path,
      redirect,
      alias,
      displayName,
      hidden,
      roles,
      menu_id,
    } = entity;
    const parsedRoles = JSON.parse(roles);
    const parsedAlias = alias ? JSON.parse(alias) : undefined;
    return {
      route_id: menu_id,
      props: true,
      name,
      component,
      path,
      redirect,
      alias: parsedAlias,
      children: [],
      meta: {
        displayName,
        hidden,
        roles: parsedRoles,
      },
    };
  }
  // 递归生成路由树
  private generateRouteTree(
    entities: MenuEntity[],
    _parent_id?: number,
  ): RouteItem[] {
    const routeTree: RouteItem[] = [];
    for (const entity of entities) {
      const { parent_id } = entity;
      if (parent_id === _parent_id) {
        const routeItem = this.transformToRouteItem(entity);
        const children = this.generateRouteTree(entities, entity.menu_id);
        if (children.length > 0) {
          routeItem.children = children;
        }
        routeTree.push(routeItem);
      }
    }
    return routeTree;
  }
  // 生成Router非实例化数据用于渲染页面路径
  async generateRouterRecord(): Promise<MenuItem[]> {
    const routes = await this.menuRepository.find({
      where: { readonly: true },
    });
    return this.generateMenuTree(routes, 0);
  }
  // 递归生成菜单树
  private generateMenuTree(
    entities: MenuEntity[],
    _parent_id?: number,
    parent_path = '',
  ): MenuItem[] {
    const routeTree: MenuItem[] = [];
    for (const entity of entities) {
      const { parent_id } = entity;
      if (parent_id === _parent_id) {
        const routeItem = this.transformToMenuItem(entity);
        if (routeItem.path[0] === '/') {
          routeItem.path = routeItem.path.substring(1);
        }
        const children = this.generateMenuTree(
          entities,
          entity.menu_id,
          `${parent_path}/${routeItem.path}`,
        );
        if (children.length > 0) {
          routeItem.children = children;
        }
        routeItem.path = `${parent_path}/${routeItem.path}`;
        routeTree.push(routeItem);
      }
    }
    return routeTree;
  }
  // 将数据库的实体转化为MenuItem
  private transformToMenuItem(entity: MenuEntity): MenuItem {
    const { name, path, displayName, hidden, roles, nav, menu_id } = entity;
    const parsedRoles = JSON.parse(roles);
    return {
      menu_id,
      name,
      children: [],
      path,
      meta: {
        displayName,
        hidden,
        roles: parsedRoles,
        menu: nav,
      },
    };
  }
  // 过滤路由
  // filterRouter(routes: Partial<MenuItem>[], role?: Role): Partial<MenuItem>[] {
  //   return routes.filter((route: Partial<MenuItem>) => {
  //     if (route.meta.hidden && !role) {
  //       return false; // 路由需要权限并且角色为访客,拒绝访问该路由
  //     }
  //     if (route.meta.hidden && role) {
  //       if (route.meta.roles.includes(role)) {
  //         return true; // 路由需要权限并且角色不为访客，需要验证roles是否有这个角色
  //       } else {
  //         return false;
  //       }
  //     }
  //     if (route.children && route.children.length) {
  //       route.children = this.filterRouter(route.children);
  //     }
  //     return true;
  //   });
  // }
}
