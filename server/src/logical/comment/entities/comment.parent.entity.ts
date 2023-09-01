import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { CommentState } from '../comment.interface';
@Entity('comment_parent')
export class CommentParentEntity {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column({
    type: 'varchar',
    comment: '文章id',
    nullable: false,
  })
  article_id: string;

  @Column({
    type: 'varchar',
    comment: '用户id',
    nullable: false,
  })
  user_id: string;

  @Column({
    type: 'varchar',
    comment: '评论的内容',
    nullable: false,
    length: 1000,
  })
  content: string;

  @Column({
    type: 'boolean',
    comment: '是否为文章发布者',
    default: false,
  })
  is_public: boolean;
  @Column({
    type: 'boolean',
    comment: '是否已删除',
    default: false,
  })
  is_delete: boolean;

  @Column({
    type: 'enum',
    enum: CommentState,
    default: CommentState.check,
    comment: '评论状态',
  })
  state: CommentState;

  @Column({
    type: 'integer',
    default: 0,
    comment: '评论点赞数',
  })
  like_count: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_at: Date;
}
