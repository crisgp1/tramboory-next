/**
 * Barrel Exports para Componentes Compartidos
 * @module SharedComponents
 * @description Exportaciones centralizadas para componentes compartidos enterprise
 */

// Componentes de utilidad
export { default as LoadingSpinner } from './LoadingSpinner'
export { default as ErrorBoundary, withErrorBoundary, useErrorReporting } from './ErrorBoundary'

// Re-exportar tipos para TypeScript
export type { 
  ErrorBoundaryProps,
  ErrorBoundaryState 
} from './ErrorBoundary'

// Configuración compartida
export const sharedConfig = {
  defaultTransition: 'transition-all duration-200 ease-in-out',
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  disabledStyle: 'disabled:opacity-50 disabled:cursor-not-allowed',
} as const

/**
 * Utilidades de componentes compartidos
 */
export const componentUtils = {
  // Generar ID único para componentes
  generateId: (prefix = 'component') => 
    `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    
  // Combinar clases CSS de forma segura
  combineClasses: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(' '),
    
  // Formatear nombres de display para debugging
  formatDisplayName: (componentName: string, wrapperName?: string) =>
    wrapperName ? `${wrapperName}(${componentName})` : componentName
}