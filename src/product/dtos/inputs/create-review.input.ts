import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field({ nullable: true })
  reviewerName: string;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  productId: string;
}
