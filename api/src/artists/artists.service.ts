import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './model/artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/artist.dto';
import { UserEntity } from 'src/users/model/user.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getArtistProfile(id: number) {
    const artistProfile = await this.artistRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        bandLink: true,
        logoUrl: true,
        user: {
          id: true,
        },
      },
    });
    return artistProfile;
  }

  async getAllArtistProfiles() {
    const profiles = await this.artistRepository.find({
      select: {
        id: true,
        name: true,
        logoUrl: true,
      },
    });
    return profiles;
  }

  async create(dto: CreateArtistDto, userID: number) {
    const artist = this.artistRepository.create(dto);
    const user = await this.userRepository.findOne({
      where: {
        id: userID,
      },
    });
    artist.user = user;
    return await this.artistRepository.save(artist);
  }

  async delete(id: number) {
    return this.artistRepository.delete(id);
  }
}
