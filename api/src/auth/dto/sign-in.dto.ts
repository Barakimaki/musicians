import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'E-Mail пользователя',
  })
  @IsString({ message: 'should be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({
    example: '******',
    description: 'Password пользователя',
  })
  @IsString({ message: 'should be a string' })
  @Length(4, 16, {
    message: 'password length should be more than 4 symbols and less than 16',
  })
  readonly password: string;
}
