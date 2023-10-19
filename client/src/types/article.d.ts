import { RouteRecordRaw } from 'vue-router';
import { Userinfo } from './user';

export type ArticleCategory = {
  category_id: number;
  categoryName: string;
  displayName: string;
};

export type ArticleData = {
  article_id: string;
  create_at: string;
  images: string;
  readCount: number;
  summary: string;
  tags: string;
  title: string;
  update_at: string;
  user: {
    avatar: string;
  };
};
export interface Meta {
  title: string;
  hidden: boolean;
  roles: null | Role[];
  menu: boolean;
}
export type ArticleDetail = {
  article_id: string;
  content: string;
  cover_url: string;
  create_at: Date;
  likeCount: number;
  readCount: number;
  collectCount: number;
  title: string;
  update_at: Date;
  collect_by_current_user: boolean;
  like_by_current_user: boolean;
  user: Userinfo;
};

// 文章页面头部ArticleHeader类型定义
export interface ArticleHeader extends RouteRecordRaw {
  name: string;
  meta: Meta;
}
export interface ArticleProps<T> {
  data?: T;
  tab?: RouteRecordRaw[];
  article_id?: string;
}
