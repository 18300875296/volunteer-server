import { Module } from '@nestjs/common';
import { MenuTagService } from './menu_tag.service';
import { MenuTagController } from './menu_tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuTagEntity } from './entities/menu_tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuTagEntity])],
  controllers: [MenuTagController],
  providers: [MenuTagService],
  exports: [MenuTagService],
})
export class MenuTagModule {}
