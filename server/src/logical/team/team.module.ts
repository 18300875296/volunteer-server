import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { TeamMemberModule } from '../team-member/team-member.module';
import { TeamMemberService } from '../team-member/team-member.service';
import { TeamApplicationModule } from '../team-application/team-application.module';
import { TeamApplicationService } from '../team-application/team-application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity]),
    UserModule,
    RoleModule,
    TeamMemberModule,
    TeamApplicationModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
