import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '@/supabase/supabase.service';
import { 
  CreateImagenDto, 
  UpdateImagenDto, 
  CreateAlbumDto, 
  UpdateAlbumDto,
  CreateAlbumImagenDto,
  UpdateAlbumImagenDto
} from '@/galeria/dto/create-galeria.dto';
import { 
  Imagen,
  Album,
  AlbumImagen
} from '@/galeria/entities/galeria.entity';

@Injectable()
export class GaleriaService {
  constructor(private supabaseService: SupabaseService) {}

  // Métodos para Imágenes
  async createImagen(createImagenDto: CreateImagenDto): Promise<Imagen> {
    try {
      const imagenData = {
        ...createImagenDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.imagenes')
        .insert(imagenData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear imagen: ${error.message}`);
      }

      return data as Imagen;
    } catch (error) {
      throw new BadRequestException(`Error al crear imagen: ${error.message}`);
    }
  }

  async findAllImagenes(options?: { 
    tipo?: string;
    destacada?: boolean;
    activo?: boolean;
    id_tematica?: string;
    id_paquete?: string;
    id_reserva?: string;
  }): Promise<Imagen[]> {
    try {
      let query = this.supabaseService
        .getClient()
        .from('galeria.imagenes')
        .select('*');

      // Aplicar filtros si existen
      if (options) {
        if (options.tipo) {
          query = query.eq('tipo', options.tipo);
        }
        if (options.destacada !== undefined) {
          query = query.eq('destacada', options.destacada);
        }
        if (options.activo !== undefined) {
          query = query.eq('activo', options.activo);
        }
        if (options.id_tematica) {
          query = query.eq('id_tematica', options.id_tematica);
        }
        if (options.id_paquete) {
          query = query.eq('id_paquete', options.id_paquete);
        }
        if (options.id_reserva) {
          query = query.eq('id_reserva', options.id_reserva);
        }
      }

      const { data, error } = await query.order('orden', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener imágenes: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      throw new BadRequestException(`Error al obtener imágenes: ${error.message}`);
    }
  }

  async findOneImagen(id: string): Promise<Imagen> {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.imagenes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Imagen no encontrada: ${error.message}`);
      }

      return data as Imagen;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener imagen: ${error.message}`);
    }
  }

  async updateImagen(id: string, updateImagenDto: UpdateImagenDto): Promise<Imagen> {
    try {
      // Verificar que la imagen existe
      await this.findOneImagen(id);

      const updateData = {
        ...updateImagenDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.imagenes')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar imagen: ${error.message}`);
      }

      return data as Imagen;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar imagen: ${error.message}`);
    }
  }

  async removeImagen(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la imagen existe
      await this.findOneImagen(id);

      // Eliminar primero las asociaciones en album_imagenes
      const { error: errorAsociaciones } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .delete()
        .eq('id_imagen', id);

      if (errorAsociaciones) {
        throw new BadRequestException(`Error al eliminar asociaciones de la imagen: ${errorAsociaciones.message}`);
      }

      // Eliminar la imagen
      const { error } = await this.supabaseService
        .getClient()
        .from('galeria.imagenes')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar imagen: ${error.message}`);
      }

      return { message: 'Imagen eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar imagen: ${error.message}`);
    }
  }

  // Métodos para Álbumes
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const albumData = {
        ...createAlbumDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.albumes')
        .insert(albumData)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al crear álbum: ${error.message}`);
      }

      return data as Album;
    } catch (error) {
      throw new BadRequestException(`Error al crear álbum: ${error.message}`);
    }
  }

  async findAllAlbumes(options?: {
    tipo?: string;
    destacado?: boolean;
    activo?: boolean;
    includeImagenes?: boolean;
  }): Promise<Album[]> {
    try {
      let selectQuery = '*';
      if (options?.includeImagenes) {
        selectQuery = '*, imagenes:galeria.album_imagenes(*, imagen:galeria.imagenes(*))';
      }

      let query = this.supabaseService
        .getClient()
        .from('galeria.albumes')
        .select(selectQuery);

      // Aplicar filtros si existen
      if (options) {
        if (options.tipo) {
          query = query.eq('tipo', options.tipo);
        }
        if (options.destacado !== undefined) {
          query = query.eq('destacado', options.destacado);
        }
        if (options.activo !== undefined) {
          query = query.eq('activo', options.activo);
        }
      }

      const { data, error } = await query.order('orden', { ascending: true });

      if (error) {
        throw new BadRequestException(`Error al obtener álbumes: ${error.message}`);
      }

      // Doble cast para asegurar la conversión de tipo segura
      return (data || []) as unknown as Album[];
    } catch (error) {
      throw new BadRequestException(`Error al obtener álbumes: ${error.message}`);
    }
  }

  async findOneAlbum(id: string, includeImagenes: boolean = false): Promise<Album> {
    try {
      let selectQuery = '*';
      if (includeImagenes) {
        selectQuery = '*, imagenes:galeria.album_imagenes(*, imagen:galeria.imagenes(*))';
      }

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.albumes')
        .select(selectQuery)
        .eq('id', id)
        .single();

      if (error) {
        throw new NotFoundException(`Álbum no encontrado: ${error.message}`);
      }

      // Cast seguro para el álbum
      return data as unknown as Album;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al obtener álbum: ${error.message}`);
    }
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    try {
      // Verificar que el álbum existe
      await this.findOneAlbum(id);

      const updateData = {
        ...updateAlbumDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.albumes')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar álbum: ${error.message}`);
      }

      return data as Album;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar álbum: ${error.message}`);
    }
  }

  async removeAlbum(id: string): Promise<{ message: string }> {
    try {
      // Verificar que el álbum existe
      await this.findOneAlbum(id);

      // Eliminar primero las asociaciones en album_imagenes
      const { error: errorAsociaciones } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .delete()
        .eq('id_album', id);

      if (errorAsociaciones) {
        throw new BadRequestException(`Error al eliminar asociaciones del álbum: ${errorAsociaciones.message}`);
      }

      // Eliminar el álbum
      const { error } = await this.supabaseService
        .getClient()
        .from('galeria.albumes')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar álbum: ${error.message}`);
      }

      return { message: 'Álbum eliminado exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar álbum: ${error.message}`);
    }
  }

  // Métodos para AlbumImagen (asociaciones)
  async addImagenToAlbum(createAlbumImagenDto: CreateAlbumImagenDto): Promise<AlbumImagen> {
    try {
      // Verificar que el álbum existe
      await this.findOneAlbum(createAlbumImagenDto.id_album);

      // Verificar que la imagen existe
      await this.findOneImagen(createAlbumImagenDto.id_imagen);

      // Verificar si ya existe esta asociación
      const { data: existing, error: errorCheck } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .select('*')
        .eq('id_album', createAlbumImagenDto.id_album)
        .eq('id_imagen', createAlbumImagenDto.id_imagen)
        .maybeSingle();

      if (errorCheck) {
        throw new BadRequestException(`Error al verificar asociación: ${errorCheck.message}`);
      }

      // Si ya existe, actualizar el orden
      if (existing) {
        const { data, error } = await this.supabaseService
          .getClient()
          .from('galeria.album_imagenes')
          .update({
            orden: createAlbumImagenDto.orden,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select(`
            *,
            imagen:galeria.imagenes(*),
            album:galeria.albumes(*)
          `)
          .single();

        if (error) {
          throw new BadRequestException(`Error al actualizar asociación: ${error.message}`);
        }

        // Cast seguro para la asociación
        return data as unknown as AlbumImagen;
      }

      // Si no existe, crear nueva asociación
      const albumImagenData = {
        ...createAlbumImagenDto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .insert(albumImagenData)
        .select(`
          *,
          imagen:galeria.imagenes(*),
          album:galeria.albumes(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al asociar imagen a álbum: ${error.message}`);
      }

      // Cast seguro para la asociación
      return data as unknown as AlbumImagen;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al asociar imagen a álbum: ${error.message}`);
    }
  }

  async updateAlbumImagen(id: string, updateAlbumImagenDto: UpdateAlbumImagenDto): Promise<AlbumImagen> {
    try {
      // Verificar que la asociación existe
      const { data: existing, error: errorFind } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .select('*')
        .eq('id', id)
        .single();

      if (errorFind || !existing) {
        throw new NotFoundException(`Asociación no encontrada: ${errorFind?.message || 'ID inválido'}`);
      }

      // Si se actualizan las referencias, verificar que existen
      if (updateAlbumImagenDto.id_album) {
        await this.findOneAlbum(updateAlbumImagenDto.id_album);
      }

      if (updateAlbumImagenDto.id_imagen) {
        await this.findOneImagen(updateAlbumImagenDto.id_imagen);
      }

      const updateData = {
        ...updateAlbumImagenDto,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          imagen:galeria.imagenes(*),
          album:galeria.albumes(*)
        `)
        .single();

      if (error) {
        throw new BadRequestException(`Error al actualizar asociación: ${error.message}`);
      }

      // Cast seguro para la asociación
      return data as unknown as AlbumImagen;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar asociación: ${error.message}`);
    }
  }

  async removeImagenFromAlbum(id: string): Promise<{ message: string }> {
    try {
      // Verificar que la asociación existe
      const { data: existing, error: errorFind } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .select('*')
        .eq('id', id)
        .single();

      if (errorFind || !existing) {
        throw new NotFoundException(`Asociación no encontrada: ${errorFind?.message || 'ID inválido'}`);
      }

      // Eliminar la asociación
      const { error } = await this.supabaseService
        .getClient()
        .from('galeria.album_imagenes')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Error al eliminar imagen del álbum: ${error.message}`);
      }

      return { message: 'Imagen eliminada del álbum exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar imagen del álbum: ${error.message}`);
    }
  }

  async getStatus() {
    return { 
      status: 'GaleriaService is operational',
      version: '1.0.0',
      tables: ['galeria.imagenes', 'galeria.albumes', 'galeria.album_imagenes']
    };
  }
}