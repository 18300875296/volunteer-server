import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';
@Entity('permission')
export class PermissionEntity {
  // 一个权限对应多个角色 一个角色对应多个权限
  // @ManyToMany(() => RoleEntity, { cascade: true })
  // @JoinTable()
  // roles: RoleEntity[];

  @PrimaryGeneratedColumn('increment')
  permission_id: string;

  @Column({
    type: 'varchar',
    unique: true,
    comment: '权限名称',
    nullable: false,
  })
  permission_name: string;

  @Column({
    type: 'varchar',
    comment: '权限描述',
  })
  description: string;

  @Column({
    type: 'varchar',
    comment: '权限资源地址',
    nullable: false,
  })
  url: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
    select: false,
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
    select: false,
  })
  update_at: Date;
}
