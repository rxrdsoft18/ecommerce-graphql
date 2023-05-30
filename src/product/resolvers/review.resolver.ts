import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Review } from '../dtos/object-types/review.type';
import { CreateReviewInput } from '../dtos/inputs/create-review.input';
import { ReviewService } from '../review.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TokenPayload } from '../../auth/interfaces/token-payload.interface';

import { JwtCustomGuard } from '../../auth/guards/jwt-custom.guard';

@UseGuards(JwtCustomGuard)
@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.reviewService.create(createReviewInput, user);
  }
}
