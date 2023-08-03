import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
//import { ArticleEntity } from 'src/logical/article/entities/article.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    comment: '文章标签id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '标签名称',
    default: '志愿服务',
  })
  name: string;

  @Column({
    type: 'integer',
    comment: '标签引用次数',
    default: 0,
  })
  count: number;

  //一个标签对应多篇文章
  // @ManyToMany(() => ArticleEntity, (article) => article.tags)
  // articles: ArticleEntity[];
}
