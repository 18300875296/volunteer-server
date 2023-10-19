import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LikeEntity } from './entities/like.entity';
// import { ArticleRepository } from '../article/article.repository';
import { ArticleService } from '../article/article.service';

import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../article/entities/article.entity';
@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // private readonly articleService: ArticleService,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  // 验证点赞是否存在
  async likeExists(article_id: string, user_id: string): Promise<LikeEntity> {
    try {
      return this.likeRepository
        .createQueryBuilder('like')
        .leftJoinAndSelect('like.user', 'user')
        .leftJoinAndSelect('like.article', 'article')
        .where('user.user_id=:user_id', { user_id })
        .andWhere('article.article_id=:article_id', { article_id })
        .getOne();
    } catch (error) {
      throw new HttpException(
        `服务端错误:${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // 对文章点赞
  async likeArticle(article_id: string, user_id: string): Promise<any> {
    const isLike = await this.likeExists(article_id, user_id); //检查用户是否点赞
    if (!isLike) {
      try {
        const user = await this.userRepository.findOne({ where: { user_id } });
        const article = await this.articleRepository.findOne({
          where: { article_id },
        });

        const like = new LikeEntity();
        like.user = user;
        like.article = article;
        article.likeCount += 1;
        this.likeRepository.save(like);
        await this.articleRepository.update(article_id, {
          likeCount: article.likeCount,
        });
        return {
          like_count: article.likeCount,
          like_by_current_user: true,
        }; // 更新文章
      } catch (error) {
        throw new HttpException(
          `服务端错误:${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException('用户已经点赞', HttpStatus.BAD_REQUEST);
  }

  //取消对文章的点赞
  async cancelLikeArticle(article_id: string, user_id: string): Promise<any> {
    const like = await this.likeExists(article_id, user_id); //检查用户是否点赞
    if (like) {
      try {
        const article = await this.articleRepository.findOne({
          where: { article_id },
        });
        article.likeCount -= 1;
        await this.likeRepository.delete(like.like_id); // 删除点赞表中的信息
        await this.articleRepository.update(article_id, {
          likeCount: article.likeCount,
        });
        return {
          like_count: article.likeCount,
          like_by_current_user: false,
        };
        // return await this.articleService.updateLike(
        //   article_id,
        //   article.likeCount,
        //   false,
        // ); // 更新文章表
      } catch (error) {
        throw new HttpException(
          `服务端错误:${error}}`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    }
    throw new HttpException('用户还没有点赞', HttpStatus.BAD_REQUEST);
  }
}
