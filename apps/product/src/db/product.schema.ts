import { AbstractDocument } from '@app/db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Product extends AbstractDocument {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
