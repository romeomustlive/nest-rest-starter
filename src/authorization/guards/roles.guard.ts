import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { RolesEnum } from 'src/user/constants/user.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RolesEnum[]>(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles) {
      if (user && request.body.userId && request.body.userId !== user?.id) {
        throw new ForbiddenException();
      }
      return true;
    }

    return this.matchRoles(roles, user?.role);
  }

  private matchRoles(roles: RolesEnum[], userRole: RolesEnum): boolean {
    return roles.includes(userRole);
  }
}
