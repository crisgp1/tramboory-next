export class Proveedor {
  id: string;
  nombre: string;
  contacto?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  rfc?: string;
  notas?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export class UnidadMedida {
  id: string;
  nombre: string;
  abreviatura: string;
  descripcion?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export class TipoAjusteInventario {
  id: string;
  nombre: string;
  descripcion?: string;
  afecta_stock: 'incremento' | 'decremento' | 'ninguno';
  requiere_autorizacion: boolean;
  created_at: string;
  updated_at: string;
}

export class MateriaPrima {
  id: string;
  nombre: string;
  descripcion?: string;
  id_unidad_medida: string;
  stock_actual: number;
  stock_minimo: number;
  costo_promedio: number;
  codigo_sku?: string;
  categoria?: string;
  ubicacion?: string;
  es_perecedero: boolean;
  tiempo_caducidad_dias?: number;
  notas?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  unidad_medida?: UnidadMedida;
}

export class ConversionMedida {
  id: string;
  id_unidad_origen: string;
  id_unidad_destino: string;
  factor_conversion: number;
  created_at: string;
  updated_at: string;
  unidad_origen?: UnidadMedida;
  unidad_destino?: UnidadMedida;
}

export class Lote {
  id: string;
  id_materia_prima: string;
  id_proveedor: string;
  numero_lote: string;
  cantidad_inicial: number;
  cantidad_actual: number;
  costo_unitario: number;
  fecha_ingreso: string;
  fecha_produccion?: string;
  fecha_caducidad?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
  materia_prima?: MateriaPrima;
  proveedor?: Proveedor;
}

export class ReservaInventario {
  id: string;
  id_materia_prima: string;
  id_reserva: string;
  cantidad: number;
  fecha_reserva: string;
  fecha_uso_estimada: string;
  estado: 'pendiente' | 'confirmada' | 'utilizada' | 'cancelada';
  notas?: string;
  created_at: string;
  updated_at: string;
  materia_prima?: MateriaPrima;
}

export class OrdenCompra {
  id: string;
  id_proveedor: string;
  numero_orden: string;
  fecha_orden: string;
  fecha_entrega_estimada: string;
  fecha_recepcion?: string;
  estado: 'pendiente' | 'parcial' | 'completada' | 'cancelada';
  subtotal: number;
  impuestos: number;
  total: number;
  notas?: string;
  created_at: string;
  updated_at: string;
  proveedor?: Proveedor;
  detalles?: DetalleOrdenCompra[];
}

export class DetalleOrdenCompra {
  id: string;
  id_orden_compra: string;
  id_materia_prima: string;
  cantidad_solicitada: number;
  cantidad_recibida: number;
  precio_unitario: number;
  subtotal: number;
  estado: 'pendiente' | 'parcial' | 'completado' | 'cancelado';
  created_at: string;
  updated_at: string;
  materia_prima?: MateriaPrima;
  orden_compra?: OrdenCompra;
}

export class AlertaInventario {
  id: string;
  id_materia_prima: string;
  tipo: 'stock_bajo' | 'caducidad' | 'otro';
  mensaje: string;
  fecha_alerta: string;
  estado: 'activa' | 'resuelta' | 'ignorada';
  fecha_resolucion?: string;
  created_at: string;
  updated_at: string;
  materia_prima?: MateriaPrima;
}

export class MovimientoInventario {
  id: string;
  id_materia_prima: string;
  id_lote?: string;
  id_tipo_ajuste: string;
  cantidad: number;
  fecha_movimiento: string;
  motivo?: string;
  referencia?: string;
  id_usuario: string;
  created_at: string;
  updated_at: string;
  materia_prima?: MateriaPrima;
  lote?: Lote;
  tipo_ajuste?: TipoAjusteInventario;
}