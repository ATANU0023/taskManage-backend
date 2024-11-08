import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin:'https://radiant-manatee-835d22.netlify.app',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials:true,
  });
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
