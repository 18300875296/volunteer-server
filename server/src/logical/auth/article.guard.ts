import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../../config/constants';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (token) {
      let payload = null;
      try {
        payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
      } catch (error) {
        const userEntity = new UserEntity(); // token错误 token过期
        userEntity.user_id = null;
        request['user'] = userEntity;
        return true;
      }
      const username = payload.username;
      const user = await this.userRepository.findOne({ where: { username } });
      if (user) {
        request['user'] = user;
        return true;
      }
    }
    const userEntity = new UserEntity(); // 游客 // 查无此人
    userEntity.user_id = null;
    request['user'] = userEntity;
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
