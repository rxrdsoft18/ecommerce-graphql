import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../../../category/dtos/object-types/category.type';
import { Review } from "./review.type";

@ObjectType()
export class Product {

  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  brand: string;

  @Field()
  sku: string;

  @Field()
  category: Category;

  @Field()
  description: string;

  @Field()
  rating: number;

  @Field()
  numReviews: number;

  @Field()
  price: number;

  @Field(() => [Review])
  reviews: Review[];

  @Field()
  countInStock: number;
}
