import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { TeamApplicationService } from './team-application.service';

import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { CreateTeam } from '../team/dto/create.team.dto';
import { CustomParam, RequestUser } from 'src/types/app.interface';
import { UserService } from '../user/user.service';
import { TeamStatus } from '../team/team.interface';

@Controller('team_application')
export class TeamApplicationController {
  constructor(
    private readonly teamApplicationService: TeamApplicationService,
    private readonly userService: UserService,
  ) {}
  // 创建一个团体(用户)需要管理员审核
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Post('create')
  async createTeamApplication(
    @Body() team: CreateTeam,
    @Req() req: RequestUser,
  ) {
    const { user_id } = req.user;
    const user = await this.userService.getUserInfo(user_id);
    return this.teamApplicationService.createTeamApplication(team, user);
  }
  // 管理审核驳回
  @Roles(Role.Admin, Role.SuperAdmin)
  @Patch('reject/:team_application_id')
  async rejectTeamApplication(
    @Param('team_application_id') team_application_id: string,
  ) {
    await this.teamApplicationService.updateByStatus(
      team_application_id,
      TeamStatus.reject,
    );
    return { message: '团队申请表已经驳回' };
  }
  // 用户删除一个团体申请
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Delete('delete/:team_application_id')
  async deleteTeamApplication(
    @Param('team_application_id') team_application_id: string,
  ) {
    // 改变申请的状态
    await this.teamApplicationService.updateByStatus(
      team_application_id,
      TeamStatus.deleted,
    );
    // 还需要考虑用户是否发过申请 申请是否还处于未审核状态
    return this.teamApplicationService.deleteTeamApplication(
      team_application_id,
    );
  }
  // 管理员获取所有的申请
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('admin/all')
  async getApplications() {
    return this.teamApplicationService.getApplications();
  }
  // 用户查看自己的申请
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Get('private/all')
  async getUserApplications(@Req() req: RequestUser) {
    const { user_id } = req.user;
    return this.teamApplicationService.getUserApplications(user_id);
  }
  // 用户获取一个申请
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Get('private/:team_application_id')
  async getUserApplication(
    @Param() param: CustomParam,
    @Req() req: RequestUser,
  ) {
    const { team_application_id } = param;
    const { user_id } = req.user;
    return this.teamApplicationService.getUserApplication(
      team_application_id,
      user_id,
    );
  }
  // 用户更新一个申请
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Put('update/:team_application_id')
  async updateApplication(
    @Body() updateTeamApplication: CreateTeam,
    @Param('team_application_id') team_application_id: string,
  ) {
    return this.teamApplicationService.updateApplication(
      team_application_id,
      updateTeamApplication,
    );
  }
}
