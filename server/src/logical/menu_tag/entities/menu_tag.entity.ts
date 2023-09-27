import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'menu_tag' })
export class MenuTagEntity {
  @PrimaryGeneratedColumn('increment')
  menu_tag_id: number;

  // @Column({
  //   type: 'integer',
  //   comment: 'tab关联菜单栏',
  //   nullable: false,
  // })
  // menu_id: number;

  @Column({
    type: 'varchar',
    comment: 'tab内部名称',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'tab显示名称',
  })
  displayName: string;

  // @Column({
  //   type: 'varchar',
  //   nullable: false,
  //   comment: '菜单栏前端路由的全路径',
  // })
  // path: string;

  @Column({
    type: 'boolean',
    comment: 'tab是否隐藏',
    nullable: false,
  })
  hidden: boolean;

  @Column({
    type: 'varchar',
    comment: '可访问的角色',
    nullable: true,
  })
  roles: string;

  // @Column({
  //   type: 'varchar',
  //   comment: '组件路径',
  //   nullable: false,
  // })
  // component: string;

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
