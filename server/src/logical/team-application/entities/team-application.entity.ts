import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('team_application')
export class TeamApplicationEntity {
  // 多个团队申请对应一个用户
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  team_application_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '组织名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    default: '审核中',
    comment: '团队状态',
  })
  status: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '联系人姓名',
  })
  manager_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '联系人电话',
  })
  manager_phone: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '联系人邮箱',
  })
  manager_email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '组织地址',
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '管理员身份证',
  })
  manager_passport: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '组织简介',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '组织logo',
  })
  logo: string;

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
