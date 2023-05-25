import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractIdDocumentSchema } from '../common/repositories/base/abstract-id.document.schema';

@Schema({ versionKey: false, collection: 'categories', timestamps: true })
export class Category extends AbstractIdDocumentSchema {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
