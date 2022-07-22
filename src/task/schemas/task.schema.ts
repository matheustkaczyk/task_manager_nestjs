import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  accountable: string[];

  @Prop({ required: true })
  deliveryDate: Date;

  @Prop({ required: true })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
