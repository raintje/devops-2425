import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class PlaceOrderRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsArray()
    products: Array<string>;
}
