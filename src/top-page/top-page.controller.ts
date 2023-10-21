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
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageEntity } from './entities/top-page.entity';

@Controller('top-page')
export class TopPageController {
  @Post()
  async create(@Body() dto: Omit<TopPageEntity, 'uuid'>) {}

  @Get()
  async get(@Param('id') id: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageEntity) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
