import { Injectable } from '@nestjs/common';
import type { ProductRepository } from './db/product.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getProduct(id: string) {
        return await this.productRepository.findOne({ _id: id });
    }

    async getProducts() {
      return await this.productRepository.findMultiple();
    }
}
