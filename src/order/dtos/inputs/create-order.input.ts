import { Field, InputType } from '@nestjs/graphql';
import { CreateShippingAddressInput } from './create-shipping-address.input';

@InputType()
export class CreateOrderInput {
  @Field()
  shippingAddress: CreateShippingAddressInput;
}
