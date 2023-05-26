import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductInput } from './dtos/inputs/create-product.input';
import { CategoryService } from '../category/category.service';
import { Product } from './schemas/product.schema';
import { UpdateProductInput } from './dtos/inputs/update-product.input';
import { IUpdateProduct } from './interfaces/update-product.interface';

@Injectable()
export class ProductService {
  protected readonly logger = new Logger(ProductService.name);
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({});
  }
  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ _id: id });

    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    }
    return product;
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const category = await this.categoryService.findById(
      createProductInput.category,
    );
    return this.productRepository.create({
      ...createProductInput,
      category,
    });
  }

  async update(
    id: string,
    updateProductInput: Omit<UpdateProductInput, 'productId'>,
  ): Promise<Product> {
    await this.findById(id);

    const updateProduct: IUpdateProduct = {};

    if (updateProductInput.category) {
      updateProduct.category = await this.categoryService.findById(
        updateProductInput.category,
      );
      delete updateProductInput.category;
    }

    return this.productRepository.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...updateProduct,
        ...updateProductInput,
      },
    );
  }

  async delete(id: string) {
    await this.findById(id);
    return this.productRepository.findOneAndDelete({ _id: id });
  }
}
