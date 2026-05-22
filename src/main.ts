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

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error(`Invalid PORT value: ${configService.get<string>('PORT')}`);
  }

  await app.listen(port);
  console.log(`API is running on http://localhost:${port}/api`);
}
bootstrap();
