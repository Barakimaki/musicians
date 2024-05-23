import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto) {
    const isSuchEmailUser = await this.usersService.findOneByEmail(dto.email);

    if (isSuchEmailUser) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isSuchUsernameUser = await this.usersService.findOneByUsername(
      dto.username,
    );

    if (isSuchUsernameUser) {
      throw new HttpException(
        'Пользователь с таким username существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    const newUser = await this.usersService.create({
      ...dto,
      password: hashPassword,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.usersService.setRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.getTokens(user.id, user.username);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signOut(userId: number) {
    this.usersService.setRefreshToken(userId, null);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    if (refreshToken !== user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.id, user.username);
    await this.usersService.setRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async validateUser(dto: SignInDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  decodeToken(refreshToken: string) {
    return this.jwtService.decode(refreshToken);
  }
}
