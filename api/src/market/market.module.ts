import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/model/user.entity';
import { MarketEntity } from './entities/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MarketEntity])],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
