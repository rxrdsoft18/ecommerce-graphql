import { Injectable } from '@nestjs/common';

import { CreateReviewInput } from './dtos/inputs/create-review.input';
import { ReviewRepository } from './review.repository';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { ProductService } from './product.service';
import { Review } from './schemas/review.schema';
import { countBy } from '../common/utils/arrayHelper';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly productService: ProductService,
  ) {}

  async create(createReviewInput: CreateReviewInput, user: TokenPayload) {
    const reviewCreated = await this.reviewRepository.create({
      reviewerName: `${user.firstname} ${user.lastname}`,
      ...createReviewInput,
      userId: user.userId,
    });
    await this.recalculateReview(reviewCreated);
    return reviewCreated;
  }

  private async recalculateReview(reviewCreated: Review) {
    const { productId } = reviewCreated;
    const reviews = await this.reviewRepository.find({ productId });
    const product = await this.productService.findById(productId);

    const newReviews = product.reviews;
    newReviews.push(reviewCreated);

    await this.productService.update(productId, {
      rating: await this.getRating(reviews),
      numReviews: reviews.length,
      reviews: newReviews,
    });
  }

  private async getRating(reviews: Review[]): Promise<number> {
    let total = 0;
    const mapRatingTotal = countBy(reviews, 'rating', {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });

    const totalRating = Object.values(mapRatingTotal).reduce(
      (acc: number, act: number, index: number) => {
        total = total + act;
        return acc + (index + 1) * act;
      },
      0,
    ) as number;

    return Number((totalRating / total).toFixed(2));
  }
}
