import { CommentState } from './../comment.interface';
export class CreateCommentDto {
  content: string;

  commentByUser: string;

  target: string;

  state: CommentState;
}
