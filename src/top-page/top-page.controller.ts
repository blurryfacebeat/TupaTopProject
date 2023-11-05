import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopPageEntity } from './entities/top-page.entity';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateTopPageDto } from './dto/update-top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post()
  async create(@Body() dto: CreateTopPageDto): Promise<TopPageEntity> {
    return this.topPageService.create(dto);
  }

  @Get(':uuid')
  async findOne(@Param() uuid: string): Promise<TopPageEntity> {
    return this.topPageService.findOne(uuid);
  }

  @Get()
  async find(): Promise<TopPageEntity[]> {
    return this.topPageService.find();
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<DeleteResult> {
    return this.topPageService.delete(uuid);
  }

  @Patch(':uuid')
  async patch(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateTopPageDto,
  ): Promise<UpdateResult> {
    return this.topPageService.patch(uuid, dto);
  }
}
