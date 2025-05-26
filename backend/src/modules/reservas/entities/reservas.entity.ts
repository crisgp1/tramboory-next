export interface Reserva {
  id: string;
  id_usuario: string;
  fecha_evento: string;
  hora_inicio: string;
  hora_fin: string;
  estado: 'pendiente' | 'confirmada' | 'en_proceso' | 'completada' | 'cancelada';
  total_adultos: number;
  total_ninos: number;
  total_estimado: number;
  notas?: string;
  id_paquete?: string;
  id_tematica?: string;
  id_mampara?: string;
  created_at: string;
  updated_at: string;
  
  // Relaciones expandidas
  paquete?: Paquete;
  tematica?: Tematica;
  mampara?: Mampara;
  usuario?: UserProfile;
  extras?: ReservaExtra[];
  pagos?: Pago[];
}

export interface Paquete {
  id: string;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  duracion_horas: number;
  max_adultos: number;
  max_ninos: number;
  incluye_decoracion: boolean;
  incluye_animacion: boolean;
  incluye_sonido: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tematica {
  id: string;
  nombre: string;
  descripcion?: string;
  precio_adicional: number;
  colores_principales: string[];
  elementos_incluidos: string[];
  imagen_referencia?: string;
  edad_recomendada?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Mampara {
  id: string;
  nombre: string;
  descripcion?: string;
  dimensiones: string;
  capacidad_maxima: number;
  precio_hora: number;
  equipamiento: string[];
  ubicacion: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Extra {
  id: string;
  nombre: string;
  descripcion?: string;
  precio_unitario: number;
  tipo: 'servicio' | 'producto' | 'decoracion' | 'entretenimiento';
  unidad_medida: string;
  tiempo_preparacion?: number;
  requiere_personal: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReservaExtra {
  id: string;
  id_reserva: string;
  id_extra: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  notas?: string;
  created_at: string;
  updated_at: string;
  
  // Relaciones
  extra?: Extra;
}

export interface OpcionAlimento {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: 'entrada' | 'plato_principal' | 'postre' | 'bebida' | 'snack';
  precio_por_persona: number;
  ingredientes: string[];
  alergenos?: string[];
  vegetariano: boolean;
  vegano: boolean;
  sin_gluten: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaqueteAlimento {
  id: string;
  nombre: string;
  descripcion?: string;
  precio_por_persona: number;
  min_personas: number;
  opciones_incluidas: string[];
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notificacion {
  id: string;
  id_usuario: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'warning' | 'error' | 'success';
  leida: boolean;
  id_reserva?: string;
  fecha_envio: string;
  created_at: string;
  updated_at: string;
}

// Interfaces para relaciones
export interface UserProfile {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}

export interface Pago {
  id: string;
  monto: number;
  estado_pago: string;
  fecha_pago: string;
}