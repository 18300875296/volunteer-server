import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { MinioService } from 'nestjs-minio-client';
import { MINIO_CONFIG } from '../../../config/minio';
@Injectable()
export class FileService {
  private readonly baseBucket = MINIO_CONFIG.MINIO_BUCKET;
  constructor(private readonly minioService: MinioService) {}

  // 判断桶是否存在
  async bucketExists(baseBucket: string): Promise<boolean> {
    return await this.minioService.client
      .bucketExists(baseBucket)
      .catch((err) => err);
  }
  // 判断文件是否存在
  async fileExists(baseBucket: string, filename: string): Promise<boolean> {
    try {
      await this.minioService.client.statObject(baseBucket, filename);
      return true;
    } catch (error) {
      if (error.code === 'NotFound') {
        return false;
      }
    }
    throw new HttpException(
      `查找文件服务器出错`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  /*******************************单个文件*************************************/
  // 上传
  async upload(file: Express.Multer.File): Promise<any> {
    const isExists = await this.bucketExists(this.baseBucket);
    const random = Math.floor(Math.random() * 1000);
    const prefix = extname(file.originalname);
    const filename = `image_${Date.now()}_${random}${prefix}`;
    if (isExists) {
      try {
        // const fileId = encodeURIComponent(file.originalname); // 处理乱码
        const metaData = { 'Content-Type': file.mimetype };
        await this.minioService.client.putObject(
          this.baseBucket,
          filename,
          file.buffer,
          metaData,
        ); // 将文件上传到服务器
        const url = await this.minioService.client.presignedUrl(
          'GET',
          this.baseBucket,
          filename,
          24 * 60 * 60,
        ); // 读取文件信息返回url
        return url.split('?')[0];
      } catch (error) {
        throw new HttpException(
          `上传文件失败,${error}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  // 删除
  async deleteFile(filename: string): Promise<boolean> {
    const isExists = await this.fileExists(this.baseBucket, filename); // 查询文件是否存在
    if (!isExists) {
      throw new HttpException('文件不存在', HttpStatus.NOT_FOUND);
    }
    try {
      await this.minioService.client.removeObject(this.baseBucket, filename);
      return true;
    } catch (error) {
      throw new HttpException(
        `删除文件失败${error}}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 多个文件上传
  async uploads(files: Express.Multer.File[]) {
    return Promise.all(files.map((item) => this.upload(item))).catch(
      (err) => err,
    );
  }
}
