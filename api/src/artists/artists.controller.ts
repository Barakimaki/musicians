import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateArtistDto } from './dto/artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/all')
  async getAllArtist() {
    return await this.artistService.getAllArtistProfiles();
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  async getArtist(@Param('id') id: number) {
    return await this.artistService.getArtistProfile(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/')
  async createArtist(@Req() req, @Body() dto: CreateArtistDto) {
    return await this.artistService.create(dto, req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteArtist(@Param('id') id: number) {
    return await this.artistService.delete(id);
  }
}
