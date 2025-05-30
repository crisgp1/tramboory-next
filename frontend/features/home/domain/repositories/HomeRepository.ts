import { CarouselImage } from '../entities/CarouselImage';
import { Service } from '../entities/Service';

/**
 * Interfaz del repositorio del dominio Home
 * Define el contrato para acceso a datos sin exponer detalles de implementación
 */
export interface HomeRepository {
  /**
   * Obtener imágenes del carrusel activas y ordenadas
   */
  getCarouselImages(): Promise<CarouselImage[]>;

  /**
   * Obtener promociones del mes activas
   */
  getPromotions(): Promise<CarouselImage[]>;

  /**
   * Obtener servicios disponibles
   */
  getServices(): Promise<Service[]>;

  /**
   * Obtener imagen específica por ID
   */
  getImageById(id: string): Promise<CarouselImage | null>;

  /**
   * Verificar estado de salud de la API
   */
  healthCheck(): Promise<boolean>;
}

/**
 * Excepciones específicas del dominio
 */
export class HomeRepositoryError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'HomeRepositoryError';
  }
}

export class CarouselImageNotFoundError extends HomeRepositoryError {
  constructor(imageId: string) {
    super(
      `Imagen del carrusel con ID ${imageId} no encontrada`,
      'CAROUSEL_IMAGE_NOT_FOUND',
      { imageId }
    );
  }
}

export class ApiConnectionError extends HomeRepositoryError {
  constructor(originalError?: Error) {
    super(
      'Error de conexión con la API',
      'API_CONNECTION_ERROR',
      { originalError: originalError?.message }
    );
  }
}