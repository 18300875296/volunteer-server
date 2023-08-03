import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { TeamEntity } from '../../team/entities/team.entity';
import { UserEntity } from 'src/logical/user/entities/user.entity';
import { RoleEntity } from 'src/logical/role/entities/role.entity';
import { TeamStatus } from 'src/logical/team/team.interface';

@Entity('team_member_application')
export class TeamMemberApplicationEntity {
  // 多个成员申请对应一个用户
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  // 多个申请对应一个团队
  @ManyToOne(() => TeamEntity)
  team: TeamEntity;

  @PrimaryGeneratedColumn('uuid')
  team_member_application_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '姓名',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: TeamStatus.unauth,
    comment: '成员信息审核',
  })
  status: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '性别',
  })
  sex: string;

  @Column({
    type: 'integer',
    nullable: false,
    comment: '年龄',
  })
  age: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '手机号',
  })
  phone: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '身份证号',
  })
  passport: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '个人介绍',
  })
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    nullable: false,
    comment: '创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    nullable: false,
    comment: '修改时间',
  })
  update_at: Date;
}
