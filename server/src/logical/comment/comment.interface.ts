export enum CommentState {
  publish = 'publish',
  delete = 'delete',
  check = 'check',
}
export interface CommentChildren {
  comment_id: string;
  user_id: string;
  avatar: string;
  nickname: string;
  parent_id: string;
  content: string;
  is_publisher_comment: boolean;
  like_count: number;
  is_current_user_comment: boolean;
  create_at: Date;
  reply_id?: string;
}
export interface Comment {
  comment_id: string;
  user_id: string;
  avatar: string;
  nickname: string;
  content: string;
  is_publisher_comment: boolean;
  like_count: number;
  is_current_user_comment: boolean;
  create_at: Date;
  children_comment: CommentChildren[] | null; // 该评论的所有孩子评论(分页)
  children_total: number;

  //   private Boolean reply = Boolean.FALSE;
  //   private String replyContent;
}
export type CommentType = 'CommentChildrenEntity' | 'CommentParentEntity'; // 数据填充时的类型
// export interface CommentResponse {
//   total: number;
//   comments: Comment[];
// }
// export type QueryPagination = {
//   page_parent: number;
//   page_children: number;
//   limit_parent: number;
//   limit_children: number;
// };
