/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-29 16:32:42
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-01 21:00:56
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\logical\article\article.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../File/File.module';
import { LikeModule } from '../like/like.module';
import { LikeService } from '../like/like.service';
import { CollectService } from '../collect/collect.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { LikeEntity } from '../like/entities/like.entity';
import { CollectModule } from '../collect/collect.module';
import { CollectArticleEntity } from '../collect/entities/collect_article.entity';
import { ArticleCategoryEntity } from './entities/articleCategory.entity';
import { ArticleCategoryService } from './articleCategory.service';
// import { LikeRepository } from "../like/like.repository";
// import { CollectModule } from '../collect/collect.module';
// import { ArticleTagService } from './tags/article.tag.service';
//import { AuthService } from "../auth/auth.service";
//import { CategoryModule } from '../category/category.module';
//import { TagModule } from '../tag/tag.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ArticleEntity,
      LikeEntity,
      CollectArticleEntity,
      ArticleCategoryEntity,
    ]),
    AuthModule,
    FileModule,
    LikeModule,
    CollectModule,
  ],
  providers: [
    ArticleService,
    LikeService,
    ArticleCategoryService,
    // LikeRepository,
    // CollectRepository,
    CollectService,
    JwtService,
    // ArticleTagService,
  ],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
