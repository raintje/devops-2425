import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';

async function bootstrap() {
    const app = await NestFactory.create(OrderModule);
    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors();

    await app.listen(configService.get<number>('PORT') ?? 3000);
}

bootstrap().catch((e) => console.error(e));
