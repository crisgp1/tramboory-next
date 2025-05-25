import { z } from 'zod';

/**
 * Esquemas de Validación Empresariales con Zod
 * Implementa validación robusta tanto en cliente como servidor
 * @author Tramboory Development Team
 * @version 1.0.0
 */

// ============================================================================
// SCHEMAS BASE REUTILIZABLES
// ============================================================================

/**
 * Schema para validación de email con estándares enterprise
 */
const emailSchema = z
  .string()
  .min(1, 'El email es requerido')
  .email('Formato de email inválido')
  .max(255, 'Email demasiado largo')
  .toLowerCase()
  .trim()
  .refine(
    (email) => !email.includes('+'), 
    'No se permiten alias de email'
  );

/**
 * Schema para contraseña con requisitos de seguridad avanzados
 */
const passwordSchema = z
  .string()
  .min(8, 'Mínimo 8 caracteres')
  .max(128, 'Máximo 128 caracteres')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message: 'Debe contener: 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial (@$!%*?&)'
    }
  )
  .refine(
    (password) => !/(.)\1{2,}/.test(password),
    'No debe tener caracteres repetidos consecutivamente'
  );

/**
 * Schema para nombres con validación de caracteres internacionales
 */
const nameSchema = z
  .string()
  .min(2, 'Mínimo 2 caracteres')
  .max(50, 'Máximo 50 caracteres')
  .regex(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
    'Solo letras, espacios, apostrofes y guiones'
  )
  .trim()
  .transform((name) => 
    name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
  );

/**
 * Schema para teléfonos con formato internacional
 */
const phoneSchema = z
  .string()
  .regex(
    /^\+?[1-9]\d{1,14}$/,
    'Formato inválido. Ej: +52123456789'
  )
  .optional()
  .or(z.literal(''));

// ============================================================================
// SCHEMAS PRINCIPALES DE VALIDACIÓN
// ============================================================================

/**
 * Schema para validación de login con protección contra ataques
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .max(128, 'Contraseña demasiado larga'),
  rememberMe: z.boolean().optional().default(false),
  captchaToken: z.string().optional(),
  deviceFingerprint: z.string().optional()
});

/**
 * Schema para registro con validación cruzada y términos legales
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
    firstName: nameSchema,
    lastName: nameSchema,
    phoneNumber: phoneSchema,
    acceptTerms: z.boolean().refine(
      val => val === true,
      'Debes aceptar los términos y condiciones'
    ),
    acceptPrivacy: z.boolean().refine(
      val => val === true,
      'Debes aceptar la política de privacidad'
    ),
    marketingConsent: z.boolean().optional().default(false)
  })
  .refine(
    data => data.password === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    }
  )
  .refine(
    data => data.firstName.toLowerCase() !== data.lastName.toLowerCase(),
    {
      message: 'El nombre y apellido deben ser diferentes',
      path: ['lastName']
    }
  );

/**
 * Schema para recuperación de contraseña
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
  captchaToken: z.string().min(1, 'Verificación de seguridad requerida')
});

/**
 * Schema para reseteo de contraseña con token
 */
export const resetPasswordSchema = z
  .object({
    token: z.string().min(32, 'Token de reset inválido'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu nueva contraseña')
  })
  .refine(
    data => data.password === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    }
  );

/**
 * Schema para actualización de perfil
 */
export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phoneNumber: phoneSchema,
  avatar: z.string().url('URL de avatar inválida').optional(),
  bio: z.string().max(500, 'Biografía máximo 500 caracteres').optional(),
  timezone: z.string().optional(),
  language: z.enum(['es', 'en']).optional()
});

/**
 * Schema para cambio de contraseña autenticado
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Contraseña actual requerida'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu nueva contraseña')
  })
  .refine(
    data => data.newPassword === data.confirmPassword,
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword']
    }
  )
  .refine(
    data => data.currentPassword !== data.newPassword,
    {
      message: 'La nueva contraseña debe ser diferente a la actual',
      path: ['newPassword']
    }
  );

// ============================================================================
// TIPOS TYPESCRIPT INFERIDOS
// ============================================================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ============================================================================
// UTILIDADES DE VALIDACIÓN
// ============================================================================

/**
 * Factory para crear validadores de campo específicos
 */
export const createFieldValidator = <T>(schema: z.ZodSchema<T>) => {
  return (value: unknown): { isValid: boolean; error?: string } => {
    const result = schema.safeParse(value);
    
    if (result.success) {
      return { isValid: true };
    }
    
    return {
      isValid: false,
      error: result.error.errors[0]?.message || 'Valor inválido'
    };
  };
};

/**
 * Validación rápida de email
 */
export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

/**
 * Calculador de fortaleza de contraseña con métricas avanzadas
 */
export const calculatePasswordStrength = (password: string): {
  score: 0 | 1 | 2 | 3 | 4;
  feedback: string[];
  entropy: number;
  estimatedCrackTime: string;
} => {
  let score = 0;
  const feedback: string[] = [];
  
  // Validaciones básicas
  if (password.length >= 8) score++;
  else feedback.push('Mínimo 8 caracteres');
  
  if (/[a-z]/.test(password)) score++;
  else feedback.push('Incluir minúsculas');
  
  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Incluir mayúsculas');
  
  if (/\d/.test(password)) score++;
  else feedback.push('Incluir números');
  
  if (/[@$!%*?&]/.test(password)) score++;
  else feedback.push('Incluir símbolos');
  
  // Cálculo de entropía
  const charset = getCharsetSize(password);
  const entropy = Math.log2(Math.pow(charset, password.length));
  
  // Estimación de tiempo de crack
  const estimatedCrackTime = estimateCrackTime(entropy);
  
  return {
    score: Math.min(score, 4) as 0 | 1 | 2 | 3 | 4,
    feedback,
    entropy: Math.round(entropy),
    estimatedCrackTime
  };
};

/**
 * Determina el tamaño del conjunto de caracteres usado
 */
function getCharsetSize(password: string): number {
  let size = 0;
  if (/[a-z]/.test(password)) size += 26;
  if (/[A-Z]/.test(password)) size += 26;
  if (/\d/.test(password)) size += 10;
  if (/[@$!%*?&]/.test(password)) size += 8;
  return size;
}

/**
 * Estima el tiempo necesario para crack la contraseña
 */
function estimateCrackTime(entropy: number): string {
  const seconds = Math.pow(2, entropy - 1) / 1000000; // Asume 1M intentos/seg
  
  if (seconds < 60) return 'Instantáneo';
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutos`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} horas`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} días`;
  return `${Math.round(seconds / 31536000)} años`;
}

/**
 * Validador batch para múltiples campos
 */
export const validateBatch = <T extends Record<string, unknown>>(
  data: T,
  schema: z.ZodSchema<T>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { isValid: true, errors: {} };
  }
  
  const errors: Partial<Record<keyof T, string>> = {};
  
  result.error.errors.forEach(error => {
    const field = error.path[0] as keyof T;
    if (field && !errors[field]) {
      errors[field] = error.message;
    }
  });
  
  return { isValid: false, errors };
};