import type { CreateUserRequest } from 'apps/user/src/dto/create-user.request';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PlaceOrderRequest {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    products: Array<string>
}