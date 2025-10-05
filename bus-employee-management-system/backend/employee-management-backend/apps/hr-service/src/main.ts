/* eslint-disable @typescript-eslint/no-floating-promises */
import * as path from 'path';
import * as dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), 'apps/hr-service/.env');
console.log('Resolved .env path:', envPath);
dotenv.config({ path: envPath });
console.log('DATABASE_URL from manual dotenv:', process.env.DATABASE_URL);

import { NestFactory } from '@nestjs/core';
import { HrServiceModule } from './hr-service.module';

async function bootstrap() {
  const app = await NestFactory.create(HrServiceModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4002);
}
bootstrap();
