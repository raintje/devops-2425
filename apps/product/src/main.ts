import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
    const app = await NestFactory.create(ProductModule);
    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors();

    await app.listen(configService.get<number>('PORT') ?? 3001);
}
bootstrap().catch((e) => console.error(e));
