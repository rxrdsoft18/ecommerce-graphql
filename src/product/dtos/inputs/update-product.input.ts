import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field()
  productId: string;

  @Field({ nullable: true })
  rating: number;

  @Field({ nullable: true })
  numReviews: number;

  @Field(() => [ReviewInput], { nullable: true })
  reviews: ReviewInput[];
}

@InputType()
export class ReviewInput {
  @Field()
  reviewerName: string;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  userId: string;

  @Field()
  productId: string;
}
