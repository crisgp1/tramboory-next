export class Tematica {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  disponible: boolean;
  destacada: boolean;
  imagen_url?: string;
  orden?: number;
  colores?: string[];
  elementos_incluidos?: string[];
  edad_recomendada?: string;
  created_at: string;
  updated_at: string;
}

export class Paquete {
  id: string;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  duracion_horas: number;
  max_invitados: number;
  disponible: boolean;
  destacado: boolean;
  imagen_url?: string;
  incluye_alimentos: boolean;
  incluye_decoracion: boolean;
  orden?: number;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export class OpcionAlimento {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: 'entrada' | 'plato_fuerte' | 'postre' | 'bebida' | 'snack';
  precio_unitario: number;
  disponible: boolean;
  imagen_url?: string;
  requiere_refrigeracion?: boolean;
  vegetariano?: boolean;
  vegano?: boolean;
  sin_gluten?: boolean;
  created_at: string;
  updated_at: string;
}

export class PaqueteAlimento {
  id: string;
  id_paquete: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  num_personas: number;
  opciones_incluidas: string[];
  disponible: boolean;
  created_at: string;
  updated_at: string;
  paquete?: Paquete;
}

export class Extra {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  tipo: 'decoracion' | 'entretenimiento' | 'mobiliario' | 'servicio' | 'otro';
  disponible: boolean;
  destacado: boolean;
  imagen_url?: string;
  tiempo_anticipacion_dias?: number;
  created_at: string;
  updated_at: string;
}

export class Mampara {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  disponible: boolean;
  destacada: boolean;
  imagen_url?: string;
  medidas?: string;
  material?: string;
  colores_disponibles?: string[];
  created_at: string;
  updated_at: string;
}