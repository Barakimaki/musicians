import { UserEntity } from 'src/users/model/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', unique: true })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  bandLink: string;

  @Column({ default: '' })
  logoUrl: string;

  @ManyToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
