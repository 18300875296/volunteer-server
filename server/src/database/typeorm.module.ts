//连接数据库的工具npm install --save @nestjs/typeorm typeorm mysql2

import db from '../../config/type-orm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveEntity } from '../logical/active/entities/active.entity';
import { ArticleEntity } from '../logical/article/entities/article.entity';
import { UserEntity } from '../logical/user/entities/user.entity';
import { LikeEntity } from '../logical/like/entities/like.entity';
import { CollectArticleEntity } from '../logical/collect/entities/collect_article.entity';
import { EmailEntity } from '../logical/email/entities/email.entity';
import { RoleEntity } from '../logical/role/entities/role.entity';
import { PermissionEntity } from '../logical/permission/entities/permission.entity';
import { ApplicationEntity } from '../logical/application/entities/application.entity';
import { TeamEntity } from '../logical/team/entities/team.entity';
import { TeamMemberEntity } from 'src/logical/team-member/entities/team-member.entity';
import { TeamApplicationEntity } from 'src/logical/team-application/entities/team-application.entity';
import { TeamMemberApplicationEntity } from 'src/logical/team-member-application/entities/team-member-application.entity';
import { SlideEntity } from 'src/logical/slide/entities/slide.entity';
import { LogsEntity } from 'src/logical/logs/entities/log.entity';
import { ElegantEntity } from 'src/logical/elegant/entities/elegant.entity';
import { CommentChildrenEntity } from 'src/logical/comment/entities/comment.children.entity';
import { CommentParentEntity } from 'src/logical/comment/entities/comment.parent.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.host,
      port: db.port,
      username: db.user,
      password: db.password,
      database: db.database,
      synchronize: true, //不应在生产中使用 - 否则可能会丢失生产数据。
      logging: true,
      subscribers: [],
      migrations: [],
      retryAttempts: 10, //连接数据的个数
      // retryDelay: 3000, //重连
      entities: [
        SlideEntity,
        ActiveEntity,
        ArticleEntity,
        UserEntity,
        LikeEntity,
        CollectArticleEntity,
        EmailEntity,
        RoleEntity,
        PermissionEntity,
        ApplicationEntity,
        TeamEntity,
        TeamMemberEntity,
        TeamApplicationEntity,
        TeamMemberApplicationEntity,
        LogsEntity,
        ElegantEntity,
        CommentChildrenEntity,
        CommentParentEntity,
      ],
      // autoLoadEntities: true,
      // dropSchema: true,
    }),
  ],
})
export class typeormModule {}
