import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsEnum, IsUUID } from 'class-validator';

enum TipoAlimento {
  ENTRADA = 'entrada',
  PLATO_FUERTE = 'plato_fuerte',
  POSTRE = 'postre',
  BEBIDA = 'bebida',
  SNACK = 'snack'
}

enum TipoExtra {
  DECORACION = 'decoracion',
  ENTRETENIMIENTO = 'entretenimiento',
  MOBILIARIO = 'mobiliario',
  SERVICIO = 'servicio',
  OTRO = 'otro'
}

// DTOs para Tematicas
export class CreateTematicaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  disponible: boolean = true;

  @IsOptional()
  @IsBoolean()
  destacada: boolean = false;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsNumber()
  orden?: number;

  @IsOptional()
  @IsArray()
  colores?: string[];

  @IsOptional()
  @IsArray()
  elementos_incluidos?: string[];

  @IsOptional()
  @IsString()
  edad_recomendada?: string;
}

export class UpdateTematicaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  destacada?: boolean;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsNumber()
  orden?: number;

  @IsOptional()
  @IsArray()
  colores?: string[];

  @IsOptional()
  @IsArray()
  elementos_incluidos?: string[];

  @IsOptional()
  @IsString()
  edad_recomendada?: string;
}

// DTOs para Paquetes
export class CreatePaqueteDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio_base: number;

  @IsNumber()
  duracion_horas: number;

  @IsNumber()
  max_invitados: number;

  @IsOptional()
  @IsBoolean()
  disponible: boolean = true;

  @IsOptional()
  @IsBoolean()
  destacado: boolean = false;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsBoolean()
  incluye_alimentos: boolean;

  @IsBoolean()
  incluye_decoracion: boolean;

  @IsOptional()
  @IsNumber()
  orden?: number;

  @IsOptional()
  @IsString()
  notas?: string;
}

export class UpdatePaqueteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio_base?: number;

  @IsOptional()
  @IsNumber()
  duracion_horas?: number;

  @IsOptional()
  @IsNumber()
  max_invitados?: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  destacado?: boolean;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsBoolean()
  incluye_alimentos?: boolean;

  @IsOptional()
  @IsBoolean()
  incluye_decoracion?: boolean;

  @IsOptional()
  @IsNumber()
  orden?: number;

  @IsOptional()
  @IsString()
  notas?: string;
}

// DTOs para OpcionAlimento
export class CreateOpcionAlimentoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(TipoAlimento)
  tipo: TipoAlimento;

  @IsNumber()
  precio_unitario: number;

  @IsOptional()
  @IsBoolean()
  disponible: boolean = true;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsBoolean()
  requiere_refrigeracion?: boolean;

  @IsOptional()
  @IsBoolean()
  vegetariano?: boolean;

  @IsOptional()
  @IsBoolean()
  vegano?: boolean;

  @IsOptional()
  @IsBoolean()
  sin_gluten?: boolean;
}

export class UpdateOpcionAlimentoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(TipoAlimento)
  tipo?: TipoAlimento;

  @IsOptional()
  @IsNumber()
  precio_unitario?: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsBoolean()
  requiere_refrigeracion?: boolean;

  @IsOptional()
  @IsBoolean()
  vegetariano?: boolean;

  @IsOptional()
  @IsBoolean()
  vegano?: boolean;

  @IsOptional()
  @IsBoolean()
  sin_gluten?: boolean;
}

// DTOs para PaqueteAlimento
export class CreatePaqueteAlimentoDto {
  @IsUUID()
  id_paquete: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  num_personas: number;

  @IsArray()
  opciones_incluidas: string[];

  @IsOptional()
  @IsBoolean()
  disponible: boolean = true;
}

export class UpdatePaqueteAlimentoDto {
  @IsOptional()
  @IsUUID()
  id_paquete?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsNumber()
  num_personas?: number;

  @IsOptional()
  @IsArray()
  opciones_incluidas?: string[];

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}

// DTOs para Extra
export class CreateExtraDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsEnum(TipoExtra)
  tipo: TipoExtra;

  @IsOptional()
  @IsBoolean()
  disponible: boolean = true;

  @IsOptional()
  @IsBoolean()
  destacado: boolean = false;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsNumber()
  tiempo_anticipacion_dias?: number;
}

export class UpdateExtraDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsEnum(TipoExtra)
  tipo?: TipoExtra;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  destacado?: boolean;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsNumber()
  tiempo_anticipacion_dias?: number;
}

// DTOs para Mampara
export class CreateMamparaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  disponible: boolean = true;

  @IsOptional()
  @IsBoolean()
  destacada: boolean = false;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsString()
  medidas?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsArray()
  colores_disponibles?: string[];
}

export class UpdateMamparaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @IsOptional()
  @IsBoolean()
  destacada?: boolean;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsOptional()
  @IsString()
  medidas?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsArray()
  colores_disponibles?: string[];
}