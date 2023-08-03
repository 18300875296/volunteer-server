import { Module } from '@nestjs/common';
import { TeamApplicationService } from './team-application.service';
import { TeamApplicationController } from './team-application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamApplicationEntity } from './entities/team-application.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamApplicationEntity]), UserModule],
  controllers: [TeamApplicationController],
  providers: [TeamApplicationService],
  exports: [TeamApplicationService],
})
export class TeamApplicationModule {}
