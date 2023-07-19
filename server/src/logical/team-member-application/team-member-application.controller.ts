import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TeamMemberApplicationService } from './team-member-application.service';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { CreateTeamMember } from '../team-member/dto/create-team-member.dto';
import { CustomParam, RequestUser } from 'src/utils/app.interface';
import { UserService } from '../user/user.service';
import { TeamService } from '../team/team.service';

@Controller('team_member_application')
export class TeamMemberApplicationController {
  constructor(
    private readonly teamMemberApplicationService: TeamMemberApplicationService,
    private readonly userService: UserService,
    private readonly teamService: TeamService,
  ) {}
  // 获取当前用户的团员申请
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Get('/user/all')
  async getAllApplications(@Req() req: RequestUser) {
    const { user_id } = req.user;
    return await this.teamMemberApplicationService.getUserApplications(user_id);
  }

  // 用户提交申请信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Post('create/:team_id')
  async createApplication(
    @Param() param: CustomParam,
    @Body() createTeamMember: CreateTeamMember,
    @Req() req: RequestUser,
  ) {
    const { user_id } = req.user;
    const { team_id } = param;
    const user = await this.userService.getUserInfo(user_id);
    const team = await this.teamService.getTeamInfo(team_id);
    return await this.teamMemberApplicationService.createApplication(
      createTeamMember,
      user,
      team,
    );
  }
  // 用户删除申请信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Delete('delete/:team_member_application_id')
  async deleteApplication(
    @Param('team_member_application_id') team_member_application_id: string,
  ) {
    return await this.teamMemberApplicationService.deleteApplication(
      team_member_application_id,
    );
  }
  // 获取团队的所有申请信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get('/:team_id/application/all')
  async getApplications(@Param('team_id') team_id: string) {
    return await this.teamMemberApplicationService.getApplications(team_id);
  }
}
