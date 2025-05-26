import { IsString, IsOptional, IsBoolean, IsNumber, IsDate, IsEnum, IsUUID, IsISO8601 } from 'class-validator';

enum AfectaStock {
  INCREMENTO = 'incremento',
  DECREMENTO = 'decremento',
  NINGUNO = 'ninguno'
}

enum EstadoReserva {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  UTILIZADA = 'utilizada',
  CANCELADA = 'cancelada'
}

enum EstadoOrden {
  PENDIENTE = 'pendiente',
  PARCIAL = 'parcial',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada'
}

enum EstadoDetalle {
  PENDIENTE = 'pendiente',
  PARCIAL = 'parcial',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado'
}

enum TipoAlerta {
  STOCK_BAJO = 'stock_bajo',
  CADUCIDAD = 'caducidad',
  OTRO = 'otro'
}

enum EstadoAlerta {
  ACTIVA = 'activa',
  RESUELTA = 'resuelta',
  IGNORADA = 'ignorada'
}

// DTOs para Proveedor
export class CreateProveedorDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  contacto?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  rfc?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsBoolean()
  activo: boolean = true;
}

export class UpdateProveedorDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  contacto?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  rfc?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// DTOs para UnidadMedida
export class CreateUnidadMedidaDto {
  @IsString()
  nombre: string;

  @IsString()
  abreviatura: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  activo: boolean = true;
}

export class UpdateUnidadMedidaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  abreviatura?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// DTOs para TipoAjusteInventario
export class CreateTipoAjusteInventarioDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(AfectaStock)
  afecta_stock: AfectaStock;

  @IsBoolean()
  requiere_autorizacion: boolean;
}

export class UpdateTipoAjusteInventarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(AfectaStock)
  afecta_stock?: AfectaStock;

  @IsOptional()
  @IsBoolean()
  requiere_autorizacion?: boolean;
}

// DTOs para MateriaPrima
export class CreateMateriaPrimaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsUUID()
  id_unidad_medida: string;

  @IsNumber()
  stock_actual: number;

  @IsNumber()
  stock_minimo: number;

  @IsNumber()
  costo_promedio: number;

  @IsOptional()
  @IsString()
  codigo_sku?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsBoolean()
  es_perecedero: boolean;

  @IsOptional()
  @IsNumber()
  tiempo_caducidad_dias?: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsBoolean()
  activo: boolean = true;
}

export class UpdateMateriaPrimaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsUUID()
  id_unidad_medida?: string;

  @IsOptional()
  @IsNumber()
  stock_actual?: number;

  @IsOptional()
  @IsNumber()
  stock_minimo?: number;

  @IsOptional()
  @IsNumber()
  costo_promedio?: number;

  @IsOptional()
  @IsString()
  codigo_sku?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsBoolean()
  es_perecedero?: boolean;

  @IsOptional()
  @IsNumber()
  tiempo_caducidad_dias?: number;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

// DTOs para ConversionMedida
export class CreateConversionMedidaDto {
  @IsUUID()
  id_unidad_origen: string;

  @IsUUID()
  id_unidad_destino: string;

  @IsNumber()
  factor_conversion: number;
}

export class UpdateConversionMedidaDto {
  @IsOptional()
  @IsUUID()
  id_unidad_origen?: string;

  @IsOptional()
  @IsUUID()
  id_unidad_destino?: string;

  @IsOptional()
  @IsNumber()
  factor_conversion?: number;
}

// DTOs para Lote
export class CreateLoteDto {
  @IsUUID()
  id_materia_prima: string;

  @IsUUID()
  id_proveedor: string;

  @IsString()
  numero_lote: string;

  @IsNumber()
  cantidad_inicial: number;

  @IsNumber()
  cantidad_actual: number;

  @IsNumber()
  costo_unitario: number;

  @IsISO8601()
  fecha_ingreso: string;

  @IsOptional()
  @IsISO8601()
  fecha_produccion?: string;

  @IsOptional()
  @IsISO8601()
  fecha_caducidad?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}

export class UpdateLoteDto {
  @IsOptional()
  @IsUUID()
  id_materia_prima?: string;

  @IsOptional()
  @IsUUID()
  id_proveedor?: string;

  @IsOptional()
  @IsString()
  numero_lote?: string;

  @IsOptional()
  @IsNumber()
  cantidad_inicial?: number;

  @IsOptional()
  @IsNumber()
  cantidad_actual?: number;

  @IsOptional()
  @IsNumber()
  costo_unitario?: number;

  @IsOptional()
  @IsISO8601()
  fecha_ingreso?: string;

  @IsOptional()
  @IsISO8601()
  fecha_produccion?: string;

  @IsOptional()
  @IsISO8601()
  fecha_caducidad?: string;

  @IsOptional()
  @IsString()
  notas?: string;
}

// DTOs para ReservaInventario
export class CreateReservaInventarioDto {
  @IsUUID()
  id_materia_prima: string;

  @IsUUID()
  id_reserva: string;

  @IsNumber()
  cantidad: number;

  @IsISO8601()
  fecha_reserva: string;

  @IsISO8601()
  fecha_uso_estimada: string;

  @IsEnum(EstadoReserva)
  estado: EstadoReserva = EstadoReserva.PENDIENTE;

  @IsOptional()
  @IsString()
  notas?: string;
}

export class UpdateReservaInventarioDto {
  @IsOptional()
  @IsUUID()
  id_materia_prima?: string;

  @IsOptional()
  @IsUUID()
  id_reserva?: string;

  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @IsOptional()
  @IsISO8601()
  fecha_reserva?: string;

  @IsOptional()
  @IsISO8601()
  fecha_uso_estimada?: string;

  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;

  @IsOptional()
  @IsString()
  notas?: string;
}

// DTOs para OrdenCompra
export class CreateOrdenCompraDto {
  @IsUUID()
  id_proveedor: string;

  @IsString()
  numero_orden: string;

  @IsISO8601()
  fecha_orden: string;

  @IsISO8601()
  fecha_entrega_estimada: string;

  @IsOptional()
  @IsISO8601()
  fecha_recepcion?: string;

  @IsEnum(EstadoOrden)
  estado: EstadoOrden = EstadoOrden.PENDIENTE;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  impuestos: number;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsString()
  notas?: string;
}

export class UpdateOrdenCompraDto {
  @IsOptional()
  @IsUUID()
  id_proveedor?: string;

  @IsOptional()
  @IsString()
  numero_orden?: string;

  @IsOptional()
  @IsISO8601()
  fecha_orden?: string;

  @IsOptional()
  @IsISO8601()
  fecha_entrega_estimada?: string;

  @IsOptional()
  @IsISO8601()
  fecha_recepcion?: string;

  @IsOptional()
  @IsEnum(EstadoOrden)
  estado?: EstadoOrden;

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @IsOptional()
  @IsNumber()
  impuestos?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsString()
  notas?: string;
}

// DTOs para DetalleOrdenCompra
export class CreateDetalleOrdenCompraDto {
  @IsUUID()
  id_orden_compra: string;

  @IsUUID()
  id_materia_prima: string;

  @IsNumber()
  cantidad_solicitada: number;

  @IsNumber()
  cantidad_recibida: number = 0;

  @IsNumber()
  precio_unitario: number;

  @IsNumber()
  subtotal: number;

  @IsEnum(EstadoDetalle)
  estado: EstadoDetalle = EstadoDetalle.PENDIENTE;
}

export class UpdateDetalleOrdenCompraDto {
  @IsOptional()
  @IsUUID()
  id_orden_compra?: string;

  @IsOptional()
  @IsUUID()
  id_materia_prima?: string;

  @IsOptional()
  @IsNumber()
  cantidad_solicitada?: number;

  @IsOptional()
  @IsNumber()
  cantidad_recibida?: number;

  @IsOptional()
  @IsNumber()
  precio_unitario?: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @IsOptional()
  @IsEnum(EstadoDetalle)
  estado?: EstadoDetalle;
}

// DTOs para AlertaInventario
export class CreateAlertaInventarioDto {
  @IsUUID()
  id_materia_prima: string;

  @IsEnum(TipoAlerta)
  tipo: TipoAlerta;

  @IsString()
  mensaje: string;

  @IsISO8601()
  fecha_alerta: string;

  @IsEnum(EstadoAlerta)
  estado: EstadoAlerta = EstadoAlerta.ACTIVA;

  @IsOptional()
  @IsISO8601()
  fecha_resolucion?: string;
}

export class UpdateAlertaInventarioDto {
  @IsOptional()
  @IsUUID()
  id_materia_prima?: string;

  @IsOptional()
  @IsEnum(TipoAlerta)
  tipo?: TipoAlerta;

  @IsOptional()
  @IsString()
  mensaje?: string;

  @IsOptional()
  @IsISO8601()
  fecha_alerta?: string;

  @IsOptional()
  @IsEnum(EstadoAlerta)
  estado?: EstadoAlerta;

  @IsOptional()
  @IsISO8601()
  fecha_resolucion?: string;
}

// DTOs para MovimientoInventario
export class CreateMovimientoInventarioDto {
  @IsUUID()
  id_materia_prima: string;

  @IsOptional()
  @IsUUID()
  id_lote?: string;

  @IsUUID()
  id_tipo_ajuste: string;

  @IsNumber()
  cantidad: number;

  @IsISO8601()
  fecha_movimiento: string;

  @IsOptional()
  @IsString()
  motivo?: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsUUID()
  id_usuario: string;
}

export class UpdateMovimientoInventarioDto {
  @IsOptional()
  @IsUUID()
  id_materia_prima?: string;

  @IsOptional()
  @IsUUID()
  id_lote?: string;

  @IsOptional()
  @IsUUID()
  id_tipo_ajuste?: string;

  @IsOptional()
  @IsNumber()
  cantidad?: number;

  @IsOptional()
  @IsISO8601()
  fecha_movimiento?: string;

  @IsOptional()
  @IsString()
  motivo?: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsOptional()
  @IsUUID()
  id_usuario?: string;
}