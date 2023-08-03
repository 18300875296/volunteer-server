import { PartialType } from '@nestjs/mapped-types';
import { CreateElegantDto } from './create-elegant.dto';

export class UpdateElegantDto extends PartialType(CreateElegantDto) {}
