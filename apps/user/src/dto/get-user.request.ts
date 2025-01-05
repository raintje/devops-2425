import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}