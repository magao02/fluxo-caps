import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const session = request.session;
        const isValid = await this.authService.validateSessionToken(session);

        if (!isValid) {
            throw new UnauthorizedException('Você não tem permissão para acessar este recurso');
        }
        return true;
    }
}
