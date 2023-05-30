import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Order } from './dtos/object-types';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dtos/inputs/create-order.input';
import { JwtCustomGuard } from '../auth/guards/jwt-custom.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';

@UseGuards(JwtCustomGuard)
@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.orderService.createOrder(createOrderInput, user);
  }

  @Query(() => Order)
  getOrderById(@Args('id') id: string, @CurrentUser() user: TokenPayload) {
    return this.orderService.findById(id);
  }

  @Query(() => [Order], { name: 'orders' })
  getMyOrderByUserId(@CurrentUser() user: TokenPayload) {
    return this.orderService.getMyOrderByUserId(user.userId);
  }
}
