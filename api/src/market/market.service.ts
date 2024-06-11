import { Injectable } from '@nestjs/common';
import { MarketEntity } from './entities/market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/model/user.entity';
import { Repository } from 'typeorm';
import { CreateMarketDto } from './dto/create-market.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(MarketEntity)
    private readonly marketRepository: Repository<MarketEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllMarketItems() {
    const items = await await this.marketRepository.find({
      relations: {
        user: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        photoUrl: true,
        user: {
          id: true,
        },
      },
    });

    return items;
  }

  async create(dto: CreateMarketDto, userID: number) {
    const item = this.marketRepository.create(dto);
    const user = await this.userRepository.findOne({
      where: {
        id: userID,
      },
    });
    item.user = user;
    return await this.marketRepository.save(item);
  }

  async delete(id: number) {
    return this.marketRepository.delete(id);
  }
}
