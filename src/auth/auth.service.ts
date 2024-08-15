import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    private tokenBlacklist = new Set<string>();
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}


    async signup(signupDto:SignupDto){
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        const user = await this.prisma.user.create({
            data:{
                email: signupDto.email,
                password: hashedPassword,
                firstName: signupDto.firstName,
                lastName: signupDto.lastName,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        });
        console.log(user);
        return this.createToken(user.id, user.email);
    }

    async login(signinDto:SigninDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: signinDto.email,
            },
        });

        if(!user || !user.password){
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(signinDto.password, user.password);
        if(!isPasswordValid){
            throw new Error('Invalid credentials');
        };
        return this.createToken(user.id, user.email);
    };

    

    createToken(userId: string, email: string){
        const payload = {
            sub: userId,
            email
        };
        return{
            access_token: this.jwtService.sign(payload),
        };
    }

    //logout
    async logout(token: string):Promise<void> {
        //console.log(`Blacklisting token: ${token}`);
        this.tokenBlacklist.add(token);
    }
    
    isTokenBlacklisted(token: string):boolean {
        //console.log('Checking if token is blacklisted:', token);
        return this.tokenBlacklist.has(token);
    }

}
