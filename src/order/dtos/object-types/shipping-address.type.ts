import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShippingAddress {
  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;

  @Field()
  country: string;
}
