import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { DashboardController } from '@/dashboard/controllers/dashboard.controller';
import { DashboardService } from '@/dashboard/services/dashboard.service';

@Module({
  imports: [SupabaseModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}