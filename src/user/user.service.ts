import { Get, Injectable, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    getUserProfile(userId: string){
        return this.prisma.user.findUnique({
            where:{
                id: userId
            },
            select:{
                firstName: true,
                lastName: true,
                email: true,
            
            },
        });
    }

    async updateUserProfile(userId: string, updateData:{firstName?:string; lastName?:string; password?:string}){

        if(updateData.password){
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        return this.prisma.user.update({
            where:{
                id: userId
            },
            data: updateData,
            select:{
                email: true,
                firstName: true,
                lastName: true
            },
        });
    }
    

}
