import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CreateOrderInput } from './dtos/inputs/create-order.input';
import { OrderRepository } from './order.repository';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { UserService } from '../user/user.service';
import { ShippingAddressRepository } from './shipping-address.repository';

@Injectable()
export class OrderService {
  protected readonly logger = new Logger(OrderService.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly userService: UserService,
    private readonly shippingAddressRepository: ShippingAddressRepository,
  ) {}

  async createOrder(createOrderInput: CreateOrderInput, user: TokenPayload) {
    const { userId, email } = user;
    const { shippingAddress } = createOrderInput;
    const shoppingCart = await this.shoppingCartService.getShoppingCartByUserId(
      userId,
    );

    if (!shoppingCart) {
      throw new BadRequestException(
        'Error create order with shopping cart not found',
      );
    }
    const userExists = await this.userService.findByEmail(email);

    const addressCreated = await this.shippingAddressRepository.create(
      shippingAddress,
    );

    return this.orderRepository.create({
      shippingPrice: 10,
      totalPrice: shoppingCart.totalPrice,
      isPaid: true,
      paidAt: new Date(),
      isDelivered: false,
      deliveredAt: null,
      user: userExists,
      orderItems: shoppingCart.items,
      shippingAddress: addressCreated,
    });
  }
}
