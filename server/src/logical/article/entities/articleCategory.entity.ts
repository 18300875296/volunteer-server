import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'article_category' })
export class ArticleCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  category_id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '文章标签名',
  })
  categoryName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '文章显示名',
  })
  displayName: string;

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
}
