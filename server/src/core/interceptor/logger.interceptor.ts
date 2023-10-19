// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// // import { LogsService } from 'src/logical/logs/logs.service';

// @Injectable()
// export class LoggerInterceptor implements NestInterceptor {
//   constructor(private readonly logsService: LogsService) {}
//   async intercept(
//     context: ExecutionContext,
//     next: CallHandler,
//   ): Promise<Observable<any>> {
//     const request = context.switchToHttp().getRequest();
//     const loggerMessage = Reflect.getMetadata('logger', context.getHandler());
//     const { user } = request;
//     console.log(user);
//     const username = user.username ? user.username : '匿名用户';
//     const role = user.role ? user.role.name || user.role : 'guest';
//     const log = {
//       username,
//       role,
//       operation: loggerMessage,
//       method: request.method,
//       params: JSON.stringify(request.body),
//       time: new Date().getTime(),
//       ip: request.ip,
//       url: request.url,
//       status: '进行中',
//     };
//     const logEntity = await this.logsService.create(log);
//     return next.handle().pipe(
//       tap((data) => {
//         console.log(data);
//         const time = new Date().getTime();
//         const { message } = data;
//         this.logsService.update(
//           logEntity.log_id,
//           time - logEntity.time,
//           message,
//         );
//       }),
//     );
//   }
// }
