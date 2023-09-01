import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CommentParentEntity } from './entities/comment.parent.entity';
import { RequestUser } from 'src/types/app.interface';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { CommentChildrenEntity } from './entities/comment.children.entity';
import { Comment } from './comment.interface';
import { Pagination } from 'src/utils/pagination.util';
import { Public } from '../auth/decorator/public.decorator';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  // 查询某一篇文章的一级评论
  @Public()
  @Get()
  async getParentComment(
    @Query('article_id') article_id: string,
    @Req() request: RequestUser,
    @Query('page_parent') page_parent: number,
    @Query('page_children') page_children: number,
    @Query('limit_parent') limit_parent: number,
    @Query('limit_children') limit_children: number,
  ): Promise<Pagination<Comment>> {
    const user_id = request.user ? request.user.user_id : null;
    return await this.commentService.findComments(
      article_id,
      user_id,
      page_parent,
      page_children,
      limit_parent,
      limit_children,
    );
  }
  // 在某一篇文章下创建一条评论
  @Roles(Role.User, Role.TeamAdmin, Role.SuperAdmin, Role.Admin)
  @Post('create')
  async createParentComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: RequestUser,
  ): Promise<CommentParentEntity | CommentChildrenEntity> {
    const { user_id } = request.user;
    return await this.commentService.createComment(createCommentDto, user_id);
  }

  // 查询某一篇文章的二级评论
  // 修改某一篇文章的一级评论
  // 修改某一篇文章的二级评论
  // 删除某一篇文章的一级评论
  // 删除某一篇文章的二级评论
}
