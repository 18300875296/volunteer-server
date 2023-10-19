/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-29 16:32:42
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-01 12:39:37
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\app.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { typeormModule } from './database/typeorm.module';
import { ArticleModule } from './logical/article/article.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from './logical/user/user.module';
import { ActiveModule } from './logical/active/active.module';
// import { CategoryModule } from './logical/category/category.module';
import { TagModule } from './logical/tag/tag.module';
import { EmailModule } from './logical/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MenuModule } from './logical/menu/menu.module';
import { LikeModule } from './logical/like/like.module';
import { CollectModule } from './logical/collect/collect.module';
import { RoleModule } from './logical/role/role.module';
import { FileModule } from './logical/File/File.module';
import { ApplicationModule } from './logical/application/application.module';
import { TeamModule } from './logical/team/team.module';
import { SlideModule } from './logical/slide/slide.module';
import { TeamMemberModule } from './logical/team-member/team-member.module';
import { TeamApplicationModule } from './logical/team-application/team-application.module';
import { TeamMemberApplicationModule } from './logical/team-member-application/team-member-application.module';
// import { LogsModule } from './logical/logs/logs.module';
import { ElegantModule } from './logical/elegant/elegant.module';
// import { CommentModule } from './logical/comment/comment.module';
import { MenuTagModule } from './logical/menu_tag/menu_tag.module';
@Module({
  imports: [
    typeormModule,
    AuthModule,
    UserModule,
    TeamMemberModule,
    SlideModule,
    // LogsModule,
    ElegantModule,
    // CommentModule,
    // MailerModule,

    RoleModule,
    FileModule,
    ArticleModule,
    ActiveModule,
    TeamModule,
    TeamApplicationModule,
    TeamMemberApplicationModule,
    // CategoryModule,
    TagModule,
    LikeModule,
    EmailModule,
    MenuModule,
    CollectModule,
    ApplicationModule,
    MenuTagModule,
  ],
})
export class AppModule {}
