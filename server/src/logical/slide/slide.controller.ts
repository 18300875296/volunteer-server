import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Header,
} from '@nestjs/common';
import { SlideService } from './slide.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { FileService } from '../File/File.service';

@Controller('slide')
export class SlideController {
  constructor(
    private readonly slideService: SlideService,
    private readonly fileService: FileService,
  ) {}

  @Roles(Role.Admin, Role.SuperAdmin)
  @Post('create')
  async create(@Body() createSlide: CreateSlideDto) {
    console.log(createSlide);
    return await this.slideService.create(createSlide);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('list')
  async getSlides(@Query('place') place: string) {
    return this.slideService.getSlides(place);
  }
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete('delete/:slide_id')
  async deleteSlide(@Param('slide_id') slide_id: string) {
    const slideEntity = await this.slideService.getSlide(slide_id);
    const filename = slideEntity.url.split('/').at(-1);
    await this.fileService.deleteFile(filename);
    return this.slideService.deleteSlide(slide_id);
  }
  @Roles(Role.Admin, Role.SuperAdmin)
  @Patch('update/:slide_id')
  async updateSlide(
    @Param('slide_id') slide_id: string,
    @Body() partialSlide: any,
  ) {
    return await this.slideService.update(slide_id, partialSlide);
  }

  @Public()
  @Get()
  @Header('Cache-Control', 'max-age=3600') // 设置缓存有效期为1小时
  async getSlidesByPlace(
    @Query('keyword') keyword: string,
    @Query('limit') limit: number,
  ) {
    return await this.slideService.getSlidesByPlace(keyword, limit);
  }
}
