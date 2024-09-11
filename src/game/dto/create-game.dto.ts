import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    description: 'El nombre del juego',
    example: 'Game 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Ids de los jugadores',
    example: '[90d0b2ff-921d-4ab7-9486-6537d63a61eb]',
  })
  @IsString()
  players: string[];
}
