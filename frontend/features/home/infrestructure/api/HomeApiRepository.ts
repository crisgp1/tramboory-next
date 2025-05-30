import { 
  HomeRepository, 
  HomeRepositoryError, 
  ApiConnectionError,
  CarouselImageNotFoundError 
} from '../../domain/repositories/HomeRepository';
import { CarouselImage } from '../../domain/entities/CarouselImage';
import { Service } from '../../domain/entities/Service';

/**
 * Implementación concreta del repositorio usando API REST
 * Maneja la comunicación con el backend y transformación de datos
 */
export class HomeApiRepository implements HomeRepository {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = '/api', timeout: number = 10000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Realizar petición HTTP con manejo de errores y timeout
   */
  private async fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new HomeRepositoryError(
          `HTTP error! status: ${response.status}`,
          'HTTP_ERROR',
          { status: response.status, url }
        );
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new HomeRepositoryError(
          'Request timeout',
          'TIMEOUT_ERROR',
          { url, timeout: this.timeout }
        );
      }
      
      if (error instanceof HomeRepositoryError) {
        throw error;
      }
      
      throw new ApiConnectionError(error as Error);
    }
  }

  /**
   * Obtener imágenes del carrusel con validación y transformación
   */
  async getCarouselImages(): Promise<CarouselImage[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/galeria-home`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new HomeRepositoryError(
          'Formato de respuesta inválido para imágenes del carrusel',
          'INVALID_RESPONSE_FORMAT'
        );
      }

      return data
        .map(item => {
          try {
            return CarouselImage.fromApiResponse(item);
          } catch (validationError) {
            console.warn('Imagen inválida en el carrusel:', item, validationError);
            return null;
          }
        })
        .filter((image): image is CarouselImage => image !== null)
        .filter(image => image.isActive() && image.hasValidImage())
        .sort((a, b) => a.orden - b.orden);
    } catch (error) {
      console.error('Error al obtener imágenes del carrusel:', error);
      
      if (error instanceof HomeRepositoryError) {
        throw error;
      }
      
      throw new HomeRepositoryError(
        'Failed to fetch carousel images',
        'CAROUSEL_FETCH_ERROR',
        { originalError: error }
      );
    }
  }

  /**
   * Obtener promociones con lógica de negocio específica
   */
  async getPromotions(): Promise<CarouselImage[]> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/galeria-home/promociones`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new HomeRepositoryError(
          'Formato de respuesta inválido para promociones',
          'INVALID_RESPONSE_FORMAT'
        );
      }

      return data
        .map(item => {
          try {
            return CarouselImage.fromApiResponse(item);
          } catch (validationError) {
            console.warn('Promoción inválida:', item, validationError);
            return null;
          }
        })
        .filter((promo): promo is CarouselImage => promo !== null)
        .filter(promo => promo.isActive() && promo.hasValidImage())
        .sort((a, b) => a.orden - b.orden);
    } catch (error) {
      console.error('Error al obtener promociones:', error);
      
      if (error instanceof HomeRepositoryError) {
        throw error;
      }
      
      throw new HomeRepositoryError(
        'Failed to fetch promotions',
        'PROMOTIONS_FETCH_ERROR',
        { originalError: error }
      );
    }
  }

  /**
   * Obtener servicios (datos estáticos por ahora, pero preparado para API)
   */
  async getServices(): Promise<Service[]> {
    // Por ahora retornamos servicios estáticos, pero está preparado para API
    return this.getStaticServices();
  }

  /**
   * Obtener imagen específica por ID
   */
  async getImageById(id: string): Promise<CarouselImage | null> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}/galeria-home/${id}`);
      const data = await response.json();

      return CarouselImage.fromApiResponse(data);
    } catch (error) {
      if (error instanceof HomeRepositoryError && error.code === 'HTTP_ERROR') {
        const context = error.context as { status: number };
        if (context.status === 404) {
          throw new CarouselImageNotFoundError(id);
        }
      }
      
      console.error(`Error al obtener imagen ${id}:`, error);
      throw error;
    }
  }

  /**
   * Verificar estado de salud de la API
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.fetchWithTimeout(`${this.baseUrl}/health`);
      return true;
    } catch (error) {
      console.warn('Health check failed:', error);
      return false;
    }
  }

  /**
   * Servicios estáticos para mantener compatibilidad con diseño actual
   */
  private getStaticServices(): Service[] {
    const { 
      FiClock, 
      FiMail, 
      FiGift, 
      FiCoffee, 
      FiSmile, 
      FiMusic, 
      FiUsers, 
      FiMapPin, 
      FiPackage, 
      FiStar 
    } = require('react-icons/fi');

    const servicesData = [
      {
        id: 'normal',
        title: 'Tramboory Normal',
        description: 'La experiencia completa con todos los servicios incluidos para una celebración perfecta',
        price: '7,999',
        category: 'normal' as const,
        features: [
          {
            title: '4 Horas de Diversión',
            description: '3.5 horas de salón + 30 min de despedida',
            icon: FiClock
          },
          {
            title: 'Invitación Digital',
            description: 'Invitación personalizada para tu evento',
            icon: FiMail
          },
          {
            title: 'Decoración Temática',
            description: 'Ambientación Tramboory para tu fiesta',
            icon: FiGift
          },
          {
            title: 'Menú Completo',
            description: 'Alimentos para niños y adultos',
            icon: FiCoffee
          },
          {
            title: 'Bebidas Ilimitadas',
            description: 'Refrescos, agua y café de cortesía',
            icon: FiCoffee
          },
          {
            title: 'Área de Juegos',
            description: 'Ludoteca y alberca de pelotas',
            icon: FiSmile
          },
          {
            title: 'Ambiente Festivo',
            description: 'Música y anfitriones para animar',
            icon: FiMusic
          },
          {
            title: 'Coordinador de Evento',
            description: 'Personal dedicado para tu celebración',
            icon: FiUsers
          }
        ],
        highlights: ['Todo Incluido', 'Personal Completo', 'Sin Preocupaciones'],
        recommended: true
      },
      {
        id: 'matutino',
        title: 'Tramboory Matutino',
        description: 'Renta del espacio para eventos personalizados con servicios opcionales',
        price: '4,999',
        category: 'matutino' as const,
        features: [
          {
            title: '3 Horas de Evento',
            description: 'Horario matutino flexible',
            icon: FiClock
          },
          {
            title: 'Espacio Exclusivo',
            description: 'Salón privado para tu evento',
            icon: FiMapPin
          },
          {
            title: 'Mobiliario Básico',
            description: 'Mesas y sillas incluidas',
            icon: FiPackage
          },
          {
            title: 'Servicios Opcionales',
            description: 'Personaliza tu experiencia',
            icon: FiStar
          }
        ],
        highlights: ['Personalizable', 'Económico', 'Flexible'],
        recommended: false
      }
    ];

    return servicesData.map(serviceData => Service.fromData(serviceData));
  }
}