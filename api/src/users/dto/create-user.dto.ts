import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'E-Mail пользователя',
  })
  @IsString({ message: 'should be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({
    example: 'username',
    description: 'Username пользователя',
  })
  @IsString({ message: 'should be a string' })
  @Length(4, 16, {
    message: 'username length should be more than 4 symbols and less than 16',
  })
  readonly username: string;

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
