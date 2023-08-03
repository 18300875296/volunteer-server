import { Module, forwardRef } from '@nestjs/common';
import { TeamMemberApplicationService } from './team-member-application.service';
import { TeamMemberApplicationController } from './team-member-application.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMemberApplicationEntity } from './entities/team-member-application.entity';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamMemberApplicationEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => TeamModule),
  ],
  controllers: [TeamMemberApplicationController],
  providers: [TeamMemberApplicationService],
  exports: [TeamMemberApplicationService],
})
export class TeamMemberApplicationModule {}
