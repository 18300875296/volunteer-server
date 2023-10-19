import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  tag_id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '标签内部名称',
  })
  tagName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '标签显示名',
  })
  displayName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '创建标签的用户id',
  })
  user_id: string;

  @Column({
    type: 'boolean',
    nullable: false,
    comment: '是否为自定义标签',
    default: false,
  })
  is_custom: boolean;
}
