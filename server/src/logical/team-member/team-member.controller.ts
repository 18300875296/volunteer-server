import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';

import { Role } from '../role/role.enum';
import { Roles } from '../role/decorator/role.decorator';
import { CustomParam, RequestUser } from 'src/utils/app.interface';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { TeamEntity } from '../team/entities/team.entity';
import { CreateTeamMember } from './dto/create-team-member.dto';
import { TeamMemberApplicationService } from '../team-member-application/team-member-application.service';
import { TeamStatus } from '../team/team.interface';
import { TeamService } from '../team/team.service';

@Controller('team_member')
export class TeamMemberController {
  constructor(
    private readonly teamMemberService: TeamMemberService,
    private readonly teamMemberApplicationService: TeamMemberApplicationService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly teamService: TeamService,
  ) {}

  // 创建一个成员(将用户提交的申请信息保存到成员表中)
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get('create/:team_member_application_id')
  async create(
    @Param('team_member_application_id')
    team_member_application_id: string,
  ) {
    await this.teamMemberApplicationService.updateByStatus(
      team_member_application_id,
      TeamStatus.auth,
    ); // 修改申请表中的状态
    const { team, user, ...teamMember } =
      await this.teamMemberApplicationService.getApplicationInfo(
        team_member_application_id,
      );
    await this.teamService.updatePeoples(team.team_id);
    const role = await this.roleService.getRole(Role.User);
    await this.userService.createRole(role, user.user_id); // 将user状态改为user
    const _user = await this.userService.getUserInfo(user.user_id); // 获取最新的用户信息
    return await this.teamMemberService.createMember(
      _user,
      team,
      _user.role,
      teamMember,
    ); // 加入团队成员表中
  }
  // 删除一个成员
  // 查看团队所有人员
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get('/:team_id')
  async getTeamMembers(@Param('team_id') team_id: string) {
    return await this.teamMemberService.getMembers(team_id);
  }
  // 查询用户是否加入当前团队
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Get('/:team_id/is_exist')
  async isExist(@Param('team_id') team_id: string, @Req() req: RequestUser) {
    const { user_id } = req.user;
    return await this.teamMemberService.isExist(team_id, user_id);
  }
}
