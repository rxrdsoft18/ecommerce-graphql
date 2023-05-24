import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../../auth/enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [String])
  roles: [];
}
