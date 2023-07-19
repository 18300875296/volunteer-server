import { Repository, EntityRepository, EntityManager, MoreThan } from 'typeorm';
import { EmailEntity } from './entities/email.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
@EntityRepository(EmailEntity)
export class EmailRepository extends Repository<EmailEntity> {
  constructor(private entityManager: EntityManager) {
    super(EmailEntity, entityManager);
  }
  //验证码表中邮箱中是否存在
  async validateTempEmail(email: string): Promise<EmailEntity> {
    return await this.findOne({ where: { email } });
  }
  //验证邮箱;
  async validateEmail(email: string): Promise<boolean> {
    const emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailPattern.test(email);
  }
  //存入数据库
  async createVerification(
    email: string,
    code: string,
    expiresAt: Date,
  ): Promise<void> {
    const emailEntity = new EmailEntity();
    emailEntity.email = email;
    emailEntity.code = code;
    emailEntity.expiresAt = expiresAt;
    try {
      await this.save(emailEntity);
    } catch (error) {
      throw new HttpException(
        `插入邮箱数据出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //验证邮箱和验证码
  async validateCode(email: string, code: string): Promise<EmailEntity[]> {
    return await this.find({
      where: { email: email, code: code, expiresAt: MoreThan(new Date()) },
    });
  }
}
