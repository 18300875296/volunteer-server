import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { TeamEntity } from '../../team/entities/team.entity';
import { UserEntity } from 'src/logical/user/entities/user.entity';
import { RoleEntity } from 'src/logical/role/entities/role.entity';

@Entity('team_member')
export class TeamMemberEntity {
  // 多个成员对应一个用户
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  // 多个成员对应一个团队
  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  team: TeamEntity;

  // 多个成员对应一个角色
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ referencedColumnName: 'role_name' })
  role: RoleEntity;

  @PrimaryGeneratedColumn('uuid')
  team_member_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '姓名',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '性别',
  })
  sex: string;

  @Column({
    type: 'integer',
    nullable: true,
    comment: '年龄',
  })
  age: number;

  @Column({
    type: 'integer',
    default: 0,
    comment: '服务时长',
  })
  serve_duration: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '手机号',
  })
  phone: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '身份证号',
  })
  passport: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '修改时间',
    select: false,
  })
  update_at: Date;
}
