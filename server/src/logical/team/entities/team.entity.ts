import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TeamStatus } from 'src/utils/app.interface';
import { ActiveEntity } from 'src/logical/active/entities/active.entity';
import { ElegantEntity } from 'src/logical/elegant/entities/elegant.entity';

@Entity('team')
export class TeamEntity {
  // 多个团队由一个管理员管理
  @ManyToOne(() => UserEntity)
  admin: UserEntity;
  // 一个团队对应多个活动
  @OneToMany(() => ActiveEntity, (active) => active.team, { cascade: true })
  actives: ActiveEntity[];
  // 一个团队可以有多个成员
  // @OneToMany(() => TeamMemberEntity, (member) => member.team)
  // members: TeamMemberEntity[];

  //一个团队对应多个风采
  @OneToMany(() => ElegantEntity, (elegant) => elegant.team)
  elegant: ElegantEntity[];

  @PrimaryGeneratedColumn('uuid')
  team_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '组织名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '联系人姓名',
  })
  manager_name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '管理员身份证',
  })
  manager_passport: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '联系人电话',
  })
  manager_phone: number;

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
    type: 'text',
    nullable: false,
    comment: '组织简介',
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '组织状态',
    default: TeamStatus.normal,
  })
  status: TeamStatus;

  @Column({
    type: 'text',
    nullable: false,
    comment: '组织logo',
  })
  logo: string;

  @Column({
    type: 'integer',
    nullable: false,
    comment: '组织人数',
    default: 0,
  })
  peoples: number;

  @Column({
    type: 'integer',
    default: 0,
    comment: '团队热度',
  })
  read_count: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    nullable: false,
    comment: '创建时间',
    select: false,
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    nullable: false,
    comment: '修改时间',
    select: false,
  })
  update_at: Date;
}
