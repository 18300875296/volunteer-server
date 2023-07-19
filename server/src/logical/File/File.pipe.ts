import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private async validate(file: Express.Multer.File): Promise<void> {
    const { mimetype } = file;
    const imageSize = 1024 * 1024 * 3;
    const otherFileSize = 1024 * 1024 * 20;
    const isImage = mimetype.startsWith('/image');
    if (isImage && file.size > imageSize) {
      throw new HttpException('图片大小不能超过3MB', HttpStatus.BAD_REQUEST);
    }
    if (!isImage && file.size > otherFileSize) {
      throw new HttpException('文件大小不能超过20MB', HttpStatus.BAD_REQUEST);
    }
  }
  async transform(
    files: Express.Multer.File[] | Express.Multer.File,
  ): Promise<any> {
    if (!files) {
      throw new HttpException('上传文件不能为空', HttpStatus.BAD_REQUEST);
    }
    if (Array.isArray(files)) {
      if (files.length > 10) {
        throw new HttpException(
          '上传的文件不能超过10个',
          HttpStatus.BAD_REQUEST,
        );
      }
      for (const file of files) {
        await this.validate(file);
      }
    } else {
      await this.validate(files);
    }
    return files;
  }
}
