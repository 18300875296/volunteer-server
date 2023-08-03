import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { AuthModule } from '../auth/auth.module';
import { ArticleRepository } from './article.repository';
// import { UserRepository } from '../user/user.repository';
import { FileModule } from '../File/File.module';
import { LikeModule } from '../like/like.module';
import { LikeService } from '../like/like.service';
import { LikeRepository } from '../like/like.repository';
import { CollectRepository } from '../collect/collect.repository';
import { CollectService } from '../collect/collect.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { LikeEntity } from '../like/entities/like.entity';
import { CollectModule } from '../collect/collect.module';
import { CollectArticleEntity } from '../collect/entities/collect_article.entity';
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
    ]),
    AuthModule,
    FileModule,
    LikeModule,
    CollectModule,
  ],
  providers: [
    ArticleService,
    LikeService,
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
