import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { getEntityNotFoundError } from '../utils/get-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(dto);

    return this.productRepository.save(product);
  }

  async delete(uuid: string): Promise<DeleteResult> {
    await this.findOne(uuid);

    return this.productRepository.delete(uuid);
  }

  // TODO Сделать расчеты среднего рейтинга и количества отзывов
  async find(category: string, limit: number): Promise<ProductEntity[]> {
    return this.productRepository.find({
      where: {
        categories: category,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      relations: {
        reviews: true,
      },
    });
  }

  async patch(uuid: string, dto: UpdateProductDto): Promise<UpdateResult> {
    await this.findOne(uuid);

    return this.productRepository.update(uuid, dto);
  }

  async findOne(uuid: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        uuid,
      },
      relations: {
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException(getEntityNotFoundError('Product'));
    }

    return product;
  }
}
