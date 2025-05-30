import { 
  FiClock, 
  FiMail, 
  FiGift, 
  FiCoffee, 
  FiSmile, 
  FiMusic, 
  FiUsers, 
  FiMapPin, 
  FiPackage, 
  FiStar,
  FiCheckCircle,
  FiHeart,
  FiAward,
  FiCalendar
} from 'react-icons/fi';
import { IconType } from 'react-icons';

/**
 * Registro centralizado de iconos para evitar problemas de serialización
 * Implementa el patrón Registry para mapear strings a componentes
 */
export class IconRegistry {
  private static iconMap: Record<string, IconType> = {
    // Iconos de servicios
    'clock': FiClock,
    'mail': FiMail,
    'gift': FiGift,
    'coffee': FiCoffee,
    'smile': FiSmile,
    'music': FiMusic,
    'users': FiUsers,
    'map-pin': FiMapPin,
    'package': FiPackage,
    'star': FiStar,
    'check-circle': FiCheckCircle,
    'heart': FiHeart,
    'award': FiAward,
    'calendar': FiCalendar
  };

  /**
   * Obtener componente de icono por nombre
   */
  static getIcon(iconName: string): IconType | null {
    return this.iconMap[iconName] || null;
  }

  /**
   * Verificar si existe un icono
   */
  static hasIcon(iconName: string): boolean {
    return iconName in this.iconMap;
  }

  /**
   * Obtener todos los nombres de iconos disponibles
   */
  static getAvailableIcons(): string[] {
    return Object.keys(this.iconMap);
  }

  /**
   * Registrar un nuevo icono dinámicamente
   */
  static registerIcon(name: string, icon: IconType): void {
    this.iconMap[name] = icon;
  }
}

/**
 * Hook para usar iconos de manera segura en Client Components
 */
export const useIcon = (iconName: string): IconType | null => {
  return IconRegistry.getIcon(iconName);
};