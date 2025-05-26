import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import {
  CreateTematicaDto,
  UpdateTematicaDto,
  CreatePaqueteDto,
  UpdatePaqueteDto,
  CreateOpcionAlimentoDto,
  UpdateOpcionAlimentoDto,
  CreatePaqueteAlimentoDto,
  UpdatePaqueteAlimentoDto,
  CreateExtraDto,
  UpdateExtraDto,
  CreateMamparaDto,
  UpdateMamparaDto
} from '@/catalogo/dto/create-catalogo.dto';
import {
  Tematica,
  Paquete,
  OpcionAlimento,
  PaqueteAlimento,
  Extra,
  Mampara
} from '@/catalogo/entities/catalogo.entity';

@Injectable()
export class CatalogoService {
  constructor(private supabaseService: SupabaseService) {}

  // Métodos para Tematicas
  async createTematica(createTematicaDto: CreateTematicaDto): Promise<Tematica> {
    try {
      const tematicaData = {
        ...createTematicaDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.tematicas')
        .insert(tematicaData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear temática: ${error.message}`);
      }

      return data as Tematica;
    } catch (error) {
      throw new BadRequestException(`Error al crear temática: ${error.message}`);
    }
  }

  async findAllTematicas(options?: {
    disponible?: boolean;
    destacada?: boolean;
  }): Promise<Tematica[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.tematicas')
        .select('*');

      // Aplicar filtros si existen
      if (options) {
        if (options.disponible !== undefined) {
          query = query.eq('disponible', options.disponible);
        }
        if (options.destacada !== undefined) {
          query = query.eq('destacada', options.destacada);
        }
      }

      const { data, error } = await query.order('orden', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener temáticas: ${error.message}`);
      }

      return (data || []) as unknown as Tematica[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener temáticas: ${error.message}`);
    }
  }

  async findOneTematica(id: string): Promise<Tematica> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.tematicas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Temática no encontrada: ${error.message}`);
      }

      return data as unknown as Tematica;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener temática: ${error.message}`);
    }
  }

  async updateTematica(id: string, updateTematicaDto: UpdateTematicaDto): Promise<Tematica> {
    try {
      // Verificar que la temática existe
      await this.findOneTematica(id);

      const updateData = {
        ...updateTematicaDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.tematicas')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar temática: ${error.message}`);
      }

      return data as Tematica;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar temática: ${error.message}`);
    }
  }

  async removeTematica(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la temática existe
      await this.findOneTematica(id);

      // Verificar si hay reservas asociadas (si es necesario)
      // Aquí se podría implementar una verificación adicional si se requiere

      const { error } = await this.supabaseService
        .getClient()
        .from('main.tematicas')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar temática: ${error.message}`);
      }

      return { message: 'Temática eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar temática: ${error.message}`);
    }
  }

  // Métodos para Paquetes
  async createPaquete(createPaqueteDto: CreatePaqueteDto): Promise<Paquete> {
    try {
      const paqueteData = {
        ...createPaqueteDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.paquetes')
        .insert(paqueteData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear paquete: ${error.message}`);
      }

      return data as Paquete;
    } catch (error) {
      throw new BadRequestException(`Error al crear paquete: ${error.message}`);
    }
  }

  async findAllPaquetes(options?: {
    disponible?: boolean;
    destacado?: boolean;
    incluye_alimentos?: boolean;
    incluye_decoracion?: boolean;
  }): Promise<Paquete[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.paquetes')
        .select('*');

      // Aplicar filtros si existen
      if (options) {
        if (options.disponible !== undefined) {
          query = query.eq('disponible', options.disponible);
        }
        if (options.destacado !== undefined) {
          query = query.eq('destacado', options.destacado);
        }
        if (options.incluye_alimentos !== undefined) {
          query = query.eq('incluye_alimentos', options.incluye_alimentos);
        }
        if (options.incluye_decoracion !== undefined) {
          query = query.eq('incluye_decoracion', options.incluye_decoracion);
        }
      }

      const { data, error } = await query.order('orden', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener paquetes: ${error.message}`);
      }

      return (data || []) as unknown as Paquete[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener paquetes: ${error.message}`);
    }
  }

  async findOnePaquete(id: string): Promise<Paquete> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.paquetes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Paquete no encontrado: ${error.message}`);
      }

      return data as unknown as Paquete;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener paquete: ${error.message}`);
    }
  }

  async updatePaquete(id: string, updatePaqueteDto: UpdatePaqueteDto): Promise<Paquete> {
    try {
      // Verificar que el paquete existe
      await this.findOnePaquete(id);

      const updateData = {
        ...updatePaqueteDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.paquetes')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar paquete: ${error.message}`);
      }

      return data as Paquete;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar paquete: ${error.message}`);
    }
  }

  async removePaquete(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el paquete existe
      await this.findOnePaquete(id);

      // Verificar si hay reservas u otros registros asociados (si es necesario)
      // Aquí se podría implementar una verificación adicional si se requiere

      const { error } = await this.supabaseService
        .getClient()
        .from('main.paquetes')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar paquete: ${error.message}`);
      }

      return { message: 'Paquete eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar paquete: ${error.message}`);
    }
  }

  // Métodos para OpcionAlimento
  async createOpcionAlimento(createOpcionAlimentoDto: CreateOpcionAlimentoDto): Promise<OpcionAlimento> {
    try {
      const opcionData = {
        ...createOpcionAlimentoDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.opciones_alimentos')
        .insert(opcionData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear opción de alimento: ${error.message}`);
      }

      return data as OpcionAlimento;
    } catch (error) {
      throw new BadRequestException(`Error al crear opción de alimento: ${error.message}`);
    }
  }

  async findAllOpcionesAlimentos(options?: {
    tipo?: string;
    disponible?: boolean;
    vegetariano?: boolean;
    vegano?: boolean;
    sin_gluten?: boolean;
  }): Promise<OpcionAlimento[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.opciones_alimentos')
        .select('*');

      // Aplicar filtros si existen
      if (options) {
        if (options.tipo) {
          query = query.eq('tipo', options.tipo);
        }
        if (options.disponible !== undefined) {
          query = query.eq('disponible', options.disponible);
        }
        if (options.vegetariano !== undefined) {
          query = query.eq('vegetariano', options.vegetariano);
        }
        if (options.vegano !== undefined) {
          query = query.eq('vegano', options.vegano);
        }
        if (options.sin_gluten !== undefined) {
          query = query.eq('sin_gluten', options.sin_gluten);
        }
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener opciones de alimentos: ${error.message}`);
      }

      return (data || []) as unknown as OpcionAlimento[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener opciones de alimentos: ${error.message}`);
    }
  }

  async findOneOpcionAlimento(id: string): Promise<OpcionAlimento> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.opciones_alimentos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Opción de alimento no encontrada: ${error.message}`);
      }

      return data as unknown as OpcionAlimento;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener opción de alimento: ${error.message}`);
    }
  }

  async updateOpcionAlimento(id: string, updateOpcionAlimentoDto: UpdateOpcionAlimentoDto): Promise<OpcionAlimento> {
    try {
      // Verificar que la opción existe
      await this.findOneOpcionAlimento(id);

      const updateData = {
        ...updateOpcionAlimentoDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.opciones_alimentos')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar opción de alimento: ${error.message}`);
      }

      return data as OpcionAlimento;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar opción de alimento: ${error.message}`);
    }
  }

  async removeOpcionAlimento(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la opción existe
      await this.findOneOpcionAlimento(id);

      // Verificar si hay paquetes de alimentos que usen esta opción (si es necesario)
      // Aquí se podría implementar una verificación adicional si se requiere

      const { error } = await this.supabaseService
        .getClient()
        .from('main.opciones_alimentos')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar opción de alimento: ${error.message}`);
      }

      return { message: 'Opción de alimento eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar opción de alimento: ${error.message}`);
    }
  }

  // Métodos para PaqueteAlimento
  async createPaqueteAlimento(createPaqueteAlimentoDto: CreatePaqueteAlimentoDto): Promise<PaqueteAlimento> {
    try {
      // Verificar que el paquete existe
      await this.findOnePaquete(createPaqueteAlimentoDto.id_paquete);

      const paqueteAlimentoData = {
        ...createPaqueteAlimentoDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.paquetes_alimentos')
        .insert(paqueteAlimentoData)
        .select('*, paquete:main.paquetes(*)')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear paquete de alimentos: ${error.message}`);
      }

      return data as unknown as PaqueteAlimento;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al crear paquete de alimentos: ${error.message}`);
    }
  }

  async findAllPaquetesAlimentos(options?: {
    id_paquete?: string;
    disponible?: boolean;
  }): Promise<PaqueteAlimento[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.paquetes_alimentos')
        .select('*, paquete:main.paquetes(*)');

      // Aplicar filtros si existen
      if (options) {
        if (options.id_paquete) {
          query = query.eq('id_paquete', options.id_paquete);
        }
        if (options.disponible !== undefined) {
          query = query.eq('disponible', options.disponible);
        }
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener paquetes de alimentos: ${error.message}`);
      }

      return (data || []) as unknown as PaqueteAlimento[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener paquetes de alimentos: ${error.message}`);
    }
  }

  async findOnePaqueteAlimento(id: string): Promise<PaqueteAlimento> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.paquetes_alimentos')
        .select('*, paquete:main.paquetes(*)')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Paquete de alimentos no encontrado: ${error.message}`);
      }

      return data as unknown as PaqueteAlimento;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener paquete de alimentos: ${error.message}`);
    }
  }

  async updatePaqueteAlimento(id: string, updatePaqueteAlimentoDto: UpdatePaqueteAlimentoDto): Promise<PaqueteAlimento> {
    try {
      // Verificar que el paquete de alimentos existe
      await this.findOnePaqueteAlimento(id);

      // Verificar que el paquete asociado existe si se está actualizando
      if (updatePaqueteAlimentoDto.id_paquete) {
        await this.findOnePaquete(updatePaqueteAlimentoDto.id_paquete);
      }

      const updateData = {
        ...updatePaqueteAlimentoDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.paquetes_alimentos')
        .update(updateData)
        .eq('id', id)
        .select('*, paquete:main.paquetes(*)')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar paquete de alimentos: ${error.message}`);
      }

      return data as unknown as PaqueteAlimento;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar paquete de alimentos: ${error.message}`);
    }
  }

  async removePaqueteAlimento(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el paquete de alimentos existe
      await this.findOnePaqueteAlimento(id);

      const { error } = await this.supabaseService
        .getClient()
        .from('main.paquetes_alimentos')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar paquete de alimentos: ${error.message}`);
      }

      return { message: 'Paquete de alimentos eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar paquete de alimentos: ${error.message}`);
    }
  }

  // Métodos para Extra
  async createExtra(createExtraDto: CreateExtraDto): Promise<Extra> {
    try {
      const extraData = {
        ...createExtraDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.extras')
        .insert(extraData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear extra: ${error.message}`);
      }

      return data as Extra;
    } catch (error) {
      throw new BadRequestException(`Error al crear extra: ${error.message}`);
    }
  }

  async findAllExtras(options?: {
    tipo?: string;
    disponible?: boolean;
    destacado?: boolean;
  }): Promise<Extra[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.extras')
        .select('*');

      // Aplicar filtros si existen
      if (options) {
        if (options.tipo) {
          query = query.eq('tipo', options.tipo);
        }
        if (options.disponible !== undefined) {
          query = query.eq('disponible', options.disponible);
        }
        if (options.destacado !== undefined) {
          query = query.eq('destacado', options.destacado);
        }
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener extras: ${error.message}`);
      }

      return (data || []) as unknown as Extra[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener extras: ${error.message}`);
    }
  }

  async findOneExtra(id: string): Promise<Extra> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.extras')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Extra no encontrado: ${error.message}`);
      }

      return data as unknown as Extra;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener extra: ${error.message}`);
    }
  }

  async updateExtra(id: string, updateExtraDto: UpdateExtraDto): Promise<Extra> {
    try {
      // Verificar que el extra existe
      await this.findOneExtra(id);

      const updateData = {
        ...updateExtraDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.extras')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar extra: ${error.message}`);
      }

      return data as Extra;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar extra: ${error.message}`);
    }
  }

  async removeExtra(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el extra existe
      await this.findOneExtra(id);

      // Verificar si hay reservas que usan este extra (si es necesario)
      // Aquí se podría implementar una verificación adicional si se requiere

      const { error } = await this.supabaseService
        .getClient()
        .from('main.extras')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar extra: ${error.message}`);
      }

      return { message: 'Extra eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar extra: ${error.message}`);
    }
  }

  // Métodos para Mampara
  async createMampara(createMamparaDto: CreateMamparaDto): Promise<Mampara> {
    try {
      const mamparaData = {
        ...createMamparaDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.mamparas')
        .insert(mamparaData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear mampara: ${error.message}`);
      }

      return data as Mampara;
    } catch (error) {
      throw new BadRequestException(`Error al crear mampara: ${error.message}`);
    }
  }

  async findAllMamparas(options?: {
    disponible?: boolean;
    destacada?: boolean;
  }): Promise<Mampara[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.mamparas')
        .select('*');

      // Aplicar filtros si existen
      if (options) {
        if (options.disponible !== undefined) {
          query = query.eq('disponible', options.disponible);
        }
        if (options.destacada !== undefined) {
          query = query.eq('destacada', options.destacada);
        }
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener mamparas: ${error.message}`);
      }

      return (data || []) as unknown as Mampara[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener mamparas: ${error.message}`);
    }
  }

  async findOneMampara(id: string): Promise<Mampara> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.mamparas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Mampara no encontrada: ${error.message}`);
      }

      return data as unknown as Mampara;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener mampara: ${error.message}`);
    }
  }

  async updateMampara(id: string, updateMamparaDto: UpdateMamparaDto): Promise<Mampara> {
    try {
      // Verificar que la mampara existe
      await this.findOneMampara(id);

      const updateData = {
        ...updateMamparaDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.mamparas')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar mampara: ${error.message}`);
      }

      return data as Mampara;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar mampara: ${error.message}`);
    }
  }

  async removeMampara(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la mampara existe
      await this.findOneMampara(id);

      const { error } = await this.supabaseService
        .getClient()
        .from('main.mamparas')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar mampara: ${error.message}`);
      }

      return { message: 'Mampara eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar mampara: ${error.message}`);
    }
  }

  async getStatus() {
    return { 
      status: 'CatalogoService is operational',
      version: '1.0.0',
      tables: [
        'main.tematicas', 
        'main.paquetes', 
        'main.opciones_alimentos', 
        'main.paquetes_alimentos',
        'main.extras',
        'main.mamparas'
      ]
    };
  }
}