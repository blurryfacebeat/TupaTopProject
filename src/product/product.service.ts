import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { getEntityNotFoundError } from '../utils/get-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateProductDto) {}

  async delete() {}

  async findOne(uuid: string) {
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
