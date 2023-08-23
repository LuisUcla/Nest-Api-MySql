import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const role = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ // reflector para obtener datos de la metadata
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // esta validacion hace que el usuario admin haga todo en la base de datos
    if (user.role === Role.ADMIN) {
      return true;
    }

    return role.some((role) => user.role?.includes(role)); // true or false
  }
}
