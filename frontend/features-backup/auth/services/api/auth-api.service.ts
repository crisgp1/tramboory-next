// features/auth/services/api/auth-api.service.ts

import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  UserProfile,
  AuthTokens,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  ChangePasswordRequest
} from '../../types';

/**
 * Servicio API para operaciones de autenticación
 * Implementa manejo robusto de errores y retry logic
 */

class AuthApiService {
  private readonly baseUrl: string;
  private readonly timeout: number = 30000;
  private readonly maxRetries: number = 3;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  /**
   * Configuración base para fetch con interceptors
   */
  private async fetchWithConfig<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount: number = 0
  ): Promise<AuthResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      // Manejar respuestas no exitosas
      if (!response.ok) {
        return this.handleErrorResponse(response);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.data || data,
        tokens: data.tokens,
        metadata: {
          requestId: response.headers.get('x-request-id') || '',
          timestamp: new Date(),
          rateLimit: this.extractRateLimit(response)
        }
      };

    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic para errores de red
      if (retryCount < this.maxRetries && this.isRetryableError(error)) {
        await this.delay(Math.pow(2, retryCount) * 1000);
        return this.fetchWithConfig(endpoint, options, retryCount + 1);
      }

      return this.handleNetworkError(error);
    }
  }

  /**
   * Autenticación de usuario
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse<UserProfile>> {
    return this.fetchWithConfig<UserProfile>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email.toLowerCase().trim(),
        password: credentials.password,
        rememberMe: credentials.rememberMe || false,
        captchaToken: credentials.captchaToken
      })
    });
  }

  /**
   * Registro de nuevo usuario
   */
  async register(userData: RegisterData): Promise<AuthResponse<UserProfile>> {
    return this.fetchWithConfig<UserProfile>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        phoneNumber: userData.phoneNumber?.trim() || undefined
      })
    });
  }

  /**
   * Refresh de tokens
   */
  async refreshTokens(refreshToken: string): Promise<AuthResponse<AuthTokens>> {
    return this.fetchWithConfig<AuthTokens>('/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
  }

  /**
   * Logout (invalidar tokens)
   */
  async logout(accessToken: string): Promise<AuthResponse<void>> {
    return this.fetchWithConfig<void>('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<AuthResponse<void>> {
    return this.fetchWithConfig<void>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email.toLowerCase().trim(),
        captchaToken: data.captchaToken
      })
    });
  }

  /**
   * Reset de contraseña
   */
  async resetPassword(data: ResetPasswordRequest): Promise<AuthResponse<void>> {
    return this.fetchWithConfig<void>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        token: data.token,
        password: data.password
      })
    });
  }

  /**
   * Obtener perfil de usuario actual
   */
  async getProfile(accessToken: string): Promise<AuthResponse<UserProfile>> {
    return this.fetchWithConfig<UserProfile>('/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  }

  /**
   * Actualizar perfil de usuario
   */
  async updateProfile(
    data: UpdateProfileRequest, 
    accessToken: string
  ): Promise<AuthResponse<UserProfile>> {
    return this.fetchWithConfig<UserProfile>('/auth/profile', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(
    data: ChangePasswordRequest, 
    accessToken: string
  ): Promise<AuthResponse<void>> {
    return this.fetchWithConfig<void>('/auth/change-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      })
    });
  }

  /**
   * Utilidades privadas
   */
  private async handleErrorResponse(response: Response): Promise<AuthResponse<never>> {
    try {
      const errorData = await response.json();
      
      return {
        success: false,
        error: {
          code: errorData.code || `HTTP_${response.status}`,
          message: errorData.message || response.statusText,
          field: errorData.field,
          timestamp: new Date()
        },
        metadata: {
          requestId: response.headers.get('x-request-id') || '',
          timestamp: new Date(),
          rateLimit: this.extractRateLimit(response)
        }
      };
    } catch {
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: response.statusText || 'Error del servidor',
          timestamp: new Date()
        }
      };
    }
  }

  private handleNetworkError(error: unknown): AuthResponse<never> {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        error: {
          code: 'TIMEOUT_ERROR',
          message: 'La solicitud ha excedido el tiempo límite',
          timestamp: new Date()
        }
      };
    }

    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Error de conexión. Verifica tu conexión a internet.',
        timestamp: new Date()
      }
    };
  }

  private isRetryableError(error: unknown): boolean {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return false; // No reintentar timeouts
    }
    
    return error instanceof TypeError; // Errores de red
  }

  private extractRateLimit(response: Response) {
    const remaining = response.headers.get('x-ratelimit-remaining');
    const reset = response.headers.get('x-ratelimit-reset');
    
    if (remaining && reset) {
      return {
        remaining: parseInt(remaining, 10),
        resetAt: new Date(parseInt(reset, 10) * 1000)
      };
    }
    
    return undefined;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const authApiService = new AuthApiService();
export type { AuthApiService };