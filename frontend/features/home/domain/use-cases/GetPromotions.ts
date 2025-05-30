import { HomeRepository } from '../repositories/HomeRepository';
import { CarouselImage } from '../entities/CarouselImage';

/**
 * Caso de uso para obtener promociones activas
 * Implementa lógica específica para promociones del mes
 */
export class GetPromotionsUseCase {
  constructor(private repository: HomeRepository) {}

  /**
   * Ejecutar caso de uso con lógica de promociones
   */
  async execute(): Promise<CarouselImage[]> {
    try {
      const promotions = await this.repository.getPromotions();
      
      // Aplicar reglas de negocio para promociones
      const validPromotions = this.applyPromotionRules(promotions);
      
      console.info(`Retrieved ${validPromotions.length} valid promotions`);
      
      return validPromotions;
    } catch (error) {
      console.error('Error in GetPromotionsUseCase:', error);
      
      // Retornar array vacío para no afectar la experiencia
      return [];
    }
  }

  /**
   * Aplicar reglas específicas para promociones
   */
  private applyPromotionRules(promotions: CarouselImage[]): CarouselImage[] {
    const now = new Date();
    
    return promotions
      .filter(promo => promo.isActive())
      .filter(promo => promo.hasValidImage())
      .filter(promo => this.isPromotionCurrent(promo, now))
      .slice(0, 5); // Máximo 5 promociones
  }

  /**
   * Verificar si la promoción está vigente (regla de negocio)
   */
  private isPromotionCurrent(promotion: CarouselImage, currentDate: Date): boolean {
    // Por ahora todas las promociones activas son válidas
    // Aquí se podría agregar lógica de fechas de vigencia
    return true;
  }
}