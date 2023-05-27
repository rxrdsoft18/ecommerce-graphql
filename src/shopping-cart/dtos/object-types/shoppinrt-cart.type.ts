import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShoppingCartItem {
  @Field()
  productId: string;

  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  subTotalPrice: number;
}

@ObjectType()
export class ShoppingCart {
  @Field()
  _id: string;

  @Field()
  userId: string;

  @Field(() => [ShoppingCartItem])
  items: ShoppingCartItem[];

  @Field()
  totalPrice: number;
}
