import { Injectable } from '@nestjs/common';
import type { ProductRepository } from './db/product.repository';
import type { Product } from './db/product.schema';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getProduct(id: string) {
        return await this.productRepository.findOne({ _id: id });
    }

    async getProducts() {
        return await this.productRepository.findMultiple();
    }

    async createProduct(name: string, price: number, description?: string) {
        const product: Omit<Product, '_id'> = { name, description, price };
        return await this.productRepository.create(product);
    }
}
