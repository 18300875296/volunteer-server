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

@Entity('role')
export class RoleEntity {
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
    comment: '角色名称',
    nullable: false,
  })
  role_name: string;

  @Column({
    type: 'varchar',
    comment: '角色描述',
  })
  description: string;

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
