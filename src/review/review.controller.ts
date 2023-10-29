import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateReviewDto) {
    await this.reviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    await this.reviewService.delete(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-product/:uuid')
  async findByProductUuid(@Param('uuid') uuid: string) {
    await this.reviewService.findByProductUuid(uuid);
  }
}
