import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Types, Document } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ _id: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  tags: string[];

  @Prop()
  helperTags: string[];

  @Prop()
  images: string[];

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  categoriesId: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
