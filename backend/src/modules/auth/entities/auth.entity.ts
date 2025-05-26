export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  raw_app_meta_data?: any;
  raw_user_meta_data?: any;
  aud: string;
  role: string;
}

export interface UserProfile {
  id: string;
  nombre: string;
  telefono?: string;
  direccion?: string;
  tipo_usuario: 'admin' | 'cliente' | 'inventario' | 'finanzas';
  created_at: string;
  updated_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: User;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  profile?: UserProfile;
}

export interface PermissionCheck {
  permiso: string;
  nivel: 'lectura' | 'escritura' | 'administrador';
  hasPermission: boolean;
}

export interface Rol {
  id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Permiso {
  id: string;
  nombre: string;
  descripcion?: string;
  recurso: string;
  created_at: string;
  updated_at: string;
}

export interface UsuarioRol {
  id: string;
  id_usuario: string;
  id_rol: string;
  activo: boolean;
  fecha_asignacion: string;
  fecha_expiracion?: string;
  created_at: string;
  updated_at: string;
}