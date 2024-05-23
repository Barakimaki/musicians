import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Социальная сеть "Музыканты"')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Adamonis Arseni')
    .addCookieAuth(
      'auth-cookie',
      {
        type: 'http',
      },
      'refreshToken',
    )
    .addBearerAuth(
      {
        description: 'defaultJWTAuthorization',
        type: 'http',
        in: 'header',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
      },
      'defaultBearerAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
