import { 
  HomeRepository, 
  HomeRepositoryError, 
  ApiConnectionError,
  CarouselImageNotFoundError 
} from '../../domain/repositories/HomeRepository';
import { CarouselImage } from '../../domain/entities/CarouselImage';
import { Service } from '../../domain/entities/Service';

export class HomeApiRepository implements HomeRepository {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = '/api', timeout: number = 10000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  // ... métodos de fetchWithTimeout, getCarouselImages, getPromotions permanecen igual

  /**
   * Servicios estáticos actualizados con nombres de iconos
   */
  private getStaticServices(): Service[] {
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
            iconName: 'clock' // ✅ String serializable
          },
          {
            title: 'Invitación Digital',
            description: 'Invitación personalizada para tu evento',
            iconName: 'mail'
          },
          {
            title: 'Decoración Temática',
            description: 'Ambientación Tramboory para tu fiesta',
            iconName: 'gift'
          },
          {
            title: 'Menú Completo',
            description: 'Alimentos para niños y adultos',
            iconName: 'coffee'
          },
          {
            title: 'Bebidas Ilimitadas',
            description: 'Refrescos, agua y café de cortesía',
            iconName: 'coffee'
          },
          {
            title: 'Área de Juegos',
            description: 'Ludoteca y alberca de pelotas',
            iconName: 'smile'
          },
          {
            title: 'Ambiente Festivo',
            description: 'Música y anfitriones para animar',
            iconName: 'music'
          },
          {
            title: 'Coordinador de Evento',
            description: 'Personal dedicado para tu celebración',
            iconName: 'users'
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
            iconName: 'clock'
          },
          {
            title: 'Espacio Exclusivo',
            description: 'Salón privado para tu evento',
            iconName: 'map-pin'
          },
          {
            title: 'Mobiliario Básico',
            description: 'Mesas y sillas incluidas',
            iconName: 'package'
          },
          {
            title: 'Servicios Opcionales',
            description: 'Personaliza tu experiencia',
            iconName: 'star'
          }
        ],
        highlights: ['Personalizable', 'Económico', 'Flexible'],
        recommended: false
      }
    ];

    return servicesData.map(serviceData => Service.fromData(serviceData));
  }

  // ... resto de métodos permanecen igual
}