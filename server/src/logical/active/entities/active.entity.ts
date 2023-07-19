import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApplicationEntity } from '../../application/entities/application.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { TeamEntity } from 'src/logical/team/entities/team.entity';
import { ActiveState } from '../active.interface';

@Entity('active')
export class ActiveEntity {
  // 多个活动对应一个团队
  @ManyToOne(() => TeamEntity, (team) => team.actives, { onDelete: 'CASCADE' })
  team: TeamEntity;
  // 一个活动对应多个报名信息
  @OneToMany(() => ApplicationEntity, (application) => application.active)
  applications: ApplicationEntity[];
  //多个活动对应一个管理员
  @ManyToOne(() => UserEntity, (user) => user.actives)
  user: UserEntity;
  @PrimaryGeneratedColumn('uuid')
  active_id: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
    comment: '当前报名人数',
  })
  application_count: number;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '活动名称',
  })
  active_name: string;

  @Column({
    type: 'varchar',
    comment: '活动状态',
  })
  status: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '线下',
    comment: '服务类型[线上,线下]',
  })
  active_type: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '服务性质',
  })
  service_type: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '工作开始时间',
  })
  work_start_at: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '工作结束时间',
  })
  work_end_at: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '活动开始时间',
  })
  active_start_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '活动结束时间',
  })
  active_end_at: Date;

  // @Column({
  //   type: 'varchar',
  //   nullable: false,
  //   comment: '活动地点',
  // })
  // place: string;
  @Column({
    type: 'varchar',
    nullable: false,
    comment: '活动省份',
  })
  province: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '活动市区',
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '活动县区',
  })
  county: string;

  @Column({
    type: 'integer',
    nullable: false,
    comment: '人数限制',
  })
  peoples: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: '捐募要求',
  })
  ability: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '服务职责',
  })
  responsibility: string;

  // @Column({
  //   type: 'text',
  //   nullable: false,
  //   comment: '团队介绍',
  // })
  // team_info: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '福利介绍',
  })
  welfare: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '其他情况说明',
  })
  exceptionInfo: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '报名开始日期',
  })
  register_start_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '报名时间截止日期',
  })
  register_end_at: Date;

  // @Column({
  //   type: 'enum',
  //   nullable: false,
  //   default: ActiveState.NotStart,
  //   comment: '活动状态:未开始|进行中|已结束',
  // })
  // state: ActiveState;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '活动创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '活动修改时间',
  })
  update_at: Date;
}
