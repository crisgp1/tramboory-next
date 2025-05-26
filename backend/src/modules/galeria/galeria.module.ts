import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { GaleriaController } from '@/galeria/controllers/galeria.controller';
import { GaleriaService } from '@/galeria/services/galeria.service';

@Module({
  imports: [SupabaseModule],
  controllers: [GaleriaController],
  providers: [GaleriaService],
  exports: [GaleriaService],
})
export class GaleriaModule {}