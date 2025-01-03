import { AbstractRepository } from '@app/db';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from 'apps/user/src/db/user.repository';
import type { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(@InjectModel(Product.name) productModel: Model<Product>) {
        super(productModel);
    }
}
