import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectArticleEntity } from './entities/collect_article.entity';
import { ArticleEntity } from '../article/entities/article.entity';
import { UserEntity } from '../user/entities/user.entity';
@Injectable()
export class CollectService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(CollectArticleEntity)
    private readonly collectRepository: Repository<CollectArticleEntity>,
    // private readonly articleService: ArticleService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // private readonly userService: UserService,
  ) {}
  //检查是否收藏
  async collectExists(
    article_id: string,
    user_id: string,
  ): Promise<CollectArticleEntity> {
    try {
      return await this.collectRepository
        .createQueryBuilder('collect')
        .leftJoinAndSelect('collect.article', 'article')
        .leftJoinAndSelect('collect.user', 'user')
        .where('article.article_id=:article_id', { article_id })
        .andWhere('user.user_id=:user_id', { user_id })
        .getOne();
    } catch (error) {
      throw new HttpException('服务端出错', HttpStatus.BAD_REQUEST);
    }
  }

  //对文章进行收藏
  async collectArticle(article_id: string, user_id: string): Promise<any> {
    console.log(user_id);
    const validateCollect = await this.collectExists(article_id, user_id);
    if (!validateCollect) {
      const article = await this.articleRepository.findOne({
        where: { article_id },
      });
      if (!article) {
        throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
      }
      try {
        const user = await this.userRepository.findOne({ where: { user_id } });
        const collect = new CollectArticleEntity();
        collect.article = article;
        collect.user = user;
        article.collectCount += 1;
        await this.collectRepository.save(collect);
        await this.articleRepository.update(article_id, {
          collectCount: article.collectCount,
        });
        return {
          collect_count: article.collectCount,
          collect_by_current_user: true,
        };
        // return await this.articleService.updateCollect(
        //   article_id,
        //   article.collectCount,
        //   true,
        // );
      } catch (error) {
        throw new HttpException(
          `服务端错误:${error}}`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    } else {
      throw new HttpException('用户已经收藏', HttpStatus.BAD_REQUEST);
    }
  }
  // 取消对文章的收藏
  async cancelCollectArticle(
    article_id: string,
    user_id: string,
  ): Promise<any> {
    const validateCollect = await this.collectExists(article_id, user_id);
    if (validateCollect) {
      try {
        const article = await this.articleRepository.findOne({
          where: { article_id },
        });
        if (!article) {
          throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
        }
        article.collectCount -= 1;
        await this.collectRepository.delete(validateCollect.collect_id); // 删除收藏表中的数据
        await this.articleRepository.update(article_id, {
          collectCount: article.collectCount,
        });
        return {
          collect_count: article.collectCount,
          collect_by_current_user: false,
        };
        // return await this.articleService.updateCollect(
        //   article_id,
        //   article.collectCount,
        //   false,
        // );
      } catch (error) {
        throw new HttpException(
          `服务端错误:${error}}`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    } else {
      throw new HttpException('用户未收藏', HttpStatus.BAD_REQUEST);
    }
  }
}
