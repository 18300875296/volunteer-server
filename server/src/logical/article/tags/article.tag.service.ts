// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { ArticleTagEntity } from './article.tag.entity';
// @Injectable()
// export class ArticleTagService {
//   constructor(private readonly tagRepository: Repository<ArticleTagEntity>) {}
//   // 检查标签是否存在
//   async tagExists(tag: string): Promise<boolean> {
//     try {
//       const isExists = await this.tagRepository
//         .createQueryBuilder('article_tag')
//         .where('article_tag.name=:name', { name: tag })
//         .getOne();
//       return !!isExists;
//     } catch (error) {
//       return error;
//     }
//   }
//   // 向标签表中添加标签
//   async putTag(tag: string): Promise<void> {
//     const validate = await this.tagExists(tag);
//     if (!validate) {
//       try {
//         const tagEntity = new ArticleTagEntity();
//         tagEntity.name = tag;
//         await this.tagRepository.save(tagEntity);
//       } catch (error) {
//         return error;
//       }
//     }
//   }
//   // 查询标签表
//   async findTag(tag: string): Promise<ArticleTagEntity> {
//     try {
//       return await this.tagRepository
//         .createQueryBuilder('article_tag')
//         .where('article_tag.name=:name', { name: tag })
//         .getOne();
//     } catch (error) {
//       return error;
//     }
//   }
//   // 删除标签
//   async deleteTag(tag: string): Promise<void> {
//     try {
//       await this.tagRepository.delete({ name: tag });
//     } catch (error) {
//       return error;
//     }
//   }
//   // 修改标签
//   async updateTag(tag_id: string, info: string): Promise<any> {
//     try {
//       await this.tagRepository.update(tag_id, { name: info });
//     } catch (error) {
//       return error;
//     }
//   }
// }
