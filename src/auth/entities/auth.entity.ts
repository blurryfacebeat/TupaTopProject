import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';

@Entity()
export class AuthEntity extends BaseTimestampEntity {
  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  passwordHash: string;
}
