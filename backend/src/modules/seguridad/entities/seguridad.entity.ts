export enum NivelPermiso {
  LECTURA = 'lectura',
  ESCRITURA = 'escritura',
  ADMINISTRADOR = 'administrador'
}

export interface Permiso {
  id: string;
  nombre: string;
  descripcion?: string;
  modulo: string;
  created_at: string;
  updated_at: string;
}

export interface Rol {
  id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  
  // Relaciones expandidas
  permisos?: RolPermiso[];
}

export interface RolPermiso {
  id: string;
  id_rol: string;
  id_permiso: string;
  nivel: NivelPermiso;
  created_at: string;
  updated_at: string;
  
  // Relaciones expandidas
  permiso?: Permiso;
  rol?: Rol;
}

export interface UsuarioRol {
  id: string;
  id_usuario: string;
  id_rol: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
  
  // Relaciones expandidas
  rol?: Rol;
  usuario?: UserProfile;
}

// Interfaces para relaciones
export interface UserProfile {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  tipo_usuario?: string;
}