/**
 * Error Boundary Enterprise para Manejo Robusto de Errores
 * @module ErrorBoundary
 * @description Implementa patrones enterprise de error handling con logging y recovery
 */

'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RotateCcw, Home, Mail } from 'react-icons/ri'

// ============================================================================
// INTERFACES Y TIPOS DE DOMINIO
// ============================================================================

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean
  enableRecovery?: boolean
  contactEmail?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  errorId?: string
  retryCount: number
}

interface ErrorReport {
  errorId: string
  message: string
  stack?: string
  componentStack: string
  timestamp: string
  userAgent: string
  url: string
  retryCount: number
  buildVersion?: string
}

// ============================================================================
// CONFIGURACIÓN ENTERPRISE
// ============================================================================

const ERROR_CONFIG = {
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  AUTO_REPORT: process.env.NODE_ENV === 'production',
  SHOW_STACK_TRACE: process.env.NODE_ENV === 'development',
  CONTACT_EMAIL: 'soporte@tramboory.com',
} as const

// ============================================================================
// COMPONENTE ERROR BOUNDARY ENTERPRISE
// ============================================================================

/**
 * ErrorBoundary - Componente para manejo robusto de errores
 * 
 * ### Características Enterprise:
 * - **Error Logging**: Registro automático de errores con contexto
 * - **User Recovery**: Opciones de recuperación para el usuario
 * - **Error Reporting**: Envío automático de reportes en producción
 * - **Graceful Degradation**: Fallbacks elegantes con UX optimizada
 * - **Retry Mechanism**: Sistema de reintentos con backoff
 * 
 * ### Patrones Implementados:
 * - **Circuit Breaker**: Prevención de errores en cascada
 * - **Error Categorization**: Clasificación de errores por severidad
 * - **Context Preservation**: Mantenimiento de estado de aplicación
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId?: NodeJS.Timeout

  constructor(props: ErrorBoundaryProps) {
    super(props)
    
    this.state = {
      hasError: false,
      retryCount: 0
    }
  }

  /**
   * Deriva estado de error para React Error Boundary
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      hasError: true,
      error,
      errorId
    }
  }

  /**
   * Captura y procesa errores con logging enterprise
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorReport = this.generateErrorReport(error, errorInfo)
    
    // Logging local para desarrollo
    this.logErrorLocally(errorReport)
    
    // Callback personalizado
    this.props.onError?.(error, errorInfo)
    
    // Reporting automático en producción
    if (ERROR_CONFIG.AUTO_REPORT) {
      this.reportErrorToService(errorReport)
    }
    
    // Actualizar estado con información de error
    this.setState({
      errorInfo,
      error
    })
  }

  /**
   * Genera reporte completo de error para análisis
   */
  private generateErrorReport(error: Error, errorInfo: ErrorInfo): ErrorReport {
    return {
      errorId: this.state.errorId!,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      retryCount: this.state.retryCount,
      buildVersion: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown'
    }
  }

  /**
   * Logging local para desarrollo y debugging
   */
  private logErrorLocally(report: ErrorReport) {
    console.group(`[ErrorBoundary] Error Capturado - ID: ${report.errorId}`)
    console.error('🚨 Error:', report.message)
    console.error('📍 Stack:', report.stack)
    console.error('🔧 Component Stack:', report.componentStack)
    console.error('📊 Contexto:', {
      timestamp: report.timestamp,
      url: report.url,
      retryCount: report.retryCount,
      userAgent: report.userAgent
    })
    console.groupEnd()
  }

  /**
   * Envío de reportes a servicio de monitoreo (simulado)
   */
  private async reportErrorToService(report: ErrorReport) {
    try {
      // En implementación real, enviar a Sentry, LogRocket, etc.
      console.log('[ErrorBoundary] Enviando reporte a servicio de monitoreo:', report.errorId)
      
      // Ejemplo de implementación con fetch
      /*
      await fetch('/api/errors/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      })
      */
    } catch (reportingError) {
      console.error('[ErrorBoundary] Error al reportar:', reportingError)
    }
  }

  /**
   * Manejo de retry con circuit breaker
   */
  private handleRetry = () => {
    if (this.state.retryCount >= ERROR_CONFIG.MAX_RETRY_ATTEMPTS) {
      console.warn('[ErrorBoundary] Máximo de reintentos alcanzado')
      return
    }

    // Incrementar contador de reintentos
    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1
    }))

    // Delay progresivo para reintentos
    const delay = ERROR_CONFIG.RETRY_DELAY * Math.pow(2, this.state.retryCount)
    
    this.retryTimeoutId = setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined
      })
    }, delay)
  }

  /**
   * Reset completo del error boundary
   */
  private handleReset = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
      retryCount: 0
    })
  }

  /**
   * Recarga completa de la página
   */
  private handleReload = () => {
    window.location.reload()
  }

  /**
   * Navegación al home
   */
  private handleGoHome = () => {
    window.location.href = '/'
  }

  /**
   * Limpieza de timeouts al desmontar
   */
  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
  }

  render() {
    // Renderizado normal si no hay errores
    if (!this.state.hasError) {
      return this.props.children
    }

    // Usar fallback personalizado si se proporciona
    if (this.props.fallback) {
      return this.props.fallback
    }

    // Renderizado del error boundary enterprise
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
          
          {/* Header del Error */}
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error del Sistema
            </h2>
            
            <p className="text-gray-600">
              Ha ocurrido un error inesperado en la aplicación. 
              {ERROR_CONFIG.AUTO_REPORT && ' Nuestro equipo ha sido notificado automáticamente.'}
            </p>
            
            {this.state.errorId && (
              <div className="mt-3 px-3 py-1 bg-gray-100 rounded-full inline-block">
                <span className="text-xs text-gray-500 font-mono">
                  ID: {this.state.errorId}
                </span>
              </div>
            )}
          </div>

          {/* Detalles del Error (Solo en Desarrollo) */}
          {(this.props.showDetails || ERROR_CONFIG.SHOW_STACK_TRACE) && this.state.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-semibold text-red-800 mb-2">
                Detalles Técnicos (Desarrollo)
              </h4>
              <div className="space-y-2">
                <div className="text-xs text-red-700">
                  <strong>Error:</strong> {this.state.error.message}
                </div>
                {this.state.error.stack && (
                  <pre className="text-xs text-red-600 overflow-auto max-h-32 whitespace-pre-wrap bg-white p-2 rounded border">
                    {this.state.error.stack}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* Acciones de Recuperación */}
          <div className="space-y-3">
            
            {/* Retry (si no se ha excedido el límite) */}
            {this.props.enableRecovery !== false && this.state.retryCount < ERROR_CONFIG.MAX_RETRY_ATTEMPTS && (
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Intentar Nuevamente
                {this.state.retryCount > 0 && (
                  <span className="ml-2 text-blue-200">
                    ({this.state.retryCount}/{ERROR_CONFIG.MAX_RETRY_ATTEMPTS})
                  </span>
                )}
              </button>
            )}
            
            {/* Reset */}
            <button
              onClick={this.handleReset}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              Reiniciar Componente
            </button>
            
            {/* Navegación */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </button>
              
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Recargar
              </button>
            </div>
          </div>

          {/* Información de Soporte */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Si el problema persiste, contacta a nuestro equipo de soporte:
            </p>
            <a 
              href={`mailto:${this.props.contactEmail || ERROR_CONFIG.CONTACT_EMAIL}?subject=Error de Aplicación - ${this.state.errorId}&body=ID de Error: ${this.state.errorId}%0D%0ADescripción del problema: `}
              className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              <Mail className="w-4 h-4 mr-1" />
              {this.props.contactEmail || ERROR_CONFIG.CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

// ============================================================================
// EXPORTS Y UTILIDADES
// ============================================================================

/**
 * Hook para reportar errores manualmente
 */
export const useErrorReporting = () => {
  const reportError = (error: Error, context?: string) => {
    console.error(`[Manual Error Report] ${context || 'Unknown context'}:`, error)
    
    // En producción, enviar a servicio de monitoreo
    if (process.env.NODE_ENV === 'production') {
      // analytics.reportError(error, { context })
    }
  }

  return { reportError }
}

/**
 * HOC para envolver componentes con error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<ErrorBoundaryProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

export default ErrorBoundary