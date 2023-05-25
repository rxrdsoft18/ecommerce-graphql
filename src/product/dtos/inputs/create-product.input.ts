import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  sku: string;

  @Field()
  category: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  countInStock: number;
}
