import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ArticleEntity } from '../../article/entities/article.entity';
@Entity('collect_article')
export class CollectArticleEntity {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    comment: '收藏表唯一标识',
  })
  collect_id: number;
  // @Column({
  //   type: 'varchar',
  //   comment: '收藏名',
  //   nullable: false,
  //   unique: true,
  // })
  // collect_name: string;

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
  // 多个收藏对应一篇文章
  @ManyToOne(() => ArticleEntity, (article) => article.collects)
  article: ArticleEntity;
  // 多个收藏对应一个用户
  @ManyToOne(() => UserEntity, (user) => user.collects)
  user: UserEntity;
}
