import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { RequestUser, UserStatus } from 'src/types/app.interface';
import { EmailService } from '../email/email.service';
import { RoleService } from '../role/role.service';
// import { LoggerInterceptor } from 'src/core/interceptor/logger.interceptor';
// import { Logger } from '../logs/logs.decorator';
interface body {
  avatar?: string;
  nickname?: string;
  user_id: string;
  name?: string;
  email?: string;
  status?: UserStatus;
}
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly roleService: RoleService,
  ) {}
  // 注册账号
  // @UseInterceptors(LoggerInterceptor)
  @Public()
  // @Logger('注册账号')
  @Post('register') //注册路由
  async register(@Body() createUser: CreateUserDto): Promise<any | undefined> {
    const { email, code, password, ...rest } = createUser;
    const validCode = await this.emailService.validateCode(email, code);
    if (!validCode) {
      throw new HttpException('验证码错误!!', HttpStatus.NOT_FOUND);
    }
    const role = await this.roleService.getRole(Role.User);
    const user = await this.userService.register(createUser, role);
    return this.authService.createToken(user);
  }
  // 注销账号(个人)
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  // @Logger('注销账号')
  @Delete('delete')
  async deleteByUser(@Req() req: RequestUser) {
    const { user_id } = req.user;
    return this.userService.delete(user_id);
  }
  // 注销账号通过管理员
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('注销账号')
  @Patch('update/:user_id')
  async updateByStatus(@Param('user_id') user_id: string) {
    // 将状态改变为注销
    return this.userService.updateByStatus(user_id, UserStatus.deleted);
    //  return this.userService.delete(user_id);
  }
  // 删除账号通过管理员
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('删除账号')
  @Delete('delete/:user_id')
  async deleteByAdmin(@Param('user_id') user_id: string) {
    // 将状态改变为注销
    //await this.userService.updateByStatus(user_id, UserStatus.deleted);
    return this.userService.delete(user_id);
  }
  // 获取所有用户信息
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('all')
  async getUsersInfo() {
    return this.userService.getUsers();
  }

  // 更新用户头像(管理员)
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('更新头像')
  @Patch('admin/avatar')
  async updateUserAvatar(@Body() body: body) {
    const { avatar, user_id } = body;
    return this.userService.updateAvatar(user_id, avatar);
  }
  // 更新用户的昵称
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('更新昵称')
  @Patch('admin/nickname')
  async updateUserNickname(@Body() body: body) {
    const { nickname, user_id } = body;
    return this.userService.updateNickname(user_id, nickname);
  }
  // 更新用户的姓名
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('更新姓名')
  @Patch('admin/name')
  async updateUserName(@Body() body: body) {
    const { name, user_id } = body;
    return this.userService.updateName(user_id, name);
  }
  // 更新用户的邮箱
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('更新邮箱')
  @Patch('admin/email')
  async updateUserEmail(@Body() body: body) {
    const { email, user_id } = body;
    return this.userService.updateEmail(user_id, email);
  }
  // 更新用户的状态
  // @UseInterceptors(LoggerInterceptor)
  @Roles(Role.Admin, Role.SuperAdmin)
  // @Logger('更新用户状态')
  @Patch('admin/status')
  async updateUserStatus(@Body() body: body) {
    const { status, user_id } = body;
    return this.userService.updateByStatus(user_id, status);
  }
}
