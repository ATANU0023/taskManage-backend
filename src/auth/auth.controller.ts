import { Body, Controller, HttpException, HttpStatus, Next, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post('signup')
    async signup(@Body() body: SignupDto) {
        return this.authService.signup(body);
    }

    @Post('login')
    async login(@Body() body: SigninDto) {
        return this.authService.login(body);
    }

    //logout
    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            await this.authService.logout(token);
            return res.status(HttpStatus.OK).json({
                message: 'Logout successful',
            });
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Token not provided',
            });
        }
    }
}
