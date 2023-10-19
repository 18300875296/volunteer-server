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
  async getTags(user_id: string): Promise<TagEntity[]> {
    const tags: TagEntity[] = [];
    const systemTags = await this.tagRepository.find({
      where: { is_custom: false },
    });
    tags.push(...systemTags);
    if (user_id) {
      const userTags = await this.tagRepository.find({ where: { user_id } });
      tags.push(...userTags);
    }
    return [...new Set(tags)]; // 去重
  }
  async createTag(
    tagDto: CreateTagDto,
    payload: { user_id: string; role: string },
  ): Promise<void> {
    const { tagName, displayName } = tagDto;
    let is_custom = true;
    if (payload.role === 'admin' || 'super_admin') {
      is_custom = false;
    }
    const tagEntity = new TagEntity();
    Object.assign(tagEntity, {
      tagName,
      displayName,
      is_custom,
      user_id: payload.user_id,
    });
    this.tagRepository.save(tagEntity);
  }

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
