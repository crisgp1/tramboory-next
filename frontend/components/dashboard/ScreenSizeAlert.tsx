'use client'

/**
 * Alerta de Tamaño de Pantalla
 * @module ScreenSizeAlert
 * @description Componente que alerta sobre el tamaño de pantalla recomendado
 */

import React from 'react'

// ============================================================================
// ICONOS SVG
// ============================================================================

const AlertCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface ScreenSizeAlertProps {
  setShowAlert: (show: boolean) => void
  className?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ScreenSizeAlert - Alerta de tamaño de pantalla
 * 
 * ### Características:
 * - **Responsive**: Se muestra solo en pantallas pequeñas
 * - **Dismissible**: Puede ser cerrada por el usuario
 * - **Informativa**: Recomienda usar dispositivos más grandes
 * 
 * @example
 * ```tsx
 * <ScreenSizeAlert setShowAlert={setShowAlert} />
 * ```
 */
export const ScreenSizeAlert: React.FC<ScreenSizeAlertProps> = ({ 
  setShowAlert,
  className = ''
}) => (
  <div className={`fixed top-0 left-0 right-0 bg-yellow-100 text-yellow-800 px-4 py-3 shadow-md z-50 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <AlertCircleIcon />
        <p className="ml-2">
          Para una mejor experiencia, se recomienda usar un iPad o dispositivo con pantalla más
          grande.
        </p>
      </div>
      <button 
        onClick={() => setShowAlert(false)} 
        className="text-yellow-800 hover:text-yellow-900 transition-colors duration-200"
      >
        <XIcon />
      </button>
    </div>
  </div>
)

export default ScreenSizeAlert