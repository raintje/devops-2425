import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { RmqService } from '@app/rmq';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(UserModule);

    const rmqService = app.get<RmqService>(RmqService);
    const configService = app.get<ConfigService>(ConfigService);

    app.connectMicroservice(rmqService.getOptions('USER'));

    await app.startAllMicroservices();
    await app.listen(configService.get<number>('PORT') ?? 3002);
}

bootstrap().catch((e) => console.error(e));
