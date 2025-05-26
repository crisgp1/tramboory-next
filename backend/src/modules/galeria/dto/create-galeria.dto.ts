import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsUUID, IsEnum, IsObject } from 'class-validator';

enum TipoImagen {
  EVENTO = 'evento',
  TEMATICA = 'tematica',
  DECORACION = 'decoracion',
  ALIMENTOS = 'alimentos',
  OTRO = 'otro'
}

enum TipoAlbum {
  EVENTOS = 'eventos',
  TEMATICAS = 'tematicas',
  DECORACIONES = 'decoraciones',
  ALIMENTOS = 'alimentos',
  INSTALACIONES = 'instalaciones',
  OTRO = 'otro'
}

export class CreateImagenDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  url: string;

  @IsEnum(TipoImagen)
  tipo: TipoImagen;

  @IsOptional()
  @IsArray()
  etiquetas?: string[];

  @IsOptional()
  @IsBoolean()
  activo: boolean = true;

  @IsOptional()
  @IsBoolean()
  destacada: boolean = false;

  @IsOptional()
  @IsNumber()
  orden?: number;

  @IsOptional()
  @IsUUID()
  id_reserva?: string;

  @IsOptional()
  @IsUUID()
  id_tematica?: string;

  @IsOptional()
  @IsUUID()
  id_paquete?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateImagenDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsEnum(TipoImagen)
  tipo?: TipoImagen;

  @IsOptional()
  @IsArray()
  etiquetas?: string[];

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsBoolean()
  destacada?: boolean;

  @IsOptional()
  @IsNumber()
  orden?: number;

  @IsOptional()
  @IsUUID()
  id_reserva?: string;

  @IsOptional()
  @IsUUID()
  id_tematica?: string;

  @IsOptional()
  @IsUUID()
  id_paquete?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class CreateAlbumDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  cover_url?: string;

  @IsEnum(TipoAlbum)
  tipo: TipoAlbum;

  @IsOptional()
  @IsBoolean()
  activo: boolean = true;

  @IsOptional()
  @IsBoolean()
  destacado: boolean = false;

  @IsOptional()
  @IsNumber()
  orden?: number;
}

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  cover_url?: string;

  @IsOptional()
  @IsEnum(TipoAlbum)
  tipo?: TipoAlbum;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsBoolean()
  destacado?: boolean;

  @IsOptional()
  @IsNumber()
  orden?: number;
}

export class CreateAlbumImagenDto {
  @IsUUID()
  id_album: string;

  @IsUUID()
  id_imagen: string;

  @IsOptional()
  @IsNumber()
  orden: number = 0;
}

export class UpdateAlbumImagenDto {
  @IsOptional()
  @IsUUID()
  id_album?: string;

  @IsOptional()
  @IsUUID()
  id_imagen?: string;

  @IsOptional()
  @IsNumber()
  orden?: number;
}