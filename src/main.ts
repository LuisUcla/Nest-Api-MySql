import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './common/open-api/configApi'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ // config de los cors
    origin: ['*'],
    // methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })

  app.setGlobalPrefix('api'); // localhost:3000/api --> prefijo de la API

  app.useGlobalPipes(
    new ValidationPipe({ // para permitir que los validadores de dto funcione
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const document = SwaggerModule.createDocument(app, config); // --> docs swagger
  SwaggerModule.setup('docs', app, document); // --> docs swagger

  await app.listen(3000);
}
bootstrap();
