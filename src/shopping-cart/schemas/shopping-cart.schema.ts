import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { User } from '../../user/user.schema';
import { AbstractIdDocumentSchema } from '../../common/repositories';
import { ShoppingCartItem } from './shopping-cart-item.schema';

@Schema({ versionKey: false, collection: 'shopping-carts', timestamps: true })
export class ShoppingCart extends AbstractIdDocumentSchema {

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string;

  @Prop()
  items: ShoppingCartItem[];

  @Prop()
  totalPrice: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
