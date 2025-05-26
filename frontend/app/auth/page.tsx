import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticación | Tramboory',
  description: 'Acceso al sistema de autenticación empresarial',
}

/**
 * Página de Redirección Automática para Autenticación
 * 
 * ### Arquitectura de Routing:
 * - **Redirección Inmediata**: Evita URLs duplicadas /auth y /auth/login
 * - **SEO Optimizado**: Metadatos específicos para indexación controlada
 * - **UX Consistente**: Mantiene flujo de navegación predecible
 * 
 * ### Patrones de Diseño Aplicados:
 * - **Single Responsibility**: Una sola función de redirección
 * - **Convention over Configuration**: Sigue convenciones de Next.js
 */
export default function AuthPage() {
  // Redirección automática hacia login específico
  redirect('/auth/login')
}