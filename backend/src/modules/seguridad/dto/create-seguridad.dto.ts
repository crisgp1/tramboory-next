import { 
  IsString, 
  IsBoolean, 
  IsOptional, 
  IsEnum, 
  IsUUID,
  IsNotEmpty,
  MaxLength
} from 'class-validator';

export enum NivelPermiso {
  LECTURA = 'lectura',
  ESCRITURA = 'escritura',
  ADMINISTRADOR = 'administrador'
}

// DTOs para Permisos
export class CreatePermisoDto {
  @IsNotEmpty({ message: 'El nombre del permiso es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  @MaxLength(200, { message: 'La descripción no puede exceder 200 caracteres' })
  descripcion?: string;

  @IsNotEmpty({ message: 'El módulo es requerido' })
  @IsString({ message: 'El módulo debe ser texto' })
  modulo: string;
}

export class UpdatePermisoDto extends CreatePermisoDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID debe ser un UUID válido' })
  id?: string;
}

export class PermisoFiltersDto {
  @IsOptional()
  @IsString({ message: 'El módulo debe ser texto' })
  modulo?: string;
}

// DTOs para Roles
export class CreateRolDto {
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  @MaxLength(200, { message: 'La descripción no puede exceder 200 caracteres' })
  descripcion?: string;

  @IsOptional()
  @IsBoolean({ message: 'Activo debe ser un valor booleano' })
  activo?: boolean = true;
}

export class UpdateRolDto extends CreateRolDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID debe ser un UUID válido' })
  id?: string;
}

// DTOs para RolPermiso
export class CreateRolPermisoDto {
  @IsNotEmpty({ message: 'El ID del rol es requerido' })
  @IsUUID(4, { message: 'ID del rol debe ser un UUID válido' })
  id_rol: string;

  @IsNotEmpty({ message: 'El ID del permiso es requerido' })
  @IsUUID(4, { message: 'ID del permiso debe ser un UUID válido' })
  id_permiso: string;

  @IsEnum(NivelPermiso, { message: 'Nivel de permiso no válido' })
  nivel: NivelPermiso = NivelPermiso.LECTURA;
}

export class UpdateRolPermisoDto extends CreateRolPermisoDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID debe ser un UUID válido' })
  id?: string;
}

// DTOs para UsuarioRol
export class CreateUsuarioRolDto {
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsUUID(4, { message: 'ID del usuario debe ser un UUID válido' })
  id_usuario: string;

  @IsNotEmpty({ message: 'El ID del rol es requerido' })
  @IsUUID(4, { message: 'ID del rol debe ser un UUID válido' })
  id_rol: string;

  @IsOptional()
  @IsBoolean({ message: 'Activo debe ser un valor booleano' })
  activo?: boolean = true;
}

export class UpdateUsuarioRolDto extends CreateUsuarioRolDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID debe ser un UUID válido' })
  id?: string;
}

export class UsuarioRolFiltersDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID del usuario debe ser un UUID válido' })
  userId?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID del rol debe ser un UUID válido' })
  rolId?: string;

  @IsOptional()
  @IsBoolean({ message: 'Activo debe ser un valor booleano' })
  activo?: boolean;
}