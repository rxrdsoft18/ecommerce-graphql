import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShippingAddressInput {
  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  postalCode: string;

  @Field()
  country: string;
}
