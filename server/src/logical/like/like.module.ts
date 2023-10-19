/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-29 16:32:42
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-01 21:01:48
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\logical\like\like.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
// import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ArticleEntity } from '../article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity, UserEntity, ArticleEntity])],
  // controllers: [LikeController],
  providers: [
    LikeService,
    // ArticleService,
    // UserRepository,
    // ArticleRepository,
    // LikeRepository,
    // CollectRepository,
  ],
})
export class LikeModule {}
