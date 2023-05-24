import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUser } from './dtos/object-types/create-user.type';
import { CreateUserInput } from '../user/dtos/inputs/create-user.input';
import { UserService } from '../user/user.service';
import { LoginInfo } from './dtos/object-types/login-info.type';
import { LoginInput } from './dtos/inputs/login.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => CreateUser)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginInfo)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
