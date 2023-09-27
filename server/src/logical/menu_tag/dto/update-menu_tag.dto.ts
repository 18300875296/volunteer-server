import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuTagDto } from './create-menu_tag.dto';

export class UpdateMenuTagDto extends PartialType(CreateMenuTagDto) {}
