import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { DbModule } from '@app/db';
import { RmqModule } from '@app/rmq';
import { UserRepository } from './db/user.repository';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_MAIL_QUEUE: Joi.string().required(),
                MONGODB_URI: Joi.string().required(),
            }),
        }),
        DbModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        RmqModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
