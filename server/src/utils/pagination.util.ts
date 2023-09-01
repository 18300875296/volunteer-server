import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
export interface Pagination<X> {
  data: X[];
  total: number;
}

@Injectable()
export class PaginationUtil {
  async paginate<T>(
    repository: Repository<T>,
    page: number,
    limit: number,
    keywords: Partial<T>[],
    orderKey: keyof T,
    orderType = 'DESC' as 'DESC' | 'ASC',
  ): Promise<Pagination<T>> {
    const queryBuilder = repository.createQueryBuilder('entity');
    // 构造关键字查询
    if (!keywords.length) throw new Error('query is not found');
    for (const keyword of keywords) {
      for (const key in keyword) {
        if (!key) throw new Error('query is bad');
        queryBuilder.andWhere(`entity.${key} LIKE :${key}`, {
          [key]: `%${keyword[key]}%`,
        });
        // 添加排序
        queryBuilder.orderBy(`entity.${orderKey.toString()}`, orderType);
      }
    }
    // 执行分页查询
    const skip = (page - 1) * limit;
    const [data, total] = await queryBuilder
      .skip(skip)
      .limit(limit)
      .getManyAndCount();
    return { data, total };
  }
}
