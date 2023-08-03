import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { encryptPassword } from '../../../utils/crypto';
import { UserService } from 'src/logical/user/user.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username);
    if (!user) {
      throw new HttpException('用户不存在!!', HttpStatus.NOT_FOUND);
    }
    const hashedPass = encryptPassword(password, user.salt); //加密当前的密码
    if (user.password !== hashedPass) {
      throw new HttpException('密码错误!!', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
