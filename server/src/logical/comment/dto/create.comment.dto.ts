import { CommentState } from '../comment.interface';
export class CreateCommentDto {
  article_id: string;
  content: string;
  parent_id?: string;
  replay_id?: string;
}
