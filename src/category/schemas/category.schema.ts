import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ _id: true }) id: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) icon: string;
  @Prop() tags: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
