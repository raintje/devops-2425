import type { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import type { Product } from 'apps/product/src/db/product.schema';
import type { User } from 'apps/user/src/db/user.schema';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
    constructor(
        @Inject('USER') private readonly userClient: ClientProxy,
        private readonly httpService: HttpService
    ) {}

    async placeOrder(email: string, password: string, products: Array<string>) {
        let user: User;
        try {
            user = await lastValueFrom<User>(this.userClient.send({ cmd: 'get_user' }, { email, password }));
        } catch {
            throw new NotFoundException('Could not find user with the given email and password combination.');
        }

        const prices: Array<number> = [];

        for (const id of products) {
            try {
                const { data } = await lastValueFrom(
                    this.httpService.get<Product>(`http://localhost:3001/products/${id}`)
                );

                prices.push(data.price);
            } catch {
                throw new NotFoundException('Could not find product with the given id.');
            }
        }

        return { user: user.email, price: prices.reduce((sum, a) => sum + a, 0) };
    }
}