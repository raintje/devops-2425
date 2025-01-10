import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from 'apps/user/src/db/user.schema';
import { CreateUserRequest } from 'apps/user/src/dto/create-user.request';
import { Response } from 'express';
import { PlaceOrderRequest } from './dto/place-order.request';
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

    @Post('/register')
    async register(@Res() response: Response, @Body() data: CreateUserRequest) {
        try {
            const res = await this.orderService.register(data.email, data.password);
            response.status(HttpStatus.CREATED).send(res);
        } catch (e) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        }
    }

    @Post('/login')
    async login(@Res() response: Response, @Body() data: CreateUserRequest) {
        try {
            const res = await this.orderService.login(data.email, data.password);
            response.status(HttpStatus.OK).send(res);
        } catch (e) {
            response.status(HttpStatus.NOT_FOUND).send(e);
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
