import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    description: 'El nombre del piloto',
    example: 'Juan Perez',
  })
  @IsString({
    message: 'El nombre del piloto debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El nombre del piloto no puede estar vacío' })
  name: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del piloto en formato ISO',
    example: '2001-06-01',
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de nacimiento debe estar en formato ISO' },
  )
  birthday?: string;

  @ApiProperty({
    description: 'Descripción del piloto',
    example: 'Piloto que empezó a debutar con ...',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  @MaxLength(500, {
    message: 'La descripción no debe tener más de 500 caracteres',
  })
  description?: string;

  @ApiProperty({
    description: 'Imagen del piloto',
    example: 'url_a_la_imagen.jpg',
  })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de caracteres' })
  img?: string;

  @ApiProperty({
    description: 'El nombre del equipo al que pertenece el piloto',
    example: 'Ferrari',
  })
  @IsString({
    message: 'El nombre del equipo debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El nombre del equipo no puede estar vacío' })
  team: string;
}
