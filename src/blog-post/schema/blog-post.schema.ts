import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type blogsDocument = Blogs & Document;

@Schema()
export class Blogs {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  body: string;

  @Prop()
  author: string;

  @Prop()
  date_posted: string;
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);
