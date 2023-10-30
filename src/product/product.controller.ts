import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(dto);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<DeleteResult> {
    return this.productService.delete(uuid);
  }

  @Patch(':uuid')
  async patch(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productService.patch(uuid, dto);
  }

  @Get()
  async find(
    @Query('category') category: string,
    @Query('limit') limit: number = 10,
  ): Promise<ProductEntity[]> {
    return this.productService.find(category, +limit);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ProductEntity> {
    return this.productService.findOne(uuid);
  }
}
