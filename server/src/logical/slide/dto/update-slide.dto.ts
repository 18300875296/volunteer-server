import { PartialType } from '@nestjs/mapped-types';
import { CreateSlideDto } from './create-slide.dto';

export class UpdateSlideDto extends PartialType(CreateSlideDto) {}
