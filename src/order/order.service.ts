import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CreateOrderInput } from './dtos/inputs/create-order.input';
import { OrderRepository } from './order.repository';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { UserService } from '../user/user.service';
import { ShippingAddressRepository } from './shipping-address.repository';
import { ShoppingCart } from '../shopping-cart/schemas';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  protected readonly logger = new Logger(OrderService.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly userService: UserService,
    private readonly shippingAddressRepository: ShippingAddressRepository,
  ) {}

  async findById(id: string) {
    const order = await this.orderRepository.findOne({ _id: id });

    if (!order) {
      throw new NotFoundException(`Order with ID: ${id} not found`);
    }

    return order;
  }

  async getMyOrderByUserId(userId: string) {
    return this.orderRepository.find({}).populate({
      path: 'user',
      match: { _id: { $eq: userId } },
    });
  }

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

    console.log(shoppingCart.items);

    console.log(this.getShoppingCartItemWithObjectId(shoppingCart));

    const addressCreated = await this.shippingAddressRepository.create(
      shippingAddress,
    );

    return await this.orderRepository.create({
      shippingPrice: 10,
      totalPrice: shoppingCart.totalPrice,
      isPaid: true,
      paidAt: new Date(),
      isDelivered: false,
      deliveredAt: null,
      user: userExists,
      orderItems: this.getShoppingCartItemWithObjectId(shoppingCart),
      shippingAddress: addressCreated,
    });
  }

  private getShoppingCartItemWithObjectId(shoppingCart: ShoppingCart) {
    return shoppingCart.items.map((item) => ({
      ...item,
      _id: new Types.ObjectId(),
    }));
  }
}
