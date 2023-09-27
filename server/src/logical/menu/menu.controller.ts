import { Controller, Get, Req, Body, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem, RouteItem } from './menu.interface';
import { Public } from '../auth/decorator/public.decorator';
import { Role } from '../role/role.enum';
import { Roles } from '../role/decorator/role.decorator';
import { RequestUser, ResponseData } from 'src/types/app.interface';
import { MenuCreateDTO } from './dto/menu.create.dto';
@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('create')
  async createMenu(@Body() menuCreateDTO: MenuCreateDTO): Promise<void> {
    await this.menuService.createMenu(menuCreateDTO);
  }
  @Public()
  @Get('menu')
  // @Header('Cache-Control', 'max-age=3600')
  // @Header('Cache-Control', 'private')
  // @Roles(Role.Visitor, Role.User)
  async getMenus(@Req() req: RequestUser): Promise<ResponseData<MenuItem[]>> {
    if (req.user && req.user.role) {
      // return { data: await this.menuService.getRoleRoutes(req.user.role) };
    } else {
      return { data: await this.menuService.generateRouterRecord() }; // 游客可以查看的路由
    }
  }
  @Public()
  @Get('route')
  // @Header('Cache-Control', 'max-age=3600')
  // @Header('Cache-Control', 'private')
  // @Roles(Role.Visitor, Role.User)
  async getRoutes(@Req() req: RequestUser): Promise<ResponseData<RouteItem[]>> {
    if (req.user && req.user.role) {
      // return { data: await this.menuService.getRoleRoutes(req.user.role) };
    } else {
      return { data: await this.menuService.generateVueRouterRecord() }; // 游客可以查看的路由
    }
  }

  // @Roles(Role.TeamAdmin, Role.Admin, Role.SuperAdmin, Role.User)
  // @Get('/role')
  // async getRoleMenu(@Req() req: RequestUser) {
  //   return this.menuService.getRoleRoutes(req.user.role);
  // }
}
