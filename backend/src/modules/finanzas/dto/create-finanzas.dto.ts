import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsEnum, 
  IsUUID, 
  IsDateString,
  Min
} from 'class-validator';

export enum TipoFinanza {
  INGRESO = 'ingreso',
  GASTO = 'gasto'
}

export enum MetodoPago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
  TRANSFERENCIA = 'transferencia',
  PAYPAL = 'paypal'
}

export enum EstadoPago {
  PENDIENTE = 'pendiente',
  COMPLETADO = 'completado',
  FALLIDO = 'fallido',
  REEMBOLSADO = 'reembolsado'
}

export class CreateFinanzasDto {
  @IsUUID(4, { message: 'ID de categoría debe ser un UUID válido' })
  id_categoria: string;

  @IsEnum(TipoFinanza, { message: 'Tipo debe ser ingreso o gasto' })
  tipo: TipoFinanza;

  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0.01, { message: 'El monto debe ser mayor a 0' })
  monto: number;

  @IsString({ message: 'La descripción es requerida' })
  descripcion: string;

  @IsDateString({}, { message: 'Fecha debe ser una fecha válida' })
  fecha: string;

  @IsOptional()
  @IsUUID(4, { message: 'ID de reserva debe ser un UUID válido' })
  id_reserva?: string;
}

export class CreatePagoDto {
  @IsUUID(4, { message: 'ID de reserva debe ser un UUID válido' })
  id_reserva: string;

  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0.01, { message: 'El monto debe ser mayor a 0' })
  monto: number;

  @IsEnum(MetodoPago, { message: 'Método de pago no válido' })
  metodo_pago: MetodoPago;

  @IsOptional()
  @IsEnum(EstadoPago, { message: 'Estado de pago no válido' })
  estado_pago?: EstadoPago = EstadoPago.PENDIENTE;

  @IsDateString({}, { message: 'Fecha de pago debe ser una fecha válida' })
  fecha_pago: string;

  @IsOptional()
  @IsString({ message: 'La referencia debe ser texto' })
  referencia_pago?: string;

  @IsOptional()
  @IsString({ message: 'Las notas deben ser texto' })
  notas?: string;
}

export class CreateCategoriaDto {
  @IsString({ message: 'El nombre es requerido' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  descripcion?: string;

  @IsEnum(TipoFinanza, { message: 'Tipo debe ser ingreso o gasto' })
  tipo: TipoFinanza;
}

export class FinanzasFiltersDto {
  @IsOptional()
  @IsEnum(TipoFinanza, { message: 'Tipo debe ser ingreso o gasto' })
  tipo?: TipoFinanza;

  @IsOptional()
  @IsUUID(4, { message: 'ID de categoría debe ser un UUID válido' })
  categoriaId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de inicio debe ser una fecha válida' })
  fechaInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de fin debe ser una fecha válida' })
  fechaFin?: string;
}

export class PagosFiltersDto {
  @IsOptional()
  @IsUUID(4, { message: 'ID de reserva debe ser un UUID válido' })
  reservaId?: string;

  @IsOptional()
  @IsEnum(EstadoPago, { message: 'Estado de pago no válido' })
  estado?: EstadoPago;

  @IsOptional()
  @IsEnum(MetodoPago, { message: 'Método de pago no válido' })
  metodoPago?: MetodoPago;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de inicio debe ser una fecha válida' })
  fechaInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Fecha de fin debe ser una fecha válida' })
  fechaFin?: string;
}