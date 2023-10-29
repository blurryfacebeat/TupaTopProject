import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity()
export class ReviewEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => ProductEntity, ({ reviews }) => reviews)
  @JoinColumn({ name: 'product_uuid' })
  product: ProductEntity;
}
