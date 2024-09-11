import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'El nombre del equipo',
    example: 'Ferrari',
  })
  @IsString({
    message: 'El nombre del equipo debe ser una cadena de caracteres',
  })
  @MinLength(3, {
    message: 'El nombre del equipo debe tener al menos 3 caracteres',
  })
  @MaxLength(30, {
    message: 'El nombre del equipo no debe tener más de 30 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'El nombre del equipo',
    example: 'Ferrari',
  })
  @IsString({
    message: 'El nombre del equipo debe ser una cadena de caracteres',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Imagen del piloto',
    example: 'url_a_la_imagen.jpg',
  })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de caracteres' })
  img?: string;
}
