import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { makeSalt, encryptPassword } from '../../../utils/crypto';
import { ArticleEntity } from '../../article/entities/article.entity';
import { TeamEntity } from '../../team/entities/team.entity';
import { LikeEntity } from '../../like/entities/like.entity';
import { CollectArticleEntity } from '../../collect/entities/collect_article.entity';
import { ActiveEntity } from '../../active/entities/active.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { ApplicationEntity } from '../../application/entities/application.entity';
import { TeamMemberEntity } from 'src/logical/team-member/entities/team-member.entity';
import { UserStatus } from 'src/utils/app.interface';
import { ElegantEntity } from 'src/logical/elegant/entities/elegant.entity';

@Entity('user') //数据表的名字
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;
  // 一个管理员可以管理多个团队
  // @OneToMany(() => TeamEntity, (team) => team.admin)
  // teams: TeamEntity[];

  // 一个用户可以是多个团队成员
  // @OneToMany(() => TeamMemberEntity, (member) => member.user)
  // members: TeamMemberEntity[];
  // 一个管理员对应多个风采
  @OneToMany(() => ElegantEntity, (elegant) => elegant.user)
  elegant: ElegantEntity[];
  // 一个用户对应多个报名信息
  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];
  // 多个用户对应一个角色
  @ManyToOne(() => RoleEntity)
  @JoinColumn({ referencedColumnName: 'role_name' })
  role: RoleEntity;

  //一个用户对应多个点赞
  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  //一个用户对应多篇文章
  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  //一个用户对应多个收藏
  @OneToMany(() => CollectArticleEntity, (collect) => collect.user)
  collects: CollectArticleEntity[];

  //一个用户对应多个活动
  @OneToMany(() => ActiveEntity, (active) => active.user)
  actives: ActiveEntity[];

  @BeforeInsert()
  encryptPwd() {
    this.salt = makeSalt(); //制作密码盐
    this.password = encryptPassword(this.password, this.salt); //加密密码
  }

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '加密密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    name: 'salt',
    nullable: false,
    comment: '盐',
  })
  salt: string;

  // @Column({
  //   type: 'varchar',
  //   name: 'mobile',
  //   nullable: false,
  //   unique: true,
  //   length: 15,
  //   comment: '手机号',
  // })
  // mobile: string;

  @Column({
    type: 'varchar',
    name: 'status',
    default: UserStatus.normal,
    comment: '用户账号状态',
  })
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '修改时间',
  })
  update_at: Date;

  @Column({
    type: 'varchar',
    default:
      'https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp',
    comment: '用户头像',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    default: '默认用户1',
    length: 20,
    comment: '昵称',
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '真实姓名',
    nullable: true,
  })
  real_name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    comment: '邮箱',
  })
  email: string;
}
