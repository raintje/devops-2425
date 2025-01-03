import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/product/:id')
    async getProduct(@Param('id') id: string, @Res() response: Response) {
        try {
            const product = await this.productService.getProduct(id);
            response.status(HttpStatus.OK).send(product);
        } catch {
            response
                .status(HttpStatus.NOT_FOUND)
                .send({ message: 'Document not found with given parameter.', params: { id } });
        }
    }

    @Get('/product')
    async getProducts(@Res() response: Response) {
        try {
            const products = await this.productService.getProducts();
            response.status(HttpStatus.OK).send(products);
        } catch {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Internal server error, failed to get documents.' });
        }
    }
}
