import { Injectable, Logger } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserEmailExistsValidator implements ValidatorConstraintInterface {
  // protected readonly logger = new Logger(UserEmailExistsValidator.name);
  constructor(private readonly userService: UserService) {
    console.log('User email validation');
  }
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    console.log(value, ' value validate');
    const existsUser = await this.userService.findByEmail(value);

    return !existsUser;
  }

  defaultMessage(_args: ValidationArguments) {
    // this.logger.log(_args, 'arguments default message');
    return 'User with $property $value already exists';
  }
}
