import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveEntity } from './entities/active.entity';
import { JwtService } from '@nestjs/jwt';
// import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/entities/user.entity';
import { TeamModule } from '../team/team.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TeamService } from '../team/team.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ActiveEntity, UserEntity]),
    TeamModule,
    UserModule,
  ],
  controllers: [ActiveController],
  providers: [
    UserService,
    ActiveService,
    // UserRepository,
    JwtService,
  ],
  exports: [ActiveService],
})
export class ActiveModule {}
