import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductInput } from './dtos/inputs/create-product.input';
import { CategoryService } from '../category/category.service';
import { Product } from './schemas/product.schema';

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
}
