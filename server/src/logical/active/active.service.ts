import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActiveDto } from './dto/active.create.dto';
import { UpdateActiveDto } from './dto/active.update.dto';
import { UserEntity } from '../user/entities/user.entity';
import { ActiveEntity } from './entities/active.entity';
import { ActiveWithStatus } from './active.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getCurrentTimestamp } from '../../utils/dayjs';
import { TeamEntity } from '../team/entities/team.entity';
import { diffTime } from '../../utils/dayjs';

@Injectable()
export class ActiveService {
  constructor(
    @InjectRepository(ActiveEntity)
    private readonly activeRepository: Repository<ActiveEntity>,
  ) {}
  /*******************************活动CURD*************************************/
  // 判断活动状态
  validateActiveStatus(register_start, register_end, active_start, active_end) {
    const now = new Date();
    const timestamp = diffTime(register_start, now);
    if (timestamp <= 0) {
      return '未开始';
    }
    const timestamp2 = diffTime(register_end, now);
    if (timestamp > 0 && timestamp2 <= 0) {
      return '报名中';
    }
    const timestamp3 = diffTime(active_start, now);
    if (timestamp2 > 0 && timestamp3 <= 0) {
      return '活动前';
    }
    const timestamp4 = diffTime(active_end, now);
    if (timestamp3 > 0 && timestamp4 <= 0) {
      return '进行中';
    }
    if (timestamp4 > 0) {
      return '已结束';
    }
  }
  // 管理员获取所有的活动
  async getActivesList() {
    return await this.activeRepository
      .createQueryBuilder('active')
      .leftJoinAndSelect('active.team', 'team')
      .getMany();
  }
  // 更新活动状态
  // 创建一个活动
  async createActive(
    active: CreateActiveDto,
    user: UserEntity,
    team: TeamEntity,
  ): Promise<any> {
    const activeEntity = new ActiveEntity();
    activeEntity.user = user;
    activeEntity.team = team;
    activeEntity.status = this.validateActiveStatus(
      active.register_start_at,
      active.register_end_at,
      active.active_start_at,
      active.active_end_at,
    );
    Object.assign(activeEntity, { ...active });
    const { active_id } = await this.activeRepository.save(activeEntity);
    return { active_id, message: '创建活动成功' };
  }
  // 获取一个活动信息
  async getActiveInfo(active_id: string) {
    return await this.activeRepository.findOne({ where: { active_id } });
  }
  // 更新某一个活动
  async updateById(active_id: string, updateActive: UpdateActiveDto) {
    const active = await this.activeRepository.findOne({
      where: { active_id },
    });
    if (!active) {
      throw new HttpException('更新活动出错,活动不存在', HttpStatus.NOT_FOUND);
    } // 判断活动是否存在
    Object.assign(active, { ...updateActive });
    await this.activeRepository.save(active);
    return { message: '更新活动成功', active_id: active_id };
  }
  // 删除某一个活动
  async delateById(active_id: string): Promise<any> {
    const activeEntity = await this.activeRepository.findOne({
      where: { active_id },
    }); // 判断活动是否存在
    if (!activeEntity) {
      throw new HttpException('删除活动出错,活动不存在', HttpStatus.NOT_FOUND);
    }
    await this.activeRepository.delete(active_id);
    return { message: '删除活动成功' };
  }

  // 获取某一个活动
  async getActive(
    active_id: string,
    user?: string,
  ): Promise<ActiveEntity | ActiveWithStatus> {
    const valid = await this.activeRepository.findOne({ where: { active_id } }); // 判断活动是否存在
    if (!valid) {
      throw new HttpException(
        '获取活动信息出错,活动不存在',
        HttpStatus.NOT_FOUND,
      );
    }
    const activeEntity = await this.activeRepository.findOne({
      where: { active_id },
    }); // 获取活动信息包括收藏点赞报名人数等等
    // 如果为游客
    if (!user) {
      return activeEntity;
    }
    // 登录用户
    const activeWithStatus: ActiveWithStatus = {
      ...activeEntity,
      like_by_current_user: true,
      collect_by_current_user: false,
    };
    return activeWithStatus;
  }
  // 获取当前报名人数
  // async getCurrentPeoples(active_id: string) {
  //   return await this.activeRepository
  //     .createQueryBuilder('active')
  //     .select(['active.application_count'])
  //     .where('active.active_id=:active_id', { active_id })
  //     .getOne();
  // }
  // 获取服务器当前的时间戳
  async timeStamp(): Promise<any> {
    return getCurrentTimestamp();
  }
  // 获取志愿活动人数
  async getNumber(active_id: number) {
    return await this.activeRepository
      .createQueryBuilder('active')
      .where('active_id:=active_id', { active_id })
      .select('peoples')
      .getOne();
  }

  // 更新报名人数
  async updateByCount(active_id: string, count: number): Promise<any> {
    await this.activeRepository.update(active_id, { application_count: count });
    return { message: '更新当前人数成功' };
  }
  /*******************************获取志愿活动列表*************************************/
  async getActives(page: number, pagesize: number) {
    const total = await this.activeRepository.count();
    const skip = (page - 1) * pagesize;
    const actives = await this.activeRepository
      .createQueryBuilder('active')
      .skip(skip)
      .take(pagesize)
      .getMany();
    const data = actives.map((active) => {
      active.status = this.validateActiveStatus(
        active.register_start_at,
        active.register_end_at,
        active.active_start_at,
        active.active_end_at,
      );
      return active;
    });
    return { total, actives: data };
  }
  getListByTime(a, b) {}
  getByLikes(a, b) {}
  getListByCollects(a, b) {}
  getListByKeywords(a, b, c) {}
  getListByTags(a, b, c) {}
  getListByProvince(a, b, c) {}
  getListByCity(a, b, c) {}
  getListByType(a, b, c) {}

  async getTeamActives(team_id: string) {
    return await this.activeRepository
      .createQueryBuilder('active')
      .where('active.team.team_id', { team_id })
      .getMany();
  }
}
