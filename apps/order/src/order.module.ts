import { RmqModule } from '@app/rmq';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                USER_QUEUE: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
            envFilePath: './apps/order/.env',
        }),
        HttpModule.register({ baseURL: 'http://localhost', timeout: 5000, maxRedirects: 5 }),
        RmqModule,
        RmqModule.register({ name: 'USER' }),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
