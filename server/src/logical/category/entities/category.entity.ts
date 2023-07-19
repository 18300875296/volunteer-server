//import { ArticleEntity } from 'src/logical/article/entities/article.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    comment: '文章分类标识',
  })
  category_id: number;

  @Column({
    type: 'varchar',
    name: 'category_name',
    unique: true,
    comment: '分类名称',
  })
  category_name: string;

  //一个分类对应多篇文章
  // @OneToMany(() => ArticleEntity, (article) => article.category)
  // articles: ArticleEntity[];
}
