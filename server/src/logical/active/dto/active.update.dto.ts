import { PartialType } from '@nestjs/mapped-types';
import { CreateActiveDto } from './active.create.dto';

export class UpdateActiveDto extends PartialType(CreateActiveDto) {}
