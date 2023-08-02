import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // localhost:3000/api --> prefijo de la API

  app.useGlobalPipes(
    new ValidationPipe({ // para permitir que los validadores de dto funcione
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.listen(3000);
}
bootstrap();
