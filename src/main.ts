import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/ResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Single Service API')
    .setDescription('This is the Single Service API')
    .setVersion('1.0')
    .addTag('single-service')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  await app.listen(3000);
}
bootstrap();
