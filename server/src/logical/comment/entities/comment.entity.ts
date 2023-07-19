import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CommentState } from '../comment.interface';
@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    comment: '评论唯一标识',
  })
  id: number;

  @Column({
    type: 'varchar',
    comment: '评论的内容',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'varchar',
    comment: '评论的用户',
    nullable: false,
  })
  commentByUser: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '评论的目标,文章、视频等',
  })
  target: string;

  @Column({
    type: 'enum',
    enum: CommentState,
    default: CommentState.check,
    comment: '评论状态',
  })
  state: CommentState;

  @Column({
    type: 'number',
    default: 0,
    comment: '评论点赞数',
  })
  like: number;

  @Column({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_at: Date;
}
