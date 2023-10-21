import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductEntity, 'id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductEntity) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async find(@Body() dto: FindProductDto) {}
}
