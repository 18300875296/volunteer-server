import { PartialType } from '@nestjs/mapped-types';
import { EmailDto } from './create-email.dto';

export class UpdateEmailDto extends PartialType(EmailDto) {}
