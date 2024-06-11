import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from 'src/artists/model/artist.entity';
import { MarketEntity } from 'src/market/entities/market.entity';
import { ProfileEntity } from 'src/profile/model/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @ApiProperty({ example: 1, description: 'id пользователя' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'user@email.com',
    description: 'E-Mail пользователя',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'username',
    description: 'Username пользователя',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: '******',
    description: 'Password пользователя',
  })
  @Column({ unique: true })
  password: string;

  @ApiProperty({
    example: 'asda23123sdfasg45gsg',
    description: 'Refresh-токен пользователя',
  })
  @Column({
    nullable: true,
  })
  refreshToken: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;

  @OneToMany(() => ArtistEntity, (artist) => artist.user)
  artists: ArtistEntity[];

  @OneToMany(() => MarketEntity, (market) => market.user)
  market: MarketEntity[];
}
