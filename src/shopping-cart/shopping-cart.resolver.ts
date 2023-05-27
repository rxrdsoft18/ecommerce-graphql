import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './dtos/object-types/shoppinrt-cart.type';
import { AddProductInput } from './dtos/inputs/add-product.input';
import { JwtCustomGuard } from '../auth/guards/jwt-custom.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

@UseGuards(JwtCustomGuard)
@Resolver()
export class ShoppingCartResolver {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Mutation(() => ShoppingCart)
  addProductToCart(
    @Args('addProductInput') addProductInput: AddProductInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.shoppingCartService.addProductToCart(addProductInput, user);
  }

  @Query(() => ShoppingCart)
  getShoppingCartById(@Args('id') id: string) {
    return this.shoppingCartService.getShoppingCartById(id);
  }
}
