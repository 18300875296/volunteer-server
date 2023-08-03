import { Injectable } from '@nestjs/common';

import { CreateTeam } from '../team/dto/create.team.dto';
import { UserEntity } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamApplicationEntity } from './entities/team-application.entity';
import { Repository } from 'typeorm';
import { TeamStatus } from '../team/team.interface';

@Injectable()
export class TeamApplicationService {
  constructor(
    @InjectRepository(TeamApplicationEntity)
    private readonly teamApplicationRepository: Repository<TeamApplicationEntity>,
  ) {}
  // 创建志愿团体申请
  async createTeamApplication(teamApplication: CreateTeam, user: UserEntity) {
    const teamApplicationEntity = new TeamApplicationEntity();
    teamApplicationEntity.user = user;
    Object.assign(teamApplicationEntity, { ...teamApplication });
    await this.teamApplicationRepository.save(teamApplicationEntity);
    return { message: '志愿团体创建申请成功' };
  }
  // 删除一个申请
  async deleteTeamApplication(team_application_id: string) {
    await this.teamApplicationRepository.delete(team_application_id);
    return { message: '删除志愿团体申请成功' };
  }
  // 获取申请
  async getTeamApplication(team_application_id: string) {
    return await this.teamApplicationRepository
      .createQueryBuilder('team_application')
      .leftJoinAndSelect('team_application.user', 'user')
      .where('team_application.team_application_id=:team_application_id', {
        team_application_id,
      })
      .getOne();
  }
  // 更新申请状态
  async updateByStatus(team_application_id: string, status: TeamStatus) {
    await this.teamApplicationRepository.update(team_application_id, {
      status,
    });
  }
  // 获取所有的团队申请(管理员)
  async getApplications() {
    const applications = await this.teamApplicationRepository
      .createQueryBuilder('team_application')
      .leftJoinAndSelect('team_application.user', 'user')
      .getMany();
    return applications.map((item) => {
      const { user, ...fields } = item;
      const { username } = user;
      return Object.assign(fields, { username });
    });
  }
  // 获取当前用户的所有申请
  async getUserApplications(user_id: string) {
    return this.teamApplicationRepository
      .createQueryBuilder('team_application')
      .leftJoinAndSelect('team_application.user', 'user')
      .where('user.user_id=:user_id', { user_id })
      .select([
        'team_application.team_application_id',
        'team_application.name',
        'team_application.status',
        'team_application.manager_name',
        'team_application.manager_phone',
        'team_application.manager_email',
        'team_application.address',
        'team_application.manager_passport',
        'team_application.description',
        'team_application.create_at',
        'team_application.logo',
      ])
      .getMany();
  }
  // 获取一个申请
  async getUserApplication(team_application_id: string, user_id: string) {
    return await this.teamApplicationRepository
      .createQueryBuilder('team_application')
      .leftJoinAndSelect('team_application.user', 'user')
      .where('team_application.team_application_id=:team_application_id', {
        team_application_id,
      })
      .andWhere('team_application.user.user_id=:user_id', { user_id })
      .select([
        'team_application.team_application_id',
        'team_application.name',
        'team_application.manager_name',
        'team_application.manager_phone',
        'team_application.manager_email',
        'team_application.address',
        'team_application.manager_passport',
        'team_application.description',
        'team_application.logo',
      ])
      .getOne();
  }
  // 更新一个申请信息
  async updateApplication(
    team_application_id: string,
    updateTeamApplication: CreateTeam,
  ) {
    await this.teamApplicationRepository.update(team_application_id, {
      ...updateTeamApplication,
    });
    return { message: '更新申请成功' };
  }
}
