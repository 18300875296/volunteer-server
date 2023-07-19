import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async findOne(category_name: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOneBy({ category_name });
  }
  async create(category_name: string): Promise<CategoryEntity> {
    return await this.categoryRepository.save({ category_name });
  }
}
