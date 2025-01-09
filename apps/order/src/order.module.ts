import { RmqModule } from '@app/rmq';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import * as Joi from 'joi';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_USER_QUEUE: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
            envFilePath: './apps/order/.env',
        }),
        RmqModule,
        RmqModule.register({ name: 'USER' }),
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
        PrometheusModule.register(),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
