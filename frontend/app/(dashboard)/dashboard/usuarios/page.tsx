'use client'

/**
 * Página de Gestión de Usuarios (Español)
 * @module UsuariosPage
 * @description Redirección a la página de usuarios en inglés
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UsuariosPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a la página de usuarios en inglés
    router.replace('/dashboard/users')
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