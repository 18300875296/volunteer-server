/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-10-01 10:30:12
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 08:56:01
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\server\src\logical\article\article.utils.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import createSummary from '../../utils/parseHTML';
/**
 * @description: 验证文章是否有效
 * @return {boolean}
 */
function validArticle(title: string, content: string, tags: string): boolean {
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
/**
 * @description: 截取文章摘要
 * @param {string} content
 * @return {string} 摘要
 */
function makePrefix(content: string): string {
  const html = JSON.parse(decodeURIComponent(content));
  const summary = createSummary(html);
  if (!summary) {
    throw Error('文本解析出错');
  }
  return summary;
}

export { validArticle, makePrefix };
