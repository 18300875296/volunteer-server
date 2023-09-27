import { Injectable } from '@nestjs/common';
import { CreateMenuTagDto } from './dto/create-menu_tag.dto';
import { UpdateMenuTagDto } from './dto/update-menu_tag.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuTagEntity } from './entities/menu_tag.entity';
@Injectable()
export class MenuTagService {
  constructor(
    @InjectRepository(MenuTagEntity)
    private readonly menuTagRepository: Repository<MenuTagEntity>,
  ) {}
  // 查询某个tag标签
  async getMenuTag(name: string): Promise<MenuTagEntity> {
    return this.menuTagRepository.findOne({
      where: { name },
      select: ['displayName', 'name', 'hidden', 'menu_tag_id', 'roles'],
    });
  }
}
