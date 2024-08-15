import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private configService: ConfigService, private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }
    async validate(payload: any) {
        // const isBlacklisted = this.authService.isTokenBlacklisted(payload.token);
        // if (isBlacklisted) {
        //   throw new UnauthorizedException('Token is blacklisted');
        // }
        return { userId: payload.sub, username: payload.username };
    }
}