import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
// import { UpdateApplicationDto } from './dto/update-application.dto';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { ActiveApplicationStatus, RequestUser } from 'src/utils/app.interface';
import { UserService } from '../user/user.service';
import { ActiveService } from '../active/active.service';
import { Public } from '../auth/decorator/public.decorator';

@Controller('application')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly userService: UserService,
    private readonly activeService: ActiveService,
  ) {}

  // 报名申请(用户)
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Post('create/:active_id')
  async create(
    @Param('active_id') active_id: string,
    @Body() createApplication: CreateApplicationDto,
    @Req() req: RequestUser,
  ) {
    const { user_id } = req.user;
    const { phone, passport } = createApplication;
    const active = await this.activeService.getActiveInfo(active_id); // 获取活动信息
    if (active.peoples <= active.application_count) {
      throw new HttpException('当前活动名额已满', HttpStatus.FORBIDDEN);
    }
    await this.applicationService.isExistsUser({ active_id, user_id }); // 判断用户是否在这个活动上报名
    await this.applicationService.isExistsInfo({
      active_id,
      phone,
      passport,
    }); // 查询信息是否已经使用
    const user = await this.userService.getUserInfo(user_id); // 获取用户信息
    return await this.applicationService.createApplication(
      createApplication,
      user,
      active,
    );
  }
  // 报名申请(管理员审核)
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Patch('update/:application_id')
  async updateByStatus(@Param('application_id') application_id: string) {
    const { active } = await this.applicationService.getInfoById(
      application_id,
    );
    if (active.peoples <= active.application_count) {
      throw new HttpException('当前活动名额已满', HttpStatus.FORBIDDEN);
    }
    await this.activeService.updateByCount(
      active.active_id,
      active.application_count + 1,
    ); // 将人数当前活动人数加一
    return await this.applicationService.updateByStatus(
      application_id,
      ActiveApplicationStatus.checked,
    );
  }

  // 删除报名信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Delete('delete/:application_id')
  async delete(@Param('application_id') application_id: string) {
    // 让active中的count字段减1
    return this.applicationService.deleteById(application_id);
  }

  // 获取报名信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Get(':application_id')
  async getInfo(@Param('application_id') application_id: string) {
    return this.applicationService.getInfoById(application_id);
  }
  //获取全部的报名信息
  @Public()
  @Get(':active_id/all')
  async getInfoAll(@Param('active_id') active_id: number) {
    return this.applicationService.getAll(active_id);
  }
  // 获取当前团队的所有报名信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get('/admin/:active_id/all')
  async getTeamActiveApplication(@Param('active_id') active_id: string) {
    return this.applicationService.getTeamActiveApplications(active_id);
  }
  // 获取某一个活动的所有申请信息(已审核的)
  @Public()
  @Get(':active_id/all/check')
  async getInfoAllChecked(@Param('active_id') active_id: string) {
    return this.applicationService.getAllChecked(active_id);
  }
  // 获取当前用户是否在某一个活动报名
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Get('/current_user/:active_id')
  async getCurrentUserApplication(
    @Param('active_id') active_id: string,
    @Req() req: RequestUser,
  ) {
    const { user_id } = req.user;
    return this.applicationService.getUserApplication(active_id, user_id);
  }
}
