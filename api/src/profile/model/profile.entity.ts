import { UserEntity } from 'src/users/model/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  familyName: string;

  @Column({ default: new Date(2000, 0, 1) })
  birthDate: Date;

  @Column({ default: '' })
  avatarUrl: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;
}
