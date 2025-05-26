import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be provided');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Métodos de autenticación
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getUser() {
    return await this.supabase.auth.getUser();
  }

  // Métodos para base de datos con soporte de esquemas
  async select(table: string, columns = '*', schema?: string) {
    const tableName = schema ? `${schema}.${table}` : table;
    return await this.supabase.from(tableName).select(columns);
  }

  async insert(table: string, data: any, schema?: string) {
    const tableName = schema ? `${schema}.${table}` : table;
    return await this.supabase.from(tableName).insert(data);
  }

  async update(table: string, data: any, condition: any, schema?: string) {
    const tableName = schema ? `${schema}.${table}` : table;
    return await this.supabase.from(tableName).update(data).match(condition);
  }

  async delete(table: string, condition: any, schema?: string) {
    const tableName = schema ? `${schema}.${table}` : table;
    return await this.supabase.from(tableName).delete().match(condition);
  }

  // Métodos específicos por esquema
  
  // MAIN SCHEMA
  async getReservas(userId?: string) {
    let query = this.supabase.from('main.reservas').select('*');
    if (userId) {
      query = query.eq('id_usuario', userId);
    }
    return await query;
  }

  async createReserva(reservaData: any) {
    return await this.supabase.from('main.reservas').insert(reservaData);
  }

  async getPaquetes() {
    return await this.supabase.from('main.paquetes').select('*');
  }

  async getTematicas() {
    return await this.supabase.from('main.tematicas').select('*');
  }

  async getMamparas() {
    return await this.supabase.from('main.mamparas').select('*');
  }

  async getExtras() {
    return await this.supabase.from('main.extras').select('*');
  }

  // FINANZAS SCHEMA
  async getPagos(reservaId?: string) {
    let query = this.supabase.from('finanzas.pagos').select('*');
    if (reservaId) {
      query = query.eq('id_reserva', reservaId);
    }
    return await query;
  }

  async createPago(pagoData: any) {
    return await this.supabase.from('finanzas.pagos').insert(pagoData);
  }

  async getFinanzas() {
    return await this.supabase.from('finanzas.finanzas').select('*');
  }

  async getCategorias() {
    return await this.supabase.from('finanzas.categorias').select('*');
  }

  // INVENTARIO SCHEMA
  async getMateriasPrimas() {
    return await this.supabase.from('inventario.materias_primas').select('*');
  }

  async getLotes() {
    return await this.supabase.from('inventario.lotes').select('*');
  }

  async getProveedores() {
    return await this.supabase.from('inventario.proveedores').select('*');
  }

  async getMovimientosInventario() {
    return await this.supabase.from('inventario.movimientos_inventario').select('*');
  }

  // PROFILES (public schema)
  async getProfile(userId: string) {
    return await this.supabase.from('profiles').select('*').eq('id', userId).single();
  }

  async updateProfile(userId: string, profileData: any) {
    return await this.supabase.from('profiles').update(profileData).eq('id', userId);
  }
}