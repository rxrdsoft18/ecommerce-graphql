import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShoppingCart } from './schemas/shopping-cart.schema';
import { BaseAbstractRepository } from '../common/repositories';

export class ShoppingCartRepository extends BaseAbstractRepository<ShoppingCart> {
  protected readonly logger = new Logger(ShoppingCartRepository.name);

  constructor(
    @InjectModel(ShoppingCart.name)
    private readonly shoppingCartModel: Model<ShoppingCart>,
  ) {
    super(shoppingCartModel);
  }
}
