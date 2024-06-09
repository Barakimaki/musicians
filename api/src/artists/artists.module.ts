import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/model/user.entity';
import { ArtistEntity } from './model/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
