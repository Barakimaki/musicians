import { UserEntity } from 'src/users/model/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MarketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', unique: true })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  photoUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
