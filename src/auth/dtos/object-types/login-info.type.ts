import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginInfo {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  accessToken: string;
}
