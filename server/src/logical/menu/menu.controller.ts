import { Controller, Get, Header, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItem } from './menu.interface';
import { Public } from '../auth/decorator/public.decorator';

import { Role } from '../role/role.enum';
import { Roles } from '../role/decorator/role.decorator';
import { RequestUser } from 'src/utils/app.interface';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Public()
  @Get()
  // @Header('Cache-Control', 'max-age=3600')
  // @Header('Cache-Control', 'private')
  // @Roles(Role.Visitor, Role.User)
  async getMenu(@Req() req: RequestUser): Promise<MenuItem[]> {
    if (req.user && req.user.role) {
      return this.menuService.getRoleRoutes(req.user.role);
    } else {
      return this.menuService.getRoutes(); // 游客可以查看的路由
    }
  }

  @Roles(Role.TeamAdmin, Role.Admin, Role.SuperAdmin, Role.User)
  @Get('/role')
  async getRoleMenu(@Req() req: RequestUser) {
    return this.menuService.getRoleRoutes(req.user.role);
  }
}
