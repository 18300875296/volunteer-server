/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-12 22:59:55
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 08:42:07
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\types\article.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
type ArticleEntity = {
  article_id: string;
  category_id: number;
  title: string;
  content: string;
  summary: string;
  likeCount: number;
  readCount: number;
  images: string;
  create_at: Date;
  update_at: Date;
  tags: string;
  collectCount: number;
};
type ArticleQuery = {
  page: number;
  pagesize: number;
  fields?: Partial<ArticleEntity>;
  orderKey: keyof ArticleEntity;
};
export type { ArticleEntity, ArticleQuery };
