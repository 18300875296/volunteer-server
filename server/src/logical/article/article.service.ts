import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './dto/article.create.dto';
import { ArticleEntity } from './entities/article.entity';
import { Pagination } from './article.interface';
import createSummary from '../../utils/parseHTML';
import { CollectRepository } from '../collect/collect.repository';
import { LikeRepository } from '../like/like.repository';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from '../like/entities/like.entity';
import { CollectArticleEntity } from '../collect/entities/collect_article.entity';
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
  ) {}
  // 查询文章作者
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
  // 验证文章是否有效
  validArticle(title: string, content: string, tags: string): boolean {
    if (!title) {
      throw new HttpException('文章缺少标题', HttpStatus.BAD_REQUEST);
    }
    if (!content) {
      throw new HttpException('文章缺少内容', HttpStatus.BAD_REQUEST);
    }
    if (!tags) {
      throw new HttpException('文章缺少标签', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
  // 截取文章摘要
  makePrefix(content: string): string {
    const html = JSON.parse(decodeURIComponent(content));
    const summary = createSummary(html);
    if (!summary) {
      throw Error('文本解析出错');
    }
    return summary;
  }
  // 保存文章标签到标签表中
  putTags(arrayStr: string): void {
    // const tags = arrayStr.split(',');
    // Promise.all(
    //   tags.map(async (tag) => await this.articleTagService.putTag(tag)),
    // ).catch((err) => `保存标签失败,${err}`);
  }
  // 查询文章是否存在
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

  /*******************************文章CURD*************************************/
  //新建文章
  async create(article: CreateArticleDto, user_id: string): Promise<any> {
    const { title, content, state, images, tags } = article;
    const validate = this.validArticle(title, content, tags);
    if (validate) {
      try {
        const user = await this.userRepository.findOne({ where: { user_id } }); // 获取作者信息
        const summary = this.makePrefix(content); // 生成摘要
        const article = new ArticleEntity();
        article.title = title;
        article.content = content;
        article.status = state;
        article.images = images;
        article.summary = summary;
        article.tags = tags;
        article.user = user;
        const { article_id, ...rest } = await this.articleRepository.save(
          article,
        ); //存文章数据
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
  // 更新文章
  async updateById(
    article_id: string,
    updateArticle: Partial<ArticleEntity>,
  ): Promise<ArticleEntity> {
    const { title, content, images, tags } = updateArticle;
    const summary = this.makePrefix(content); // 验证内容是否改变生成新的摘要
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
        return await this.articleRepository.save(article); //存入数据库
      } catch (error) {
        throw new HttpException('更新文章出错', HttpStatus.SERVICE_UNAVAILABLE);
      }
    }
    throw new HttpException('文章不存在', HttpStatus.NOT_FOUND);
  }
  // 更新文章中likeCount的一个字段
  async updateLike(
    article_id: number,
    likeCount: number,
    isLike: boolean,
  ): Promise<any> {
    try {
      await this.articleRepository.update(article_id, { likeCount });
      return {
        like_count: likeCount,
        like_by_current_user: isLike,
      };
    } catch (error) {
      throw new HttpException(
        `更新likeCount字段出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 更新文章中likeCount的一个字段
  async updateCollect(
    article_id: number,
    collectCount: number,
    is_collect: boolean,
  ): Promise<any> {
    try {
      await this.articleRepository.update(article_id, { collectCount });
      return {
        collect_count: collectCount,
        collect_by_current_user: is_collect,
      };
    } catch (error) {
      throw new HttpException(
        `更新collectCount字段出错 ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 删除文章
  async delateById(article_id: string): Promise<any> {
    const article = await this.articleRepository.findOne({
      where: { article_id },
    });
    if (article) {
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
    throw new HttpException('删除失败,文章不存在', HttpStatus.NOT_FOUND);
  }
  // 获取某篇文章
  async getOneById(
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

  /*******************************获取文章列表*************************************/
  private usePagination = () => {
    // 获取文章总数
    const queryTotal = async () => {
      try {
        const articleList: ArticleEntity[] =
          await this.articleRepository.find();
        return articleList.length;
      } catch (error) {
        throw new HttpException(
          `查询文章总数出错,${error}`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
    };
    // 关键字查询返回不同数据
    const getDiffList = async (
      page: number,
      pageSize: number,
      keyword: string,
    ): Promise<Pagination> => {
      const listLength = await queryTotal(); // 获得文章总数
      if (!listLength) {
        throw new HttpException('文章列表数据为空', HttpStatus.NOT_FOUND);
      }
      try {
        if (listLength) {
          const total = Math.ceil(listLength / pageSize); //计算总页数
          const skip = (page - 1) * pageSize; // 记录需要跳过的数据
          const articles = await this.articleRepository
            .createQueryBuilder('article')
            .select([
              'article.article_id',
              'article.title',
              'article.summary',
              'article.tags',
              'article.images',
              'article.create_at',
              'article.update_at',
              'article.readCount',
            ])
            .orderBy(`article.${keyword}`, 'DESC')
            .skip(skip)
            .take(pageSize)
            .getMany();
          articles.map((article) => {
            const images: string[] = JSON.parse(article.images);
            if (images.length) {
              article.images = images[0];
              return JSON.stringify(article.images);
            }
          });
          return {
            total: total,
            page_size: pageSize,
            current_page: page,
            last_page: total,
            articles: articles,
          };
        }
      } catch (error) {
        throw new HttpException(
          `获取失败,${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    };
    return { getDiffList };
  };

  // 获取最热文章列表
  async getListByRead(page: number, pageSize: number): Promise<Pagination> {
    const { getDiffList } = this.usePagination();
    return await getDiffList(page, pageSize, 'readCount');
  }
  // 获取最新文章列表
  async getListByTime(page: number, pageSize: number): Promise<Pagination> {
    const { getDiffList } = this.usePagination();
    return await getDiffList(page, pageSize, 'create_at');
  }
  // 获取最多点赞文章列表
  async getByLikes(page: number, pageSize: number): Promise<Pagination> {
    const { getDiffList } = this.usePagination();
    return await getDiffList(page, pageSize, 'likeCount');
  }
  // 获取按收藏排序的文章列表
  async getListByCollects(page: number, pageSize: number): Promise<Pagination> {
    const { getDiffList } = this.usePagination();
    return await getDiffList(page, pageSize, 'collectCount');
  }
  // 获取按关键字查询的文章列表
  async getListByKeywords(keyword: string, page: number, pageSize: number) {}
  // 获取按标签查询的文章列表
  async getListByTags(tags: string, page: number, pageSize: number) {}
  // 获取所有文章(管理员)
  async getArticlesAll(page: number, pagesize: number) {
    const skip = (page - 1) * pagesize;
    const total = await this.articleRepository.count();
    const articles = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .select([
        'article.article_id',
        'article.title',
        'article.summary',
        'article.create_at',
        'article.status',
        'article.tags',
        'user.username',
        'user.user_id',
      ])
      .skip(skip)
      .take(pagesize)
      .getMany();
    const res = articles.map((article) => {
      const tagsArray = JSON.parse(article.tags);
      return { ...article, tags: tagsArray };
    });
    return { total, articles: res };
  }
}
