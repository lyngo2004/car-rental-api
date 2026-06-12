import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const feUrl = configService.get<string>('FE_URL');
  app.enableCors({
    origin: feUrl ? feUrl.split(',').map((origin) => origin.trim()) : true,
    credentials: true,
  });

  const port = Number(configService.get<string>('PORT') ?? 3000);

  await app.listen(port, '0.0.0.0');
  console.log(`API is running on http://localhost:${port}/api`);
}
bootstrap();
