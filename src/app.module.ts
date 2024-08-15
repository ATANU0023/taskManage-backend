import {  MiddlewareConsumer, Module, RequestMethod,  } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
//import { JwtBlacklistMiddleware } from './auth/jwt-blacklist.middleware';
import { JwtService } from '@nestjs/jwt';
import { JwtBlacklistMiddleware } from './auth/jwt-blacklist.middleware';

@Module({
  imports: [AuthModule, PrismaModule, TodoModule, UserModule],
  controllers: [UserController],
  providers: [ PrismaService, AuthService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtBlacklistMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); 
  }
}
