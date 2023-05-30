import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {

  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  subTotalPrice: number;

  @Field()
  image: string;

  @Field()
  productId: string;
}
