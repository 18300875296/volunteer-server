import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { CollectArticleEntity } from './entities/collect_article.entity';
// import { CreateArticleDto } from './dto/article.create.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
@EntityRepository(CollectArticleEntity)
export class CollectRepository extends Repository<CollectArticleEntity> {
  constructor(private entityManager: EntityManager) {
    super(CollectArticleEntity, entityManager);
  }

  //检查是否收藏
  async collectExists(
    article_id: number,
    user_id: number,
  ): Promise<CollectArticleEntity> {
    try {
      return await this.createQueryBuilder('collect')
        .leftJoinAndSelect('collect.article', 'article')
        .leftJoinAndSelect('collect.user', 'user')
        .where('article.article_id=:article_id', { article_id })
        .andWhere('user.user_id=:user_id', { user_id })
        .getOne();
    } catch (error) {
      throw new HttpException('服务端出错', HttpStatus.BAD_REQUEST);
    }
  }
}
