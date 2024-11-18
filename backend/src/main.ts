import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TskvLogger } from './middlewares/tskv.logger';
import { DevLogger } from './middlewares/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger =
    process.env.NODE_ENV === 'production' ? new TskvLogger() : new DevLogger();

  app.useLogger(logger);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
