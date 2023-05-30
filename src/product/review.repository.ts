import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review } from './schemas/review.schema';
import { BaseAbstractRepository } from '../common/repositories';
export class ReviewRepository extends BaseAbstractRepository<Review> {
  protected readonly logger = new Logger(ReviewRepository.name);

  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {
    super(reviewModel);
  }
}
