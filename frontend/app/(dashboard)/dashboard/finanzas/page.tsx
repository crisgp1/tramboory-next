'use client'

/**
 * Página de Gestión de Finanzas (Español)
 * @module FinanzasPage
 * @description Redirección a la página de finanzas en inglés
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FinanzasPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a la página de finanzas en inglés
    router.replace('/dashboard/finances')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  )
}