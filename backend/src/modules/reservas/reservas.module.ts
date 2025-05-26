import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { AuthModule } from '@/auth/auth.module';
import { ReservasController } from '@/reservas/controllers/reservas.controller';
import { ReservasService } from '@/reservas/services/reservas.service';

@Module({
  imports: [
    SupabaseModule,
    AuthModule, // Para verificación de permisos
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}