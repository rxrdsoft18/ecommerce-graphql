import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DatabaseModule } from '../common/database/database.module';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
