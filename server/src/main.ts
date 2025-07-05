import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const clientOrigin = configService.get<string>('CLIENT_API_URL');

  app.enableCors({
    origin: clientOrigin,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
