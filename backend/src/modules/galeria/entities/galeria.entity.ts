export class Imagen {
  id: string;
  titulo: string;
  descripcion?: string;
  url: string;
  tipo: 'evento' | 'tematica' | 'decoracion' | 'alimentos' | 'otro';
  etiquetas?: string[];
  activo: boolean;
  destacada: boolean;
  orden?: number;
  id_reserva?: string;
  id_tematica?: string;
  id_paquete?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export class Album {
  id: string;
  nombre: string;
  descripcion?: string;
  cover_url?: string;
  tipo: 'eventos' | 'tematicas' | 'decoraciones' | 'alimentos' | 'instalaciones' | 'otro';
  activo: boolean;
  destacado: boolean;
  orden?: number;
  created_at: string;
  updated_at: string;
  imagenes?: Imagen[];
}

export class AlbumImagen {
  id: string;
  id_album: string;
  id_imagen: string;
  orden: number;
  created_at: string;
  updated_at: string;
  imagen?: Imagen;
  album?: Album;
}