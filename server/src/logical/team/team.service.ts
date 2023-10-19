import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeam } from './dto/create.team.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateTeam } from './dto/update.team.dto';
import {
  paginate,
  Pagination,
  generateQuery,
} from '../../utils/pagination.util';
@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}
  async getTeams(
    page: number,
    pageSize: number,
    fields: Partial<TeamEntity>,
    orderKey: keyof TeamEntity,
  ): Promise<Pagination<TeamEntity>> {
    const query = generateQuery(fields);
    const teams = await paginate(
      this.teamRepository,
      page,
      pageSize,
      query,
      orderKey,
      'DESC',
    );
    return teams;
  }
  // 创建一个团队(已审核)
  async createTeam(team: CreateTeam, admin: UserEntity) {
    const teamEntity = new TeamEntity();
    teamEntity.admin = admin;
    Object.assign(teamEntity, { ...team });
    teamEntity.peoples = 1;
    return await this.teamRepository.save(teamEntity);
  }
  // 更新团队人数
  async updatePeoples(team_id: string) {
    let { peoples } = await this.teamRepository.findOne({
      where: { team_id },
    });
    peoples++;
    return await this.teamRepository.update(team_id, { peoples });
  }
  // 获得一个团队实体
  async getTeamEntity(team_id: string) {
    return await this.teamRepository.findOne({ where: { team_id } });
  }
  // 删除一个团队
  async deleteTeam(team_id: string) {
    const team = await this.teamRepository.findOne({ where: { team_id } });
    await this.teamRepository.remove(team);
    return { message: '删除团体成功' };
  }
  // 更新一个团体信息
  async updateTeam(team_id: string, updateTeam: UpdateTeam) {
    const team = await this.getTeamInfo(team_id);
    Object.assign(team, { ...updateTeam });
    await this.teamRepository.save(team);
    return { message: '更新团体信息成功' };
  }
  // 获得一个团队信息
  async getTeamInfo(team_id: string) {
    const team = await this.teamRepository.findOne({ where: { team_id } });
    const read_count = team.read_count++;
    await this.teamRepository.update(team_id, { read_count });
    return await this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.admin', 'user')
      .where('team.team_id=:team_id', { team_id })
      .select([
        'team.team_id',
        'team.logo',
        'team.description',
        'team.address',
        'team.name',
        'team.peoples',
        'team.create_at',
      ])
      .getOne();
  }
  // 获取管理员所有团队的信息
  // async getTeams(user_id: string) {
  //   return await this.teamRepository
  //     .createQueryBuilder('team')
  //     .leftJoinAndSelect('team.admin', 'admin')
  //     .where('admin.user_id=:user_id', { user_id })
  //     .select([
  //       'team.team_id',
  //       'team.name',
  //       'team.manager_name',
  //       'team.manager_passport',
  //       'team.manager_phone',
  //       'team.manager_email',
  //       'team.address',
  //       'team.description',
  //       'team.create_time',
  //     ])
  //     .getMany();
  // }
  // 获取所有的团队
  async getAllTeams() {
    return await this.teamRepository.find();
  }

  private getDiffList = async (
    page: number,
    pagesize: number,
    keyword: string,
  ): Promise<any> => {
    const count = await this.teamRepository.count(); // 获得文章总数
    if (!count) {
      throw new HttpException('团队列表数据为空', HttpStatus.NOT_FOUND);
    }
    try {
      const total = Math.ceil(count / pagesize); //计算总页数
      const skip = (page - 1) * pagesize; // 记录需要跳过的数据
      const teams = await this.teamRepository
        .createQueryBuilder('team')
        .orderBy(`team.${keyword}`, 'DESC')
        .skip(skip)
        .take(pagesize)
        .getMany();
      // articles.map((article) => {
      //   const images: string[] = JSON.parse(article.images);
      //   if (images.length) {
      //     article.images = images[0];
      //     return JSON.stringify(article.images);
      //   }
      // });
      return {
        total,
        pagesize,
        teams,
      };
    } catch (error) {
      throw new HttpException('获取失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
  // 分页获取团队
  async getHotTeams(page: number, pagesize: number, keyword: string) {
    return await this.getDiffList(page, pagesize, keyword);
  }
}
