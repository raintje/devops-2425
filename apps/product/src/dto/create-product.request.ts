import { IsNotEmpty, Matches, MaxLength, ValidateIf } from 'class-validator';

export class CreateProductRequest {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @MaxLength(255)
    @ValidateIf((obj) => obj.description)
    description?: string;

    @IsNotEmpty()
    @Matches(/[0-9SIl]+([.,][0-9SIl]{2})?/)
    price: number;
}
