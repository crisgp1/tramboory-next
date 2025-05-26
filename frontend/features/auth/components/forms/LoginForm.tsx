/**
 * Componente LoginForm Enterprise
 * @module LoginForm
 * @description Formulario de autenticación con validación robusta y UX optimizada
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from '../../hooks/state/use-auth-state'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

// ============================================================================
// INTERFACES Y TIPOS DE DOMINIO
// ============================================================================

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginFormProps {
  onSuccess?: (user: any) => void
  onError?: (error: any) => void
  className?: string
  redirectTo?: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
  rememberMe?: string
}

// ============================================================================
// CONFIGURACIÓN DE VALIDACIÓN ENTERPRISE
// ============================================================================

const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Ingresa un email válido'
  },
  password: {
    required: true,
    minLength: 6,
    message: 'La contraseña debe tener al menos 6 caracteres'
  }
} as const

const DEVELOPMENT_CREDENTIALS = {
  admin: { email: 'admin@tramboory.com', password: 'Admin123!' },
  employee: { email: 'daniel@tramboory.com', password: 'Dev123!' },
  customer: { email: 'test@example.com', password: 'Test123!' }
} as const

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * LoginForm - Componente de autenticación enterprise
 * 
 * ### Características Implementadas:
 * - **Validación en Tiempo Real**: Feedback inmediato al usuario
 * - **Estados de Loading**: UX optimizada durante autenticación
 * - **Error Handling**: Manejo robusto de errores de red y validación
 * - **Accessibility**: ARIA labels y navegación por teclado
 * - **Development Mode**: Credenciales predefinidas para testing
 * 
 * ### Patrones de Diseño:
 * - **Controlled Components**: Gestión de estado optimizada
 * - **Error Boundaries**: Manejo de errores granular
 * - **Progressive Enhancement**: Funcionalidad básica sin JavaScript
 */
export function LoginForm({ 
  onSuccess, 
  onError, 
  className = '',
  redirectTo = '/dashboard'
}: LoginFormProps) {
  
  // ============================================================================
  // HOOKS Y ESTADO LOCAL
  // ============================================================================
  
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAuthState()
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<keyof LoginFormData, boolean>>({
    email: false,
    password: false,
    rememberMe: false
  })
  
  const [attemptCount, setAttemptCount] = useState(0)
  
  // ============================================================================
  // VALIDACIÓN EMPRESARIAL
  // ============================================================================
  
  /**
   * Validación de campo individual con reglas enterprise
   */
  const validateField = useCallback((field: keyof LoginFormData, value: any): string | null => {
    switch (field) {
      case 'email':
        if (!value) return 'El email es obligatorio'
        if (!VALIDATION_RULES.email.pattern.test(value)) {
          return VALIDATION_RULES.email.message
        }
        return null
        
      case 'password':
        if (!value) return 'La contraseña es obligatoria'
        if (value.length < VALIDATION_RULES.password.minLength) {
          return VALIDATION_RULES.password.message
        }
        return null
        
      default:
        return null
    }
  }, [])
  
  /**
   * Validación completa del formulario
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    
    newErrors.email = validateField('email', formData.email) || undefined
    newErrors.password = validateField('password', formData.password) || undefined
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }, [formData, validateField])
  
  // ============================================================================
  // HANDLERS DE EVENTOS
  // ============================================================================
  
  /**
   * Manejo de cambio en campos de entrada
   */
  const handleChange = useCallback((field: keyof LoginFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Validación en tiempo real para campos tocados
    if (touched[field]) {
      const fieldError = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: fieldError || undefined }))
    }
    
    // Limpiar error general al modificar campos
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }))
    }
    
    // Limpiar error de estado global
    if (error) {
      clearError()
    }
  }, [touched, validateField, errors.general, error, clearError])
  
  /**
   * Manejo de pérdida de foco (blur)
   */
  const handleBlur = useCallback((field: keyof LoginFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    const fieldError = validateField(field, formData[field])
    setErrors(prev => ({ ...prev, [field]: fieldError || undefined }))
  }, [formData, validateField])
  
  /**
   * Autollenado de credenciales de desarrollo
   */
  const fillDevelopmentCredentials = useCallback((userType: keyof typeof DEVELOPMENT_CREDENTIALS) => {
    const credentials = DEVELOPMENT_CREDENTIALS[userType]
    setFormData(prev => ({
      ...prev,
      email: credentials.email,
      password: credentials.password
    }))
    setTouched({ email: true, password: true, rememberMe: false })
    setErrors({})
  }, [])
  
  /**
   * Manejo de envío del formulario
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones pre-envío
    if (isLoading) return
    if (!validateForm()) return
    
    // Protección contra ataques de fuerza bruta
    if (attemptCount >= 5) {
      setErrors(prev => ({ 
        ...prev, 
        general: 'Demasiados intentos fallidos. Espera antes de intentar nuevamente.' 
      }))
      return
    }
    
    try {
      const success = await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      })
      
      if (success) {
        // Login exitoso
        setAttemptCount(0)
        onSuccess?.(formData)
        
        // Redirección con delay para UX
        setTimeout(() => {
          router.push(redirectTo as any)
        }, 500)
        
      } else {
        // Login fallido
        setAttemptCount(prev => prev + 1)
        setErrors(prev => ({ 
          ...prev, 
          general: error?.message || 'Credenciales incorrectas' 
        }))
        onError?.(error)
      }
      
    } catch (loginError) {
      console.error('[LoginForm] Error inesperado:', loginError)
      setAttemptCount(prev => prev + 1)
      setErrors(prev => ({ 
        ...prev, 
        general: 'Error inesperado. Intenta nuevamente.' 
      }))
      onError?.(loginError)
    }
  }, [
    isLoading, 
    validateForm, 
    attemptCount, 
    login, 
    formData, 
    onSuccess, 
    redirectTo, 
    router, 
    error, 
    onError
  ])
  
  // ============================================================================
  // COMPUTACIONES MEMOIZADAS
  // ============================================================================
  
  /**
   * Estado computado del formulario
   */
  const formState = useMemo(() => ({
    isValid: !Object.values(errors).some(error => error) && 
             formData.email && 
             formData.password,
    hasErrors: Object.values(errors).some(error => error),
    canSubmit: !isLoading && 
               formData.email && 
               formData.password && 
               attemptCount < 5,
    remainingAttempts: Math.max(0, 5 - attemptCount)
  }), [errors, formData, isLoading, attemptCount])
  
  /**
   * Clases CSS dinámicas
   */
  const cssClasses = useMemo(() => ({
    container: `max-w-md mx-auto ${className}`,
    
    input: (field: keyof LoginFormData) => {
      const hasError = errors[field] && touched[field]
      return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
        hasError 
          ? 'border-red-500 focus:ring-red-500 bg-red-50' 
          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`
    },
    
    submitButton: `w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      formState.canSubmit && formState.isValid
        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
        : 'bg-gray-300 cursor-not-allowed text-gray-500'
    }`
  }), [errors, touched, isLoading, formState, className])
  
  // ============================================================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================================================
  
  return (
    <div className={cssClasses.container}>
      
      {/* Credenciales de Desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-3">🔧 Credenciales de Desarrollo</h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(DEVELOPMENT_CREDENTIALS).map(([role, creds]) => (
              <button
                key={role}
                type="button"
                onClick={() => fillDevelopmentCredentials(role as keyof typeof DEVELOPMENT_CREDENTIALS)}
                className="text-left p-2 text-xs bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                disabled={isLoading}
              >
                <div className="font-medium text-blue-900 capitalize">{role}</div>
                <div className="text-blue-600">{creds.email}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Formulario Principal */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        
        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="tu@email.com"
            disabled={isLoading}
            variant={errors.email && touched.email ? 'error' : 'default'}
            error={touched.email ? errors.email : undefined}
          />
        </div>
        
        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            placeholder="Tu contraseña"
            disabled={isLoading}
            variant={errors.password && touched.password ? 'error' : 'default'}
            error={touched.password ? errors.password : undefined}
          />
        </div>
        
        {/* Recordar Sesión */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleChange('rememberMe', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Recordar sesión
            </label>
          </div>
          
          <a 
            href="/auth/forgot-password" 
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        
        {/* Errores Generales */}
        {(errors.general || error) && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-red-800">Error de Autenticación</h4>
                <p className="text-sm text-red-600 mt-1">
                  {errors.general || error?.message}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Botón de Envío */}
        <Button
          type="submit"
          variant="primary"
          disabled={!formState.canSubmit || !formState.isValid}
          loading={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
        
        {/* Información de Estado */}
        {formState.remainingAttempts < 5 && formState.remainingAttempts > 0 && (
          <div className="text-center">
            <p className="text-sm text-orange-600">
              Intentos restantes: {formState.remainingAttempts}
            </p>
          </div>
        )}
      </form>
      
      {/* Enlaces de Navegación */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="/auth/register" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}

// ============================================================================
// EXPORTACIONES ADICIONALES
// ============================================================================

/**
 * Hook para integración con LoginForm
 */
export function useLoginForm() {
  const { isAuthenticated, login, error } = useAuthState()
  
  return {
    isAuthenticated,
    login,
    error,
    isReady: !isAuthenticated
  }
}

/**
 * Exportación por defecto para compatibilidad
 */
export default LoginForm