import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './model/profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './model/profile.interface';
import { UserEntity } from 'src/users/model/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserProfile(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
      select: {
        id: true,
        name: true,
        familyName: true,
        avatarUrl: true,
        user: {
          username: true,
          id: true,
        },
      },
    });

    return profile;
  }

  async getProfile(profileId: number): Promise<Profile> {
    const profile: Profile = await this.profileRepository.findOne({
      where: { id: profileId },
      relations: {
        user: true,
      },
      select: {
        id: true,
        name: true,
        familyName: true,
        birthDate: true,
        avatarUrl: true,
        user: {
          username: true,
          id: true,
        },
      },
    });

    return profile;
  }

  async getAllProfiles() {
    return await this.profileRepository.find({
      relations: {
        user: true,
      },
      select: {
        id: true,
        name: true,
        familyName: true,
        birthDate: true,
        avatarUrl: true,
        user: {
          username: true,
          id: true,
        },
      },
    });
  }

  async update(id: number, dto: ProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
      select: {
        id: true,
        name: true,
        familyName: true,
        birthDate: true,
        avatarUrl: true,
        user: {
          username: true,
          id: true,
        },
      },
    });

    const { name, familyName, birthDate, avatarUrl }: ProfileDto = dto;

    profile.name = name;
    profile.familyName = familyName;
    profile.birthDate = new Date(birthDate);
    if (avatarUrl) {
      profile.avatarUrl = avatarUrl;
    }
    console.log(profile);

    return await this.profileRepository.save(profile);
  }
}
