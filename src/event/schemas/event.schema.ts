import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ _id: true })
  id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: string;

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

  @Prop()
  value: number;

  @Prop()
  whatsapp: string;

  @Prop()
  email: string;

  @Prop()
  icon: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
