import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { DatabaseModule } from '../common/database/database.module';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './product.repository';
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    CategoryModule,
  ],
  providers: [ProductResolver, ProductService, ProductRepository],
})
export class ProductModule {}
