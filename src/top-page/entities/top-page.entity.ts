import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';

export enum FirstCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @Column()
  count: number;

  @Column()
  juniorSalary: number;

  @Column()
  middleSalary: number;

  @Column()
  seniorSalary: number;
}

export class TopPageAdvantage {
  @Column()
  title: string;

  @Column()
  description: string;
}

@Entity()
export class TopPageEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: FirstCategory,
  })
  firstCategory: FirstCategory;

  @Column()
  secondCategory: string;

  @Column({ unique: true })
  alias: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column('simple-json')
  hh?: HhData;

  @Column('simple-array')
  advantages: TopPageAdvantage[];

  @Column()
  seoText: string;

  @Column()
  tagsTitle: string;

  @Column('simple-array')
  tags: string[];
}
