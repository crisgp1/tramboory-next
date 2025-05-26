import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  HttpStatus, 
  HttpCode 
} from '@nestjs/common';
import { SeguridadService } from '@/seguridad/services/seguridad.service';
import { 
  CreatePermisoDto, 
  CreateRolDto,
  CreateRolPermisoDto,
  CreateUsuarioRolDto,
  PermisoFiltersDto,
  UsuarioRolFiltersDto,
  NivelPermiso
} from '@/seguridad/dto/create-seguridad.dto';

@Controller('seguridad')
export class SeguridadController {
  constructor(private readonly seguridadService: SeguridadService) {}

  // Endpoints para Permisos
  @Post('permisos')
  @HttpCode(HttpStatus.CREATED)
  async createPermiso(@Body() createPermisoDto: CreatePermisoDto) {
    try {
      const permiso = await this.seguridadService.createPermiso(createPermisoDto);
      return {
        success: true,
        message: 'Permiso creado exitosamente',
        data: permiso,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('permisos')
  async findAllPermisos(@Query() filters: PermisoFiltersDto) {
    try {
      const permisos = await this.seguridadService.findAllPermisos(filters.modulo);
      return {
        success: true,
        message: 'Permisos obtenidos exitosamente',
        data: permisos,
        count: permisos.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('permisos/:id')
  async findOnePermiso(@Param('id') id: string) {
    try {
      const permiso = await this.seguridadService.findOnePermiso(id);
      return {
        success: true,
        message: 'Permiso obtenido exitosamente',
        data: permiso,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('permisos/:id')
  async updatePermiso(@Param('id') id: string, @Body() updatePermisoDto: CreatePermisoDto) {
    try {
      const permiso = await this.seguridadService.updatePermiso(id, updatePermisoDto);
      return {
        success: true,
        message: 'Permiso actualizado exitosamente',
        data: permiso,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('permisos/:id')
  async removePermiso(@Param('id') id: string) {
    try {
      const result = await this.seguridadService.removePermiso(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Endpoints para Roles
  @Post('roles')
  @HttpCode(HttpStatus.CREATED)
  async createRol(@Body() createRolDto: CreateRolDto) {
    try {
      const rol = await this.seguridadService.createRol(createRolDto);
      return {
        success: true,
        message: 'Rol creado exitosamente',
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('roles')
  async findAllRoles(@Query('includePermisos') includePermisos: boolean = false) {
    try {
      const roles = await this.seguridadService.findAllRoles(includePermisos);
      return {
        success: true,
        message: 'Roles obtenidos exitosamente',
        data: roles,
        count: roles.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('roles/:id')
  async findOneRol(
    @Param('id') id: string,
    @Query('includePermisos') includePermisos: boolean = false
  ) {
    try {
      const rol = await this.seguridadService.findOneRol(id, includePermisos);
      return {
        success: true,
        message: 'Rol obtenido exitosamente',
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('roles/:id')
  async updateRol(@Param('id') id: string, @Body() updateRolDto: CreateRolDto) {
    try {
      const rol = await this.seguridadService.updateRol(id, updateRolDto);
      return {
        success: true,
        message: 'Rol actualizado exitosamente',
        data: rol,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('roles/:id')
  async removeRol(@Param('id') id: string) {
    try {
      const result = await this.seguridadService.removeRol(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Endpoints para RolPermiso
  @Post('roles/permisos')
  @HttpCode(HttpStatus.CREATED)
  async assignPermisoToRol(@Body() createRolPermisoDto: CreateRolPermisoDto) {
    try {
      const rolPermiso = await this.seguridadService.assignPermisoToRol(createRolPermisoDto);
      return {
        success: true,
        message: 'Permiso asignado al rol exitosamente',
        data: rolPermiso,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('roles/permisos/:id')
  async removePermisoFromRol(@Param('id') id: string) {
    try {
      const result = await this.seguridadService.removePermisoFromRol(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Endpoints para UsuarioRol
  @Post('usuarios/roles')
  @HttpCode(HttpStatus.CREATED)
  async assignRolToUsuario(@Body() createUsuarioRolDto: CreateUsuarioRolDto) {
    try {
      const usuarioRol = await this.seguridadService.assignRolToUsuario(createUsuarioRolDto);
      return {
        success: true,
        message: 'Rol asignado al usuario exitosamente',
        data: usuarioRol,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('usuarios/roles/:id')
  async removeRolFromUsuario(@Param('id') id: string) {
    try {
      const result = await this.seguridadService.removeRolFromUsuario(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('usuarios/:userId/roles')
  async getUserRoles(@Param('userId') userId: string) {
    try {
      const roles = await this.seguridadService.getUserRoles(userId);
      return {
        success: true,
        message: 'Roles del usuario obtenidos exitosamente',
        data: roles,
        count: roles.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('usuarios/:userId/permisos/:permiso')
  async checkUserPermission(
    @Param('userId') userId: string,
    @Param('permiso') permiso: string,
    @Query('nivel') nivel: NivelPermiso = NivelPermiso.LECTURA
  ) {
    try {
      const hasPermission = await this.seguridadService.checkUserPermission(userId, permiso, nivel);
      return {
        success: true,
        message: 'Verificación de permiso completada',
        data: { hasPermission },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: { hasPermission: false },
      };
    }
  }
}