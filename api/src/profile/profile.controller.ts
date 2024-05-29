import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ProfileDto } from './dto/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/user')
  async getUserProfile(@Req() req) {
    return await this.profileService.getUserProfile(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getProfile(@Param('id') id: number) {
    return await this.profileService.getProfile(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/user/:id')
  async updateProfile(
    @Param('id') id: number,
    @Req() req,
    @Body() dto: ProfileDto,
  ) {
    if (Number(id) === Number(req.user['sub'])) {
      return await this.profileService.update(id, dto);
    } else {
    }
  }
}
