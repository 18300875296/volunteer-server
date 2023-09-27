import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PermissionEntity } from '../../permission/entities/permission.entity';
import { TeamMemberEntity } from 'src/logical/team-member/entities/team-member.entity';
// import { MenuEntity } from 'src/logical/menu/entity/menu.entity';

@Entity('role')
export class RoleEntity {
  // 关联菜单栏
  // @ManyToMany(() => MenuEntity, (menu) => menu.roles)
  // menus: MenuEntity[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];
  @OneToMany(() => TeamMemberEntity, (member) => member.role)
  members: TeamMemberEntity[];

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @PrimaryGeneratedColumn('increment')
  role_id: string;

  @Column({
    type: 'varchar',
    unique: true,
    comment: '角色内部名',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    comment: '角色显示名',
  })
  displayName: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
  })
  update_at: Date;
}
