import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { ActiveEntity } from './entities/active.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
@EntityRepository(ActiveEntity)
export class ActiveRepository extends Repository<ActiveEntity> {
  constructor(private entityManager: EntityManager) {
    super(ActiveEntity, entityManager);
  }
  // 保存
  async _save(active: ActiveEntity): Promise<ActiveEntity> {
    try {
      return this.save(active);
    } catch (error) {
      throw new HttpException(
        `服务端保存活动出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // 查询是否存在
  async _exists(active_id: string): Promise<ActiveEntity | null> {
    try {
      return this.findOne({ where: { active_id } });
    } catch (error) {
      throw new HttpException(
        `服务端查询活动出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // 查询活动以及相关联的数据
  async findOne_all(active_id: string): Promise<ActiveEntity> {
    try {
      return this.findOne({ where: { active_id } });
    } catch (error) {
      throw new HttpException(
        `服务端查询活动出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // 删除活动
  async _delete(active_id: number): Promise<void> {
    try {
      await this.delete(active_id);
    } catch (error) {
      throw new HttpException(
        '服务端删除活动失败',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
