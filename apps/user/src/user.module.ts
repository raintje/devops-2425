import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import * as Joi from 'joi';

import { DbModule } from '@app/db';
import { RmqModule } from '@app/rmq';
import { UserRepository } from './db/user.repository';
import { User, UserSchema } from './db/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
        }),
        DbModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        RmqModule,
        PrometheusModule.register(),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
