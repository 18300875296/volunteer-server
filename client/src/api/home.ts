/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-09-29 16:32:41
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:36:58
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\api\home.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import request from '../utils/request';
import { GlobalResponse } from '@/types/request';
import type { ArticleQuery } from '@/types/article';
import type { QueryConfig } from '@/types/common';
import { TeamEntity } from '@/types/team';

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

type RequestType<T> = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  params?: T;
};
// 获取首页热门文章
const getHotArticlesAPI = (query: ArticleQuery): Promise<GlobalResponse<ArticleEntity[]>> => {
  const { page, pagesize, orderKey, fields } = query;
  const requestConfig: RequestType<ArticleQuery> = {
    url: '/api/article',
    method: 'GET',
    params: { page, pagesize, orderKey, fields },
  };
  return request(requestConfig);
};
// 获取首页热门团队
const getHotTeamsAPI = (query: QueryConfig<TeamEntity>): Promise<GlobalResponse<TeamEntity[]>> => {
  const { page, pagesize, orderKey, fields } = query;
  const requestConfig: RequestType<QueryConfig<TeamEntity>> = {
    url: '/api/team',
    method: 'GET',
    params: { page, pagesize, orderKey, fields },
  };
  return request(requestConfig);
};

export { getHotArticlesAPI, getHotTeamsAPI };
// 获取首页轮播图
export const getSlidesAPI = (keyword: string, limit: number) =>
  request({
    url: `/api/slide/`,
    method: 'GET',
    params: { keyword, limit },
  });
