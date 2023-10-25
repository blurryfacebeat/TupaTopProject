import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    await this.reviewService.create(dto);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.reviewService.delete(uuid);
  }

  @Get('by-product/:uuid')
  async getByProduct(@Param('uuid') uuid: string) {
    await this.reviewService.getByProduct(uuid);
  }
}
