import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from '../auth/enums/role.enum';
import { AbstractIdDocumentSchema } from '../common/repositories/base/abstract-id.document.schema';

@Schema({ versionKey: false, collection: 'users', timestamps: true })
export class User extends AbstractIdDocumentSchema {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
