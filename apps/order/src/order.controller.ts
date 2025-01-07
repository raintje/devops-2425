import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { PlaceOrderRequest } from './dto/place-order.request';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('/products')
    async getProducts(@Res() response: Response) {
        try {
            const res = await this.orderService.getProducts();
            response.status(HttpStatus.OK).send(res);
        } catch {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error getting products.');
        }
    }

    @Post('/order')
    async createOrder(@Res() response: Response, @Body() data: PlaceOrderRequest) {
        try {
            const res = await this.orderService.placeOrder(data.email, data.password, data.products);
            response.status(HttpStatus.OK).send(res);
        } catch {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error while placing order.');
        }
    }
}
