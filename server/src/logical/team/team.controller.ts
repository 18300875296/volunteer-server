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
import { TeamService } from './team.service';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { CreateTeam } from './dto/create.team.dto';
import { RequestUser } from 'src/utils/app.interface';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { TeamStatus } from './team.interface';
import { TeamMemberService } from '../team-member/team-member.service';
import { TeamApplicationService } from '../team-application/team-application.service';
import { UpdateTeam } from './dto/update.team.dto';
import { Public } from '../auth/decorator/public.decorator';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly teamMemberService: TeamMemberService,
    private readonly teamApplicationService: TeamApplicationService,
  ) {}
  // 创建一个团体(管理员)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('create/:team_application_id')
  async createTeam_auth(
    @Param('team_application_id') team_application_id: string,
  ) {
    const { user, ...teamFields } =
      await this.teamApplicationService.getTeamApplication(team_application_id);
    await this.teamApplicationService.updateByStatus(
      team_application_id,
      TeamStatus.auth,
    ); // 将报名表中的status改为已审核
    const role = await this.roleService.getRole(Role.TeamAdmin);
    await this.userService.createRole(role, user.user_id); // 将user状态改为admin
    const _user = await this.userService.getUserInfo(user.user_id);
    const team = await this.teamService.createTeam(teamFields, _user); // 将报名表中的team加入team表中
    await this.teamMemberService.createMember(_user, team, _user.role); // 加入团队成员表中
    return { message: '创建团队成功' };
  }
  // 删除一个团体
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Delete('delete/:team_id')
  async deleteTeam(@Param('team_id') team_id: string) {
    return this.teamService.deleteTeam(team_id);
  }
  // 获取热门团队
  @Public()
  @Get('/hot')
  async getHotTeams(
    @Query('pagesize') pagesize: number,
    @Query('page') page: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.teamService.getHotTeams(page, pagesize, keyword);
  }
  // 更新团体信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Patch('update/:team_id')
  async updateTeam(
    @Param('team_id') team_id: string,
    @Body() updateTeam: UpdateTeam,
  ) {
    return this.teamService.updateTeam(team_id, updateTeam);
  }

  // 获取管理员所管理的所有团队
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get('/my_teams')
  async getTeamAll(@Req() req: RequestUser) {
    const { user_id } = req.user;
    return await this.teamService.getTeams(user_id);
  }
  // 管理员查看团队信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get('my_teams/:team_id')
  async getTeamInfoAll(@Param('team_id') team_id: string) {
    return this.teamService.getTeamInfo(team_id);
  }

  // 获取全部的团队
  @Public()
  @Get('all')
  async getAllTeams() {
    return await this.teamService.getAllTeams();
  }
  // 管理员获取全部的团队
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('admin/all')
  async getTeamsByAdmin() {
    return await this.teamService.getAllTeams();
  }
  // 查看某个团体信息
  @Public()
  @Get('/:team_id')
  async getTeamInfo(@Param('team_id') team_id: string) {
    return this.teamService.getTeamInfo(team_id);
  }
}
