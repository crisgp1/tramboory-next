/**
 * Componente Button Enterprise con Sistema de Variantes
 * @module Button
 * @description Implementa botones reutilizables con tipado estricto y variantes de diseño
 */

import React, { forwardRef } from 'react'

// ============================================================================
// INTERFACES Y TIPOS DE DOMINIO
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger'
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// ============================================================================
// UTILIDADES DE ESTILOS
// ============================================================================

const getVariantClasses = (variant: string = 'default') => {
  const variants = {
    default: 'bg-gray-600 text-white hover:bg-gray-700',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  return variants[variant as keyof typeof variants] || variants.default
}

const getSizeClasses = (size: string = 'default') => {
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-11 px-6',
    xl: 'h-12 px-8 text-lg',
    icon: 'h-10 w-10',
  }
  return sizes[size as keyof typeof sizes] || sizes.default
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Button - Componente de botón enterprise con variantes tipadas
 * 
 * ### Características Implementadas:
 * - **Sistema de Variantes**: Gestión tipada de estilos
 * - **Estados de Loading**: Spinner integrado con deshabilitación automática
 * - **Iconografía**: Soporte para iconos izquierda y derecha
 * - **Accessibility**: ARIA labels y navegación por teclado
 * - **Forwarded Refs**: Compatible con bibliotecas de formularios
 * 
 * @example
 * ```tsx
 * // Botón básico
 * <Button variant="primary" size="lg">
 *   Guardar Cambios
 * </Button>
 * 
 * // Botón con estado de loading
 * <Button variant="success" loading={isSubmitting}>
 *   {isSubmitting ? 'Procesando...' : 'Enviar'}
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'default', 
    size = 'default',
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    
    // Estado de deshabilitación considerando loading
    const isDisabled = disabled || loading
    
    // Clases CSS combinadas
    const buttonClasses = [
      // Clases base
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Variantes
      getVariantClasses(variant),
      getSizeClasses(size),
      // Clases adicionales
      className
    ].filter(Boolean).join(' ')
    
    // Contenido del botón con iconos condicionales
    const buttonContent = (
      <>
        {/* Icono izquierdo o spinner de loading */}
        {loading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon && <span className="mr-2">{leftIcon}</span>
        )}
        
        {/* Contenido principal */}
        <span>{children}</span>
        
        {/* Icono derecho (solo si no está en loading) */}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </>
    )

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = "Button"

// ============================================================================
// UTILIDADES Y EXPORTS
// ============================================================================

/**
 * Hook para gestión de estados de botón
 */
export const useButtonState = (initialLoading = false) => {
  const [loading, setLoading] = React.useState(initialLoading)
  
  const withLoading = async (asyncOperation: () => Promise<void>) => {
    setLoading(true)
    try {
      await asyncOperation()
    } finally {
      setLoading(false)
    }
  }
  
  return { loading, setLoading, withLoading }
}

export { Button }
export default Button