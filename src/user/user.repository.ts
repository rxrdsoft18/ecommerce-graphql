import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseAbstractRepository } from '../common/repositories/base/base.abstract.repository';
import { User } from './user.schema';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
