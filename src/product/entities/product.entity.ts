import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';
import { ReviewEntity } from '../../review/entities/review.entity';

class ProductCharacteristic {
  @Column()
  name: string;

  @Column()
  value: string;
}

@Entity()
export class ProductEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  oldPrice: number;

  @Column()
  credit: number;

  @Column()
  description: string;

  @Column()
  advantages: string;

  @Column()
  disadvantages: string;

  @Column('simple-array')
  categories: string[];

  @Column('simple-array')
  tags: string[];

  @Column('jsonb')
  characteristics: ProductCharacteristic[];

  @OneToMany(() => ReviewEntity, ({ product }) => product)
  reviews: ReviewEntity[];
}
