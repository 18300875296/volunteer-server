import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.create.dto';
import { UpdateArticleDto } from './dto/update.article.dto';
import { ArticleGuard } from '../auth/article.guard';
import { LikeService } from '../like/like.service';
import { CollectService } from '../collect/collect.service';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { RequestUser } from 'src/utils/app.interface';
@Controller('article')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private likeService: LikeService,
    private collectService: CollectService,
  ) {}

  /*******************************获取文章列表*************************************/
  // 获取全部的文章数据(管理员)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('/all')
  async getArticlesAll(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return this.articleService.getArticlesAll(page, pagesize);
  }
  //获取按浏览量排序的文章列表(分页)
  @Public()
  @Get('hottest')
  async getHottest(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.articleService.getListByRead(+page, +pagesize);
  }
  //获取按时间排序的文章列表(分页)
  @Public()
  @Get('newest')
  async getNewest(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.articleService.getListByTime(+page, +pagesize);
  }
  // 获取按点赞排序的文章列表(分页)
  @Public()
  @Get('likes')
  async getListByLikes(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.articleService.getByLikes(+page, +pagesize);
  }
  // 获取按收藏排序的文章列表(分页)
  @Public()
  @Get('collects')
  async getListByCollects(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.articleService.getListByCollects(+page, +pagesize);
  }
  // 关键字搜索文章(分页)
  @Public()
  @Get('keyword')
  async getListByKeywords(@Query() query) {
    return await this.articleService.getListByKeywords(
      query.keyword,
      +query.page,
      +query.pageSize,
    );
  }
  // 通过标签进行搜索(分页)
  @Public()
  @Get('tag')
  async getListByTags(@Query() query) {
    return await this.articleService.getListByTags(
      query.tags,
      +query.page,
      +query.pageSize,
    );
  }
  /*******************************文章CURD*************************************/
  //创建某一篇文章
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Post('create')
  async create(@Body() article: CreateArticleDto, @Req() req: any) {
    return await this.articleService.create(article, req.user.user_id);
  }
  // 修改某一篇文章
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateArticleDto) {
    return await this.articleService.updateById(id, body);
  }
  // 删除某一篇文章
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Delete(':article_id')
  delete(@Param('article_id') article_id: string) {
    return this.articleService.delateById(article_id);
  }
  // 获取某一篇文章
  @Public()
  @UseGuards(ArticleGuard)
  @Get('/:article_id')
  async getOne(
    @Param('article_id') article_id: string,
    @Req() req: RequestUser,
  ) {
    const { user_id } = req.user;
    // -1为问题用户 1为正常用户
    return await this.articleService.getOneById(article_id, user_id);
  }

  /*******************************文章收藏CURD*************************************/
  // 对某一篇文章收藏
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':id/collect')
  async putCollect(@Param('id') id: string, @Req() req: any) {
    const { user_id } = req.user;
    const article_id = id;
    console.log(req.user);
    return await this.collectService.collectArticle(article_id, user_id);
  }
  // 对某一篇文章取消收藏
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':article_id/uncollect')
  async cancelCollect(
    @Param('article_id') article_id: string,
    @Req() req: any,
  ) {
    const { user_id } = req.user;
    return await this.collectService.cancelCollectArticle(article_id, user_id);
  }
  // 查看收藏文章列表
  /*******************************文章点赞CURD*************************************/
  // 对某一篇文章点赞
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':article_id/like')
  async putLike(
    @Param('article_id') article_id: string,
    @Req() req: RequestUser,
  ) {
    const { user_id } = req.user;
    console.log(user_id, article_id);
    return await this.likeService.likeArticle(article_id, user_id);
  }
  // 对某一篇文章取消点赞
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':article_id/unlike')
  async cancelLike(@Param('article_id') article_id: string, @Req() req: any) {
    const { user_id } = req.user;
    return await this.likeService.cancelLikeArticle(article_id, user_id);
  }
  // 查看点赞文章列表
  /*******************************文章标签CRUD*************************************/
  // 创建标签
  // 删除标签
  // 查看标签
  /*******************************文章评论CRUD*************************************/
  // 对某一篇文章提交评论
  // 对某一篇文章删除评论
  // 对某一篇文章查看评论
  // 对某一篇文章的评论点赞
}
