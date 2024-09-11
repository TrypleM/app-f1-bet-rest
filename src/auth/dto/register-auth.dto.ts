import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'Juan Perez',
  })
  @IsString({
    message: 'El nombre de usuario debe ser una cadena de caracteres',
  })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre de usuario no debe tener más de 20 caracteres',
  })
  username: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(30, {
    message: 'La contraseña no debe tener más de 30 caracteres',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'La contraseña debe tener al menos una letra y un número',
  })
  password: string;
}
