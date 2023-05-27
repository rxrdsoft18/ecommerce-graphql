import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { DatabaseModule } from '../common/database/database.module';
import {
  Order,
  OrderSchema,
  ShippingAddress,
  ShippingAddressSchema,
} from './schemas';
import { OrderRepository } from './order.repository';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { UserModule } from '../user/user.module';
import { ShippingAddressRepository } from './shipping-address.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: ShippingAddress.name,
        schema: ShippingAddressSchema,
      },
    ]),
    ShoppingCartModule,
    UserModule,
  ],
  providers: [OrderService, OrderResolver, OrderRepository, ShippingAddressRepository],
})
export class OrderModule {}
