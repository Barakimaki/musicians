import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    example: 'asd23124ssad3wq2453radf343241234134',
    description: 'Access Token пользователя',
  })
  readonly accessToken: string;
}
