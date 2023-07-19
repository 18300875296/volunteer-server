import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from './role.enum';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async getRole(role: Role) {
    return await this.roleRepository.findOne({
      where: { role_name: role },
    });
  }
}
