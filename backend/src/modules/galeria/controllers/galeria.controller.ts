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
  HttpCode,
  BadRequestException
} from '@nestjs/common';
import { GaleriaService } from '@/galeria/services/galeria.service';
import {
  CreateImagenDto,
  UpdateImagenDto,
  CreateAlbumDto,
  UpdateAlbumDto,
  CreateAlbumImagenDto,
  UpdateAlbumImagenDto
} from '@/galeria/dto/create-galeria.dto';

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  @Get()
  getStatus() {
    return this.galeriaService.getStatus();
  }

  // Endpoints para Imágenes
  @Post('imagenes')
  @HttpCode(HttpStatus.CREATED)
  async createImagen(@Body() createImagenDto: CreateImagenDto) {
    try {
      const imagen = await this.galeriaService.createImagen(createImagenDto);
      return {
        success: true,
        message: 'Imagen creada exitosamente',
        data: imagen,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('imagenes')
  async findAllImagenes(
    @Query('tipo') tipo?: string,
    @Query('destacada') destacada?: string,
    @Query('activo') activo?: string,
    @Query('id_tematica') id_tematica?: string,
    @Query('id_paquete') id_paquete?: string,
    @Query('id_reserva') id_reserva?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let destacadaBool = undefined;
      let activoBool = undefined;

      if (destacada !== undefined) {
        destacadaBool = destacada === 'true';
      }

      if (activo !== undefined) {
        activoBool = activo === 'true';
      }

      const imagenes = await this.galeriaService.findAllImagenes({
        tipo,
        destacada: destacadaBool,
        activo: activoBool,
        id_tematica,
        id_paquete,
        id_reserva
      });

      return {
        success: true,
        message: 'Imágenes obtenidas exitosamente',
        data: imagenes,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('imagenes/:id')
  async findOneImagen(@Param('id') id: string) {
    try {
      const imagen = await this.galeriaService.findOneImagen(id);
      return {
        success: true,
        message: 'Imagen obtenida exitosamente',
        data: imagen,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('imagenes/:id')
  async updateImagen(
    @Param('id') id: string,
    @Body() updateImagenDto: UpdateImagenDto
  ) {
    try {
      const imagen = await this.galeriaService.updateImagen(id, updateImagenDto);
      return {
        success: true,
        message: 'Imagen actualizada exitosamente',
        data: imagen,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('imagenes/:id')
  async removeImagen(@Param('id') id: string) {
    try {
      const result = await this.galeriaService.removeImagen(id);
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

  // Endpoints para Álbumes
  @Post('albumes')
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      const album = await this.galeriaService.createAlbum(createAlbumDto);
      return {
        success: true,
        message: 'Álbum creado exitosamente',
        data: album,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('albumes')
  async findAllAlbumes(
    @Query('tipo') tipo?: string,
    @Query('destacado') destacado?: string,
    @Query('activo') activo?: string,
    @Query('includeImagenes') includeImagenes?: string,
  ) {
    try {
      // Convertir string a boolean si es necesario
      let destacadoBool = undefined;
      let activoBool = undefined;
      let includeImagenesBool = false;

      if (destacado !== undefined) {
        destacadoBool = destacado === 'true';
      }

      if (activo !== undefined) {
        activoBool = activo === 'true';
      }

      if (includeImagenes !== undefined) {
        includeImagenesBool = includeImagenes === 'true';
      }

      const albumes = await this.galeriaService.findAllAlbumes({
        tipo,
        destacado: destacadoBool,
        activo: activoBool,
        includeImagenes: includeImagenesBool
      });

      return {
        success: true,
        message: 'Álbumes obtenidos exitosamente',
        data: albumes,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('albumes/:id')
  async findOneAlbum(
    @Param('id') id: string,
    @Query('includeImagenes') includeImagenes?: string
  ) {
    try {
      // Convertir string a boolean si es necesario
      let includeImagenesBool = false;

      if (includeImagenes !== undefined) {
        includeImagenesBool = includeImagenes === 'true';
      }

      const album = await this.galeriaService.findOneAlbum(id, includeImagenesBool);
      return {
        success: true,
        message: 'Álbum obtenido exitosamente',
        data: album,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('albumes/:id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    try {
      const album = await this.galeriaService.updateAlbum(id, updateAlbumDto);
      return {
        success: true,
        message: 'Álbum actualizado exitosamente',
        data: album,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('albumes/:id')
  async removeAlbum(@Param('id') id: string) {
    try {
      const result = await this.galeriaService.removeAlbum(id);
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

  // Endpoints para asociaciones Album-Imagen
  @Post('album-imagenes')
  @HttpCode(HttpStatus.CREATED)
  async addImagenToAlbum(@Body() createAlbumImagenDto: CreateAlbumImagenDto) {
    try {
      const albumImagen = await this.galeriaService.addImagenToAlbum(createAlbumImagenDto);
      return {
        success: true,
        message: 'Imagen asociada al álbum exitosamente',
        data: albumImagen,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('album-imagenes/:id')
  async updateAlbumImagen(
    @Param('id') id: string,
    @Body() updateAlbumImagenDto: UpdateAlbumImagenDto
  ) {
    try {
      const albumImagen = await this.galeriaService.updateAlbumImagen(id, updateAlbumImagenDto);
      return {
        success: true,
        message: 'Asociación actualizada exitosamente',
        data: albumImagen,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete('album-imagenes/:id')
  async removeImagenFromAlbum(@Param('id') id: string) {
    try {
      const result = await this.galeriaService.removeImagenFromAlbum(id);
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