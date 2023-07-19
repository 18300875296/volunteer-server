import { Injectable } from '@nestjs/common';
import { CreateSlideDto } from './dto/create-slide.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SlideEntity } from './entities/slide.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlideService {
  constructor(
    @InjectRepository(SlideEntity)
    private readonly slideRepository: Repository<SlideEntity>,
  ) {}
  async create(createSlide: CreateSlideDto) {
    const slide = new SlideEntity();
    slide.description = createSlide.description;
    slide.place = createSlide.place;
    slide.title = createSlide.title;
    slide.url = createSlide.url;
    await this.slideRepository.save(slide);
    return { message: '新增轮播图成功' };
  }
  // 获取每个位置的轮播图
  async getSlides(place: string) {
    return await this.slideRepository
      .createQueryBuilder('slide')
      .where('slide.place=:place', { place })
      .getMany();
  }
  async getSlide(slide_id: string): Promise<SlideEntity> {
    return await this.slideRepository.findOne({ where: { slide_id } });
  }
  async deleteSlide(slide_id: string) {
    await this.slideRepository.delete(slide_id);
    return { message: '删除轮播图成功' };
  }
  async getSlidesByPlace(keyword: string, limit: number) {
    return await this.slideRepository
      .createQueryBuilder('slide')
      .where('slide.place=:keyword', { keyword })
      .orderBy('slide.create_at', 'DESC')
      .limit(limit)
      .getMany();
  }
  // 更新字段
  async update(slide_id: string, slide: Partial<SlideEntity>) {
    const { title, description, url } = slide;
    await this.slideRepository.update(slide_id, { title, description, url });
    return { message: '更新成功' };
  }
}
