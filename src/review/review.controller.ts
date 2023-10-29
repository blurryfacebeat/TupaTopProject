import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateReviewDto) {
    await this.reviewService.create(dto);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.reviewService.delete(uuid);
  }

  @Get('by-product/:uuid')
  async findByProductUuid(@Param('uuid') uuid: string) {
    await this.reviewService.findByProductUuid(uuid);
  }
}
