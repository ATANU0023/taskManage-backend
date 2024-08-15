import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private readonly authService: AuthService) {
        super();
        //console.log('AuthService:', this.authService); // Add this line
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const canActivate = await super.canActivate(context) as boolean;

        if (!canActivate) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        //console.log('AuthService in canActivate:', this.authService); 

        if (!this.authService) {
            throw new UnauthorizedException('AuthService is not available');
        }

        const isBlacklisted = this.authService.isTokenBlacklisted(token);
        if (isBlacklisted) {
            throw new UnauthorizedException('Token has been blacklisted');
        }

        return true;
    }
}
