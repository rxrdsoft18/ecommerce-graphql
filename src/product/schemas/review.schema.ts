import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { User } from '../../user/user.schema';
import { AbstractIdDocumentSchema } from '../../common/repositories';
import { Product } from './product.schema';

@Schema({ versionKey: false, collection: 'reviews', timestamps: true })

export class Review extends AbstractIdDocumentSchema {
  @Prop({ type: String, required: true })
  reviewerName: string;

  @Prop({ type: Number, required: true, default: 0 })
  rating: number;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  productId: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
