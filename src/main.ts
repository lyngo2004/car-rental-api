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
  app.enableCors({ origin: configService.get<string>('FE_URL'), credentials: true });

  const port = Number(configService.get<string>('PORT') ?? 3000);

  await app.listen(port);
  console.log(`API is running on http://localhost:${port}/api`);
}
bootstrap();
