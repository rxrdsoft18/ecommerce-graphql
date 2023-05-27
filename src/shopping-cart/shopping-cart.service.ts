import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ShoppingCartRepository } from './shopping-cart.repository';
import { AddProductInput } from './dtos/inputs/add-product.input';
import { ShoppingCart } from './schemas';
import { TokenPayload } from '../auth/interfaces/token-payload.interface';
import { ProductService } from '../product/product.service';
import { CreateShoppingCartDto } from './dtos/create.shopping-cart.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ShoppingCartService {
  protected readonly logger = new Logger(ShoppingCartService.name);
  constructor(
    private readonly shoppingCartRepository: ShoppingCartRepository,
    private readonly productService: ProductService,
  ) {}

  private async getShoppingCartByUserId(userId: string): Promise<ShoppingCart> {
    return this.shoppingCartRepository.findOne({
      userId,
    });
  }

  private async createShoppingCart(
    createShoppingCartDto: CreateShoppingCartDto,
  ) {
    return this.shoppingCartRepository.create(createShoppingCartDto);
  }

  private async getSubTotalPrice(
    price: number,
    quantity: number,
  ): Promise<number> {
    return price * quantity;
  }

  private async recalculateTotalPrice(shoppingCart: ShoppingCart) {
    return shoppingCart.items.reduce(
      (acc, item) => acc + item.subTotalPrice,
      0,
    );
  }

  async addProductToShoppingCart(
    addProductInput: AddProductInput,
    user: TokenPayload,
  ) {
    const { userId } = user;
    const { productId, quantity } = addProductInput;

    const shoppingCart = await this.getShoppingCartByUserId(userId);

    if (!shoppingCart) {
      const { price, name } = await this.productService.findById(productId);
      return this.createShoppingCart(
        plainToClass(CreateShoppingCartDto, {
          userId,
          items: [
            {
              ...addProductInput,
              price,
              name,
              subTotalPrice: await this.getSubTotalPrice(price, quantity),
            },
          ],
          totalPrice: await this.getSubTotalPrice(price, quantity),
        }),
      );
    } else {
      const { price, name } = await this.productService.findById(productId);
      const itemCart = shoppingCart.items.find(
        (itemCart) => itemCart.productId === productId,
      );
      if (itemCart) {
        Object.assign(itemCart, {
          ...addProductInput,
          price,
          name,
          subTotalPrice: await this.getSubTotalPrice(price, quantity),
        });
        shoppingCart.totalPrice = await this.recalculateTotalPrice(
          shoppingCart,
        );
      } else {
        shoppingCart.items.push({
          ...addProductInput,
          price,
          name,
          subTotalPrice: await this.getSubTotalPrice(price, quantity),
        });
        shoppingCart.totalPrice = await this.recalculateTotalPrice(
          shoppingCart,
        );
      }

      return this.shoppingCartRepository.findOneAndUpdate(
        {
          _id: shoppingCart._id,
        },
        shoppingCart,
      );
    }
  }

  async getShoppingCartById(id: string): Promise<ShoppingCart> {
    const shoppingCart = await this.shoppingCartRepository.findOne({ _id: id });

    if (!shoppingCart) {
      throw new NotFoundException(`ShoppingCart with ID: ${id} not found`);
    }
    return shoppingCart;
  }

  async deleteShoppingCart(user: TokenPayload) {
    return this.shoppingCartRepository.findOneAndDelete({
      userId: user.userId,
    });
  }

  async removeProductOfShoppingCart(
    productId: string,
    user: TokenPayload,
  ): Promise<ShoppingCart> {
    const shoppingCart = await this.getShoppingCartByUserId(user.userId);

    if (!shoppingCart) {
      throw new NotFoundException('ShoppingCart not found');
    }

    const indexOfItem = shoppingCart.items.findIndex(
      (itemCart) => itemCart.productId === productId,
    );

    if (indexOfItem === -1) {
      throw new NotFoundException(
        `ProductId: ${productId} not found in shoppingCart`,
      );
    }

    shoppingCart.items.splice(indexOfItem, 1);
    shoppingCart.totalPrice = await this.recalculateTotalPrice(shoppingCart);

    return this.shoppingCartRepository.findOneAndUpdate(
      {
        _id: shoppingCart._id,
      },
      shoppingCart,
    );
  }
}
