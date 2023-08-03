import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { localAuthGuard } from './guard/auth.local.guard';
import { Public } from './decorator/public.decorator';
import { RequestUser } from '../../utils/app.interface';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { UserService } from '../user/user.service';
import { Logger } from '../logs/logs.decorator';
import { LoggerInterceptor } from 'src/core/interceptor/logger.interceptor';

@Controller('auth')
@UseInterceptors(LoggerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(localAuthGuard) //守卫验证用户密码是否正确
  @Logger('用户登录')
  @Post('login') //登录路由
  async login(@Body() user: Partial<UserEntity>): Promise<any> {
    const userEntity = await this.userService.validateUser(user.username);
    return await this.authService.createToken(userEntity);
  }

  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Logger('获取用户信息')
  @Get('getUserinfo') //获取用户信息
  async getUserinfo(@Req() req: RequestUser) {
    const { username } = req.user;
    const userEntity = await this.userService.getUser(username);
    if (!userEntity) {
      throw new HttpException(
        '获取当前登录用户信息出错，用户不存在',
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: 'success', ...userEntity };
  }
}
