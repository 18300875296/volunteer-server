import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';

interface Auth {
  token: string;
}
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async createToken(user: Partial<UserEntity>): Promise<any> {
    try {
      const payload = {
        user_id: user.user_id,
        username: user.username,
        role: user.role.role_name,
        sub: user.user_id,
      };
      return { token: this.jwtService.sign(payload), message: 'success' };
    } catch (error) {
      throw new HttpException(
        `生成token出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
