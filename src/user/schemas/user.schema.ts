import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ _id: true }) id: string;
  @Prop({ required: true }) username: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) avatar: string;
  @Prop() providerId: string;
  @Prop() provider: 'google' | 'facebook';
}

export const UserSchema = SchemaFactory.createForClass(User);
