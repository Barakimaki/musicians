import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenDto } from './dto/access-token.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: AccessTokenDto })
  @Post('signup')
  async signUp(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(dto);
    const authData = await this.authService.signUp(dto);
    res.cookie('refreshToken', authData.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return authData.accessToken;
  }

  @ApiOperation({ summary: 'Логинизация пользователя' })
  @ApiResponse({ status: 200, type: AccessTokenDto })
  @Post('signin')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authData = await this.authService.signIn(dto);
    res.cookie('refreshToken', authData.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { accessToken: authData.accessToken };
  }

  @ApiOperation({ summary: 'Разлогинизация пользователя' })
  @ApiBearerAuth('defaultJWTAuthorization')
  @ApiResponse({ status: 200 })
  @Get('signout')
  @UseGuards(AccessTokenGuard)
  async signOut(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.signOut(req.user['sub']);
    res.clearCookie('refreshToken');
  }

  @ApiOperation({ summary: 'Обновление refresh-токена пользователя' })
  @ApiCookieAuth('refreshToken')
  @ApiResponse({ status: 200, type: AccessTokenDto })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req, @Res({ passthrough: true }) res: Response) {
    const refreshedTokens = await this.authService.refreshTokens(
      req.user['sub'],
      req.user['refreshToken'],
    );
    res.cookie('refreshToken', refreshedTokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { accessToken: refreshedTokens.accessToken };
  }
}
