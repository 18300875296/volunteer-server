/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-09-29 16:32:42
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:56:00
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\utils\pagination.util.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Repository } from 'typeorm';
interface Pagination<X> {
  data: X[];
  total: number;
}
type Query = {
  key: string;
  value: string;
};
function generateQuery(obj: any): string {
  if (!obj || !(obj instanceof Object)) return '';
  const map = [];
  for (const item of Object.entries(obj)) {
    map.push(item);
  }
  return map.join('&');
}
function parseQuery(queries: string): { key: string; value: string }[] {
  if (!queries.length) return [];
  return queries.split('&').reduce((map, query) => {
    const [key, value] = query.split('=');
    if (key && value) {
      map.push({ key, value });
    }
    return map;
  }, []);
}
/**
 * @description: 分页查询
 * @param {Repository} repository
 * @param {number} page
 * @param {number} limit
 * @param {string} query key = value & key2=value2
 * @param {keyof} orderKey
 * @param {*} orderType
 * @return {*}
 */
async function paginate<T>(
  repository: Repository<T>,
  page: number,
  limit: number,
  query: string,
  orderKey: keyof T,
  orderType = 'DESC' as 'DESC' | 'ASC',
): Promise<Pagination<T>> {
  const queryBuilder = repository.createQueryBuilder('entity');
  // 构造关键字查询
  const queryMap = parseQuery(query);
  queryMap.length &&
    queryMap.forEach(({ key, value }, index) => {
      queryBuilder.andWhere(`entity.${key} = :value_${index}`, {
        [`value_${index}`]: value,
      });
    });
  queryBuilder.orderBy(`entity.${orderKey.toString()}`, orderType); // 添加排序

  // 执行分页查询
  const skip = (page - 1) * limit;
  const [data, total] = await queryBuilder
    .skip(skip)
    .limit(limit)
    .getManyAndCount();
  return { data, total };
}
export { paginate, Pagination, generateQuery };
