import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/profile/model/profile.entity';
import { ArtistEntity } from 'src/artists/model/artist.entity';
import { MarketEntity } from 'src/market/entities/market.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      MarketEntity,
      ProfileEntity,
      ArtistEntity,
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
