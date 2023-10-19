/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-09-29 16:32:41
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:32:15
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\types\common.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export interface ListProps<T> {
  data: T;
}
interface QueryConfig<T> {
  page: number;
  pagesize: number;
  fields?: Partial<T>;
  orderKey: keyof T;
}
export type { QueryConfig };
