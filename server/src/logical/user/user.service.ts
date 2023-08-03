import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from 'src/utils/app.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // //验证邮箱;
  async validateEmail(email: string): Promise<boolean> {
    const emailPattern =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailPattern.test(email);
  }
  //注册处理函数
  async register(createUser: CreateUserDto, role: RoleEntity): Promise<any> {
    const { email, password } = createUser;
    if (!this.validateEmail(email)) {
      throw new HttpException('请输入正确的邮箱地址!!', HttpStatus.OK);
    }
    const validUser = await this.userRepository.findOne({
      where: { username: email },
    });
    if (validUser) {
      throw new HttpException('邮箱地址已经注册!!', HttpStatus.OK);
    }
    try {
      const record = new UserEntity();
      record.role = role;
      record.username = email;
      record.email = email;
      record.password = password; //在实体中加密密码存入数据库
      return await this.userRepository.save(record);
    } catch (error) {
      throw new HttpException(
        `创建用户出错 ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserInfo(user_id: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.user_id=:user_id', { user_id })
      .getOne();
  }
  //验证用户
  async validateUser(username: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('username=:username', { username })
        .leftJoinAndSelect('user.role', 'role')
        .getOne();
    } catch (error) {
      throw new HttpException(
        `用户登录查询出错${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // 获取用户信息(过滤敏感信息)
  async getUser(_username: string): Promise<any> {
    const { role, user_id, username, avatar, nickname } =
      await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .where('username=:username', { username: _username })
        .select([
          'user.user_id',
          'user.username',
          'user.avatar',
          'user.nickname',
          'role',
        ])
        .getOne();
    return { user_id, username, avatar, nickname, role: role.role_name };
  }
  // 获取所有用户信息(过滤敏感信息)--管理员
  async getUsers() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .select([
        'user.user_id',
        'user.avatar',
        'role.role_name',
        'user.status',
        'user.username',
        'user.create_at',
        'user.nickname',
        'user.real_name',
      ])
      .getMany();
    return users.map((user) => {
      const { role, ...fields } = user;
      return Object.assign(fields, { role: role.role_name });
    });
  }
  // 改变用户的状态
  async updateByStatus(user_id: string, status: UserStatus) {
    await this.userRepository.update(user_id, { status });
    return { message: '更新用户状态成功' };
  }
  // 将角色赋予用户
  async createRole(role: RoleEntity, user_id: string) {
    await this.userRepository.update(user_id, { role });
    return { message: '赋予用户权限成功' };
  }
  // 删除用户
  async delete(user_id: string) {
    await this.userRepository.delete(user_id);
    return { message: '注销成功' };
  }
  // 更新用户头像
  async updateAvatar(user_id: string, avatar: string) {
    await this.userRepository.update(user_id, { avatar });
    return { message: '更新用户头像成功' };
  }
  // 更新用户昵称
  async updateNickname(user_id: string, nickname: string) {
    await this.userRepository.update(user_id, { nickname });
    return { message: '更新用户昵称成功' };
  }
  // 更新用户的姓名
  async updateName(user_id: string, real_name: string) {
    await this.userRepository.update(user_id, { real_name });
    return { message: '更新用户姓名成功' };
  }
  // 更新用户的邮箱
  async updateEmail(user_id: string, email: string) {
    await this.userRepository.update(user_id, { email });
    return { message: '更新用户邮箱成功' };
  }
}
