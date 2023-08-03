import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { LikeEntity } from '../../like/entities/like.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { CollectArticleEntity } from '../../collect/entities/collect_article.entity';
import { ArticleStatus } from '../article.interface';
// import { ArticleTagEntity } from '../tags/article.tag.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  article_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '文章标题',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '文章正文',
  })
  content: string;

  @Column({
    type: 'text',
    comment: '文章摘要',
    nullable: false,
  })
  summary: string;

  @Column({
    type: 'integer',
    default: 0,
    comment: '点赞量',
  })
  likeCount: number;

  @Column({
    type: 'integer',
    default: 0,
    comment: '阅读量',
  })
  readCount: number;

  @Column({
    type: 'text',
    comment: '文章图片',
    nullable: true,
  })
  images: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  update_at: Date;

  @Column({
    type: 'varchar',
    default: ArticleStatus.publish,
    comment: '发布状态:草稿|发布|已删除|审核中',
  })
  status: string;

  @Column({
    type: 'text',
    comment: '文章标签',
  })
  tags: string;

  @Column({
    type: 'integer',
    default: 0,
    comment: '文章收藏数',
  })
  collectCount: number;

  //多篇文章对应一个用户
  @ManyToOne(() => UserEntity, (user) => user.articles)
  user: UserEntity;
  //一篇文章对应多个赞
  @OneToMany(() => LikeEntity, (like) => like.article)
  likes: LikeEntity[];
  // 多篇文章对应一个收藏
  @OneToMany(() => CollectArticleEntity, (collect) => collect.article)
  collects: CollectArticleEntity[];
}
