/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-29 16:32:42
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:56:23
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\logical\article\article.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './dto/article.create.dto';
import { ArticleEntity } from './entities/article.entity';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../like/entities/like.entity';
import { CollectArticleEntity } from '../collect/entities/collect_article.entity';
import { ArticleCategoryService } from './articleCategory.service';
import { validArticle, makePrefix } from './article.utils';
import { UpdateArticleDto } from './dto/update.article.dto';
import {
  paginate,
  Pagination,
  generateQuery,
} from '../../utils/pagination.util';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(CollectArticleEntity)
    private readonly collectRepository: Repository<CollectArticleEntity>,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}
  /**
   * @description: 查询文章作者
   * @param {string} article_id 文章id
   * @return {*} 作者id
   */
  async getArticleAuthor(article_id: string): Promise<string | null> {
    if (!(article_id && typeof article_id === 'string')) return null;
    const article = await this.articleRepository.findOne({
      where: { article_id },
      relations: ['user'], // 加载关联的 user 信息
    });
    if (!article || !article.user) {
      return null;
    }
    return article.user.user_id;
  }

  /**
   * @description: 查询文章是否存在
   * @param {string} article_id
   * @return {Promise<ArticleEntity>}
   */
  async validateArticleId(article_id: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { article_id },
      relations: ['user'],
    });
    if (!article) {
      throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
    }
    return article;
  }

  /**
   * @description: 创建文章
   * @param {CreateArticleDto} article
   * @param {string} user_id
   * @return {string} article_id
   */
  async createArticle(
    article: CreateArticleDto,
    user_id: string,
  ): Promise<{ article_id: string }> {
    const { title, content, status, images, tags, categoryName } = article;
    const validate = validArticle(title, content, tags);
    if (validate) {
      try {
        const user = await this.userRepository.findOne({ where: { user_id } }); // 获取作者信息
        const categoryEntity = await this.articleCategoryService.getCategoryId(
          categoryName,
        );
        const summary = makePrefix(content); // 生成摘要
        const article = new ArticleEntity();
        article.title = title;
        article.content = content;
        article.status = status;
        article.images = images;
        article.summary = summary;
        article.category_id = categoryEntity.category_id;
        article.tags = tags;
        article.user = user;
        const { article_id } = await this.articleRepository.save(article); //存文章数据
        return {
          article_id,
        };
      } catch (error) {
        throw new HttpException(
          `服务端出错${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  /**
   * @description: 更新文章
   * @param article_id
   * @param updateArticle
   * @return {*}
   */
  async updateArticle(
    article_id: string,
    updateArticle: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const { title, content, images, tags, status, categoryName } =
      updateArticle;
    const categoryEntity = await this.articleCategoryService.getCategoryId(
      categoryName,
    );
    const summary = makePrefix(content); // 验证内容是否改变生成新的摘要
    const article = await this.articleRepository.findOne({
      where: { article_id },
    });
    if (article) {
      try {
        article.title = title || article.title;
        article.content = content || article.content;
        article.images = images || article.images;
        article.tags = tags || article.tags;
        article.summary = summary || article.summary;
        article.status = status || article.status;
        article.category_id = categoryEntity.category_id;
        return await this.articleRepository.save(article); //存入数据库
      } catch (error) {
        throw new HttpException('更新文章出错', HttpStatus.SERVICE_UNAVAILABLE);
      }
    }
    throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
  }

  /**
   * @description: 删除文章
   * @param {string} article_id
   * @return {void}
   */
  async delateById(article_id: string): Promise<{ message: string }> {
    try {
      await this.articleRepository.delete(article_id);
      return { message: '删除成功' };
    } catch (error) {
      throw new HttpException(
        '删除失败,服务端出错',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  // 更新文章中likeCount的一个字段
  // async updateLike(
  //   article_id: number,
  //   likeCount: number,
  //   isLike: boolean,
  // ): Promise<any> {
  //   try {
  //     await this.articleRepository.update(article_id, { likeCount });
  //     return {
  //       like_count: likeCount,
  //       like_by_current_user: isLike,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       `更新likeCount字段出错${error}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // // 更新文章中likeCount的一个字段
  // async updateCollect(
  //   article_id: number,
  //   collectCount: number,
  //   is_collect: boolean,
  // ): Promise<any> {
  //   try {
  //     await this.articleRepository.update(article_id, { collectCount });
  //     return {
  //       collect_count: collectCount,
  //       collect_by_current_user: is_collect,
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       `更新collectCount字段出错 ${error}`,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  /**
   * @description: 获取某篇文章
   * @param article_id
   * @param user_id
   * @return {*}
   */
  async getArticle(
    article_id: string,
    user_id?: string,
  ): Promise<ArticleEntity> {
    const article = await this.validateArticleId(article_id);
    if (user_id) {
      const like = await this.likeRepository
        .createQueryBuilder('like')
        .leftJoinAndSelect('like.user', 'user')
        .leftJoinAndSelect('like.article', 'article')
        .where('user.user_id=:user_id', { user_id })
        .andWhere('article.article_id=:article_id', { article_id })
        .getOne();
      like
        ? (article['like_by_current_user'] = true)
        : (article['like_by_current_user'] = false);
      const collect = await this.collectRepository
        .createQueryBuilder('collect')
        .leftJoinAndSelect('collect.article', 'article')
        .leftJoinAndSelect('collect.user', 'user')
        .where('article.article_id=:article_id', { article_id })
        .andWhere('user.user_id=:user_id', { user_id })
        .getOne();
      collect
        ? (article['collect_by_current_user'] = true)
        : (article['collect_by_current_user'] = false);
    }
    // 游客(只返回文章和作者),用户返回点赞收藏状态
    delete article.user.password;
    delete article.user.salt;
    return article;
  }

  /**
   * @description: 获取所有的文章
   * @param {number} page
   * @param {number} pageSize
   * @param {string} categoryName
   * @param {string} fields
   * @return {*}
   */
  async getArticles(
    page: number,
    pageSize: number,
    fields: Partial<ArticleEntity>,
    orderKey: keyof ArticleEntity,
  ): Promise<Pagination<ArticleEntity>> {
    const query = generateQuery(fields);
    const articles = await paginate(
      this.articleRepository,
      page,
      pageSize,
      query,
      orderKey,
      'DESC',
    );
    return articles;
  }
}
