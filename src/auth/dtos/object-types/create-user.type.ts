import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../../enums/role.enum';
import { Expose, Transform } from 'class-transformer';

@ObjectType()
export class CreateUser {
  @Field()
  // @Expose({ name: '_id' })
  // @Transform(({ value }) => {
  //   console.log(value, ' value transform');
  //   return value;
  // })
  _id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field(() => [String])
  roles: [];

  @Field()
  createdAt: Date;
}
