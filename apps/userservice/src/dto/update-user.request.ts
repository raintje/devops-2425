import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserRequest {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    roles?: Array<string>;
}