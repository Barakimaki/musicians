import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from 'src/profile/model/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
