import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopPageEntity } from './entities/top-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopPageEntity])],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
