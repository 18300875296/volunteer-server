import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
// import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { ArticleRepository } from '../article/article.repository';
// import { UserRepository } from '../user/user.repository';
import { ArticleService } from '../article/article.service';
import { LikeRepository } from '../like/like.repository';
import { CollectRepository } from '../collect/collect.repository';
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
