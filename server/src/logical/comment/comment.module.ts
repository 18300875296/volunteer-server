// import { Module } from '@nestjs/common';
// import { CommentService } from './comment.service';
// import { CommentController } from './comment.controller';
// import { CommentParentEntity } from './entities/comment.parent.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CommentChildrenEntity } from './entities/comment.children.entity';
// // import { PaginationUtil } from 'src/utils/pagination.util';
// import { UserService } from '../user/user.service';
// import { ArticleService } from '../article/article.service';
// import { UserModule } from '../user/user.module';
// import { ArticleModule } from '../article/article.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([CommentChildrenEntity, CommentParentEntity]),
//     UserModule,
//     ArticleModule,
//   ],
//   controllers: [CommentController],
//   providers: [CommentService, PaginationUtil],
// })
// export class CommentModule {}
