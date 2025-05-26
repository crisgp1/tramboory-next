import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { AuthModule } from '@/auth/auth.module';
import { SeguridadController } from '@/seguridad/controllers/seguridad.controller';
import { SeguridadService } from '@/seguridad/services/seguridad.service';

@Module({
  imports: [
    SupabaseModule,
    AuthModule, // Para verificación de permisos
  ],
  controllers: [SeguridadController],
  providers: [SeguridadService],
  exports: [SeguridadService],
})
export class SeguridadModule {}