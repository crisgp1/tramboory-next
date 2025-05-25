// features/auth/types/form.types.ts

/**
 * Tipos específicos para formularios de autenticación
 * Implementa validación estricta y states de UI
 */

export interface FormFieldState<T = string> {
  readonly value: T;
  readonly error?: string;
  readonly isDirty: boolean;
  readonly isTouched: boolean;
  readonly isValidating: boolean;
}

export interface FormState<T extends Record<string, unknown>> {
  readonly fields: {
    readonly [K in keyof T]: FormFieldState<T[K]>;
  };
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
  readonly submitCount: number;
  readonly lastSubmittedAt?: Date;
}

export interface ValidationRule<T = string> {
  readonly validator: (value: T) => boolean | Promise<boolean>;
  readonly message: string;
  readonly severity: 'error' | 'warning' | 'info';
}

export interface FieldConfig<T = string> {
  readonly initialValue: T;
  readonly rules: ValidationRule<T>[];
  readonly debounceMs?: number;
  readonly validateOnChange?: boolean;
  readonly validateOnBlur?: boolean;
}

export interface LoginFormState extends FormState<LoginCredentials> {
  readonly captchaRequired: boolean;
  readonly rememberMe: boolean;
  readonly showPassword: boolean;
}

export interface RegisterFormState extends FormState<RegisterData> {
  readonly passwordStrength: PasswordStrength;
  readonly showPassword: boolean;
  readonly showConfirmPassword: boolean;
  readonly termsAccepted: boolean;
}

export interface PasswordStrength {
  readonly score: 0 | 1 | 2 | 3 | 4;
  readonly feedback: string[];
  readonly hasMinLength: boolean;
  readonly hasUppercase: boolean;
  readonly hasLowercase: boolean;
  readonly hasNumbers: boolean;
  readonly hasSpecialChars: boolean;
}

/**
 * Event handlers types
 */
export interface FormEventHandlers<T extends Record<string, unknown>> {
  readonly onFieldChange: <K extends keyof T>(field: K, value: T[K]) => void;
  readonly onFieldBlur: (field: keyof T) => void;
  readonly onFieldFocus: (field: keyof T) => void;
  readonly onSubmit: (data: T) => Promise<boolean>;
  readonly onReset: () => void;
}

export interface FormHookConfig<T extends Record<string, unknown>> {
  readonly initialValues: T;
  readonly validationSchema: Record<keyof T, FieldConfig>;
  readonly onSubmit: (data: T) => Promise<boolean>;
  readonly enableReinitialize?: boolean;
  readonly validateOnMount?: boolean;
}