// features/auth/types/auth.types.ts

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

/**
 * Interfaces para operaciones de autenticación
 */
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

export interface ForgotPasswordRequest {
  readonly email: string;
  readonly captchaToken?: string;
}

export interface ResetPasswordRequest {
  readonly token: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface UpdateProfileRequest {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phoneNumber?: string;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

/**
 * Response types para operaciones API
 */
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

export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: AuthError;
  readonly metadata?: Record<string, unknown>;
}

/**
 * Context types
 */
export interface AuthContextValue {
  readonly state: AuthState;
  readonly actions: {
    readonly login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    readonly register: (data: RegisterData) => Promise<AuthResponse>;
    readonly logout: () => Promise<void>;
    readonly refreshTokens: () => Promise<boolean>;
    readonly updateProfile: (data: UpdateProfileRequest) => Promise<AuthResponse>;
    readonly changePassword: (data: ChangePasswordRequest) => Promise<AuthResponse>;
    readonly forgotPassword: (data: ForgotPasswordRequest) => Promise<AuthResponse>;
    readonly resetPassword: (data: ResetPasswordRequest) => Promise<AuthResponse>;
    readonly clearError: () => void;
  };
  readonly utils: {
    readonly isAuthenticated: boolean;
    readonly hasRole: (role: UserRole) => boolean;
    readonly hasAnyRole: (roles: UserRole[]) => boolean;
    readonly getTokens: () => AuthTokens | null;
    readonly isTokenValid: () => boolean;
    readonly timeUntilExpiry: () => number;
  };
}

/**
 * Hook return types
 */
export interface UseAuthReturn {
  readonly user: UserProfile | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly error: AuthError | null;
  readonly login: (credentials: LoginCredentials) => Promise<boolean>;
  readonly logout: () => Promise<void>;
  readonly clearError: () => void;
}

export interface UseLoginFormReturn {
  readonly formData: LoginCredentials;
  readonly errors: Partial<Record<keyof LoginCredentials, string>>;
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
  readonly updateField: <K extends keyof LoginCredentials>(
    field: K, 
    value: LoginCredentials[K]
  ) => void;
  readonly validateField: (field: keyof LoginCredentials) => Promise<boolean>;
  readonly validateForm: () => Promise<boolean>;
  readonly resetForm: () => void;
  readonly submitForm: () => Promise<boolean>;
}