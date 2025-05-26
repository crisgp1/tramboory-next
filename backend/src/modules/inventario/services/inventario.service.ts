import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import {
  CreateProveedorDto,
  UpdateProveedorDto,
  CreateUnidadMedidaDto,
  UpdateUnidadMedidaDto,
  CreateTipoAjusteInventarioDto,
  UpdateTipoAjusteInventarioDto,
  CreateMateriaPrimaDto,
  UpdateMateriaPrimaDto,
  CreateConversionMedidaDto,
  UpdateConversionMedidaDto,
  CreateLoteDto,
  UpdateLoteDto,
  CreateReservaInventarioDto,
  UpdateReservaInventarioDto,
  CreateOrdenCompraDto,
  UpdateOrdenCompraDto,
  CreateDetalleOrdenCompraDto,
  UpdateDetalleOrdenCompraDto,
  CreateAlertaInventarioDto,
  UpdateAlertaInventarioDto,
  CreateMovimientoInventarioDto,
  UpdateMovimientoInventarioDto
} from '@/inventario/dto/create-inventario.dto';
import {
  Proveedor,
  UnidadMedida,
  TipoAjusteInventario,
  MateriaPrima,
  ConversionMedida,
  Lote,
  ReservaInventario,
  OrdenCompra,
  DetalleOrdenCompra,
  AlertaInventario,
  MovimientoInventario
} from '@/inventario/entities/inventario.entity';

@Injectable()
export class InventarioService {
  constructor(private supabaseService: SupabaseService) {}

  // Métodos para Proveedor
  async createProveedor(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    try {
      const proveedorData = {
        ...createProveedorDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.proveedores')
        .insert(proveedorData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear proveedor: ${error.message}`);
      }

      return data as Proveedor;
    } catch (error) {
      throw new BadRequestException(`Error al crear proveedor: ${error.message}`);
    }
  }

  async findAllProveedores(options?: {
    activo?: boolean;
  }): Promise<Proveedor[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('inventario.proveedores')
        .select('*');

      if (options?.activo !== undefined) {
        query = query.eq('activo', options.activo);
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener proveedores: ${error.message}`);
      }

      return (data || []) as unknown as Proveedor[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener proveedores: ${error.message}`);
    }
  }

  async findOneProveedor(id: string): Promise<Proveedor> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.proveedores')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Proveedor no encontrado: ${error.message}`);
      }

      return data as unknown as Proveedor;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener proveedor: ${error.message}`);
    }
  }

  async updateProveedor(id: string, updateProveedorDto: UpdateProveedorDto): Promise<Proveedor> {
    try {
      // Verificar que el proveedor existe
      await this.findOneProveedor(id);

      const updateData = {
        ...updateProveedorDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.proveedores')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar proveedor: ${error.message}`);
      }

      return data as Proveedor;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar proveedor: ${error.message}`);
    }
  }

  async removeProveedor(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el proveedor existe
      await this.findOneProveedor(id);

      // Verificar si hay lotes asociados al proveedor
      const { data: lotes, error: errorLotes } = await this.supabaseService
        .getClient()
        .from('inventario.lotes')
        .select('id')
        .eq('id_proveedor', id)
        .limit(1);

      if (errorLotes) {
        throw new BadRequestException(`Error al verificar lotes asociados: ${errorLotes.message}`);
      }

      if (lotes && lotes.length > 0) {
        throw new BadRequestException('No se puede eliminar el proveedor porque tiene lotes asociados');
      }

      // Verificar si hay órdenes de compra asociadas al proveedor
      const { data: ordenes, error: errorOrdenes } = await this.supabaseService
        .getClient()
        .from('inventario.ordenes_compra')
        .select('id')
        .eq('id_proveedor', id)
        .limit(1);

      if (errorOrdenes) {
        throw new BadRequestException(`Error al verificar órdenes de compra asociadas: ${errorOrdenes.message}`);
      }

      if (ordenes && ordenes.length > 0) {
        throw new BadRequestException('No se puede eliminar el proveedor porque tiene órdenes de compra asociadas');
      }

      const { error } = await this.supabaseService
        .getClient()
        .from('inventario.proveedores')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar proveedor: ${error.message}`);
      }

      return { message: 'Proveedor eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar proveedor: ${error.message}`);
    }
  }

  // Métodos para UnidadMedida
  async createUnidadMedida(createUnidadMedidaDto: CreateUnidadMedidaDto): Promise<UnidadMedida> {
    try {
      const unidadMedidaData = {
        ...createUnidadMedidaDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.unidades_medida')
        .insert(unidadMedidaData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear unidad de medida: ${error.message}`);
      }

      return data as UnidadMedida;
    } catch (error) {
      throw new BadRequestException(`Error al crear unidad de medida: ${error.message}`);
    }
  }

  async findAllUnidadesMedida(options?: {
    activo?: boolean;
  }): Promise<UnidadMedida[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('inventario.unidades_medida')
        .select('*');

      if (options?.activo !== undefined) {
        query = query.eq('activo', options.activo);
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener unidades de medida: ${error.message}`);
      }

      return (data || []) as unknown as UnidadMedida[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener unidades de medida: ${error.message}`);
    }
  }

  async findOneUnidadMedida(id: string): Promise<UnidadMedida> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.unidades_medida')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Unidad de medida no encontrada: ${error.message}`);
      }

      return data as unknown as UnidadMedida;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener unidad de medida: ${error.message}`);
    }
  }

  async updateUnidadMedida(id: string, updateUnidadMedidaDto: UpdateUnidadMedidaDto): Promise<UnidadMedida> {
    try {
      // Verificar que la unidad de medida existe
      await this.findOneUnidadMedida(id);

      const updateData = {
        ...updateUnidadMedidaDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.unidades_medida')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar unidad de medida: ${error.message}`);
      }

      return data as UnidadMedida;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar unidad de medida: ${error.message}`);
    }
  }

  async removeUnidadMedida(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la unidad de medida existe
      await this.findOneUnidadMedida(id);

      // Verificar si hay materias primas asociadas a la unidad de medida
      const { data: materiasPrimas, error: errorMateriasPrimas } = await this.supabaseService
        .getClient()
        .from('inventario.materias_primas')
        .select('id')
        .eq('id_unidad_medida', id)
        .limit(1);

      if (errorMateriasPrimas) {
        throw new BadRequestException(`Error al verificar materias primas asociadas: ${errorMateriasPrimas.message}`);
      }

      if (materiasPrimas && materiasPrimas.length > 0) {
        throw new BadRequestException('No se puede eliminar la unidad de medida porque tiene materias primas asociadas');
      }

      // Verificar si hay conversiones de medida asociadas a la unidad de medida
      const { data: conversiones, error: errorConversiones } = await this.supabaseService
        .getClient()
        .from('inventario.conversiones_medida')
        .select('id')
        .or(`id_unidad_origen.eq.${id},id_unidad_destino.eq.${id}`)
        .limit(1);

      if (errorConversiones) {
        throw new BadRequestException(`Error al verificar conversiones de medida asociadas: ${errorConversiones.message}`);
      }

      if (conversiones && conversiones.length > 0) {
        throw new BadRequestException('No se puede eliminar la unidad de medida porque tiene conversiones asociadas');
      }

      const { error } = await this.supabaseService
        .getClient()
        .from('inventario.unidades_medida')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar unidad de medida: ${error.message}`);
      }

      return { message: 'Unidad de medida eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar unidad de medida: ${error.message}`);
    }
  }

  // Métodos para TipoAjusteInventario
  async createTipoAjusteInventario(createTipoAjusteInventarioDto: CreateTipoAjusteInventarioDto): Promise<TipoAjusteInventario> {
    try {
      const tipoAjusteInventarioData = {
        ...createTipoAjusteInventarioDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.tipos_ajuste_inventario')
        .insert(tipoAjusteInventarioData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear tipo de ajuste de inventario: ${error.message}`);
      }

      return data as TipoAjusteInventario;
    } catch (error) {
      throw new BadRequestException(`Error al crear tipo de ajuste de inventario: ${error.message}`);
    }
  }

  async findAllTiposAjusteInventario(options?: {
    afecta_stock?: 'incremento' | 'decremento' | 'ninguno';
    requiere_autorizacion?: boolean;
  }): Promise<TipoAjusteInventario[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('inventario.tipos_ajuste_inventario')
        .select('*');

      if (options?.afecta_stock) {
        query = query.eq('afecta_stock', options.afecta_stock);
      }

      if (options?.requiere_autorizacion !== undefined) {
        query = query.eq('requiere_autorizacion', options.requiere_autorizacion);
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener tipos de ajuste de inventario: ${error.message}`);
      }

      return (data || []) as unknown as TipoAjusteInventario[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener tipos de ajuste de inventario: ${error.message}`);
    }
  }

  async findOneTipoAjusteInventario(id: string): Promise<TipoAjusteInventario> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.tipos_ajuste_inventario')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Tipo de ajuste de inventario no encontrado: ${error.message}`);
      }

      return data as unknown as TipoAjusteInventario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener tipo de ajuste de inventario: ${error.message}`);
    }
  }

  async updateTipoAjusteInventario(id: string, updateTipoAjusteInventarioDto: UpdateTipoAjusteInventarioDto): Promise<TipoAjusteInventario> {
    try {
      // Verificar que el tipo de ajuste de inventario existe
      await this.findOneTipoAjusteInventario(id);

      const updateData = {
        ...updateTipoAjusteInventarioDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.tipos_ajuste_inventario')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar tipo de ajuste de inventario: ${error.message}`);
      }

      return data as TipoAjusteInventario;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar tipo de ajuste de inventario: ${error.message}`);
    }
  }

  async removeTipoAjusteInventario(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el tipo de ajuste de inventario existe
      await this.findOneTipoAjusteInventario(id);

      // Verificar si hay movimientos de inventario asociados al tipo de ajuste
      const { data: movimientos, error: errorMovimientos } = await this.supabaseService
        .getClient()
        .from('inventario.movimientos_inventario')
        .select('id')
        .eq('id_tipo_ajuste', id)
        .limit(1);

      if (errorMovimientos) {
        throw new BadRequestException(`Error al verificar movimientos de inventario asociados: ${errorMovimientos.message}`);
      }

      if (movimientos && movimientos.length > 0) {
        throw new BadRequestException('No se puede eliminar el tipo de ajuste porque tiene movimientos de inventario asociados');
      }

      const { error } = await this.supabaseService
        .getClient()
        .from('inventario.tipos_ajuste_inventario')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar tipo de ajuste de inventario: ${error.message}`);
      }

      return { message: 'Tipo de ajuste de inventario eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar tipo de ajuste de inventario: ${error.message}`);
    }
  }

  // Métodos para MateriaPrima
  async createMateriaPrima(createMateriaPrimaDto: CreateMateriaPrimaDto): Promise<MateriaPrima> {
    try {
      // Verificar que la unidad de medida existe
      await this.findOneUnidadMedida(createMateriaPrimaDto.id_unidad_medida);

      const materiaPrimaData = {
        ...createMateriaPrimaDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.materias_primas')
        .insert(materiaPrimaData)
        .select('*, unidad_medida:inventario.unidades_medida(*)')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear materia prima: ${error.message}`);
      }

      return data as unknown as MateriaPrima;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al crear materia prima: ${error.message}`);
    }
  }

  async findAllMateriasPrimas(options?: {
    activo?: boolean;
    es_perecedero?: boolean;
    categoria?: string;
    stock_bajo?: boolean;
  }): Promise<MateriaPrima[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('inventario.materias_primas')
        .select('*, unidad_medida:inventario.unidades_medida(*)');

      if (options?.activo !== undefined) {
        query = query.eq('activo', options.activo);
      }

      if (options?.es_perecedero !== undefined) {
        query = query.eq('es_perecedero', options.es_perecedero);
      }

      if (options?.categoria) {
        query = query.eq('categoria', options.categoria);
      }

      // Para materias primas con stock bajo (stock_actual < stock_minimo)
      if (options?.stock_bajo === true) {
        // Usamos un filtro personalizado con una condición SQL
        query = query.filter('stock_actual', 'lt', 'stock_minimo');
      }

      const { data, error } = await query.order('nombre', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener materias primas: ${error.message}`);
      }

      return (data || []) as unknown as MateriaPrima[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener materias primas: ${error.message}`);
    }
  }

  async findOneMateriaPrima(id: string): Promise<MateriaPrima> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.materias_primas')
        .select('*, unidad_medida:inventario.unidades_medida(*)')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Materia prima no encontrada: ${error.message}`);
      }

      return data as unknown as MateriaPrima;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener materia prima: ${error.message}`);
    }
  }

  async updateMateriaPrima(id: string, updateMateriaPrimaDto: UpdateMateriaPrimaDto): Promise<MateriaPrima> {
    try {
      // Verificar que la materia prima existe
      await this.findOneMateriaPrima(id);

      // Verificar que la unidad de medida existe si se está actualizando
      if (updateMateriaPrimaDto.id_unidad_medida) {
        await this.findOneUnidadMedida(updateMateriaPrimaDto.id_unidad_medida);
      }

      const updateData = {
        ...updateMateriaPrimaDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('inventario.materias_primas')
        .update(updateData)
        .eq('id', id)
        .select('*, unidad_medida:inventario.unidades_medida(*)')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar materia prima: ${error.message}`);
      }

      return data as unknown as MateriaPrima;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar materia prima: ${error.message}`);
    }
  }

  async removeMateriaPrima(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la materia prima existe
      await this.findOneMateriaPrima(id);

      // Verificar si hay lotes asociados a la materia prima
      const { data: lotes, error: errorLotes } = await this.supabaseService
        .getClient()
        .from('inventario.lotes')
        .select('id')
        .eq('id_materia_prima', id)
        .limit(1);

      if (errorLotes) {
        throw new BadRequestException(`Error al verificar lotes asociados: ${errorLotes.message}`);
      }

      if (lotes && lotes.length > 0) {
        throw new BadRequestException('No se puede eliminar la materia prima porque tiene lotes asociados');
      }

      // Verificar si hay movimientos de inventario asociados a la materia prima
      const { data: movimientos, error: errorMovimientos } = await this.supabaseService
        .getClient()
        .from('inventario.movimientos_inventario')
        .select('id')
        .eq('id_materia_prima', id)
        .limit(1);

      if (errorMovimientos) {
        throw new BadRequestException(`Error al verificar movimientos de inventario asociados: ${errorMovimientos.message}`);
      }

      if (movimientos && movimientos.length > 0) {
        throw new BadRequestException('No se puede eliminar la materia prima porque tiene movimientos de inventario asociados');
      }

      const { error } = await this.supabaseService
        .getClient()
        .from('inventario.materias_primas')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar materia prima: ${error.message}`);
      }

      return { message: 'Materia prima eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar materia prima: ${error.message}`);
    }
  }

  // Otros métodos de la clase...
  async getStatus() {
    return { 
      status: 'InventarioService is operational',
      version: '1.0.0',
      tables: [
        'inventario.proveedores',
        'inventario.unidades_medida',
        'inventario.tipos_ajuste_inventario',
        'inventario.materias_primas',
        'inventario.conversiones_medida',
        'inventario.lotes',
        'inventario.reservas_inventario',
        'inventario.ordenes_compra',
        'inventario.detalle_orden_compra',
        'inventario.alertas_inventario',
        'inventario.movimientos_inventario'
      ]
    };
  }
}