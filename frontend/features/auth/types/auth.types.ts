/**
 * Tipos base para el sistema de autenticación
 * Implementa type safety estricto para todas las operaciones auth
 */

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  CUSTOMER = 'customer'
}

export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error'
}

export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly role: UserRole;
  readonly avatar?: string;
  readonly isEmailVerified: boolean;
  readonly lastLoginAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: number;
  readonly tokenType: 'Bearer';
}

export interface AuthState {
  readonly user: UserProfile | null;
  readonly tokens: AuthTokens | null;
  readonly status: AuthStatus;
  readonly error: AuthError | null;
  readonly isLoading: boolean;
  readonly lastActivity: number;
}

export interface AuthError {
  readonly code: string;
  readonly message: string;
  readonly field?: string;
  readonly timestamp: Date;
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
  readonly captchaToken?: string;
}

export interface RegisterData {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly acceptTerms: boolean;
}

export interface AuthResponse<T = UserProfile> {
  readonly success: boolean;
  readonly data?: T;
  readonly tokens?: AuthTokens;
  readonly error?: AuthError;
  readonly metadata?: {
    readonly requestId: string;
    readonly timestamp: Date;
    readonly rateLimit?: {
      readonly remaining: number;
      readonly resetAt: Date;
    };
  };
}

export interface AuthContextValue {
  readonly state: AuthState;
  readonly actions: {
    readonly login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    readonly register: (data: RegisterData) => Promise<AuthResponse>;
    readonly logout: () => Promise<void>;
    readonly refreshTokens: () => Promise<boolean>;
    readonly clearError: () => void;
  };
  readonly utils: {
    readonly isAuthenticated: boolean;
    readonly hasRole: (role: UserRole) => boolean;
    readonly isTokenValid: () => boolean;
  };
}

export interface UseAuthReturn {
  readonly user: UserProfile | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly error: AuthError | null;
  readonly login: (credentials: LoginCredentials) => Promise<boolean>;
  readonly logout: () => Promise<void>;
  readonly clearError: () => void;
}