import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './dtos/object-types/product.type';
import { CreateProductInput } from './dtos/inputs/create-product.input';
import { ProductService } from './product.service';

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
}
