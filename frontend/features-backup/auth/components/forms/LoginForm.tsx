// features/auth/components/forms/LoginForm.tsx
'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthState } from '../../hooks/state/use-auth-state';
import { loginSchema } from '../../validators/auth.schemas';
import type { LoginCredentials, AuthError } from '../../types';

/**
 * Formulario de login enterprise con validación robusta
 * Implementa accesibilidad, UX optimizada y seguridad
 */

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: AuthError) => void;
  className?: string;
  autoFocus?: boolean;
}

export default function LoginForm({ 
  onSuccess, 
  onError, 
  className = '',
  autoFocus = true 
}: LoginFormProps) {
  // ============================================================================
  // HOOKS Y ESTADO
  // ============================================================================
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError } = useAuthState();
  
  // Referencias para manejo de foco
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Estado del formulario
  const [formData, setFormData] = useState<LoginCredentials>({
    email: searchParams.get('email') || '',
    password: '',
    rememberMe: false
  });

  // Estado de validación
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginCredentials, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoginCredentials, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Estado de UI
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================================
  // EFECTOS
  // ============================================================================
  
  // Auto-focus al email al montar
  useEffect(() => {
    if (autoFocus && emailRef.current) {
      emailRef.current.focus();
    }
  }, [autoFocus]);

  // Limpiar errores cuando el usuario empiece a escribir
  useEffect(() => {
    if (error && (touched.email || touched.password)) {
      clearError();
    }
  }, [formData, error, clearError, touched]);

  // Manejar mensajes de query params
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'password-reset-success') {
      // Mostrar notificación de éxito
      console.log('✅ Contraseña reseteada exitosamente');
    }
  }, [searchParams]);

  // ============================================================================
  // VALIDACIÓN
  // ============================================================================
  
  const validateField = useCallback(async (
    field: keyof LoginCredentials, 
    value: LoginCredentials[keyof LoginCredentials]
  ): Promise<string | undefined> => {
    try {
      const fieldSchema = loginSchema.shape[field];
      await fieldSchema.parseAsync(value);
      return undefined;
    } catch (error: any) {
      return error.errors?.[0]?.message || 'Valor inválido';
    }
  }, []);

  const validateForm = useCallback(async (): Promise<boolean> => {
    const errors: Partial<Record<keyof LoginCredentials, string>> = {};

    // Validar cada campo
    const validationPromises = Object.entries(formData).map(async ([key, value]) => {
      const fieldKey = key as keyof LoginCredentials;
      const error = await validateField(fieldKey, value);
      if (error) {
        errors[fieldKey] = error;
      }
    });

    await Promise.all(validationPromises);

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validateField]);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleFieldChange = useCallback(async (
    field: keyof LoginCredentials,
    value: LoginCredentials[keyof LoginCredentials]
  ) => {
    // Actualizar valor
    setFormData(prev => ({ ...prev, [field]: value }));

    // Marcar como tocado
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validar campo si ya fue tocado o hay errores
    if (touched[field] || fieldErrors[field]) {
      const error = await validateField(field, value);
      setFieldErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [validateField, touched, fieldErrors]);

  const handleFieldBlur = useCallback(async (field: keyof LoginCredentials) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const value = formData[field];
    const error = await validateField(field, value);
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || isLoading) return;

    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);
    
    try {
      // Validar formulario
      const isValid = await validateForm();
      
      if (!isValid) {
        // Focus en primer campo con error
        const firstErrorField = Object.keys(fieldErrors)[0] as keyof LoginCredentials;
        if (firstErrorField === 'email' && emailRef.current) {
          emailRef.current.focus();
        } else if (firstErrorField === 'password' && passwordRef.current) {
          passwordRef.current.focus();
        }
        return;
      }

      console.log('📤 Submitting login form...');

      // Intentar login
      const success = await login(formData);
      
      if (success) {
        console.log('✅ Login successful, redirecting...');
        onSuccess?.();
        
        // Redireccionar según el rol o URL de retorno
        const returnUrl = searchParams.get('returnUrl') || '/dashboard';
        router.push(returnUrl);
      } else {
        console.error('❌ Login failed');
        onError?.(error!);
        
        // Focus en campo de contraseña para reintento
        passwordRef.current?.focus();
      }

    } catch (err) {
      console.error('💥 Unexpected error during login:', err);
      onError?.({
        code: 'UNEXPECTED_ERROR',
        message: 'Error inesperado durante el login',
        timestamp: new Date()
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData, 
    isSubmitting, 
    isLoading, 
    validateForm, 
    fieldErrors, 
    login, 
    onSuccess, 
    onError, 
    error, 
    router, 
    searchParams
  ]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleForgotPassword = useCallback(() => {
    router.push(`/auth/forgot-password${formData.email ? `?email=${encodeURIComponent(formData.email)}` : ''}`);
  }, [router, formData.email]);

  const handleRegister = useCallback(() => {
    router.push('/auth/register');
  }, [router]);

  // ============================================================================
  // UTILIDADES
  // ============================================================================
  
  const getFieldError = useCallback((field: keyof LoginCredentials): string | undefined => {
    return fieldErrors[field];
  }, [fieldErrors]);

  const isFieldInvalid = useCallback((field: keyof LoginCredentials): boolean => {
    return touched[field] && !!fieldErrors[field];
  }, [touched, fieldErrors]);

  const isFormValid = useCallback((): boolean => {
    return Object.keys(fieldErrors).length === 0 && 
           formData.email.length > 0 && 
           formData.password.length > 0;
  }, [fieldErrors, formData]);

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600">
          Accede a tu cuenta para continuar
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        
        {/* Email Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              onBlur={() => handleFieldBlur('email')}
              className={`
                w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${isFieldInvalid('email') 
                  ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }
                ${isSubmitting || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              placeholder="tu@email.com"
              disabled={isSubmitting || isLoading}
              aria-invalid={isFieldInvalid('email')}
              aria-describedby={isFieldInvalid('email') ? 'email-error' : undefined}
            />
            {isFieldInvalid('email') && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {isFieldInvalid('email') && (
            <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
              {getFieldError('email')}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contraseña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              onBlur={() => handleFieldBlur('password')}
              className={`
                w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${isFieldInvalid('password') 
                  ? 'border-red-500 focus:ring-red-500 bg-red-50' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }
                ${isSubmitting || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              placeholder="Tu contraseña"
              disabled={isSubmitting || isLoading}
              aria-invalid={isFieldInvalid('password')}
              aria-describedby={isFieldInvalid('password') ? 'password-error' : undefined}
            />
            
            {/* Password Toggle Button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              disabled={isSubmitting || isLoading}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {isFieldInvalid('password') && (
            <p id="password-error" className="mt-2 text-sm text-red-600" role="alert">
              {getFieldError('password')}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe || false}
              onChange={(e) => handleFieldChange('rememberMe', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              disabled={isSubmitting || isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Recordarme
            </label>
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline disabled:opacity-50"
            disabled={isSubmitting || isLoading}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Error General */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded" role="alert">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700 font-medium">
                {error.message}
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          ref={submitButtonRef}
          type="submit"
          disabled={isSubmitting || isLoading || !isFormValid()}
          className={`
            w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isSubmitting || isLoading || !isFormValid()
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm hover:shadow-md'
            }
          `}
        >
          {isSubmitting || isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </div>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              onClick={handleRegister}
              className="font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline disabled:opacity-50"
              disabled={isSubmitting || isLoading}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>

      {/* Debug Info (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-xs text-gray-600">
          <p>Intentos de envío: {submitCount}</p>
          <p>Campos tocados: {Object.keys(touched).join(', ')}</p>
          <p>Errores: {Object.keys(fieldErrors).join(', ')}</p>
        </div>
      )}
    </div>
  );
}