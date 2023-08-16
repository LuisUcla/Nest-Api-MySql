import { Role } from '../../common/enums/rol.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';

export function Auth(role: Role) {
    return applyDecorators( // aplica varios decoradores en uno
        Roles(role), // para guardar datos en la metadata
        UseGuards(AuthGuard, RolesGuard) // middleware de autenticacion y de roles
    )
}