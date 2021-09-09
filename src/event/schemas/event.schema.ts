import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Location } from './location.schema';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop({ _id: true }) id: string;
  @Prop({ required: true }) name: string;
  @Prop() description: string;
  @Prop({ required: true }) tags: string[];
  @Prop() helperTags: string[];
  @Prop() images: string[];
  @Prop({ required: true }) location: Location;
}

export const EventSchema = SchemaFactory.createForClass(Event);
