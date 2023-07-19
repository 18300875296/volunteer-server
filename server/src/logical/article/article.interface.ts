import { ArticleEntity } from './entities/article.entity';
export enum PublishState {
  Draft = 'draft',
  Publish = 'publish',
}
export enum ArticleState {
  deleted = 'deleted',
  published = 'published',
  checked = 'checked',
}
export interface ArticleQuery {
  // column: string;
  page: number;
  pageSize: number;
  // keyWord?: string;
}
export interface Pagination {
  total: number;
  current_page: number;
  page_size: number;
  last_page: number;
  articles: ArticleEntity[];
  // data: {
  //   id: number;
  //   title: string;
  //   content: string;
  //   readCount: number;
  //   likeCount: number;
  //   updateAt: Date;
  // }[];
}
export enum ArticleStatus {
  publish = '已发布',
  draft = '草稿',
  reject = '已驳回',
  deleted = '已删除',
}
