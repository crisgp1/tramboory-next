import { Injectable } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';

@Injectable()
export class DashboardService {
  constructor(private supabaseService: SupabaseService) {}

  async getStatus() {
    return { status: 'DashboardService is operational' };
  }
}