/**
 * Componente Input Enterprise con Validación y Estados
 * @module Input
 * @description Input reutilizable con validación, estados y tipado estricto
 */

import React, { forwardRef } from 'react'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  warning?: string
  helper?: string
  variant?: 'default' | 'error' | 'success' | 'warning'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
  showClearButton?: boolean
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Input - Componente de input enterprise con validación integrada
 * 
 * ### Características Implementadas:
 * - **Estados Visuales**: Error, success, warning con colores específicos
 * - **Iconografía**: Soporte para iconos decorativos y funcionales
 * - **Validación**: Mensajes de error, éxito y ayuda contextuales
 * - **Accessibility**: Labels asociados y ARIA attributes
 * - **Clear Button**: Botón de limpieza opcional
 * 
 * @example
 * ```tsx
 * // Input básico con label
 * <Input
 *   label="Correo Electrónico"
 *   placeholder="tu@email.com"
 *   type="email"
 * />
 * 
 * // Input con validación de error
 * <Input
 *   label="Contraseña"
 *   type="password"
 *   variant="error"
 *   error="La contraseña debe tener al menos 8 caracteres"
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    variant = 'default',
    label,
    error,
    success,
    warning,
    helper,
    leftIcon,
    rightIcon,
    onClear,
    showClearButton,
    id,
    value,
    ...props 
  }, ref) => {
    
    // Generar ID único si no se proporciona
    const inputId = id || React.useId()
    
    // Determinar variante basada en estados de validación
    const resolvedVariant = error ? 'error' : success ? 'success' : warning ? 'warning' : variant
    
    // Determinar si mostrar el botón de clear
    const shouldShowClear = showClearButton && value && onClear
    
    // Mensaje de estado (prioridad: error > warning > success > helper)
    const statusMessage = error || warning || success || helper
    const statusType = error ? 'error' : warning ? 'warning' : success ? 'success' : 'helper'
    
    // Clases CSS dinámicas
    const baseClasses = "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors h-10"
    
    const variantClasses = {
      default: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
      error: "border-red-500 bg-red-50 focus:ring-red-500",
      success: "border-green-500 bg-green-50 focus:ring-green-500",
      warning: "border-yellow-500 bg-yellow-50 focus:ring-yellow-500",
    }
    
    const paddingClasses = [
      leftIcon && "pl-10",
      (rightIcon || shouldShowClear) && "pr-10"
    ].filter(Boolean).join(" ")
    
    const inputClasses = [
      baseClasses,
      variantClasses[resolvedVariant],
      paddingClasses,
      className
    ].filter(Boolean).join(" ")
    
    return (
      <div className="w-full space-y-2">
        
        {/* Label del Input */}
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {/* Container del Input con Iconos */}
        <div className="relative">
          
          {/* Icono Izquierdo */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          {/* Input Principal */}
          <input
            id={inputId}
            ref={ref}
            value={value}
            className={inputClasses}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={statusMessage ? `${inputId}-message` : undefined}
            {...props}
          />
          
          {/* Icono Derecho o Botón Clear */}
          {(rightIcon || shouldShowClear) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {shouldShowClear ? (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                  aria-label="Limpiar campo"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <div className="text-gray-400">
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Mensaje de Estado */}
        {statusMessage && (
          <p 
            id={`${inputId}-message`}
            className={`text-sm ${
              statusType === 'error' ? 'text-red-600' :
              statusType === 'warning' ? 'text-yellow-600' :
              statusType === 'success' ? 'text-green-600' :
              'text-gray-500'
            }`}
            role={statusType === 'error' ? 'alert' : undefined}
          >
            {statusMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

// ============================================================================
// UTILIDADES Y HOOKS
// ============================================================================

/**
 * Hook para gestión de estados de input con validación
 */
export const useInputValidation = (
  value: string,
  validators: Array<(value: string) => string | null> = []
) => {
  const [error, setError] = React.useState<string | null>(null)
  const [touched, setTouched] = React.useState(false)
  
  // Ejecutar validaciones
  React.useEffect(() => {
    if (!touched) return
    
    for (const validator of validators) {
      const validationError = validator(value)
      if (validationError) {
        setError(validationError)
        return
      }
    }
    setError(null)
  }, [value, touched, validators])
  
  const handleBlur = () => setTouched(true)
  const reset = () => {
    setError(null)
    setTouched(false)
  }
  
  return {
    error,
    touched,
    isValid: !error && touched,
    handleBlur,
    reset
  }
}

/**
 * Validadores comunes para reutilización
 */
export const validators = {
  required: (message = 'Este campo es obligatorio') => (value: string) =>
    !value ? message : null,
    
  email: (message = 'Formato de email inválido') => (value: string) =>
    value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : null,
    
  minLength: (min: number, message?: string) => (value: string) =>
    value && value.length < min ? (message || `Mínimo ${min} caracteres`) : null,
    
  maxLength: (max: number, message?: string) => (value: string) =>
    value && value.length > max ? (message || `Máximo ${max} caracteres`) : null,
    
  pattern: (regex: RegExp, message = 'Formato inválido') => (value: string) =>
    value && !regex.test(value) ? message : null
}

export { Input }
export default Input