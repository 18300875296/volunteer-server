import { Module } from '@nestjs/common';
import { ElegantService } from './elegant.service';
import { ElegantController } from './elegant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElegantEntity } from './entities/elegant.entity';
import { UserModule } from '../user/user.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [TypeOrmModule.forFeature([ElegantEntity]), UserModule, TeamModule],
  controllers: [ElegantController],
  providers: [ElegantService],
})
export class ElegantModule {}
