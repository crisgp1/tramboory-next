import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';

export interface UserProfile {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  tipo_usuario: 'admin' | 'cliente' | 'inventario' | 'finanzas';
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: any;
  session: any;
  profile?: UserProfile;
}

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<AuthResponse> {
    const { email, password, nombre, telefono, direccion, tipo_usuario } = createAuthDto;

    try {
      // Registrar usuario en Supabase Auth
      const { data, error } = await this.supabaseService.signUp(email, password);
      
      if (error) {
        throw new BadRequestException(`Error al registrar usuario: ${error.message}`);
      }

      // El trigger handle_new_user() se encargará de crear el perfil automáticamente
      // con los datos de raw_user_meta_data

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      throw new BadRequestException(`Error en registro: ${error.message}`);
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabaseService.signIn(email, password);
      
      if (error) {
        throw new UnauthorizedException(`Credenciales inválidas: ${error.message}`);
      }

      // Obtener perfil del usuario
      const profile = await this.getUserProfile(data.user.id);

      return {
        user: data.user,
        session: data.session,
        profile,
      };
    } catch (error) {
      throw new UnauthorizedException(`Error en autenticación: ${error.message}`);
    }
  }

  async signOut(): Promise<{ message: string }> {
    try {
      const { error } = await this.supabaseService.signOut();
      
      if (error) {
        throw new BadRequestException(`Error al cerrar sesión: ${error.message}`);
      }

      return { message: 'Sesión cerrada correctamente' };
    } catch (error) {
      throw new BadRequestException(`Error al cerrar sesión: ${error.message}`);
    }
  }

  async getCurrentUser(): Promise<{ user: any; profile?: UserProfile }> {
    try {
      const { data, error } = await this.supabaseService.getUser();
      
      if (error || !data.user) {
        throw new UnauthorizedException('Usuario no autenticado');
      }

      const profile = await this.getUserProfile(data.user.id);

      return {
        user: data.user,
        profile,
      };
    } catch (error) {
      throw new UnauthorizedException(`Error al obtener usuario: ${error.message}`);
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn(`No se pudo obtener perfil para usuario ${userId}:`, error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      return null;
    }
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar perfil: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new BadRequestException(`Error al actualizar perfil: ${error.message}`);
    }
  }

  // Método para verificar permisos usando la función de Supabase
  async verificarPermiso(permiso: string, nivel: 'lectura' | 'escritura' | 'administrador' = 'lectura'): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .rpc('verificar_permiso', {
          p_permiso: permiso,
          p_nivel: nivel
        });

      if (error) {
        console.error('Error al verificar permiso:', error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error('Error al verificar permiso:', error);
      return false;
    }
  }
}