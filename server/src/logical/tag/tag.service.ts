import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  // async create(tag_name: string): Promise<null | TagEntity> {
  //   return this.tagRepository.save({ tag_name });
  // }

  // async findOne(tags: string[]): Promise<any> {
  //   const ans = [];
  //   for (const tag_name of tags) {
  //     let tag = await this.tagRepository.findOneBy({ tag_name });
  //     if (!tag) {
  //       tag = await this.create(tag_name);
  //     }
  //     ans.push(tag);
  //   }
  //   return ans;
  // }
}
