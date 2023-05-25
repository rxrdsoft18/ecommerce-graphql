import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dtos/inputs/create-category.input';
import { slugify } from '../common/utils/stringHelper';
import { CategoryRepository } from './category.repository';
import { Category } from './category.schema';
import { UpdateCategoryInput } from './dtos/inputs/update-category.input';
import { IUpdateCategory } from './interfaces/update-category.interface';

@Injectable()
export class CategoryService {
  protected readonly logger = new Logger(CategoryService.name);

  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({});
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ _id: id });

    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    return category;
  }

  async create(createCategoryInput: CreateCategoryInput) {
    const { name, description } = createCategoryInput;
    return this.categoryRepository.create({
      name,
      slug: slugify(name),
      description,
    });
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    await this.findById(id);

    const { name } = updateCategoryInput;
    const updateCategory: IUpdateCategory = {
      ...updateCategoryInput,
    };

    if (name) {
      updateCategory.slug = slugify(name);
    }

    return this.categoryRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateCategory,
    );
  }

  async delete(id: string) {
    await this.findById(id);
    return this.categoryRepository.findOneAndDelete({ _id: id });
  }
}
