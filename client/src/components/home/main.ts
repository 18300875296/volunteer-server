/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-12 22:54:20
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:49:14
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\home\main.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getHotArticlesAPI, getHotTeamsAPI } from '@/api/home';
import type { ArticleEntity, ArticleQuery } from '@/types/article';
import { QueryConfig } from '@/types/common';
import { TeamEntity } from '@/types/team';

async function getHotArticles(query: ArticleQuery): Promise<ArticleEntity[]> {
  const { data } = await getHotArticlesAPI(query);
  return data ?? [];
}
async function getHotTeams(query: QueryConfig<TeamEntity>): Promise<TeamEntity[]> {
  const { data } = await getHotTeamsAPI(query);
  return data ?? [];
}
function getDebateIcon(): string[] {
  const data: string[] = new Array(3).fill(
    'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp',
  );
  return data;
}
function openArticle(article_id: string): void {
  useRouter().push({ name: 'articleDetail', params: { article_id } });
}
const useHomeHeader = async (config: ArticleQuery) => {
  const hotArticles: ArticleEntity[] = [];
  const icons: string[] = [];
  const { page, pagesize, fields, orderKey } = config;
  const articles = await getHotArticles({ page, pagesize, orderKey, fields });
  hotArticles.push(...articles);
  icons.push(...icons);
  return { hotArticles, openArticle, icons };
};
const useHomeBodyHeader = async (config: QueryConfig<TeamEntity>) => {
  const hotTeams: TeamEntity[] = [];
  const { page, pagesize, fields, orderKey } = config;
  const teams = await getHotTeams({ page, pagesize, orderKey, fields });
  hotTeams.push(...teams);
  return { hotTeams };
};
const useHomeBodyMain = () => {};
export { useHomeHeader, useHomeBodyHeader, useHomeBodyMain };
