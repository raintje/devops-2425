import { DbModule } from '@app/db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { ProductRepository } from './db/product.repository';
import { Product, ProductSchema } from './db/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
            }),
        }),
        DbModule,
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})
export class ProductModule {}
