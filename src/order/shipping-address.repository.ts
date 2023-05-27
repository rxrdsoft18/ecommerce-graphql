import { BaseAbstractRepository } from '../common/repositories';
import { ShippingAddress } from './schemas';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ShippingAddressRepository extends BaseAbstractRepository<ShippingAddress> {
  protected readonly logger = new Logger(ShippingAddressRepository.name);

  constructor(
    @InjectModel(ShippingAddress.name)
    private readonly shippingAddressModel: Model<ShippingAddress>,
  ) {
    super(shippingAddressModel);
  }
}
