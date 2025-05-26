import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importar módulos usando path aliases
import { SupabaseModule } from '@/supabase/supabase.module';
import { AuthModule } from '@/auth/auth.module';
import { ReservasModule } from '@/reservas/reservas.module';
import { FinanzasModule } from '@/finanzas/finanzas.module';
import { CatalogoModule } from '@/catalogo/catalogo.module';
import { DashboardModule } from '@/dashboard/dashboard.module';
import { GaleriaModule } from '@/galeria/galeria.module';
import { InventarioModule } from '@/inventario/inventario.module';
import { SeguridadModule } from '@/seguridad/seguridad.module';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Módulo base de Supabase
    SupabaseModule,
    
    // Módulos funcionales
    AuthModule,
    ReservasModule,
    FinanzasModule,
    CatalogoModule,
    DashboardModule,
    GaleriaModule,
    InventarioModule,
    SeguridadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}