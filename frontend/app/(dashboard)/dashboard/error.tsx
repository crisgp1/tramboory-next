'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Componente de Error Enterprise para Dashboard
 */
export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Dashboard] Error detected:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        
        {/* Error Icon */}
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Error en Dashboard
          </h3>
          
          <p className="text-gray-600">
            Se ha detectado un error en el sistema. Por favor, intenta nuevamente.
          </p>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="text-sm font-semibold text-red-800 mb-2">Detalles Técnicos (Dev)</h4>
            <pre className="text-xs text-red-700 overflow-auto max-h-32 whitespace-pre-wrap">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Recovery Actions */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
          >
            🔄 Intentar de Nuevo
          </button>
          
          <Link
            href="/dashboard"
            className="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            🏠 Recargar Dashboard
          </Link>
          
          <Link
            href="/"
            className="block w-full text-center text-blue-600 py-2 px-4 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Si el problema persiste, contacta a{' '}
            <a href="mailto:soporte@tramboory.com" className="text-blue-600 hover:text-blue-500">
              soporte@tramboory.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}