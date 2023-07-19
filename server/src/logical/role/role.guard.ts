import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './decorator/role.decorator';
// import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // private jwtService: JwtService
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 没有设置规则
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return requiredRoles.some((role) => role === Role.Visitor);
    } else {
      // //判断用户的角色是否包含和role相同的角色列表
      return requiredRoles.some((role) => role === user.role);
    }
  }
}
