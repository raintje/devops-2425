import { NestFactory } from '@nestjs/core';
import { BillingserviceModule } from './billingservice.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingserviceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
