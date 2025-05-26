import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { CatalogoController } from '@/catalogo/controllers/catalogo.controller';
import { CatalogoService } from '@/catalogo/services/catalogo.service';

@Module({
  imports: [SupabaseModule],
  controllers: [CatalogoController],
  providers: [CatalogoService],
  exports: [CatalogoService],
})
export class CatalogoModule {}