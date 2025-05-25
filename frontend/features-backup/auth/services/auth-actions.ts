// features/auth/services/auth-actions.ts
'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authApiService } from './api/auth-api.service';
import { 
  loginSchema, 
  registerSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from '../validators/auth.schemas';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ForgotPasswordRequest,
  ResetPasswordRequest 
} from '../types';

/**
 * Server Actions para operaciones de autenticación
 * Implementa validación robusta y manejo de errores
 */

/**
 * Autenticar usuario con validación completa
 */
export async function authenticateUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    // Validación de entrada con Zod
    const validationResult = loginSchema.safeParse(credentials);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          field: firstError.path[0] as string,
          timestamp: new Date()
        }
      };
    }

    console.log(`🔐 Authenticating user: ${credentials.email}`);

    // Llamada al servicio API
    const response = await authApiService.login(validationResult.data);

    if (response.success) {
      console.log(`✅ Authentication successful for: ${credentials.email}`);
      
      // Revalidar rutas que dependen de autenticación
      revalidatePath('/dashboard');
      revalidatePath('/profile');
      revalidatePath('/cotizaciones');
      revalidatePath('/reservas');
    } else {
      console.error(`❌ Authentication failed for: ${credentials.email}`, response.error);
    }

    return response;

  } catch (error) {
    console.error('💥 Unexpected error in authenticateUser:', error);
    
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error interno del servidor. Intenta nuevamente.',
        timestamp: new Date()
      }
    };
  }
}

/**
 * Registrar nuevo usuario
 */
export async function registerUser(userData: RegisterData): Promise<AuthResponse> {
  try {
    // Validación de entrada
    const validationResult = registerSchema.safeParse(userData);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          field: firstError.path[0] as string,
          timestamp: new Date()
        }
      };
    }

    console.log(`📝 Registering user: ${userData.email}`);

    // Llamada al servicio API
    const response = await authApiService.register(validationResult.data);

    if (response.success) {
      console.log(`✅ Registration successful for: ${userData.email}`);
      
      // Revalidar rutas relevantes
      revalidatePath('/auth');
      revalidatePath('/dashboard');
    } else {
      console.error(`❌ Registration failed for: ${userData.email}`, response.error);
    }

    return response;

  } catch (error) {
    console.error('💥 Unexpected error in registerUser:', error);
    
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error interno del servidor. Intenta nuevamente.',
        timestamp: new Date()
      }
    };
  }
}

/**
 * Solicitar recuperación de contraseña
 */
export async function requestPasswordReset(
  data: ForgotPasswordRequest
): Promise<AuthResponse> {
  try {
    // Validación de entrada
    const validationResult = forgotPasswordSchema.safeParse(data);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          field: firstError.path[0] as string,
          timestamp: new Date()
        }
      };
    }

    console.log(`📧 Password reset requested for: ${data.email}`);

    // Llamada al servicio API
    const response = await authApiService.forgotPassword(validationResult.data);

    if (response.success) {
      console.log(`✅ Password reset email sent to: ${data.email}`);
    } else {
      console.error(`❌ Password reset failed for: ${data.email}`, response.error);
    }

    return response;

  } catch (error) {
    console.error('💥 Unexpected error in requestPasswordReset:', error);
    
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error interno del servidor. Intenta nuevamente.',
        timestamp: new Date()
      }
    };
  }
}

/**
 * Resetear contraseña con token
 */
export async function resetUserPassword(
  data: ResetPasswordRequest
): Promise<AuthResponse> {
  try {
    // Validación de entrada
    const validationResult = resetPasswordSchema.safeParse(data);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          field: firstError.path[0] as string,
          timestamp: new Date()
        }
      };
    }

    console.log('🔄 Password reset in progress...');

    // Llamada al servicio API
    const response = await authApiService.resetPassword(validationResult.data);

    if (response.success) {
      console.log('✅ Password reset successful');
      
      // Revalidar y redirigir
      revalidatePath('/auth');
      redirect('/auth/login?message=password-reset-success');
    } else {
      console.error('❌ Password reset failed:', response.error);
    }

    return response;

  } catch (error) {
    console.error('💥 Unexpected error in resetUserPassword:', error);
    
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Error interno del servidor. Intenta nuevamente.',
        timestamp: new Date()
      }
    };
  }
}

/**
 * Logout de usuario con cleanup
 */
export async function logoutUser(accessToken?: string): Promise<void> {
  try {
    console.log('🚪 User logout initiated');

    // Si hay token, notificar al servidor
    if (accessToken) {
      try {
        await authApiService.logout(accessToken);
      } catch (error) {
        // No fallar el logout si hay error del servidor
        console.warn('Warning: Server logout failed, continuing with client logout');
      }
    }

    console.log('✅ User logout successful');

    // Revalidar todas las rutas protegidas
    revalidatePath('/dashboard');
    revalidatePath('/profile');
    revalidatePath('/cotizaciones');
    revalidatePath('/reservas');
    revalidatePath('/inventario');
    revalidatePath('/finanzas');

    // Redirigir a login
    redirect('/auth/login');

  } catch (error) {
    console.error('💥 Error in logoutUser:', error);
    
    // Aún así intentar redirigir
    try {
      redirect('/auth/login');
    } catch (redirectError) {
      console.error('Failed to redirect after logout error:', redirectError);
    }
  }
}

/**
 * Validar token de reset de contraseña
 */
export async function validateResetToken(token: string): Promise<AuthResponse> {
  try {
    if (!token || token.trim().length === 0) {
      return {
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token de reset inválido o expirado',
          timestamp: new Date()
        }
      };
    }

    // Aquí llamarías al backend para validar el token
    // Por ahora, simulamos la validación
    console.log('🔍 Validating reset token...');

    // En implementación real:
    // const response = await authApiService.validateResetToken(token);
    
    return {
      success: true,
      metadata: {
        requestId: `validate-${Date.now()}`,
        timestamp: new Date()
      }
    };

  } catch (error) {
    console.error('💥 Error validating reset token:', error);
    
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Error al validar el token de reset',
        timestamp: new Date()
      }
    };
  }
}