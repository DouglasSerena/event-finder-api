import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ required: true }) longitude: number;
  @Prop({ required: true }) latitude: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
