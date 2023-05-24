import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserInput } from './dtos/inputs/create-user.input';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.findByEmail(createUserInput.email);

    if (user) {
      throw new ConflictException('An account with this email already exists.');
    }

    const hashedPassword = await this.hashPassword(createUserInput.password);
    const createdUser = await this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    this.logger.log(createdUser);
    return createdUser;
  }
}
