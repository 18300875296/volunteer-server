/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-10-01 09:51:11
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-01 10:20:28
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\logical\article\articleCategory.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from './entities/articleCategory.entity';
@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private readonly articleCategoryRepository: Repository<ArticleCategoryEntity>,
  ) {}
  /**
   * @description: 通过内部名查找分类id
   * @param {string} categoryName 文章分类名
   * @return {Promise<ArticleCategoryEntity>} 文章分类实体
   */
  async getCategoryId(categoryName: string): Promise<ArticleCategoryEntity> {
    return await this.articleCategoryRepository.findOne({
      where: { categoryName },
    });
  }
  /**
   * @description: 获取所有的文章分类
   * @return {Promise<ArticleCategoryEntity[]>}文章分类实体数组
   */
  async getArticleCategories(): Promise<ArticleCategoryEntity[]> {
    return await this.articleCategoryRepository.find();
  }
}
