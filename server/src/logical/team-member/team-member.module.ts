import { Module, forwardRef } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMemberEntity } from './entities/team-member.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { TeamMemberApplicationModule } from '../team-member-application/team-member-application.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMemberEntity]),
    UserModule,
    RoleModule,
    TeamMemberApplicationModule,
    forwardRef(() => TeamModule),
  ],
  controllers: [TeamMemberController],
  providers: [TeamMemberService],
  exports: [TeamMemberService, UserModule, RoleModule],
})
export class TeamMemberModule {}
