// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
//   Column,
//   ManyToMany,
// } from 'typeorm';
// import { ArticleEntity } from '../entities/article.entity';
// @Entity({ name: 'article_tag' })
// export class ArticleTagEntity {
//   @PrimaryGeneratedColumn('increment')
//   tag_id: number;

//   @Column({
//     type: 'varchar',
//     nullable: false,
//     comment: '标签名',
//     unique: true,
//   })
//   name: string;

//   @CreateDateColumn({
//     type: 'timestamp',
//     comment: '创建时间',
//   })
//   createAt: Date;

//   @UpdateDateColumn({
//     type: 'timestamp',
//     comment: '更新时间',
//   })
//   updateAt: Date;

//   @ManyToMany(() => ArticleEntity, (article) => article.tags)
//   articles: ArticleEntity[];
// }
