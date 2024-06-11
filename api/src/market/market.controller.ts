import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MarketService } from './market.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateMarketDto } from './dto/create-market.dto';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  async getAllArtist() {
    return await this.marketService.getAllMarketItems();
  }

  @UseGuards(AccessTokenGuard)
  @Post('/')
  async createMarketItem(@Req() req, @Body() dto: CreateMarketDto) {
    return await this.marketService.create(dto, req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  async deleteMarketItem(@Param('id') id: number) {
    return await this.marketService.delete(id);
  }
}
