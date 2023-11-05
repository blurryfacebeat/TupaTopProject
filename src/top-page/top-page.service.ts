import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TopPageEntity } from './entities/top-page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { getEntityNotFoundError } from '../utils/get-errors';
import { UpdateTopPageDto } from './dto/update-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectRepository(TopPageEntity)
    private readonly topPageRepository: Repository<TopPageEntity>,
  ) {}

  async create(dto: CreateTopPageDto): Promise<TopPageEntity> {
    return this.topPageRepository.save(dto);
  }

  async findOne(uuid: string): Promise<TopPageEntity> {
    const topPage = await this.topPageRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!topPage) {
      throw new NotFoundException(getEntityNotFoundError('Top page'));
    }

    return topPage;
  }

  async find(): Promise<TopPageEntity[]> {
    return this.topPageRepository.find();
  }

  async delete(uuid: string): Promise<DeleteResult> {
    const topPage = await this.topPageRepository.findOne({
      where: {
        uuid,
      },
    });

    if (!topPage) {
      throw new NotFoundException(getEntityNotFoundError('Top page'));
    }

    return this.topPageRepository.delete(uuid);
  }

  async patch(uuid: string, dto: UpdateTopPageDto): Promise<UpdateResult> {
    await this.findOne(uuid);

    return this.topPageRepository.update(uuid, dto);
  }
}
