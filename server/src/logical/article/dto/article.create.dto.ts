/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-29 16:32:42
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-01 11:20:50
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\logical\article\dto\article.create.dto.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PublishState } from '../article.interface';

export class CreateArticleDto {
  readonly title: string;
  readonly content: string;
  readonly images: string;
  readonly tags: string;
  readonly status: string;
  readonly categoryName: string;
}
