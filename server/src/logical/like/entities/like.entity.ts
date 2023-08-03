import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ArticleEntity } from '../../article/entities/article.entity';
import { UserEntity } from '../../user/entities/user.entity';
@Entity({ name: 'likes' })
export class LikeEntity {
  @PrimaryGeneratedColumn('increment')
  like_id: number;

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

  //多个点赞对应一篇文章
  @ManyToOne(() => ArticleEntity, (article) => article.likes)
  // @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  //多个点赞对应一个用户
  @ManyToOne(() => UserEntity, (user) => user.likes)
  // @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
