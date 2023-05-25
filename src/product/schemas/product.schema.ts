import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

import { AbstractIdDocumentSchema } from '../../common/repositories/base/abstract-id.document.schema';
import { Review } from './review.schema';
import { Category } from '../../category/category.schema';

@Schema({ versionKey: false, collection: 'products', timestamps: true })
export class Product extends AbstractIdDocumentSchema {
  @Prop()
  name: string;

  @Prop({
    type: String,
    required: true,
    default: 'https://i.imgur.com/Vih6Km5.png',
  })
  image?: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: String, required: true })
  sku: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true, default: 0 })
  rating?: number;

  @Prop({ type: Number, required: true, default: 0 })
  numReviews?: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  countInStock: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Review.name }], default: [] })
  reviews?: Review[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
