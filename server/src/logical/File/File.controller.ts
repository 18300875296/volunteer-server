import { Controller, Delete, Query, UsePipes } from '@nestjs/common';
import {
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileService } from './File.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './File.pipe';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  /*******************************单个文件*************************************/
  // 上传文件
  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe) // 对文件格式进行处理
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.upload(file);
  }
  // 删除文件
  @Delete('deletefile')
  async deleteFile(@Query('filename') filename: string) {
    return await this.fileService.deleteFile(filename);
  }
  /*******************************多个文件*************************************/

  // 上传文件
  @Post('uploadfiles')
  @UseInterceptors(FilesInterceptor('files'))
  @UsePipes(FileValidationPipe)
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.uploads(files);
  }
  // 删除文件
}
