import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartResolver } from './shopping-cart.resolver';
import { DatabaseModule } from '../common/database/database.module';
import { ShoppingCart, ShoppingCartSchema } from './schemas';
import { ShoppingCartRepository } from './shopping-cart.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: ShoppingCart.name,
        schema: ShoppingCartSchema,
      },
    ]),
    ProductModule,
  ],
  providers: [
    ShoppingCartService,
    ShoppingCartResolver,
    ShoppingCartRepository,
  ],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
