import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsEnum, 
  IsUUID, 
  IsDateString,
  Min,
  Max
} from 'class-validator';

export enum EstadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada'
}

export class CreateReservasDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID de usuario debe ser un UUID válido' })
  id_usuario?: string;

  @IsDateString({}, { message: 'Fecha de evento debe ser una fecha válida' })
  fecha_evento: string;

  @IsString({ message: 'Hora de inicio es requerida' })
  hora_inicio: string;

  @IsString({ message: 'Hora de fin es requerida' })
  hora_fin: string;

  @IsOptional()
  @IsEnum(EstadoReserva, { message: 'Estado no válido' })
  estado?: EstadoReserva = EstadoReserva.PENDIENTE;

  @IsNumber({}, { message: 'Total de adultos debe ser un número' })
  @Min(1, { message: 'Debe haber al menos 1 adulto' })
  @Max(50, { message: 'Máximo 50 adultos permitidos' })
  total_adultos: number;

  @IsNumber({}, { message: 'Total de niños debe ser un número' })
  @Min(0, { message: 'Total de niños no puede ser negativo' })
  @Max(50, { message: 'Máximo 50 niños permitidos' })
  total_ninos: number;

  @IsNumber({}, { message: 'Total estimado debe ser un número' })
  @Min(0, { message: 'Total estimado no puede ser negativo' })
  total_estimado: number;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser texto' })
  notas?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID de paquete debe ser un UUID válido' })
  id_paquete?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID de temática debe ser un UUID válido' })
  id_tematica?: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID de mampara debe ser un UUID válido' })
  id_mampara?: string;
}

export class UpdateReservasDto extends CreateReservasDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID debe ser un UUID válido' })
  id?: string;
}

export class ReservaFiltersDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID de usuario debe ser un UUID válido' })
  userId?: string;

  @IsOptional()
  @IsEnum(EstadoReserva, { message: 'Estado no válido' })
  estado?: EstadoReserva;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de inicio debe ser una fecha válida' })
  fechaInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de fin debe ser una fecha válida' })
  fechaFin?: string;
}