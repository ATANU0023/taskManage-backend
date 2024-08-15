import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtBlacklistMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && this.authService.isTokenBlacklisted(token)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized: Token has been blacklisted' });
    }
    next();
  }
}
