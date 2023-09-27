import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UserEntity } from '../user/entities/user.entity';
import { ActiveEntity } from '../active/entities/active.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { Repository } from 'typeorm';
import { ApplicationQuery } from './application.interface';
import { ActiveApplicationStatus } from 'src/types/app.interface';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}
  // 创造报名信息
  async createApplication(
    createApplication: CreateApplicationDto,
    user: UserEntity,
    active: ActiveEntity,
  ) {
    const application = new ApplicationEntity();
    application.user = user;
    application.active = active;
    Object.assign(application, { ...createApplication });
    const { name, phone, status, update_at } =
      await this.applicationRepository.save(application); // 存入数据库
    return { name, phone, status, update_at };
  }
  // 删除报名信息
  async deleteById(application_id: string) {
    await this.applicationRepository.delete(application_id);
    return { message: '删除报名信息成功' };
  }

  // 获取报名信息
  async getInfoById(application_id: string) {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.active', 'active')
      .where('application.application_id=:application_id', { application_id })
      .getOne();
  }
  // 查询这个用户是否报名
  async isExistsUser(fields: ApplicationQuery): Promise<boolean> {
    const { active_id, user_id } = fields;
    const application = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('application.active', 'active')
      .where('user.user_id=:user_id', { user_id })
      .andWhere('active.active_id=:active_id', { active_id })
      .getOne();
    if (application) {
      throw new HttpException('当前账号已经在这个活动登记了', HttpStatus.FOUND);
    }
    return true;
  }
  // 查询用户填写的信息是否注册过
  async isExistsInfo(fields: ApplicationQuery): Promise<boolean> {
    const { phone, passport, active_id } = fields;
    const people = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.active', 'active')
      .where('active.active_id=:active_id', { active_id })
      .andWhere('application.phone=:phone', { phone })
      .getOne();
    if (people) {
      throw new HttpException('手机号已经在这个活动登记了', HttpStatus.FOUND);
    }
    const people2 = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.active', 'active')
      .where('active.active_id=:active_id', { active_id })
      .andWhere('application.passport=:passport', { passport })
      .getOne();
    if (people2) {
      throw new HttpException('身份证已经在这个活动登记了', HttpStatus.FOUND);
    }
    return true;
  }
  // 获取全部的报名信息
  async getAll(active_id: number): Promise<ApplicationEntity[]> {
    return this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.active', 'active')
      .select([
        'application.name',
        'application.application_id',
        'application.phone',
        'application.serve_duration',
      ])
      .where('active.active_id=:active_id', { active_id })
      .getMany();
  }
  // 获取全部已审核的报名信息
  async getAllChecked(active_id: string): Promise<ApplicationEntity[]> {
    return this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.active', 'active')
      .select([
        'application.name',
        'application.application_id',
        'application.phone',
        'application.serve_duration',
      ])
      .where('active.active_id=:active_id', { active_id })
      .andWhere('application.status=:status', {
        status: ActiveApplicationStatus.checked,
      })
      .getMany();
  }
  // 审核改变报名表状态
  async updateByStatus(
    application_id: string,
    status: ActiveApplicationStatus,
  ) {
    await this.applicationRepository.update(application_id, { status });
    return { message: '用户申请已审核' };
  }
  // 获取当前团队所有的报名信息
  async getTeamActiveApplications(active_id: string) {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.active', 'active')
      .where('application.active.active_id=:active_id', { active_id })
      .getMany();
  }
  // 获取当前用户是否对某个活动报名
  async getUserApplication(active_id: string, user_id: string) {
    return await this.applicationRepository
      .createQueryBuilder('application')
      .where('application.active.active_id=:active_id', { active_id })
      .andWhere('application.user.user_id=:user_id', { user_id })
      .getOne();
  }
}
