import { PublishState } from '../article.interface';

export class CreateArticleDto {
  readonly title: string;
  readonly content: string;
  readonly images: string;
  readonly tags: string;
  readonly state: string;
}
