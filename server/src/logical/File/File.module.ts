import { Module } from '@nestjs/common';
import { FileService } from './File.service';
import { FileController } from './File.controller';
import { MinioModule } from 'nestjs-minio-client';
import { MINIO_CONFIG } from '../../../config/minio';

@Module({
  imports: [
    MinioModule.register({
      endPoint: MINIO_CONFIG.MINIO_ENDPOINT,
      port: MINIO_CONFIG.MINIO_PORT,
      useSSL: false,
      accessKey: MINIO_CONFIG.MINIO_ROOT_USER,
      secretKey: MINIO_CONFIG.MINIO_ROOT_PASSWORD,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
