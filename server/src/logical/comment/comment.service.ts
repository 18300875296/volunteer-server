// import { Injectable } from '@nestjs/common';
// import { CreateCommentDto } from './dto/create.comment.dto';
// import { CommentParentEntity } from './entities/comment.parent.entity';
// import { CommentChildrenEntity } from './entities/comment.children.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Pagination, PaginationUtil } from '../../utils/pagination.util';
// import { Comment, CommentChildren, CommentType } from './comment.interface';
// import { UserService } from '../user/user.service';
// import { ArticleService } from '../article/article.service';
// @Injectable()
// export class CommentService {
//   constructor(
//     @InjectRepository(CommentParentEntity)
//     private readonly commentParentRepository: Repository<CommentParentEntity>,
//     @InjectRepository(CommentChildrenEntity)
//     private readonly commentChildrenRepository: Repository<CommentChildrenEntity>,
//     private readonly paginationUtil: PaginationUtil,
//     private readonly userService: UserService,
//     private readonly articleService: ArticleService,
//   ) {}

//   // 包装数据
//   // 创建评论
//   async createComment(
//     createCommentDto: CreateCommentDto,
//     user_id: string,
//   ): Promise<CommentChildrenEntity | CommentParentEntity> {
//     const { parent_id, replay_id } = createCommentDto;
//     if (!parent_id && !replay_id)
//       return this.createParentComment(createCommentDto, user_id); // 一级评论
//     if (parent_id && replay_id)
//       return this.createChildrenComment(createCommentDto, user_id); // 回复二级评论的评论
//     if (parent_id && !replay_id)
//       return this.createChildrenComment(createCommentDto, user_id); // 没有回复的二级评论
//     throw Error('创建评论参数错误');
//   }
//   // 创建父评论
//   private async createParentComment(
//     createCommentDto: CreateCommentDto,
//     user_id: string,
//   ): Promise<CommentParentEntity> {
//     try {
//       const commentParent = new CommentParentEntity();
//       Object.assign(commentParent, { ...createCommentDto }, { user_id });
//       return this.commentParentRepository.save(commentParent);
//     } catch (error) {}
//   }
//   // 创建子评论
//   private async createChildrenComment(
//     createCommentDto: CreateCommentDto,
//     user_id: string,
//   ): Promise<CommentChildrenEntity> {
//     const commentChildren = new CommentChildrenEntity();
//     Object.assign(commentChildren, { ...createCommentDto }, { user_id });
//     return await this.commentChildrenRepository.save(commentChildren);
//   }
//   // 将用户信息填充到每一条评论上
//   private async transformComment(
//     comment: CommentChildrenEntity | CommentParentEntity,
//     article_id: string,
//     current_user_id: string,
//     commentType: CommentType,
//   ): Promise<Comment | CommentChildren | null> {
//     // 获取子评论中用户的信息
//     const userinfo = {
//       avatar: '',
//       nickname: '',
//       is_current_user_comment: false,
//       is_publisher_comment: false,
//     };
//     const { avatar, nickname } = await this.userService.getUserInfo(
//       comment.user_id,
//     );
//     userinfo['avatar'] = avatar;
//     userinfo['nickname'] = nickname;
//     // 判断当前用户是否是当前评论的发布者
//     if (current_user_id && current_user_id === comment.user_id) {
//       userinfo['is_current_user_comment'] = true;
//     } else {
//       userinfo['is_current_user_comment'] = false;
//     }
//     // 判断此条评论是否是发帖人发布
//     const publisher_id = await this.articleService.getArticleAuthor(article_id);
//     if (publisher_id && publisher_id === comment.comment_id) {
//       userinfo['is_publisher_comment'] = true;
//     } else {
//       userinfo['is_publisher_comment'] = false;
//     }
//     if (commentType && commentType === 'CommentParentEntity') {
//       return Object.assign(
//         comment as CommentParentEntity,
//         { ...userinfo },
//         { children_comment: null, children_total: 0 },
//       );
//     } else if (commentType && commentType === 'CommentChildrenEntity') {
//       return Object.assign(comment as CommentChildrenEntity, { ...userinfo });
//     } else {
//       return null;
//     }
//   }
//   // 构造评论
//   private async buildComment(
//     commentParent: CommentParentEntity,
//     article_id: string,
//     current_user_id: string,
//     page_children: number,
//     limit_children: number,
//   ): Promise<Comment> {
//     const comment = {
//       comment_id: '',
//       user_id: '',
//       avatar: '',
//       nickname: '',
//       content: '',
//       is_publisher_comment: false,
//       like_count: 0,
//       is_current_user_comment: false,
//       create_at: new Date(),
//       children_comment: null,
//       children_total: 0,
//     };
//     // 填充一级评论的数据
//     const _parent = await this.transformComment(
//       commentParent,
//       article_id,
//       current_user_id,
//       'CommentParentEntity',
//     );
//     // 获取每一条一级评论下的子评论(分页)
//     const { data, total } = await this.findChildrenComments(
//       article_id,
//       current_user_id,
//       commentParent.comment_id,
//       page_children,
//       limit_children,
//     );
//     Object.assign(comment, { ..._parent });
//     comment.children_comment = data;
//     comment.children_total = total;
//     return comment;
//   }
//   // 查询某一篇文章的所有父评论(分页)
//   async findComments(
//     article_id: string,
//     current_user_id: string,
//     page_parent: number,
//     page_children: number,
//     limit_parent: number,
//     limit_children: number,
//   ): Promise<Pagination<Comment>> {
//     const { data, total } = await this.paginationUtil.paginate(
//       this.commentParentRepository,
//       page_parent,
//       limit_parent,
//       [{ article_id }],
//       'create_at',
//       'DESC',
//     );

//     if (!data.length) return { data: [], total: 0 };
//     const result: Comment[] = [];
//     for (const commentParent of data) {
//       const comment = await this.buildComment(
//         commentParent,
//         article_id,
//         current_user_id,
//         page_children,
//         limit_children,
//       );
//       result.push(comment);
//     }
//     return { data: result, total };
//   }
//   // 查询某一个父评论的子评论
//   async findChildrenComments(
//     article_id: string,
//     current_user_id: string,
//     parent_id: string,
//     page: number,
//     limit: number,
//   ): Promise<Pagination<CommentChildren>> {
//     const { data, total } = await this.paginationUtil.paginate(
//       this.commentChildrenRepository,
//       page,
//       limit,
//       [{ parent_id }],
//       'create_at',
//       'DESC',
//     );
//     if (!(data && data.length)) return { data: [], total: 0 };
//     const result: CommentChildren[] = [];
//     for (const children of data) {
//       const _children = await this.transformComment(
//         children,
//         article_id,
//         current_user_id,
//         'CommentChildrenEntity',
//       ); // 填充用户信息到评论中
//       result.push(_children as CommentChildren);
//     }
//     return { data: result, total };
//   }
// }
