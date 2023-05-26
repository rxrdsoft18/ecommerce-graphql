import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field()
  productId: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  brand: string;

  @Field({ nullable: true })
  sku: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  countInStock: number;
}
