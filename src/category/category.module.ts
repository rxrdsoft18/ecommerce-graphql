import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryRepository } from './category.repository';
import { DatabaseModule } from '../common/database/database.module';
import { Category, CategorySchema } from './category.schema';
@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [CategoryService, CategoryResolver, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
