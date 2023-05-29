import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

import { AbstractIdDocumentSchema } from '../../common/repositories';
import { User } from '../../user/user.schema';
import { OrderItem } from './order-item.schema';
import { ShippingAddress } from './shipping-address.schema';

@Schema({ versionKey: false, collection: 'orders', timestamps: true })
export class Order extends AbstractIdDocumentSchema {
  // @Prop({ type: String, required: true })
  // paymentMethod: string;

  // @Prop({ type: Number, required: true, default: 0.0 })
  // taxPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  shippingPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ type: Boolean, required: true, default: false })
  isPaid: boolean;

  @Prop({ type: Date, required: false })
  paidAt: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isDelivered: boolean;

  @Prop({ type: Date, required: false })
  deliveredAt: Date;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;

  // @Prop({ type: [{ type: Types.ObjectId, ref: OrderItem.name }] })
  @Prop()
  orderItems: OrderItem[];

  @Prop({ type: Types.ObjectId, ref: ShippingAddress.name })
  shippingAddress: ShippingAddress;

  // @Prop({ type: Types.ObjectId, ref: PaymentResult.name })
  // paymentResult: PaymentResult;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
