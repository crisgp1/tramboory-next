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
import { CatalogoService } from '@/catalogo/services/catalogo.service';
import {
  CreateTematicaDto,
  UpdateTematicaDto,
  CreatePaqueteDto,
  UpdatePaqueteDto,
  CreateOpcionAlimentoDto,
  UpdateOpcionAlimentoDto,
  CreatePaqueteAlimentoDto,
  UpdatePaqueteAlimentoDto,
  CreateExtraDto,
  UpdateExtraDto,
  CreateMamparaDto,
  UpdateMamparaDto
} from '@/catalogo/dto/create-catalogo.dto';

@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  @Get()
  getStatus() {
    return this.catalogoService.getStatus();
  }

  // Endpoints para Tematicas
  @Post('tematicas')
  @HttpCode(HttpStatus.CREATED)
  async createTematica(@Body() createTematicaDto: CreateTematicaDto) {
    try {
      const tematica = await this.catalogoService.createTematica(createTematicaDto);
      return {
        success: true,
        message: 'Temática creada exitosamente',
        data: tematica,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('tematicas')
  async findAllTematicas(
    @Query('disponible') disponible?: string,
    @Query('destacada') destacada?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let disponibleBool = undefined;
      let destacadaBool = undefined;

      if (disponible !== undefined) {
        disponibleBool = disponible === 'true';
      }

      if (destacada !== undefined) {
        destacadaBool = destacada === 'true';
      }

      const tematicas = await this.catalogoService.findAllTematicas({
        disponible: disponibleBool,
        destacada: destacadaBool,
      });

      return {
        success: true,
        message: 'Temáticas obtenidas exitosamente',
        data: tematicas,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('tematicas/:id')
  async findOneTematica(@Param('id') id: string) {
    try {
      const tematica = await this.catalogoService.findOneTematica(id);
      return {
        success: true,
        message: 'Temática obtenida exitosamente',
        data: tematica,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('tematicas/:id')
  async updateTematica(
    @Param('id') id: string,
    @Body() updateTematicaDto: UpdateTematicaDto
  ) {
    try {
      const tematica = await this.catalogoService.updateTematica(id, updateTematicaDto);
      return {
        success: true,
        message: 'Temática actualizada exitosamente',
        data: tematica,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('tematicas/:id')
  async removeTematica(@Param('id') id: string) {
    try {
      const result = await this.catalogoService.removeTematica(id);
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

  // Endpoints para Paquetes
  @Post('paquetes')
  @HttpCode(HttpStatus.CREATED)
  async createPaquete(@Body() createPaqueteDto: CreatePaqueteDto) {
    try {
      const paquete = await this.catalogoService.createPaquete(createPaqueteDto);
      return {
        success: true,
        message: 'Paquete creado exitosamente',
        data: paquete,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('paquetes')
  async findAllPaquetes(
    @Query('disponible') disponible?: string,
    @Query('destacado') destacado?: string,
    @Query('incluye_alimentos') incluye_alimentos?: string,
    @Query('incluye_decoracion') incluye_decoracion?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let disponibleBool = undefined;
      let destacadoBool = undefined;
      let incluyeAlimentosBool = undefined;
      let incluyeDecoracionBool = undefined;

      if (disponible !== undefined) {
        disponibleBool = disponible === 'true';
      }

      if (destacado !== undefined) {
        destacadoBool = destacado === 'true';
      }

      if (incluye_alimentos !== undefined) {
        incluyeAlimentosBool = incluye_alimentos === 'true';
      }

      if (incluye_decoracion !== undefined) {
        incluyeDecoracionBool = incluye_decoracion === 'true';
      }

      const paquetes = await this.catalogoService.findAllPaquetes({
        disponible: disponibleBool,
        destacado: destacadoBool,
        incluye_alimentos: incluyeAlimentosBool,
        incluye_decoracion: incluyeDecoracionBool,
      });

      return {
        success: true,
        message: 'Paquetes obtenidos exitosamente',
        data: paquetes,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('paquetes/:id')
  async findOnePaquete(@Param('id') id: string) {
    try {
      const paquete = await this.catalogoService.findOnePaquete(id);
      return {
        success: true,
        message: 'Paquete obtenido exitosamente',
        data: paquete,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('paquetes/:id')
  async updatePaquete(
    @Param('id') id: string,
    @Body() updatePaqueteDto: UpdatePaqueteDto
  ) {
    try {
      const paquete = await this.catalogoService.updatePaquete(id, updatePaqueteDto);
      return {
        success: true,
        message: 'Paquete actualizado exitosamente',
        data: paquete,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('paquetes/:id')
  async removePaquete(@Param('id') id: string) {
    try {
      const result = await this.catalogoService.removePaquete(id);
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

  // Endpoints para OpcionAlimento
  @Post('opciones-alimentos')
  @HttpCode(HttpStatus.CREATED)
  async createOpcionAlimento(@Body() createOpcionAlimentoDto: CreateOpcionAlimentoDto) {
    try {
      const opcionAlimento = await this.catalogoService.createOpcionAlimento(createOpcionAlimentoDto);
      return {
        success: true,
        message: 'Opción de alimento creada exitosamente',
        data: opcionAlimento,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('opciones-alimentos')
  async findAllOpcionesAlimentos(
    @Query('tipo') tipo?: string,
    @Query('disponible') disponible?: string,
    @Query('vegetariano') vegetariano?: string,
    @Query('vegano') vegano?: string,
    @Query('sin_gluten') sin_gluten?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let disponibleBool = undefined;
      let vegetarianoBool = undefined;
      let veganoBool = undefined;
      let sinGlutenBool = undefined;

      if (disponible !== undefined) {
        disponibleBool = disponible === 'true';
      }

      if (vegetariano !== undefined) {
        vegetarianoBool = vegetariano === 'true';
      }

      if (vegano !== undefined) {
        veganoBool = vegano === 'true';
      }

      if (sin_gluten !== undefined) {
        sinGlutenBool = sin_gluten === 'true';
      }

      const opcionesAlimentos = await this.catalogoService.findAllOpcionesAlimentos({
        tipo,
        disponible: disponibleBool,
        vegetariano: vegetarianoBool,
        vegano: veganoBool,
        sin_gluten: sinGlutenBool,
      });

      return {
        success: true,
        message: 'Opciones de alimentos obtenidas exitosamente',
        data: opcionesAlimentos,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('opciones-alimentos/:id')
  async findOneOpcionAlimento(@Param('id') id: string) {
    try {
      const opcionAlimento = await this.catalogoService.findOneOpcionAlimento(id);
      return {
        success: true,
        message: 'Opción de alimento obtenida exitosamente',
        data: opcionAlimento,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('opciones-alimentos/:id')
  async updateOpcionAlimento(
    @Param('id') id: string,
    @Body() updateOpcionAlimentoDto: UpdateOpcionAlimentoDto
  ) {
    try {
      const opcionAlimento = await this.catalogoService.updateOpcionAlimento(id, updateOpcionAlimentoDto);
      return {
        success: true,
        message: 'Opción de alimento actualizada exitosamente',
        data: opcionAlimento,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('opciones-alimentos/:id')
  async removeOpcionAlimento(@Param('id') id: string) {
    try {
      const result = await this.catalogoService.removeOpcionAlimento(id);
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

  // Endpoints para PaqueteAlimento
  @Post('paquetes-alimentos')
  @HttpCode(HttpStatus.CREATED)
  async createPaqueteAlimento(@Body() createPaqueteAlimentoDto: CreatePaqueteAlimentoDto) {
    try {
      const paqueteAlimento = await this.catalogoService.createPaqueteAlimento(createPaqueteAlimentoDto);
      return {
        success: true,
        message: 'Paquete de alimentos creado exitosamente',
        data: paqueteAlimento,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('paquetes-alimentos')
  async findAllPaquetesAlimentos(
    @Query('id_paquete') id_paquete?: string,
    @Query('disponible') disponible?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let disponibleBool = undefined;

      if (disponible !== undefined) {
        disponibleBool = disponible === 'true';
      }

      const paquetesAlimentos = await this.catalogoService.findAllPaquetesAlimentos({
        id_paquete,
        disponible: disponibleBool,
      });

      return {
        success: true,
        message: 'Paquetes de alimentos obtenidos exitosamente',
        data: paquetesAlimentos,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('paquetes-alimentos/:id')
  async findOnePaqueteAlimento(@Param('id') id: string) {
    try {
      const paqueteAlimento = await this.catalogoService.findOnePaqueteAlimento(id);
      return {
        success: true,
        message: 'Paquete de alimentos obtenido exitosamente',
        data: paqueteAlimento,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('paquetes-alimentos/:id')
  async updatePaqueteAlimento(
    @Param('id') id: string,
    @Body() updatePaqueteAlimentoDto: UpdatePaqueteAlimentoDto
  ) {
    try {
      const paqueteAlimento = await this.catalogoService.updatePaqueteAlimento(id, updatePaqueteAlimentoDto);
      return {
        success: true,
        message: 'Paquete de alimentos actualizado exitosamente',
        data: paqueteAlimento,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('paquetes-alimentos/:id')
  async removePaqueteAlimento(@Param('id') id: string) {
    try {
      const result = await this.catalogoService.removePaqueteAlimento(id);
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

  // Endpoints para Extra
  @Post('extras')
  @HttpCode(HttpStatus.CREATED)
  async createExtra(@Body() createExtraDto: CreateExtraDto) {
    try {
      const extra = await this.catalogoService.createExtra(createExtraDto);
      return {
        success: true,
        message: 'Extra creado exitosamente',
        data: extra,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('extras')
  async findAllExtras(
    @Query('tipo') tipo?: string,
    @Query('disponible') disponible?: string,
    @Query('destacado') destacado?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let disponibleBool = undefined;
      let destacadoBool = undefined;

      if (disponible !== undefined) {
        disponibleBool = disponible === 'true';
      }

      if (destacado !== undefined) {
        destacadoBool = destacado === 'true';
      }

      const extras = await this.catalogoService.findAllExtras({
        tipo,
        disponible: disponibleBool,
        destacado: destacadoBool,
      });

      return {
        success: true,
        message: 'Extras obtenidos exitosamente',
        data: extras,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('extras/:id')
  async findOneExtra(@Param('id') id: string) {
    try {
      const extra = await this.catalogoService.findOneExtra(id);
      return {
        success: true,
        message: 'Extra obtenido exitosamente',
        data: extra,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('extras/:id')
  async updateExtra(
    @Param('id') id: string,
    @Body() updateExtraDto: UpdateExtraDto
  ) {
    try {
      const extra = await this.catalogoService.updateExtra(id, updateExtraDto);
      return {
        success: true,
        message: 'Extra actualizado exitosamente',
        data: extra,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('extras/:id')
  async removeExtra(@Param('id') id: string) {
    try {
      const result = await this.catalogoService.removeExtra(id);
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

  // Endpoints para Mampara
  @Post('mamparas')
  @HttpCode(HttpStatus.CREATED)
  async createMampara(@Body() createMamparaDto: CreateMamparaDto) {
    try {
      const mampara = await this.catalogoService.createMampara(createMamparaDto);
      return {
        success: true,
        message: 'Mampara creada exitosamente',
        data: mampara,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('mamparas')
  async findAllMamparas(
    @Query('disponible') disponible?: string,
    @Query('destacada') destacada?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let disponibleBool = undefined;
      let destacadaBool = undefined;

      if (disponible !== undefined) {
        disponibleBool = disponible === 'true';
      }

      if (destacada !== undefined) {
        destacadaBool = destacada === 'true';
      }

      const mamparas = await this.catalogoService.findAllMamparas({
        disponible: disponibleBool,
        destacada: destacadaBool,
      });

      return {
        success: true,
        message: 'Mamparas obtenidas exitosamente',
        data: mamparas,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('mamparas/:id')
  async findOneMampara(@Param('id') id: string) {
    try {
      const mampara = await this.catalogoService.findOneMampara(id);
      return {
        success: true,
        message: 'Mampara obtenida exitosamente',
        data: mampara,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('mamparas/:id')
  async updateMampara(
    @Param('id') id: string,
    @Body() updateMamparaDto: UpdateMamparaDto
  ) {
    try {
      const mampara = await this.catalogoService.updateMampara(id, updateMamparaDto);
      return {
        success: true,
        message: 'Mampara actualizada exitosamente',
        data: mampara,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('mamparas/:id')
  async removeMampara(@Param('id') id: string) {
    try {
      const result = await this.catalogoService.removeMampara(id);
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