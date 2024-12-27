import { NestFactory } from '@nestjs/core';
import { OrderserviceModule } from './orderservice.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderserviceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
