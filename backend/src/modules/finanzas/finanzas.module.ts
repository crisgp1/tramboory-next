import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { AuthModule } from '@/auth/auth.module';
import { FinanzasController } from '@/finanzas/controllers/finanzas.controller';
import { FinanzasService } from '@/finanzas/services/finanzas.service';

@Module({
  imports: [
    SupabaseModule,
    AuthModule, // Para verificación de permisos
  ],
  controllers: [FinanzasController],
  providers: [FinanzasService],
  exports: [FinanzasService],
})
export class FinanzasModule {}