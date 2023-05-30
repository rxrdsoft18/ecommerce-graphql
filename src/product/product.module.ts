import { Module } from '@nestjs/common';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductService } from './product.service';
import { DatabaseModule } from '../common/database/database.module';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './product.repository';
import { CategoryModule } from '../category/category.module';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewResolver } from './resolvers/review.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
    CategoryModule,
  ],
  providers: [
    ReviewResolver,
    ProductResolver,
    ProductService,
    ProductRepository,
    ReviewRepository,
    ReviewService,
  ],
  exports: [ProductService],
})
export class ProductModule {}
