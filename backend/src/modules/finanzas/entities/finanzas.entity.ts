export interface Finanza {
  id: string;
  id_categoria: string;
  tipo: 'ingreso' | 'gasto';
  monto: number;
  descripcion: string;
  fecha: string;
  id_reserva?: string;
  created_at: string;
  updated_at: string;
  
  // Relaciones expandidas
  categoria?: CategoriaFinanza;
  reserva?: ReservaBasica;
}

export interface CategoriaFinanza {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: 'ingreso' | 'gasto';
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Pago {
  id: string;
  id_reserva: string;
  monto: number;
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia' | 'paypal';
  estado_pago: 'pendiente' | 'completado' | 'fallido' | 'reembolsado';
  fecha_pago: string;
  referencia_pago?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
  
  // Relaciones expandidas
  reserva?: ReservaDetallada;
}

export interface Reembolso {
  id: string;
  id_pago: string;
  monto_reembolso: number;
  motivo: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado' | 'procesado';
  fecha_solicitud: string;
  fecha_procesamiento?: string;
  id_aprobado_por?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
  
  // Relaciones
  pago?: Pago;
  aprobado_por?: UserBasico;
}

export interface ResumenFinanciero {
  totalIngresos: number;
  totalGastos: number;
  totalPagos: number;
  utilidad: number;
  periodo: {
    fechaInicio: string;
    fechaFin: string;
  };
  desglose?: {
    ingresosPorCategoria: IngresoPorCategoria[];
    gastosPorCategoria: GastoPorCategoria[];
    pagosPorMetodo: PagoPorMetodo[];
  };
}

export interface IngresoPorCategoria {
  categoria: string;
  total: number;
  count: number;
}

export interface GastoPorCategoria {
  categoria: string;
  total: number;
  count: number;
}

export interface PagoPorMetodo {
  metodo_pago: string;
  total: number;
  count: number;
}

export interface EstadisticasFinancieras {
  ventasDiarias: VentaDiaria[];
  ingresosMensuales: IngresoMensual[];
  gastosMensuales: GastoMensual[];
  proyeccionAnual: ProyeccionAnual;
  reservasPendientesPago: ReservaPendientePago[];
}

export interface VentaDiaria {
  fecha: string;
  total_ventas: number;
  total_reservas: number;
}

export interface IngresoMensual {
  mes: string;
  año: number;
  total_ingresos: number;
}

export interface GastoMensual {
  mes: string;
  año: number;
  total_gastos: number;
}

export interface ProyeccionAnual {
  año: number;
  ingresos_proyectados: number;
  gastos_proyectados: number;
  utilidad_proyectada: number;
  base_calculo: string;
}

export interface ReservaPendientePago {
  id_reserva: string;
  fecha_evento: string;
  total_estimado: number;
  total_pagado: number;
  saldo_pendiente: number;
  cliente: string;
}

// Interfaces para relaciones
export interface ReservaBasica {
  id: string;
  fecha_evento: string;
  total_estimado: number;
  estado: string;
}

export interface ReservaDetallada {
  id: string;
  fecha_evento: string;
  total_estimado: number;
  estado: string;
  usuario?: {
    nombre: string;
    email: string;
    telefono?: string;
  };
}

export interface UserBasico {
  id: string;
  nombre: string;
  email: string;
}

// Tipos para filtros y consultas
export interface FiltrosFinancieros {
  tipo?: 'ingreso' | 'gasto';
  categoriaId?: string;
  fechaInicio?: string;
  fechaFin?: string;
  montoMinimo?: number;
  montoMaximo?: number;
}

export interface FiltrosPagos {
  reservaId?: string;
  estado?: 'pendiente' | 'completado' | 'fallido' | 'reembolsado';
  metodoPago?: 'efectivo' | 'tarjeta' | 'transferencia' | 'paypal';
  fechaInicio?: string;
  fechaFin?: string;
  montoMinimo?: number;
  montoMaximo?: number;
}