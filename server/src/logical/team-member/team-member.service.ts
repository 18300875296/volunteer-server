import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TeamMemberEntity } from './entities/team-member.entity';
import { Repository } from 'typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TeamEntity } from '../team/entities/team.entity';
import { CreateTeamMember } from './dto/create-team-member.dto';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMemberEntity)
    private readonly teamMemberRepository: Repository<TeamMemberEntity>,
  ) {}
  // 判断用户是否加入
  async isExist(team_id: string, user_id: string) {
    const member = await this.teamMemberRepository
      .createQueryBuilder('team_member')
      .leftJoinAndSelect('team_member.user', 'user')
      .leftJoinAndSelect('team_member.team', 'team')
      .where('team_member.team.team_id=:team_id', { team_id })
      .andWhere('team_member.user.user_id=:user_id', { user_id })
      .getOne();
    return member ? { current_user_join: true } : { current_user_join: false };
  }
  // 增加一个团队成员(普通成员和管理员)
  async createMember(
    user: UserEntity,
    team: TeamEntity,
    role: RoleEntity,
    teamMember?: CreateTeamMember,
  ) {
    const memberEntity = new TeamMemberEntity();
    memberEntity.role = role;
    memberEntity.user = user;
    memberEntity.team = team;
    if (!teamMember) {
      // 对于管理员
      (memberEntity.email = team.manager_email),
        (memberEntity.name = team.manager_name),
        (memberEntity.phone = team.manager_phone),
        (memberEntity.passport = team.manager_passport);
    } else {
      // 普通用户将传来的信息存入
      Object.assign(memberEntity, { ...teamMember });
    }
    await this.teamMemberRepository.save(memberEntity);
    return { message: '加入团体成功' };
  }
  // 删除一个团队成员
  async deleteMember(member_id: string) {
    await this.teamMemberRepository.delete(member_id);
    return { message: '删除团队成员成功' };
  }
  // 获取团队所有成员信息
  async getMembers(team_id: string) {
    const members = await this.teamMemberRepository
      .createQueryBuilder('team_member')
      .leftJoinAndSelect('team_member.role', 'role')
      .where('team_member.team.team_id=:team_id', { team_id })
      .getMany();

    return members.map((member) => {
      const { passport, role, ...fields } = member;
      return Object.assign(fields, { role: role.name });
    });
  }
}
