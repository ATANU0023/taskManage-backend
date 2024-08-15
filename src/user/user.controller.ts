import { Body, Controller, Get, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private userService: UserService) {}

    //@UseGuards(JwtAuthGuard)
    @Get('profile')
    async getUserProfile(@Req() req){
        return this.userService.getUserProfile(req.user.userId);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch('update')
    async updateUserProfile(@Req() req, @Body() body:{firstName?:string; lastName?:string}){
        return this.userService.updateUserProfile(req.user.userId, body);   
    }
}
