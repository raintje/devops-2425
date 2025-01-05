import { IsEmail } from 'class-validator';

export class UpdateUserRequest {
    @IsEmail()
    email: string;

    password: string;

    roles?: Array<string>;
}
