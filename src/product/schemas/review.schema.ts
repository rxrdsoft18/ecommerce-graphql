import { AbstractIdDocumentSchema } from '../../common/repositories/base/abstract-id.document.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from '../../user/user.schema';
import { Types } from 'mongoose';

@Schema({ versionKey: false, collection: 'reviews', timestamps: true })
export class Review extends AbstractIdDocumentSchema {
  @Prop({ type: String, required: true })
  reviewerName: string;

  @Prop({ type: Number, required: true, default: 0 })
  rating: number;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;
}
