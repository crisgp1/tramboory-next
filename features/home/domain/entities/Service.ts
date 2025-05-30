import { z } from 'zod';

// Schema actualizado para usar nombres de iconos en lugar de componentes
export const ServiceFeatureSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  iconName: z.string().min(1, 'El nombre del icono es requerido') // ✅ String serializable
});

export const ServiceSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.string().min(1, 'El precio es requerido'),
  features: z.array(ServiceFeatureSchema),
  highlights: z.array(z.string()),
  recommended: z.boolean(),
  category: z.enum(['normal', 'matutino', 'premium']).optional()
});

export type ServiceFeatureData = z.infer<typeof ServiceFeatureSchema>;
export type ServiceData = z.infer<typeof ServiceSchema>;

/**
 * Value Object actualizado para características del servicio
 */
export class ServiceFeature {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly iconName: string // ✅ Cambio: string en lugar de IconType
  ) {}

  static fromData(data: ServiceFeatureData): ServiceFeature {
    const validatedData = ServiceFeatureSchema.parse(data);
    return new ServiceFeature(
      validatedData.title,
      validatedData.description,
      validatedData.iconName
    );
  }

  /**
   * Método para obtener el componente del icono (lado del cliente)
   */
  getIconComponent() {
    // Este método se usará en Client Components
    return this.iconName;
  }
}

/**
 * Entidad Service actualizada
 */
export class Service {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: string,
    public readonly features: ServiceFeature[],
    public readonly highlights: string[],
    public readonly recommended: boolean,
    public readonly category?: 'normal' | 'matutino' | 'premium'
  ) {}

  static fromData(data: ServiceData): Service {
    const validatedData = ServiceSchema.parse(data);
    
    const features = validatedData.features.map(feature => 
      ServiceFeature.fromData(feature)
    );

    return new Service(
      validatedData.id,
      validatedData.title,
      validatedData.description,
      validatedData.price,
      features,
      validatedData.highlights,
      validatedData.recommended,
      validatedData.category
    );
  }

  // ... resto de métodos permanecen igual
  isRecommended(): boolean {
    return this.recommended;
  }

  getFormattedPrice(): string {
    return `$${this.price} MXN`;
  }

  isPremium(): boolean {
    return this.category === 'premium' || this.recommended;
  }

  getFeaturesCount(): number {
    return this.features.length;
  }
}