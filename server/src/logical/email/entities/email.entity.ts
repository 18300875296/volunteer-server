import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('email')
export class EmailEntity {
  @PrimaryGeneratedColumn('increment')
  email_id: number;

  @Column({
    type: 'varchar',
    name: 'email',
    nullable: false,
    comment: '用户邮箱',
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'code',
    nullable: false,
    comment: '验证码',
  })
  code: string;

  @Column({
    type: 'datetime',
    name: 'expiresAt',
    nullable: false,
    comment: '过期时间',
  })
  expiresAt: Date;
}
