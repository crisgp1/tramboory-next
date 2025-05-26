import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { InventarioService } from '@/inventario/services/inventario.service';
import {
  CreateProveedorDto,
  UpdateProveedorDto,
  CreateUnidadMedidaDto,
  UpdateUnidadMedidaDto,
  CreateTipoAjusteInventarioDto,
  UpdateTipoAjusteInventarioDto,
  CreateMateriaPrimaDto,
  UpdateMateriaPrimaDto
} from '@/inventario/dto/create-inventario.dto';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  getStatus() {
    return this.inventarioService.getStatus();
  }

  // Endpoints para Proveedores
  @Post('proveedores')
  @HttpCode(HttpStatus.CREATED)
  async createProveedor(@Body() createProveedorDto: CreateProveedorDto) {
    try {
      const proveedor = await this.inventarioService.createProveedor(createProveedorDto);
      return {
        success: true,
        message: 'Proveedor creado exitosamente',
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('proveedores')
  async findAllProveedores(
    @Query('activo') activo?: string,
  ) {
    try {
      let activoBool = undefined;

      if (activo !== undefined) {
        activoBool = activo === 'true';
      }

      const proveedores = await this.inventarioService.findAllProveedores({
        activo: activoBool,
      });

      return {
        success: true,
        message: 'Proveedores obtenidos exitosamente',
        data: proveedores,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('proveedores/:id')
  async findOneProveedor(@Param('id') id: string) {
    try {
      const proveedor = await this.inventarioService.findOneProveedor(id);
      return {
        success: true,
        message: 'Proveedor obtenido exitosamente',
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('proveedores/:id')
  async updateProveedor(
    @Param('id') id: string,
    @Body() updateProveedorDto: UpdateProveedorDto
  ) {
    try {
      const proveedor = await this.inventarioService.updateProveedor(id, updateProveedorDto);
      return {
        success: true,
        message: 'Proveedor actualizado exitosamente',
        data: proveedor,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('proveedores/:id')
  async removeProveedor(@Param('id') id: string) {
    try {
      const result = await this.inventarioService.removeProveedor(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Endpoints para Unidades de Medida
  @Post('unidades-medida')
  @HttpCode(HttpStatus.CREATED)
  async createUnidadMedida(@Body() createUnidadMedidaDto: CreateUnidadMedidaDto) {
    try {
      const unidadMedida = await this.inventarioService.createUnidadMedida(createUnidadMedidaDto);
      return {
        success: true,
        message: 'Unidad de medida creada exitosamente',
        data: unidadMedida,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('unidades-medida')
  async findAllUnidadesMedida(
    @Query('activo') activo?: string,
  ) {
    try {
      let activoBool = undefined;

      if (activo !== undefined) {
        activoBool = activo === 'true';
      }

      const unidadesMedida = await this.inventarioService.findAllUnidadesMedida({
        activo: activoBool,
      });

      return {
        success: true,
        message: 'Unidades de medida obtenidas exitosamente',
        data: unidadesMedida,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('unidades-medida/:id')
  async findOneUnidadMedida(@Param('id') id: string) {
    try {
      const unidadMedida = await this.inventarioService.findOneUnidadMedida(id);
      return {
        success: true,
        message: 'Unidad de medida obtenida exitosamente',
        data: unidadMedida,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('unidades-medida/:id')
  async updateUnidadMedida(
    @Param('id') id: string,
    @Body() updateUnidadMedidaDto: UpdateUnidadMedidaDto
  ) {
    try {
      const unidadMedida = await this.inventarioService.updateUnidadMedida(id, updateUnidadMedidaDto);
      return {
        success: true,
        message: 'Unidad de medida actualizada exitosamente',
        data: unidadMedida,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('unidades-medida/:id')
  async removeUnidadMedida(@Param('id') id: string) {
    try {
      const result = await this.inventarioService.removeUnidadMedida(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Endpoints para Tipos de Ajuste de Inventario
  @Post('tipos-ajuste')
  @HttpCode(HttpStatus.CREATED)
  async createTipoAjusteInventario(@Body() createTipoAjusteInventarioDto: CreateTipoAjusteInventarioDto) {
    try {
      const tipoAjuste = await this.inventarioService.createTipoAjusteInventario(createTipoAjusteInventarioDto);
      return {
        success: true,
        message: 'Tipo de ajuste de inventario creado exitosamente',
        data: tipoAjuste,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('tipos-ajuste')
  async findAllTiposAjuste(
    @Query('afecta_stock') afecta_stock?: string,
    @Query('requiere_autorizacion') requiere_autorizacion?: string,
  ) {
    try {
      let requiereAutorizacionBool = undefined;

      if (requiere_autorizacion !== undefined) {
        requiereAutorizacionBool = requiere_autorizacion === 'true';
      }

      // Validar que afecta_stock sea uno de los valores permitidos
      if (afecta_stock && !['incremento', 'decremento', 'ninguno'].includes(afecta_stock)) {
        return {
          success: false,
          message: 'El valor de afecta_stock debe ser uno de: incremento, decremento, ninguno',
          data: null,
        };
      }

      const tiposAjuste = await this.inventarioService.findAllTiposAjusteInventario({
        afecta_stock: afecta_stock as 'incremento' | 'decremento' | 'ninguno',
        requiere_autorizacion: requiereAutorizacionBool,
      });

      return {
        success: true,
        message: 'Tipos de ajuste de inventario obtenidos exitosamente',
        data: tiposAjuste,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('tipos-ajuste/:id')
  async findOneTipoAjuste(@Param('id') id: string) {
    try {
      const tipoAjuste = await this.inventarioService.findOneTipoAjusteInventario(id);
      return {
        success: true,
        message: 'Tipo de ajuste de inventario obtenido exitosamente',
        data: tipoAjuste,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('tipos-ajuste/:id')
  async updateTipoAjusteInventario(
    @Param('id') id: string,
    @Body() updateTipoAjusteInventarioDto: UpdateTipoAjusteInventarioDto
  ) {
    try {
      const tipoAjuste = await this.inventarioService.updateTipoAjusteInventario(id, updateTipoAjusteInventarioDto);
      return {
        success: true,
        message: 'Tipo de ajuste de inventario actualizado exitosamente',
        data: tipoAjuste,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('tipos-ajuste/:id')
  async removeTipoAjusteInventario(@Param('id') id: string) {
    try {
      const result = await this.inventarioService.removeTipoAjusteInventario(id);
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  // Endpoints para Materias Primas
  @Post('materias-primas')
  @HttpCode(HttpStatus.CREATED)
  async createMateriaPrima(@Body() createMateriaPrimaDto: CreateMateriaPrimaDto) {
    try {
      const materiaPrima = await this.inventarioService.createMateriaPrima(createMateriaPrimaDto);
      return {
        success: true,
        message: 'Materia prima creada exitosamente',
        data: materiaPrima,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('materias-primas')
  async findAllMateriasPrimas(
    @Query('activo') activo?: string,
    @Query('es_perecedero') es_perecedero?: string,
    @Query('categoria') categoria?: string,
    @Query('stock_bajo') stock_bajo?: string,
  ) {
    try {
      let activoBool = undefined;
      let esPerecederoBool = undefined;
      let stockBajoBool = undefined;

      if (activo !== undefined) {
        activoBool = activo === 'true';
      }

      if (es_perecedero !== undefined) {
        esPerecederoBool = es_perecedero === 'true';
      }

      if (stock_bajo !== undefined) {
        stockBajoBool = stock_bajo === 'true';
      }

      const materiasPrimas = await this.inventarioService.findAllMateriasPrimas({
        activo: activoBool,
        es_perecedero: esPerecederoBool,
        categoria,
        stock_bajo: stockBajoBool,
      });

      return {
        success: true,
        message: 'Materias primas obtenidas exitosamente',
        data: materiasPrimas,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('materias-primas/:id')
  async findOneMateriaPrima(@Param('id') id: string) {
    try {
      const materiaPrima = await this.inventarioService.findOneMateriaPrima(id);
      return {
        success: true,
        message: 'Materia prima obtenida exitosamente',
        data: materiaPrima,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('materias-primas/:id')
  async updateMateriaPrima(
    @Param('id') id: string,
    @Body() updateMateriaPrimaDto: UpdateMateriaPrimaDto
  ) {
    try {
      const materiaPrima = await this.inventarioService.updateMateriaPrima(id, updateMateriaPrimaDto);
      return {
        success: true,
        message: 'Materia prima actualizada exitosamente',
        data: materiaPrima,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('materias-primas/:id')
  async removeMateriaPrima(@Param('id') id: string) {
    try {
      const result = await this.inventarioService.removeMateriaPrima(id);
      return {
        success: true,
        message: result.message,
        data: null,
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