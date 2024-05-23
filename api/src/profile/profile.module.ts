import { Module } from '@nestjs/common';
import { UserEntity } from 'src/users/model/user.entity';
import { ProfileEntity } from './model/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
