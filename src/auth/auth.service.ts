import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginInput } from './dtos/inputs/login.input';
import { UserService } from '../user/user.service';
import { TokenPayload } from './interfaces/token-payload.interface';
import { LoginInfo } from './dtos/object-types/login-info.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;

    const isPasswordMatching = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!isPasswordMatching) return null;

    return user;
  }

  async login(loginInput: LoginInput): Promise<LoginInfo> {
    const { email, password } = loginInput;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new UnauthorizedException('The passed credentials are incorrect');

    const tokenPayload: TokenPayload = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: user.roles,
      userId: user._id.toHexString(),
    };

    const jwt = await this.jwtService.signAsync(tokenPayload);

    return {
      firstname: user.firstname,
      lastname: user.lastname,
      accessToken: jwt,
    };
  }
}
