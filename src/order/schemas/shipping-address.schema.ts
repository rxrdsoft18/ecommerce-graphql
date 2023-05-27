import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { AbstractIdDocumentSchema } from '../../common/repositories';

@Schema({
  versionKey: false,
  collection: 'shipping-addresses',
  timestamps: true,
})
export class ShippingAddress extends AbstractIdDocumentSchema {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  postalCode: string;

  @Prop({ type: String, required: true })
  country: string;
}
export const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress);
