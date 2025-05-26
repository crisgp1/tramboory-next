import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum TipoUsuario {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
  INVENTARIO = 'inventario',
  FINANZAS = 'finanzas'
}

export class CreateAuthDto {
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  direccion?: string;

  @IsOptional()
  @IsEnum(TipoUsuario, { message: 'Tipo de usuario no válido' })
  tipo_usuario?: TipoUsuario = TipoUsuario.CLIENTE;
}