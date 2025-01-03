import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserObject {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}