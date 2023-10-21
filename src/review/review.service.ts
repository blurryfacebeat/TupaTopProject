import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<CreateReviewDto>,
  ) {}

  async create(dto: CreateReviewDto) {
    return this.reviewRepository.create(dto);
  }

  async delete() {}
}
