// features/auth/validators/auth.schemas.ts

import { z } from 'zod';

/**
 * Schemas de validación robustos con Zod
 * Implementa validación tanto en cliente como servidor
 */

// Schemas base reutilizables
const emailSchema = z
  .string()
  .min(1, 'El email es requerido')
  .email('Formato de email inválido')
  .max(255, 'Email demasiado largo')
  .toLowerCase()
  .trim();

const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña es demasiado larga')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'La contraseña debe contener al menos: 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial'
  );

const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Formato de teléfono inválido')
  .optional()
  .or(z.literal(''));

const nameSchema = z
  .string()
  .min(2, 'Mínimo 2 caracteres')
  .max(50, 'Máximo 50 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios')
  .trim();

// Schema para login
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
  rememberMe: z.boolean().optional().default(false),
  captchaToken: z.string().optional()
});

// Schema para registro con validación de confirmación
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
    firstName: nameSchema,
    lastName: nameSchema,
    phoneNumber: phoneSchema,
    acceptTerms: z.boolean().refine(val => val === true, {
      message: 'Debes aceptar los términos y condiciones'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  });

// Schema para recuperación de contraseña
export const forgotPasswordSchema = z.object({
  email: emailSchema,
  captchaToken: z.string().optional()
});

// Schema para reset de contraseña
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token requerido'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu nueva contraseña')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  });

// Schema para actualización de perfil
export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  phoneNumber: phoneSchema
});

// Schema para cambio de contraseña
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Contraseña actual requerida'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu nueva contraseña')
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'La nueva contraseña debe ser diferente a la actual',
    path: ['newPassword']
  });

// Tipos inferidos de los schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

/**
 * Validadores específicos para casos de uso
 */
export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
  strength: number;
} => {
  const result = passwordSchema.safeParse(password);
  
  if (result.success) {
    return {
      isValid: true,
      errors: [],
      strength: calculatePasswordStrength(password)
    };
  }
  
  return {
    isValid: false,
    errors: result.error.errors.map(err => err.message),
    strength: calculatePasswordStrength(password)
  };
};

const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;
  
  return Math.min(strength, 4);
};

/**
 * Factory para crear validadores dinámicos
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