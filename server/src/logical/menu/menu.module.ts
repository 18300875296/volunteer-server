import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entity/menu.entity';
import { RoleModule } from '../role/role.module';
import { MenuTagModule } from '../menu_tag/menu_tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity]), RoleModule, MenuTagModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
