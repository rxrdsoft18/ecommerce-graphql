import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { UserEmailExistsValidator } from '../../../common/validators';

@InputType()
export class CreateUserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  // @Validate(UserEmailExistsValidator)
  @Field(() => String)
  email: string;

  @Field()
  password: string;

  @Field(() => [String])
  roles: [];
}
