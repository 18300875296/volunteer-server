import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { generateCode } from '../../utils/crypto';
import { EmailEntity } from './entities/email.entity';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>,
    private readonly mailerService: MailerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // 验证验证码和邮箱是否正确
  async validateCode(email: string, code: string): Promise<EmailEntity> {
    return await this.emailRepository.findOne({
      where: { email: email, code: code, expiresAt: MoreThan(new Date()) },
    });
  }
  //发送验证码
  async sendCodeEmail(to: string, code: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: 'm18300875296@163.com',
        to,
        subject: 'email Verification',
        text: `你的验证码是:${code}`,
      });
    } catch (error) {
      throw new HttpException(
        `发送验证码出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // 删除数据
  async deleteCode(email: string): Promise<void> {
    await this.emailRepository
      .createQueryBuilder('email')
      .delete()
      .where('email.email=:email', { email })
      .execute();
  }
  //验证邮箱;
  async validateEmail(email: string): Promise<boolean> {
    const emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailPattern.test(email);
  }
  //验证码表中邮箱中是否存在
  async validateTempEmail(email: string): Promise<EmailEntity> {
    return await this.emailRepository.findOne({ where: { email } });
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
      await this.emailRepository.save(emailEntity);
    } catch (error) {
      throw new HttpException(
        `插入邮箱数据出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //处理函数
  async handleVerification(_email: string): Promise<any> {
    //验证邮箱
    if (!this.validateEmail(_email)) {
      throw new HttpException('请输入正确的邮箱地址!!', HttpStatus.OK);
    }
    //验证用户是否已经注册
    const validUser = await this.userRepository.findOne({
      where: { email: _email },
    });
    if (validUser) {
      throw new HttpException('邮箱地址已经注册!!', HttpStatus.OK);
    }
    //验证临时邮箱是否存在
    const email = await this.validateTempEmail(_email);
    if (email) {
      this.deleteCode(_email);
    }
    const code = await generateCode(6); //生成验证码
    const restTime: number = 5 * 60 * 1000;
    const expiresAt = new Date(Date.now() + restTime); //设置过期时间
    await this.createVerification(_email, code, expiresAt); //存入数据库
    await this.sendCodeEmail(_email, code);
    return { message: '发送验证码成功' };
    //throw new HttpException('发送次数过多,请稍后重试!!', HttpStatus.OK);
  }
}
