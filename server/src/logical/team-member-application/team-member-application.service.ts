import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMemberApplicationEntity } from './entities/team-member-application.entity';
import { Repository } from 'typeorm';
import { TeamMemberEntity } from '../team-member/entities/team-member.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CreateTeamMember } from '../team-member/dto/create-team-member.dto';
import { TeamEntity } from '../team/entities/team.entity';
import { TeamStatus } from '../team/team.interface';

@Injectable()
export class TeamMemberApplicationService {
  constructor(
    @InjectRepository(TeamMemberApplicationEntity)
    private readonly teamMemberApplicationRepository: Repository<TeamMemberApplicationEntity>,
  ) {}
  // 创建一个申请
  async createApplication(
    teamMember: CreateTeamMember,
    user: UserEntity,
    team: TeamEntity,
  ) {
    const teamMemberApplicationEntity = new TeamMemberApplicationEntity();
    teamMemberApplicationEntity.user = user;
    teamMemberApplicationEntity.team = team;
    Object.assign(teamMemberApplicationEntity, { ...teamMember });
    await this.teamMemberApplicationRepository.save(
      teamMemberApplicationEntity,
    );
    return { message: '提交申请成功' };
  }
  // 查询一个申请信息
  async getApplicationInfo(team_member_application_id: string) {
    return await this.teamMemberApplicationRepository
      .createQueryBuilder('team_member_application')
      .leftJoinAndSelect('team_member_application.user', 'user')
      .leftJoinAndSelect('team_member_application.team', 'team')
      .where(
        'team_member_application.team_member_application_id=:team_member_application_id',
        { team_member_application_id },
      )
      .getOne();
  }
  // 修改一个申请状态
  async updateByStatus(team_member_application_id: string, status: TeamStatus) {
    await this.teamMemberApplicationRepository.update(
      team_member_application_id,
      { status },
    );
    return { message: '修改成员申请表状态成功' };
  }
  // 删除一个申请信息
  async deleteApplication(team_member_application_id: string) {
    await this.teamMemberApplicationRepository.delete(
      team_member_application_id,
    );
    return { message: '删除成员申请成功' };
  }
  // 获取当前团队所有的申请信息
  async getApplications(team_id: string) {
    return await this.teamMemberApplicationRepository
      .createQueryBuilder('team_member_application')
      .leftJoinAndSelect('team_member_application.team', 'team')
      .select([
        'team_member_application.team_member_application_id',
        'team_member_application.name',
        'team_member_application.status',
        'team_member_application.email',
        'team_member_application.phone',
        'team_member_application.passport',
        'team_member_application.age',
        'team_member_application.sex',
        'team_member_application.create_at',
      ])
      .where('team.team_id=:team_id', { team_id })
      .getMany();
  }
  // 获取当前用户的所有申请
  async getUserApplications(user_id: string) {
    return await this.teamMemberApplicationRepository
      .createQueryBuilder('team_member_application')
      .leftJoinAndSelect('team_member_application.team', 'team')
      .where('team_member_application.user.user_id=:user_id', { user_id })
      .getMany();
  }
}
