import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';

@Entity()
export class UserEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
