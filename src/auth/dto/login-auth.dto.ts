import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Email de usuario',
    example: 'joe.doe@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña de usuario',
    example: 'Abcd123.',
  })
  @IsString()
  password: string;
}
