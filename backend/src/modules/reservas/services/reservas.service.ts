import { Injectable, BadRequestException, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import { AuthService } from '@/auth/services/auth.service';
import { CreateReservasDto } from '@/reservas/dto/create-reservas.dto';
// Utility type to check for Supabase ParserError
interface ParserError {
  error: true;
  toString(): string;
}

// Type guard to check if a result is a ParserError
function isParserError(obj: any): obj is ParserError {
  return obj && typeof obj === 'object' && obj.error === true && typeof obj.toString === 'function';
}
export interface Reserva {
  id: string;
  id_usuario: string;
  fecha_evento: string;
  hora_inicio: string;
  hora_fin: string;
  estado: 'pendiente' | 'confirmada' | 'en_proceso' | 'completada' | 'cancelada';
  total_adultos: number;
  total_ninos: number;
  total_estimado: number;
  notas?: string;
  id_paquete?: string;
  id_tematica?: string;
  id_mampara?: string;
  created_at: string;
  updated_at: string;
  // Relaciones
  paquete?: any;
  tematica?: any;
  mampara?: any;
  usuario?: any;
  extras?: any[];
}

@Injectable()
export class ReservasService {
  private readonly logger = new Logger(ReservasService.name);

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {}

  async create(createReservasDto: CreateReservasDto, userId?: string): Promise<Reserva> {
    try {
      // Si no se proporciona userId, usar el del usuario autenticado
      const reservaData = {
        ...createReservasDto,
        id_usuario: userId || createReservasDto.id_usuario,
        estado: 'pendiente',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.reservas')
        .insert(reservaData)
        .select(`
          *,
          paquete:main.paquetes(*),
          tematica:main.tematicas(*),
          mampara:main.mamparas(*),
          usuario:public.profiles(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear reserva: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al crear reserva: ${data.toString()}`);
        // Create a stripped down version without the problematic relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('main.reservas')
          .select('*')
          .eq('id', data['id'])
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar reserva básica: ${basicError.message}`);
        }
        
        return basicData as Reserva;
      }
      
      return data as Reserva;
    } catch (error) {
      throw new BadRequestException(`Error al crear reserva: ${error.message}`);
    }
  }

  async findAll(filters?: {
    userId?: string;
    estado?: string;
    fechaInicio?: string;
    fechaFin?: string;
  }): Promise<Reserva[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('main.reservas')
        .select(`
          *,
          paquete:main.paquetes(*),
          tematica:main.tematicas(*),
          mampara:main.mamparas(*),
          usuario:public.profiles(nombre, email, telefono)
        `);

      // Aplicar filtros
      if (filters?.userId) {
        query = query.eq('id_usuario', filters.userId);
      }
      
      if (filters?.estado) {
        query = query.eq('estado', filters.estado);
      }
      
      if (filters?.fechaInicio) {
        query = query.gte('fecha_evento', filters.fechaInicio);
      }
      
      if (filters?.fechaFin) {
        query = query.lte('fecha_evento', filters.fechaFin);
      }

      query = query.order('fecha_evento', { ascending: true });

      const { data, error } = await query;

      if (error) {
        throw new BadRequestException(`Error al obtener reservas: ${error.message}`);
      }

      if (!data || data.length === 0) {
        return [];
      }
      
      // Filter out any parser errors and log them
      const validData = data.filter(item => {
        if (isParserError(item)) {
          this.logger.warn(`ParserError al obtener reservas: ${item.toString()}`);
          return false;
        }
        return true;
      }) as Reserva[];
      
      return validData;
    } catch (error) {
      throw new BadRequestException(`Error al obtener reservas: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Reserva> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.reservas')
        .select(`
          *,
          paquete:main.paquetes(*),
          tematica:main.tematicas(*),
          mampara:main.mamparas(*),
          usuario:public.profiles(nombre, email, telefono),
          extras:main.reserva_extras(
            *,
            extra:main.extras(*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Reserva no encontrada: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al obtener reserva: ${data.toString()}`);
        // Fetch basic data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('main.reservas')
          .select('*')
          .eq('id', id)
          .single();
          
        if (basicError) {
          throw new NotFoundException(`Reserva no encontrada: ${basicError.message}`);
        }
        
        return basicData as Reserva;
      }
      
      return data as Reserva;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener reserva: ${error.message}`);
    }
  }

  async update(id: string, updateData: Partial<CreateReservasDto>): Promise<Reserva> {
    try {
      // Verificar que la reserva existe
      await this.findOne(id);

      const updatePayload = {
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('main.reservas')
        .update(updatePayload)
        .eq('id', id)
        .select(`
          *,
          paquete:main.paquetes(*),
          tematica:main.tematicas(*),
          mampara:main.mamparas(*),
          usuario:public.profiles(nombre, email, telefono)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar reserva: ${error.message}`);
      }

      if (isParserError(data)) {
        this.logger.warn(`ParserError al actualizar reserva: ${data.toString()}`);
        // Fetch the updated data without relations
        const { data: basicData, error: basicError } = await this.supabaseService
          .getClient()
          .from('main.reservas')
          .select('*')
          .eq('id', id)
          .single();
          
        if (basicError) {
          throw new BadRequestException(`Error al recuperar reserva actualizada: ${basicError.message}`);
        }
        
        return basicData as Reserva;
      }
      
      return data as Reserva;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar reserva: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la reserva existe
      const reserva = await this.findOne(id);

      // Solo permitir eliminar reservas en estado pendiente o cancelada
      if (!['pendiente', 'cancelada'].includes(reserva.estado)) {
        throw new ForbiddenException('Solo se pueden eliminar reservas pendientes o canceladas');
      }

      const { error } = await this.supabaseService
        .getClient()
        .from('main.reservas')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar reserva: ${error.message}`);
      }

      return { message: 'Reserva eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar reserva: ${error.message}`);
    }
  }

  async changeStatus(id: string, newStatus: string): Promise<Reserva> {
    try {
      const validStatuses = ['pendiente', 'confirmada', 'en_proceso', 'completada', 'cancelada'];
      
      if (!validStatuses.includes(newStatus)) {
        throw new BadRequestException(`Estado no válido: ${newStatus}`);
      }

      return await this.update(id, { estado: newStatus as any });
    } catch (error) {
      throw error;
    }
  }

  async getReservasByDateRange(fechaInicio: string, fechaFin: string): Promise<Reserva[]> {
    return await this.findAll({
      fechaInicio,
      fechaFin
    });
  }

  async getUserReservas(userId: string): Promise<Reserva[]> {
    return await this.findAll({ userId });
  }
}