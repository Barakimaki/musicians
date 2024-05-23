import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/profile/model/profile.entity';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [UsersController],
})
export class UsersModule {}
