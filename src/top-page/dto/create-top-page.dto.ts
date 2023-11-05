import { FirstCategory } from '../entities/top-page.entity';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class HhData {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

class TopPageAdvantage {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {
  @IsEnum(FirstCategory)
  firstCategory: FirstCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhData)
  hh?: HhData;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantage)
  advantages: TopPageAdvantage[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
