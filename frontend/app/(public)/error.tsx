'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Enhanced Error Component - Tramboory Design System
 * 
 * ### Características Implementadas:
 * - **Iconografía Animada**: SVG con micro-animaciones CSS
 * - **Sistema de Gradientes**: Paleta Tramboory Purple/Yellow
 * - **Glassmorphism Effects**: Backdrop blur con transparencias
 * - **Micro-interacciones**: Hover states y loading feedback
 * - **Responsive Layout**: Adaptación móvil/desktop optimizada
 */
export default function EnhancedError({ error, reset }: ErrorProps) {
  const [isResetting, setIsResetting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Enhanced error logging with context
    console.error('[Tramboory Error Handler]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })
  }, [error])

  const handleReset = async () => {
    setIsResetting(true)
    // Simulate loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 800))
    reset()
    setIsResetting(false)
  }

  const handleHomeNavigation = () => {
    window.location.href = '/'
  }

  if (!mounted) return null

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-tramboory-purple-900 via-indigo-950 to-tramboory-purple-800">
      {/* Enhanced Decorative Background */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={25}
        connectionDistance={120}
        opacity={0.3}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-tramboory-yellow-400/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-tramboory-purple-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-red-400/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Card className={cn(
        "relative w-full max-w-lg backdrop-blur-xl bg-white/10 border-tramboory-purple-300/30",
        "shadow-2xl shadow-purple-500/20 overflow-hidden",
        "transition-all duration-500 transform hover:scale-[1.02] hover:shadow-purple-500/30"
      )}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-tramboory-purple-500/10 to-tramboory-yellow-500/5 opacity-80" />
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-tramboory-purple-400/20 to-tramboory-yellow-400/20 blur-sm -z-10 animate-pulse-slow"></div>
        
        <CardHeader className="relative z-10 pb-2 pt-8">
          {/* Animated Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
                <svg 
                  className="w-10 h-10 text-white animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
              
              {/* Orbiting Error Indicators */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                <div className="absolute -top-1 left-1/2 w-3 h-3 bg-tramboory-yellow-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-yellow-400/50"></div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                <div className="absolute top-1/2 -right-1 w-2 h-2 bg-red-400 rounded-full transform -translate-y-1/2 shadow-lg shadow-red-400/50"></div>
              </div>
            </div>
          </div>
          
          <CardTitle className="text-center text-3xl md:text-4xl font-funhouse font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-red-400 to-red-500 mb-2">
            ¡Ups! Algo salió mal
          </CardTitle>
          
          <p className="text-center text-tramboory-yellow-200 text-sm font-medium">
            Error del Sistema Tramboory
          </p>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-2 pb-8 px-8 text-center space-y-6">
          <div className="space-y-4">
            <p className="text-white/90 text-lg leading-relaxed">
              Ha ocurrido un error inesperado en nuestra plataforma.
            </p>
            
            <p className="text-white/70 text-sm">
              Nuestro equipo técnico ha sido notificado automáticamente. 
              Por favor, intenta de nuevo o contacta a soporte si el problema persiste.
            </p>
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <Button
              onClick={handleReset}
              disabled={isResetting}
              className={cn(
                "group relative overflow-hidden",
                "bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800",
                "hover:from-tramboory-purple-700 hover:to-tramboory-purple-900",
                "text-white border-none shadow-lg shadow-purple-500/30",
                "transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50",
                "disabled:opacity-70 disabled:transform-none disabled:hover:shadow-purple-500/30"
              )}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isResetting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reintentando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Intentar de Nuevo
                  </>
                )}
              </span>
            </Button>
            
            <Button
              onClick={handleHomeNavigation}
              className={cn(
                "group relative",
                "bg-white/10 border border-white/30 text-white",
                "hover:bg-white/20 hover:border-white/50",
                "transition-all duration-300 transform hover:scale-105",
                "backdrop-blur-sm"
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Volver al Inicio
              </span>
            </Button>
          </div>
          
          {/* Error Details for Development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 p-4 bg-black/20 rounded-lg border border-white/10">
              <summary className="cursor-pointer text-white/80 text-sm font-medium mb-2">
                Detalles Técnicos (Desarrollo)
              </summary>
              <div className="text-left space-y-2">
                <pre className="text-xs text-red-300 overflow-auto max-h-32 whitespace-pre-wrap bg-black/30 p-3 rounded border border-red-500/20">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="text-xs text-white/60">
                    <span className="font-medium">Digest:</span> {error.digest}
                  </p>
                )}
                <p className="text-xs text-white/60">
                  <span className="font-medium">Timestamp:</span> {new Date().toLocaleString()}
                </p>
              </div>
            </details>
          )}
          
          {/* Production Error Code */}
          {process.env.NODE_ENV === 'production' && error.digest && (
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/60">
                <span className="font-medium text-tramboory-yellow-300">Código de Error:</span> {error.digest}
              </p>
              <p className="text-xs text-white/50 mt-1">
                Menciona este código al contactar soporte
              </p>
            </div>
          )}
          
          {/* Support Contact */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-white/70">
              ¿Necesitas ayuda? Contacta a{' '}
              <a 
                href="mailto:soporte@tramboory.com" 
                className="text-tramboory-yellow-400 hover:text-tramboory-yellow-300 transition-colors underline decoration-dotted"
              >
                soporte@tramboory.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}