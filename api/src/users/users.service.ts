import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './model/user.entity';
import { User } from './model/user.interface';
import { ProfileEntity } from 'src/profile/model/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.save(
      this.userRepository.create(dto),
    );
    const profile = await this.profileRepository.create();
    profile.user = user;
    await this.profileRepository.save(profile);
    return user;
  }

  async findOneById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async setRefreshToken(id: number, refreshToken: string | null) {
    const user = await this.findOneById(id);
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    return await this.findOneById(user.id);
  }
}
