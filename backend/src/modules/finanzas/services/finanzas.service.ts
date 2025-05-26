import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import { AuthService } from '@/auth/services/auth.service';
import { CreateFinanzasDto } from '@/finanzas/dto/create-finanzas.dto';

// Utility type to check for Supabase ParserError
interface ParserError {
  error: true;
  toString(): string;
}

// Type guard to check if a result is a ParserError
function isParserError(obj: any): obj is ParserError {
  return obj && typeof obj === 'object' && obj.error === true && typeof obj.toString === 'function';
}

export interface Pago {
  id: string;
  id_reserva: string;
  monto: number;
  metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia' | 'paypal';
  estado_pago: 'pendiente' | 'completado' | 'fallido' | 'reembolsado';
  fecha_pago: string;
  referencia_pago?: string;
  notas?: string;
  created_at: string;
  updated_at: string;
  // Relaciones
  reserva?: any;
}

export interface Finanza {
  id: string;
  id_categoria: string;
  tipo: 'ingreso' | 'gasto';
  monto: number;
  descripcion: string;
  fecha: string;
  id_reserva?: string;
  created_at: string;
  updated_at: string;
  // Relaciones
  categoria?: any;
  reserva?: any;
}

export interface CategoriaFinanza {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: 'ingreso' | 'gasto';
  activo: boolean;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class FinanzasService {
  private readonly logger = new Logger(FinanzasService.name);

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  // ==========================================
  // MÉTODOS PARA PAGOS
  // ==========================================

  async createPago(createPagoDto: any): Promise<Pago> {
    try {
      // Verificar permisos
      const hasPermission = await this.authService.verificarPermiso('finanzas', 'escritura');
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos para crear pagos');
      }

      const pagoData = {
        ...createPagoDto,
        estado_pago: 'pendiente',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('finanzas.pagos')
        .insert(pagoData)
        .select(`
          *,
          reserva:main.reservas(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear pago: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al crear pago: ${data.toString()}`);
        // Create a stripped down version without the problematic relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('finanzas.pagos')
          .select('*')
          .eq('id', data['id'])
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar pago básico: ${basicError.message}`);
        }
        
        return basicData as Pago;
      }
      
      return data as Pago;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al crear pago: ${error.message}`);
    }
  }

  async findAllPagos(filters?: {
    reservaId?: string;
    estado?: string;
    metodoPago?: string;
    fechaInicio?: string;
    fechaFin?: string;
  }): Promise<Pago[]> {
    try {
      // Verificar permisos
      const hasPermission = await this.authService.verificarPermiso('finanzas', 'lectura');
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos para ver pagos');
      }

      let query = this.supabaseService
        .getClient()
        .from('finanzas.pagos')
        .select(`
          *,
          reserva:main.reservas(
            *,
            usuario:public.profiles(nombre, email)
          )
        `);

      // Aplicar filtros
      if (filters?.reservaId) {
        query = query.eq('id_reserva', filters.reservaId);
      }
      
      if (filters?.estado) {
        query = query.eq('estado_pago', filters.estado);
      }
      
      if (filters?.metodoPago) {
        query = query.eq('metodo_pago', filters.metodoPago);
      }
      
      if (filters?.fechaInicio) {
        query = query.gte('fecha_pago', filters.fechaInicio);
      }
      
      if (filters?.fechaFin) {
        query = query.lte('fecha_pago', filters.fechaFin);
      }

      query = query.order('fecha_pago', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw new BadRequestException(`Error al obtener pagos: ${error.message}`);
      }

      if (!data || data.length === 0) {
        return [];
      }
      
      // Step 1: Filter out ParserError objects
      const filteredData = data.filter(item => !isParserError(item));
      
      // Step 2: Log any parser errors that were removed
      data.forEach(item => {
        if (isParserError(item)) {
          this.logger.warn(`ParserError al obtener pagos: ${item.toString()}`);
        }
      });
      
      // Now we can safely cast the filtered data
      return filteredData as Pago[];
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener pagos: ${error.message}`);
    }
  }

  async findOnePago(id: string): Promise<Pago> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('finanzas.pagos')
        .select(`
          *,
          reserva:main.reservas(
            *,
            usuario:public.profiles(nombre, email, telefono)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Pago no encontrado: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al obtener pago: ${data.toString()}`);
        // Fetch basic data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('finanzas.pagos')
          .select('*')
          .eq('id', id)
          .single();
          
        if (basicError) {
          throw new NotFoundException(`Pago no encontrado: ${basicError.message}`);
        }
        
        return basicData as Pago;
      }
      
      return data as Pago;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener pago: ${error.message}`);
    }
  }

  async updatePago(id: string, updateData: any): Promise<Pago> {
    try {
      // Verificar permisos
      const hasPermission = await this.authService.verificarPermiso('finanzas', 'escritura');
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos para actualizar pagos');
      }

      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('finanzas.pagos')
        .update(updatePayload)
        .eq('id', id)
        .select(`
          *,
          reserva:main.reservas(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar pago: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al actualizar pago: ${data.toString()}`);
        // Fetch the updated data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('finanzas.pagos')
          .select('*')
          .eq('id', id)
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar pago actualizado: ${basicError.message}`);
        }
        
        return basicData as Pago;
      }
      
      return data as Pago;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar pago: ${error.message}`);
    }
  }

  // ==========================================
  // MÉTODOS PARA FINANZAS GENERALES
  // ==========================================

  async createFinanza(createFinanzasDto: CreateFinanzasDto): Promise<Finanza> {
    try {
      // Verificar permisos
      const hasPermission = await this.authService.verificarPermiso('finanzas', 'escritura');
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos para crear registros financieros');
      }

      const finanzaData = {
        ...createFinanzasDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('finanzas.finanzas')
        .insert(finanzaData)
        .select(`
          *,
          categoria:finanzas.categorias(*),
          reserva:main.reservas(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear registro financiero: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al crear finanza: ${data.toString()}`);
        // Fetch basic data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('finanzas.finanzas')
          .select('*')
          .eq('id', data['id'])
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar finanza básica: ${basicError.message}`);
        }
        
        return basicData as Finanza;
      }
      
      return data as Finanza;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al crear registro financiero: ${error.message}`);
    }
  }

  async findAllFinanzas(filters?: {
    tipo?: 'ingreso' | 'gasto';
    categoriaId?: string;
    fechaInicio?: string;
    fechaFin?: string;
  }): Promise<Finanza[]> {
    try {
      // Verificar permisos
      const hasPermission = await this.authService.verificarPermiso('finanzas', 'lectura');
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos para ver registros financieros');
      }

      let query = this.supabaseService
        .getClient()
        .from('finanzas.finanzas')
        .select(`
          *,
          categoria:finanzas.categorias(*),
          reserva:main.reservas(*)
        `);

      // Aplicar filtros
      if (filters?.tipo) {
        query = query.eq('tipo', filters.tipo);
      }
      
      if (filters?.categoriaId) {
        query = query.eq('id_categoria', filters.categoriaId);
      }
      
      if (filters?.fechaInicio) {
        query = query.gte('fecha', filters.fechaInicio);
      }
      
      if (filters?.fechaFin) {
        query = query.lte('fecha', filters.fechaFin);
      }

      query = query.order('fecha', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw new BadRequestException(`Error al obtener registros financieros: ${error.message}`);
      }

      if (!data || data.length === 0) {
        return [];
      }
      
      // Step 1: Filter out ParserError objects
      const filteredData = data.filter(item => !isParserError(item));
      
      // Step 2: Log any parser errors that were removed
      data.forEach(item => {
        if (isParserError(item)) {
          this.logger.warn(`ParserError al obtener finanzas: ${item.toString()}`);
        }
      });
      
      // Now we can safely cast the filtered data
      return filteredData as Finanza[];
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener registros financieros: ${error.message}`);
    }
  }

  // ==========================================
  // MÉTODOS PARA CATEGORÍAS
  // ==========================================

  async getCategorias(): Promise<CategoriaFinanza[]> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('finanzas.categorias')
        .select('*')
        .eq('activo', true)
        .order('nombre');

      if (error) {
        throw new BadRequestException(`Error al obtener categorías: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      throw new BadRequestException(`Error al obtener categorías: ${error.message}`);
    }
  }

  // ==========================================
  // REPORTES Y ESTADÍSTICAS
  // ==========================================

  async getResumenFinanciero(fechaInicio: string, fechaFin: string): Promise<any> {
    try {
      // Verificar permisos
      const hasPermission = await this.authService.verificarPermiso('finanzas', 'lectura');
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos para ver reportes financieros');
      }

      // Obtener ingresos
      const { data: ingresos } = await this.supabaseService
        .getClient()
        .from('finanzas.finanzas')
        .select('monto')
        .eq('tipo', 'ingreso')
        .gte('fecha', fechaInicio)
        .lte('fecha', fechaFin);

      // Obtener gastos
      const { data: gastos } = await this.supabaseService
        .getClient()
        .from('finanzas.finanzas')
        .select('monto')
        .eq('tipo', 'gasto')
        .gte('fecha', fechaInicio)
        .lte('fecha', fechaFin);

      // Obtener pagos completados
      const { data: pagos } = await this.supabaseService
        .getClient()
        .from('finanzas.pagos')
        .select('monto')
        .eq('estado_pago', 'completado')
        .gte('fecha_pago', fechaInicio)
        .lte('fecha_pago', fechaFin);

      const totalIngresos = (ingresos || []).reduce((sum, item) => sum + item.monto, 0);
      const totalGastos = (gastos || []).reduce((sum, item) => sum + item.monto, 0);
      const totalPagos = (pagos || []).reduce((sum, item) => sum + item.monto, 0);

      return {
        totalIngresos,
        totalGastos,
        totalPagos,
        utilidad: totalIngresos + totalPagos - totalGastos,
        periodo: { fechaInicio, fechaFin }
      };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al generar resumen financiero: ${error.message}`);
    }
  }
}