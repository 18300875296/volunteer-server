import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectArticleEntity } from './entities/collect_article.entity';

import { ArticleEntity } from '../article/entities/article.entity';
import { UserEntity } from '../user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CollectArticleEntity, ArticleEntity, UserEntity]),
  ],
  providers: [CollectService],
  exports: [CollectService],
})
export class CollectModule {}
