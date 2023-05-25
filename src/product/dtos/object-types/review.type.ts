import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../user/dtos/object-types/user.type';

@ObjectType()
export class Review {
  @Field()
  reviewerName: string;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  user: User;
}
