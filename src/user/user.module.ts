import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[PrismaModule,AuthModule],
  controllers: [UserController],  
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
