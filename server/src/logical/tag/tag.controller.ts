import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { RequestUser } from 'src/types/app.interface';
import { Public } from '../auth/decorator/public.decorator';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get('')
  async getTags(@Req() req: RequestUser): Promise<TagEntity[]> {
    const user_id = req.user ? req.user.user_id : '';
    return await this.tagService.getTags(user_id);
  }
  @Post('create')
  async createTag(
    @Body() createTagDto: CreateTagDto,
    @Req() req: RequestUser,
  ): Promise<void> {
    const { user_id, role } = req.user;
    await this.tagService.createTag(createTagDto, { user_id, role });
  }
}
