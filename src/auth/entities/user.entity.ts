import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';

@Entity()
export class UserEntity extends BaseTimestampEntity {
  @Column('uuid')
  @Generated('uuid')
  uuid: string;

  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
