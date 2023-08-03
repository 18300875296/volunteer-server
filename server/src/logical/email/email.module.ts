import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEntity } from './entities/email.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserEntity } from '../user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([EmailEntity, UserEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.163.com',
        port: '465',
        secure: true,
        auth: {
          user: 'm18300875296@163.com',
          pass: 'HSVSNZBYBSHQZLJL',
        },
        // defaults: {
        //   from: 'm18300875296@163.com',
        // },
      },
      // preview: false,
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
