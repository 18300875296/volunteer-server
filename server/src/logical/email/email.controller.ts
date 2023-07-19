import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '../auth/decorator/public.decorator';
import { EmailDto } from './dto/create-email.dto';

@Controller('validate_email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Post() //验证邮箱路由
  async verificationEmail(@Body() body: EmailDto): Promise<any> {
    return await this.emailService.handleVerification(body.email);
  }
}
