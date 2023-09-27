import { RoleEntity } from 'src/logical/role/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'menu' })
export class MenuEntity {
  @PrimaryGeneratedColumn('increment')
  menu_id: number;
  // 关联角色表
  // @ManyToMany(() => RoleEntity, (role) => role.menus)
  // @JoinTable()
  // roles: RoleEntity[];

  @Column({
    type: 'integer',
    default: 0,
    comment: '父菜单id',
  })
  parent_id: number;

  @Column({
    type: 'integer',
    default: 0,
    comment: '层级,层级从0层开始',
  })
  level: number;

  @Column({
    type: 'varchar',
    comment: '菜单内部名称',
    default: '',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'blob',
    comment: '路由别名',
    default: null,
    nullable: true,
  })
  alias: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '菜单显示名称',
  })
  displayName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: '',
    comment: '菜单栏前端路由的全路径',
  })
  path: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: '是否实例化',
  })
  is_instance: boolean;
  @Column({
    type: 'boolean',
    comment: '菜单栏是否隐藏',
    nullable: false,
  })
  hidden: boolean;

  @Column({
    type: 'varchar',
    comment: '组件路径',
    nullable: true,
  })
  component: string;

  @Column({
    type: 'blob',
    comment: '可访问的角色',
    nullable: true,
    default: null,
  })
  roles: string;

  @Column({
    type: 'boolean',
    comment: '是否在导航栏展示',
    default: false,
  })
  nav: boolean;

  @Column({
    type: 'boolean',
    comment: '是否只做为渲染数据',
    default: true,
  })
  readonly: boolean;

  @Column({
    type: 'varchar',
    comment: '是否重定向',
    nullable: true,
  })
  redirect: string;

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
