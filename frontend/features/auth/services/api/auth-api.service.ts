/**
 * Servicio API Enterprise para Autenticación
 * @module AuthApiService
 * @version 2.0.0
 */

'use client'

// Importación estándar para enums (valores runtime)
import { 
  AuthErrorCode,
  UserRole,
  AuthStatus
} from '../../types/auth.types';

// Importación de tipos con 'type' keyword
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  UserProfile,
  AuthTokens,
  AuthError
} from '../../types/auth.types';

import { authConfig, apiEndpoints } from '../../config/auth.config';

/**
 * Cliente API Enterprise con Arquitectura Robusta
 */
class AuthApiService {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly maxRetries: number;

  constructor() {
    this.baseUrl = authConfig.apiUrl;
    this.timeout = authConfig.apiTimeout;
    this.maxRetries = authConfig.maxRetries;
  }

  /**
   * Autenticación de usuario con fallback enterprise
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse<UserProfile>> {
    const startTime = performance.now();
    
    try {
      this.logRequest('login', credentials.email);

      // Validación de entrada
      const validationError = this.validateLoginCredentials(credentials);
      if (validationError) {
        return validationError;
      }

      // Fallback a mock enterprise para desarrollo
      if (authConfig.enableMockAuth) {
        console.warn('🔄 Usando sistema mock enterprise');
        return this.mockEnterpriseLogin(credentials, startTime);
      }

      throw new Error('Backend not available - using mock');

    } catch (error) {
      this.logResponse('login', 'error', performance.now() - startTime);
      
      if (authConfig.enableMockAuth) {
        return this.mockEnterpriseLogin(credentials, startTime);
      }

      return this.createErrorResponse(
        AuthErrorCode.NETWORK_ERROR, 
        'Error de conexión con servidor'
      );
    }
  }

  /**
   * Registro de nuevo usuario
   */
  async register(userData: RegisterData): Promise<AuthResponse<UserProfile>> {
    const startTime = performance.now();
    
    try {
      this.logRequest('register', userData.email);

      if (authConfig.enableMockAuth) {
        return this.mockEnterpriseRegister(userData, startTime);
      }

      throw new Error('Backend not available');

    } catch (error) {
      if (authConfig.enableMockAuth) {
        return this.mockEnterpriseRegister(userData, startTime);
      }

      return this.createErrorResponse(
        AuthErrorCode.NETWORK_ERROR, 
        'Error de conexión'
      );
    }
  }

  /**
   * Refresh de tokens JWT
   */
  async refreshTokens(refreshToken: string): Promise<AuthResponse<AuthTokens>> {
    const startTime = performance.now();
    
    try {
      if (authConfig.enableMockAuth) {
        return this.mockTokenRefresh(refreshToken, startTime);
      }

      throw new Error('Backend not available');

    } catch (error) {
      if (authConfig.enableMockAuth) {
        return this.mockTokenRefresh(refreshToken, startTime);
      }

      return this.createErrorResponse(
        AuthErrorCode.TOKEN_REFRESH_FAILED, 
        'Error al refrescar tokens'
      );
    }
  }

  /**
   * Logout con limpieza
   */
  async logout(accessToken: string): Promise<AuthResponse<void>> {
    try {
      return {
        success: true,
        metadata: {
          requestId: this.generateRequestId(),
          timestamp: new Date(),
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
        }
      };
    } catch (error) {
      return {
        success: true,
        metadata: {
          requestId: this.generateRequestId(),
          timestamp: new Date(),
          version: '1.0.0'
        }
      };
    }
  }

  // ============================================================================
  // SISTEMA MOCK ENTERPRISE
  // ============================================================================

  private async mockEnterpriseLogin(
    credentials: LoginCredentials, 
    startTime: number
  ): Promise<AuthResponse<UserProfile>> {
    
    await this.simulateNetworkLatency();

    const mockUser = this.findMockUser(credentials.email);
    if (!mockUser) {
      return this.createErrorResponse(
        AuthErrorCode.USER_NOT_FOUND, 
        'Usuario no encontrado'
      );
    }

    const isPasswordValid = await this.validateMockPassword(
      credentials.password, 
      mockUser.passwordHash
    );

    if (!isPasswordValid) {
      return this.createErrorResponse(
        AuthErrorCode.INVALID_CREDENTIALS, 
        'Credenciales inválidas'
      );
    }

    const tokens = this.generateMockTokens(mockUser);

    const userProfile: UserProfile = {
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      phoneNumber: mockUser.phoneNumber,
      role: mockUser.role,
      avatar: mockUser.avatar,
      isEmailVerified: true,
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: mockUser.createdAt,
      updatedAt: new Date(),
      preferences: {
        theme: 'system',
        language: 'es',
        timezone: 'America/Mexico_City',
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false,
          security: true,
          reservations: true
        }
      }
    };

    this.logResponse('mockLogin', 'success', performance.now() - startTime);

    return {
      success: true,
      data: userProfile,
      tokens,
      metadata: {
        requestId: this.generateRequestId(),
        timestamp: new Date(),
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
      }
    };
  }

  private async mockEnterpriseRegister(
    userData: RegisterData,
    startTime: number
  ): Promise<AuthResponse<UserProfile>> {
    
    await this.simulateNetworkLatency();

    const existingUser = this.findMockUser(userData.email);
    if (existingUser) {
      return this.createErrorResponse(
        AuthErrorCode.EMAIL_ALREADY_EXISTS, 
        'Email ya registrado'
      );
    }

    const newUser: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: userData.email.toLowerCase().trim(),
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      phoneNumber: userData.phoneNumber?.trim(),
      role: UserRole.CUSTOMER,
      isEmailVerified: false,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        theme: 'system',
        language: 'es',
        timezone: 'America/Mexico_City',
        notifications: {
          email: false,
          push: true,
          sms: false,
          marketing: false,
          security: true,
          reservations: true
        }
      }
    };

    const tokens = this.generateMockTokens({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      createdAt: newUser.createdAt,
      passwordHash: 'mock_hash_new_user',
      isActive: true
    });

    return {
      success: true,
      data: newUser,
      tokens,
      metadata: {
        requestId: this.generateRequestId(),
        timestamp: new Date(),
        version: '1.0.0'
      }
    };
  }

  private async mockTokenRefresh(refreshToken: string, startTime: number): Promise<AuthResponse<AuthTokens>> {
    await this.simulateNetworkLatency();

    try {
      const parts = refreshToken.split('.');
      if (parts.length !== 3) {
        return this.createErrorResponse(
          AuthErrorCode.TOKEN_INVALID, 
          'Token inválido'
        );
      }

      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp < now) {
        return this.createErrorResponse(
          AuthErrorCode.TOKEN_EXPIRED, 
          'Token expirado'
        );
      }

      const mockUser = this.findMockUserById(payload.sub);
      if (!mockUser) {
        return this.createErrorResponse(
          AuthErrorCode.USER_NOT_FOUND, 
          'Usuario no encontrado'
        );
      }

      const newTokens = this.generateMockTokens(mockUser);

      return {
        success: true,
        data: newTokens,
        metadata: {
          requestId: this.generateRequestId(),
          timestamp: new Date(),
          version: '1.0.0'
        }
      };

    } catch (error) {
      return this.createErrorResponse(
        AuthErrorCode.TOKEN_INVALID, 
        'Error procesando token'
      );
    }
  }

  // ============================================================================
  // UTILIDADES DE VALIDACIÓN
  // ============================================================================

  private validateLoginCredentials(credentials: LoginCredentials): AuthResponse<never> | null {
    if (!credentials.email || !credentials.password) {
      return this.createErrorResponse(
        AuthErrorCode.VALIDATION_ERROR, 
        'Email y contraseña requeridos'
      );
    }

    if (!this.isValidEmail(credentials.email)) {
      return this.createErrorResponse(
        AuthErrorCode.VALIDATION_ERROR, 
        'Email inválido'
      );
    }

    if (credentials.password.length < 6) {
      return this.createErrorResponse(
        AuthErrorCode.VALIDATION_ERROR, 
        'Contraseña muy corta'
      );
    }

    return null;
  }

  private findMockUser(email: string) {
    const mockUsers = [
      {
        id: 'user-admin-001',
        email: 'admin@tramboory.com',
        passwordHash: 'mock_hash_Admin123!',
        firstName: 'Admin',
        lastName: 'Tramboory',
        phoneNumber: '+52123456789',
        role: UserRole.ADMIN,
        avatar: 'https://ui-avatars.com/api/?name=Admin+Tramboory&background=6366f1&color=fff',
        createdAt: new Date('2024-01-01'),
        isActive: true
      },
      {
        id: 'user-dev-001',
        email: 'daniel@tramboory.com',
        passwordHash: 'mock_hash_Dev123!',
        firstName: 'Daniel',
        lastName: 'Developer',
        phoneNumber: '+52987654321',
        role: UserRole.EMPLOYEE,
        avatar: 'https://ui-avatars.com/api/?name=Daniel+Developer&background=10b981&color=fff',
        createdAt: new Date('2024-01-15'),
        isActive: true
      },
      {
        id: 'user-test-001',
        email: 'test@example.com',
        passwordHash: 'mock_hash_Test123!',
        firstName: 'Usuario',
        lastName: 'Prueba',
        phoneNumber: '+52555123456',
        role: UserRole.CUSTOMER,
        avatar: 'https://ui-avatars.com/api/?name=Usuario+Prueba&background=f59e0b&color=fff',
        createdAt: new Date('2024-02-01'),
        isActive: true
      }
    ];

    return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  private findMockUserById(id: string) {
    const users = [
      { id: 'user-admin-001', email: 'admin@tramboory.com', role: UserRole.ADMIN, firstName: 'Admin', lastName: 'Tramboory' },
      { id: 'user-dev-001', email: 'daniel@tramboory.com', role: UserRole.EMPLOYEE, firstName: 'Daniel', lastName: 'Developer' },
      { id: 'user-test-001', email: 'test@example.com', role: UserRole.CUSTOMER, firstName: 'Usuario', lastName: 'Prueba' }
    ];
    
    return users.find(user => user.id === id);
  }

  private async validateMockPassword(password: string, hash: string): Promise<boolean> {
    await this.delay(100);

    const mockPasswordMap: Record<string, string> = {
      'mock_hash_Admin123!': 'Admin123!',
      'mock_hash_Dev123!': 'Dev123!',
      'mock_hash_Test123!': 'Test123!'
    };

    return mockPasswordMap[hash] === password;
  }

  private generateMockTokens(user: any): AuthTokens {
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = 15 * 60;
    const refreshExpiresIn = 7 * 24 * 60 * 60;

    const accessPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: now,
      exp: now + expiresIn,
      type: 'access'
    };

    const refreshPayload = {
      sub: user.id,
      iat: now,
      exp: now + refreshExpiresIn,
      type: 'refresh'
    };

    const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(accessPayload))}.mock_signature_${Date.now()}`;
    const refreshToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(refreshPayload))}.mock_refresh_${Date.now()}`;

    return {
      accessToken,
      refreshToken,
      expiresAt: (now + expiresIn) * 1000,
      tokenType: 'Bearer',
      scope: this.getUserScope(user.role)
    };
  }

  private getUserScope(role: UserRole): string[] {
    const baseScope = ['profile:read'];
    
    switch (role) {
      case UserRole.ADMIN:
        return [...baseScope, 'admin:read', 'admin:write'];
      case UserRole.EMPLOYEE:
        return [...baseScope, 'reservations:read'];
      case UserRole.CUSTOMER:
        return [...baseScope, 'reservations:own'];
      default:
        return baseScope;
    }
  }

  private createErrorResponse(code: AuthErrorCode, message: string): AuthResponse<never> {
    return {
      success: false,
      error: {
        code,
        message,
        timestamp: new Date()
      },
      metadata: {
        requestId: this.generateRequestId(),
        timestamp: new Date(),
        version: '1.0.0'
      }
    };
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async simulateNetworkLatency(): Promise<void> {
    const latency = Math.random() * 400 + 100;
    await this.delay(latency);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private logRequest(operation: string, identifier: string): void {
    if (authConfig.logLevel === 'debug') {
      console.log(`[AuthAPI] ${operation} request:`, {
        operation,
        identifier,
        timestamp: new Date().toISOString()
      });
    }
  }

  private logResponse(operation: string, status: string, duration: number): void {
    if (authConfig.logLevel === 'debug') {
      console.log(`[AuthAPI] ${operation} response:`, {
        operation,
        status,
        duration: `${duration.toFixed(2)}ms`,
        timestamp: new Date().toISOString()
      });
    }
  }
}

export const authApiService = new AuthApiService();
export type { AuthApiService };