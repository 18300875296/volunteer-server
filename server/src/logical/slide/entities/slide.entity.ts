import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('slide')
export class SlideEntity {
  @PrimaryGeneratedColumn('uuid')
  slide_id: string;

  @Column({
    type: 'text',
    comment: '轮播图标题',
  })
  title: string;

  @Column({
    type: 'varchar',
    comment: '轮播图位置',
  })
  place: string;

  @Column({
    type: 'text',
    comment: '轮播图描述',
  })
  description: string;

  @Column({
    type: 'text',
    comment: '轮播图地址',
  })
  url: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '修改时间',
    select: false,
  })
  update_at: Date;
}
