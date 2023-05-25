import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from "@nestjs/common";

import { Category } from './dtos/object-types/category.type';
import { CreateCategoryInput } from './dtos/inputs/create-category.input';
import { CategoryService } from './category.service';
import { UpdateCategoryInput } from './dtos/inputs/update-category.input';
import { JwtCustomGuard } from '../auth/guards/jwt-custom.guard';
@UseGuards(JwtCustomGuard)
@Resolver()
export class CategoryResolver {
  protected readonly logger = new Logger(CategoryResolver.name);
  constructor(private readonly categoryService: CategoryService) {}


  @Query(() => [Category], { name: 'categories' })
  getCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  getCategoryById(@Args('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category)
  deleteCategory(@Args('id') id: string) {
    return this.categoryService.delete(id);
  }
}
