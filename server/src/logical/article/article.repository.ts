import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { CreateArticleDto } from './dto/article.create.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private entityManager: EntityManager) {
    super(ArticleEntity, entityManager);
  }
  async findArticle(article_id: string): Promise<ArticleEntity> {
    const article = await this.findOne({
      where: { article_id },
      relations: [],
    });
    if (!article) {
      throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
    }
    return article;
  }
}
