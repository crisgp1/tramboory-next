import { Module } from '@nestjs/common';
import { SupabaseModule } from '@/supabase/supabase.module';
import { InventarioController } from '@/inventario/controllers/inventario.controller';
import { InventarioService } from '@/inventario/services/inventario.service';

@Module({
  imports: [SupabaseModule],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}