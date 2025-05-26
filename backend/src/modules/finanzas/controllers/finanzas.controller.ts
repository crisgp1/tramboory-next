import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  Query,
  HttpStatus, 
  HttpCode 
} from '@nestjs/common';
import { FinanzasService } from '@/finanzas/services/finanzas.service';
import { 
  CreateFinanzasDto, 
  CreatePagoDto, 
  CreateCategoriaDto,
  FinanzasFiltersDto,
  PagosFiltersDto 
} from '@/finanzas/dto/create-finanzas.dto';

@Controller('finanzas')
export class FinanzasController {
  constructor(private readonly finanzasService: FinanzasService) {}

  // ==========================================
  // ENDPOINTS PARA FINANZAS GENERALES
  // ==========================================

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFinanza(@Body() createFinanzasDto: CreateFinanzasDto) {
    try {
      const finanza = await this.finanzasService.createFinanza(createFinanzasDto);
      return {
        success: true,
        message: 'Registro financiero creado exitosamente',
        data: finanza,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get()
  async findAllFinanzas(@Query() filters: FinanzasFiltersDto) {
    try {
      const finanzas = await this.finanzasService.findAllFinanzas(filters);
      return {
        success: true,
        message: 'Registros financieros obtenidos exitosamente',
        data: finanzas,
        count: finanzas.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('resumen')
  async getResumenFinanciero(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string
  ) {
    try {
      const resumen = await this.finanzasService.getResumenFinanciero(fechaInicio, fechaFin);
      return {
        success: true,
        message: 'Resumen financiero generado exitosamente',
        data: resumen,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // ==========================================
  // ENDPOINTS PARA PAGOS
  // ==========================================

  @Post('pagos')
  @HttpCode(HttpStatus.CREATED)
  async createPago(@Body() createPagoDto: CreatePagoDto) {
    try {
      const pago = await this.finanzasService.createPago(createPagoDto);
      return {
        success: true,
        message: 'Pago registrado exitosamente',
        data: pago,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('pagos')
  async findAllPagos(@Query() filters: PagosFiltersDto) {
    try {
      const pagos = await this.finanzasService.findAllPagos(filters);
      return {
        success: true,
        message: 'Pagos obtenidos exitosamente',
        data: pagos,
        count: pagos.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('pagos/:id')
  async findOnePago(@Param('id') id: string) {
    try {
      const pago = await this.finanzasService.findOnePago(id);
      return {
        success: true,
        message: 'Pago obtenido exitosamente',
        data: pago,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('pagos/:id')
  async updatePago(@Param('id') id: string, @Body() updatePagoDto: Partial<CreatePagoDto>) {
    try {
      const pago = await this.finanzasService.updatePago(id, updatePagoDto);
      return {
        success: true,
        message: 'Pago actualizado exitosamente',
        data: pago,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // ==========================================
  // ENDPOINTS PARA CATEGORÍAS
  // ==========================================

  @Get('categorias')
  async getCategorias() {
    try {
      const categorias = await this.finanzasService.getCategorias();
      return {
        success: true,
        message: 'Categorías obtenidas exitosamente',
        data: categorias,
        count: categorias.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}