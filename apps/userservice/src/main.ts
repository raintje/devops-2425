import { NestFactory } from '@nestjs/core';
import { UserserviceModule } from './userservice.module';

async function bootstrap() {
  const app = await NestFactory.create(UserserviceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
