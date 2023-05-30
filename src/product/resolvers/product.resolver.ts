import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Product } from '../dtos/object-types/product.type';
import { ProductService } from '../product.service';
import { JwtCustomGuard } from '../../auth/guards/jwt-custom.guard';
import { UpdateProductInput, CreateProductInput } from '../dtos/inputs';

@UseGuards(JwtCustomGuard)
@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  getProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  getProductById(@Args('id') id: string) {
    return this.productService.findById(id);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(
      updateProductInput.productId,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  deleteProduct(@Args('id') id: string) {
    return this.productService.delete(id);
  }
}
