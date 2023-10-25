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
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: Omit<ProductEntity, 'id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductEntity) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async find(@Body() dto: FindProductDto) {}

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    await this.productService.findOne(uuid);
  }
}
