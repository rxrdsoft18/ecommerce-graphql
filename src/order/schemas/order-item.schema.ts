import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class OrderItem {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, default: 0 })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  // @Prop({ type: String, default: 'https://i.imgur.com/Vih6Km5.png' })
  // image: string;

  // @Prop({ type: Types.ObjectId, ref: Product.name })
  // product: Product;
}
