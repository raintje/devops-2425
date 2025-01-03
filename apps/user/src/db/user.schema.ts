import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/db';

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
}

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: [UserRoles.USER], required: false })
    roles?: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);