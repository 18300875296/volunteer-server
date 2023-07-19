import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { UserModule } from '../user/user.module';
import { ActiveModule } from '../active/active.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
    UserModule,
    ActiveModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
