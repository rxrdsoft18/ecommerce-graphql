import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  image: string;
}
