import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<RmqOptions>(UserModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://rabbitmq:5672'],
            queue: 'user_queue',
            queueOptions: {
                durable: true,
            },
            noAck: false,
        },
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen();
}

bootstrap().catch((e) => console.error(e));