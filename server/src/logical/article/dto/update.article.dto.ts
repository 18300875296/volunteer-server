import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './article.create.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
