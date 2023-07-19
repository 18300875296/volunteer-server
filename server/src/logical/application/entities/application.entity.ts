import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ActiveEntity } from '../../active/entities/active.entity';
import { ActiveApplicationStatus } from 'src/utils/app.interface';
@Entity('application')
export class ApplicationEntity {
  // 多个报名信息对应一个用户
  @ManyToOne(() => UserEntity, (user) => user.applications)
  user: UserEntity;
  // 多个报名信息对应一个活动
  @ManyToOne(() => ActiveEntity, (active) => active.applications, {
    onDelete: 'CASCADE',
  })
  active: ActiveEntity;

  @PrimaryGeneratedColumn('uuid')
  application_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '参与者姓名',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '性别',
  })
  sex: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: '出生日期',
  })
  birthday: Date;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '身份证',
  })
  passport: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '学历',
  })
  record: string;

  // @Column({
  //   type: 'varchar',
  //   nullable: false,
  //   comment: '毕业院校',
  // })
  // university: string;

  // @Column({
  //   type: 'varchar',
  //   nullable: false,
  //   comment: '所学专业',
  // })
  // profess: string;

  // @Column({
  //   type: 'text',
  //   nullable: false,
  //   comment: '工作情况',
  // })
  // work: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '参与过的志愿服务项目',
  })
  project: string;

  @Column({
    type: 'integer',
    default: 0,
    comment: '服务时长',
  })
  serve_duration: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: '语言能力',
  })
  languages: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '技能特长',
  })
  skills: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: '兴趣爱好',
  })
  hobbies: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: ActiveApplicationStatus.unchecked,
    comment: '活动申请状态',
  })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '报名创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '报名修改时间',
  })
  update_at: Date;
}
