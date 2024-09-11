import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DriverResponseDto {
  @ApiProperty({
    description: 'El ID del conductor',
    example: 'f1c8a2e6-5f4c-4c3d-9f19-4d8b8d233c4f',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'El nombre del conductor',
    example: 'Juan Perez',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del conductor',
    example: '2001-06-01',
  })
  @IsString()
  birthday: string;

  @ApiProperty({
    description: 'Descripción del conductor',
    example: 'Piloto que empezó a debutar con ...',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Imagen del conductor',
    example: 'url_a_la_imagen.jpg',
  })
  @IsString()
  img: string;

  @ApiProperty({
    description: 'Equipo del conductor',
    example: { id: 'team_id', name: 'Ferrari' },
  })
  team: { id: string; name: string; img: string };
}
