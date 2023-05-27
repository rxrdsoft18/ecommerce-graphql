import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Product } from '../../product/schemas/product.schema';

@Schema({ versionKey: false, collection: 'shopping-cart-items' })
export class ShoppingCartItem{
  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  subTotalPrice: number;
}

export const ShoppingCartItemSchema =
  SchemaFactory.createForClass(ShoppingCartItem);
