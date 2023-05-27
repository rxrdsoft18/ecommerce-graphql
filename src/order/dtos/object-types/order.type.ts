import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dtos/object-types/user.type';
import { OrderItem } from './order-item.type';
import { ShippingAddress } from './shipping-address.type';

@ObjectType()
export class Order {
  @Field()
  _id: string;

  @Field()
  paymentMethod: string;

  @Field()
  shippingPrice: number;

  @Field()
  totalPrice: number;

  @Field()
  isPaid: boolean;

  @Field()
  paidAt: Date;

  @Field()
  isDelivered: boolean;

  @Field()
  deliveredAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @Field(() => ShippingAddress)
  shippingAddress: ShippingAddress;
}
