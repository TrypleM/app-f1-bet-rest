import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRaceDto {
  @ApiProperty({
    description: 'El nombre de la carrera',
    example: 'Gran Premio de Mónaco',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'El país donde se celebra la carrera',
    example: 'Mónaco',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: 'Descripción de la carrera',
    example: 'Una de las carreras más prestigiosas de la Fórmula 1',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Fecha de la carrera',
    example: '2024-05-26',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
