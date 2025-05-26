import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import { AuthService } from '@/auth/services/auth.service';
import { 
  CreatePermisoDto, 
  CreateRolDto, 
  CreateRolPermisoDto, 
  CreateUsuarioRolDto, 
  NivelPermiso 
} from '@/seguridad/dto/create-seguridad.dto';
import { 
  Permiso, 
  Rol, 
  RolPermiso, 
  UsuarioRol 
} from '@/seguridad/entities/seguridad.entity';

// Utility type to check for Supabase ParserError
interface ParserError {
  error: true;
  toString(): string;
}

// Type guard to check if a result is a ParserError
function isParserError(obj: any): obj is ParserError {
  return obj && typeof obj === 'object' && obj.error === true && typeof obj.toString === 'function';
}

@Injectable()
export class SeguridadService {
  private readonly logger = new Logger(SeguridadService.name);

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  // Métodos para Permisos
  async createPermiso(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    try {
      const permisoData = {
        ...createPermisoDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.permisos')
        .insert(permisoData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear permiso: ${error.message}`);
      }

      return data as Permiso;
    } catch (error) {
      throw new BadRequestException(`Error al crear permiso: ${error.message}`);
    }
  }

  async findAllPermisos(modulo?: string): Promise<Permiso[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('seguridad.permisos')
        .select('*');

      if (modulo) {
        query = query.eq('modulo', modulo);
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener permisos: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      throw new BadRequestException(`Error al obtener permisos: ${error.message}`);
    }
  }

  async findOnePermiso(id: string): Promise<Permiso> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.permisos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Permiso no encontrado: ${error.message}`);
      }

      return data as Permiso;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener permiso: ${error.message}`);
    }
  }

  async updatePermiso(id: string, updateData: Partial<CreatePermisoDto>): Promise<Permiso> {
    try {
      // Verificar que el permiso existe
      await this.findOnePermiso(id);

      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.permisos')
        .update(updatePayload)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar permiso: ${error.message}`);
      }

      return data as Permiso;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar permiso: ${error.message}`);
    }
  }

  async removePermiso(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el permiso existe
      await this.findOnePermiso(id);

      // Verificar si el permiso está siendo utilizado en alguna asignación
      const { data: asignaciones, error: errorCheck } = await this.supabaseService
        .getClient()
        .from('seguridad.rol_permisos')
        .select('id')
        .eq('id_permiso', id);

      if (errorCheck) {
        throw new BadRequestException(`Error al verificar uso del permiso: ${errorCheck.message}`);
      }

      if (asignaciones && asignaciones.length > 0) {
        throw new ForbiddenException('No se puede eliminar el permiso porque está asignado a uno o más roles');
      }

      const { error } = await this.supabaseService
        .getClient()
        .from('seguridad.permisos')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar permiso: ${error.message}`);
      }

      return { message: 'Permiso eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar permiso: ${error.message}`);
    }
  }

  // Métodos para Roles
  async createRol(createRolDto: CreateRolDto): Promise<Rol> {
    try {
      const rolData = {
        ...createRolDto,
        activo: createRolDto.activo ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.roles')
        .insert(rolData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear rol: ${error.message}`);
      }

      return data as Rol;
    } catch (error) {
      throw new BadRequestException(`Error al crear rol: ${error.message}`);
    }
  }

  async findAllRoles(includePermisos: boolean = false): Promise<Rol[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('seguridad.roles')
        .select(includePermisos 
          ? `*, permisos:seguridad.rol_permisos(*, permiso:seguridad.permisos(*))` 
          : '*');

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener roles: ${error.message}`);
      }
      
      if (!data || data.length === 0) {
        return [];
      }
      
      // Filter out any parser errors and log them
      const validData = data.filter(item => {
        if (isParserError(item)) {
          this.logger.warn(`ParserError al obtener roles: ${item.toString()}`);
          return false;
        }
        return true;
      }) as Rol[];
      
      return validData;
    } catch (error) {
      throw new BadRequestException(`Error al obtener roles: ${error.message}`);
    }
  }

  async findOneRol(id: string, includePermisos: boolean = false): Promise<Rol> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.roles')
        .select(includePermisos 
          ? `*, permisos:seguridad.rol_permisos(*, permiso:seguridad.permisos(*))` 
          : '*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Rol no encontrado: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al obtener rol: ${data.toString()}`);
        // Fetch basic data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('seguridad.roles')
          .select('*')
          .eq('id', id)
          .single();
          
        if (basicError) {
          throw new NotFoundException(`Rol no encontrado: ${basicError.message}`);
        }
        
        return basicData as Rol;
      }
      
      return data as Rol;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener rol: ${error.message}`);
    }
  }

  async updateRol(id: string, updateData: Partial<CreateRolDto>): Promise<Rol> {
    try {
      // Verificar que el rol existe
      await this.findOneRol(id);

      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.roles')
        .update(updatePayload)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar rol: ${error.message}`);
      }

      return data as Rol;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar rol: ${error.message}`);
    }
  }

  async removeRol(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el rol existe
      await this.findOneRol(id);

      // Verificar si el rol está siendo utilizado en alguna asignación
      const { data: asignaciones, error: errorCheck } = await this.supabaseService
        .getClient()
        .from('seguridad.usuario_roles')
        .select('id')
        .eq('id_rol', id);

      if (errorCheck) {
        throw new BadRequestException(`Error al verificar uso del rol: ${errorCheck.message}`);
      }

      if (asignaciones && asignaciones.length > 0) {
        throw new ForbiddenException('No se puede eliminar el rol porque está asignado a uno o más usuarios');
      }

      // Eliminar permisos del rol
      const { error: errorPermisos } = await this.supabaseService
        .getClient()
        .from('seguridad.rol_permisos')
        .delete()
        .eq('id_rol', id);

      if (errorPermisos) {
        throw new BadRequestException(`Error al eliminar permisos del rol: ${errorPermisos.message}`);
      }

      // Eliminar rol
      const { error } = await this.supabaseService
        .getClient()
        .from('seguridad.roles')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar rol: ${error.message}`);
      }

      return { message: 'Rol eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar rol: ${error.message}`);
    }
  }

  // Métodos para RolPermiso
  async assignPermisoToRol(createRolPermisoDto: CreateRolPermisoDto): Promise<RolPermiso> {
    try {
      // Verificar que el rol existe
      await this.findOneRol(createRolPermisoDto.id_rol);

      // Verificar que el permiso existe
      await this.findOnePermiso(createRolPermisoDto.id_permiso);

      // Verificar si ya existe esta asignación
      const { data: existing, error: errorCheck } = await this.supabaseService
        .getClient()
        .from('seguridad.rol_permisos')
        .select('*')
        .eq('id_rol', createRolPermisoDto.id_rol)
        .eq('id_permiso', createRolPermisoDto.id_permiso)
        .maybeSingle();

      if (errorCheck) {
        throw new BadRequestException(`Error al verificar asignación: ${errorCheck.message}`);
      }

      // Si ya existe, actualizar el nivel
      if (existing) {
        const { data, error } = await this.supabaseService
          .getClient()
          .from('seguridad.rol_permisos')
          .update({
            nivel: createRolPermisoDto.nivel,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select(`
            *,
            permiso:seguridad.permisos(*),
            rol:seguridad.roles(*)
          `)
          .single();

        if (error) {
          throw new BadRequestException(`Error al actualizar asignación: ${error.message}`);
        }

        if (isParserError(data)) {
          this.logger.warn(`ParserError al actualizar asignación: ${data.toString()}`);
          // Fetch basic data without relations
          const { data: basicData, error: basicError } = await this.supabaseService
            .getClient()
            .from('seguridad.rol_permisos')
            .select('*')
            .eq('id', existing.id)
            .single();
            
          if (basicError) {
            throw new BadRequestException(`Error al recuperar asignación actualizada: ${basicError.message}`);
          }
          
          return basicData as RolPermiso;
        }

        return data as RolPermiso;
      }

      // Si no existe, crear nueva asignación
      const rolPermisoData = {
        ...createRolPermisoDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.rol_permisos')
        .insert(rolPermisoData)
        .select(`
          *,
          permiso:seguridad.permisos(*),
          rol:seguridad.roles(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al asignar permiso: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al asignar permiso: ${data.toString()}`);
        // Fetch basic data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('seguridad.rol_permisos')
          .select('*')
          .eq('id', data['id'])
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar asignación básica: ${basicError.message}`);
        }
        
        return basicData as RolPermiso;
      }

      return data as RolPermiso;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al asignar permiso: ${error.message}`);
    }
  }

  async removePermisoFromRol(id: string): Promise<{ message: string }> {
    try {
      const { error } = await this.supabaseService
        .getClient()
        .from('seguridad.rol_permisos')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al remover permiso: ${error.message}`);
      }

      return { message: 'Permiso removido exitosamente del rol' };
    } catch (error) {
      throw new BadRequestException(`Error al remover permiso: ${error.message}`);
    }
  }

  // Métodos para UsuarioRol
  async assignRolToUsuario(createUsuarioRolDto: CreateUsuarioRolDto): Promise<UsuarioRol> {
    try {
      // Verificar que el rol existe
      await this.findOneRol(createUsuarioRolDto.id_rol);

      // Verificar si el usuario existe en auth
      const { data: userExists, error: userError } = await this.supabaseService
        .getClient()
        .from('public.profiles')
        .select('id')
        .eq('id', createUsuarioRolDto.id_usuario)
        .single();

      if (userError || !userExists) {
        throw new NotFoundException(`Usuario no encontrado: ${userError?.message || 'ID inválido'}`);
      }

      // Verificar si ya existe esta asignación
      const { data: existing, error: errorCheck } = await this.supabaseService
        .getClient()
        .from('seguridad.usuario_roles')
        .select('*')
        .eq('id_usuario', createUsuarioRolDto.id_usuario)
        .eq('id_rol', createUsuarioRolDto.id_rol)
        .maybeSingle();

      if (errorCheck) {
        throw new BadRequestException(`Error al verificar asignación: ${errorCheck.message}`);
      }

      // Si ya existe, actualizar el estado activo
      if (existing) {
        const { data, error } = await this.supabaseService
          .getClient()
          .from('seguridad.usuario_roles')
          .update({
            activo: createUsuarioRolDto.activo ?? true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select(`
            *,
            rol:seguridad.roles(*)
          `)
          .single();

        if (error) {
          throw new BadRequestException(`Error al actualizar asignación: ${error.message}`);
        }

        if (isParserError(data)) {
          this.logger.warn(`ParserError al actualizar asignación: ${data.toString()}`);
          // Fetch basic data without relations
          const { data: basicData, error: basicError } = await this.supabaseService
            .getClient()
            .from('seguridad.usuario_roles')
            .select('*')
            .eq('id', existing.id)
            .single();
            
          if (basicError) {
            throw new BadRequestException(`Error al recuperar asignación actualizada: ${basicError.message}`);
          }
          
          return basicData as UsuarioRol;
        }

        return data as UsuarioRol;
      }

      // Si no existe, crear nueva asignación
      const usuarioRolData = {
        ...createUsuarioRolDto,
        activo: createUsuarioRolDto.activo ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.usuario_roles')
        .insert(usuarioRolData)
        .select(`
          *,
          rol:seguridad.roles(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al asignar rol: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al asignar rol: ${data.toString()}`);
        // Fetch basic data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('seguridad.usuario_roles')
          .select('*')
          .eq('id', data['id'])
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar asignación básica: ${basicError.message}`);
        }
        
        return basicData as UsuarioRol;
      }

      return data as UsuarioRol;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al asignar rol: ${error.message}`);
    }
  }

  async removeRolFromUsuario(id: string): Promise<{ message: string }> {
    try {
      const { error } = await this.supabaseService
        .getClient()
        .from('seguridad.usuario_roles')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al remover rol: ${error.message}`);
      }

      return { message: 'Rol removido exitosamente del usuario' };
    } catch (error) {
      throw new BadRequestException(`Error al remover rol: ${error.message}`);
    }
  }

  async getUserRoles(userId: string): Promise<UsuarioRol[]> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('seguridad.usuario_roles')
        .select(`
          *,
          rol:seguridad.roles(*)
        `)
        .eq('id_usuario', userId)
        .eq('activo', true);

      if (error) {
        throw new BadRequestException(`Error al obtener roles del usuario: ${error.message}`);
      }

      if (!data || data.length === 0) {
        return [];
      }
      
      // Filter out parser errors and log them
      const validData = data.filter(item => {
        if (isParserError(item)) {
          this.logger.warn(`ParserError al obtener roles del usuario: ${item.toString()}`);
          return false;
        }
        return true;
      }) as UsuarioRol[];
      
      return validData;
    } catch (error) {
      throw new BadRequestException(`Error al obtener roles del usuario: ${error.message}`);
    }
  }

  async checkUserPermission(userId: string, permiso: string, nivel: NivelPermiso = NivelPermiso.LECTURA): Promise<boolean> {
    try {
      // Verificar si el usuario es administrador (tipo_usuario = 'admin')
      const { data: userProfile, error: userError } = await this.supabaseService
        .getClient()
        .from('public.profiles')
        .select('tipo_usuario')
        .eq('id', userId)
        .single();

      if (userError) {
        throw new NotFoundException(`Usuario no encontrado: ${userError.message}`);
      }

      // Si es admin, tiene todos los permisos
      if (userProfile?.tipo_usuario === 'admin') {
        return true;
      }

      // Obtener roles activos del usuario
      const userRoles = await this.getUserRoles(userId);
      
      if (!userRoles || userRoles.length === 0) {
        return false;
      }

      // IDs de los roles del usuario
      const roleIds = userRoles.map(ur => ur.id_rol);

      // Buscar permisos en los roles del usuario
      const { data: permissions, error } = await this.supabaseService
        .getClient()
        .from('seguridad.rol_permisos')
        .select(`
          nivel,
          permiso:seguridad.permisos(nombre)
        `)
        .in('id_rol', roleIds);

      if (error) {
        throw new BadRequestException(`Error al verificar permisos: ${error.message}`);
      }

      if (!permissions) {
        return false;
      }

      // Verificar si tiene el permiso con el nivel requerido
      return permissions.some(p => {
        // Safely handle potential ParserError objects
        if (isParserError(p)) {
          this.logger.warn(`ParserError al verificar permiso: ${p.toString()}`);
          return false;
        }

        // Safely access permiso property
        if (!p.permiso || typeof p.permiso !== 'object') {
          return false;
        }

        const permisoObj = p.permiso;
        const permisoNombre = permisoObj && 'nombre' in permisoObj ? permisoObj.nombre : null;
        const permisoNivel = p.nivel as NivelPermiso;
        
        if (permisoNombre !== permiso) {
          return false;
        }
        
        // Verificar nivel
        switch (nivel) {
          case NivelPermiso.LECTURA:
            // Para lectura, cualquier nivel es suficiente
            return true;
          case NivelPermiso.ESCRITURA:
            // Para escritura, necesita nivel escritura o administrador
            return permisoNivel === NivelPermiso.ESCRITURA || permisoNivel === NivelPermiso.ADMINISTRADOR;
          case NivelPermiso.ADMINISTRADOR:
            // Para administrador, necesita nivel administrador
            return permisoNivel === NivelPermiso.ADMINISTRADOR;
          default:
            return false;
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al verificar permiso: ${error.message}`);
    }
  }
}