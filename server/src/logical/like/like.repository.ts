import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
// import { CreateArticleDto } from './dto/article.create.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
@EntityRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {
  constructor(private entityManager: EntityManager) {
    super(LikeEntity, entityManager);
  }
  // 验证点赞是否存在
  async likeExists(article_id: number, user_id: number): Promise<LikeEntity> {
    try {
      return this.createQueryBuilder('like')
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
}
