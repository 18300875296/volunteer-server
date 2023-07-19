import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import * as express from 'express';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //设置cors
  app.enableCors();
  //设置全局路由前缀
  app.setGlobalPrefix('/api');

  //全局注册管道进行验证
  app.useGlobalPipes(new ValidationPipe());
  //注册全局错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); //过滤敏感信息
  //注册全局成功拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  //监听所有的请求的路由,打印日志
  // app.use(LoggerMiddleware);
  // app.setGlobalPrefix('nest-zero-to-one');
  await app.listen(8080, '127.0.0.1');
}
bootstrap();
