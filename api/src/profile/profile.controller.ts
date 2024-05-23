import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getUserProfile(@Req() req) {
    return await this.profileService.getUserProfile(req.user['sub']);
  }
}
