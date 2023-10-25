import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { getEntityNotFoundError } from '../utils/get-errors';
import { ProductService } from '../product/product.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async create(dto: CreateReviewDto) {
    const { productUuid, ...reviewData } = dto;

    const product = await this.productService.findOne(productUuid);

    const review = await this.reviewRepository.create({
      ...reviewData,
      product,
    });

    return await this.reviewRepository.save(review);
  }

  async delete(uuid: string) {
    const review = await this.reviewRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!review) {
      throw new NotFoundException(getEntityNotFoundError('Review'));
    }

    return this.reviewRepository.delete(uuid);
  }

  async getByProduct(uuid: string) {
    await this.productService.findOne(uuid);

    return await this.reviewRepository.find({
      where: {
        product: {
          uuid,
        },
      },
    });
  }
}
