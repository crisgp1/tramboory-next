/**
 * Página Principal del Dashboard
 * @module DashboardPage
 * @description Página principal del panel administrativo
 */

import React from 'react'
import { DashboardMain } from '@/components/dashboard'

// ============================================================================
// METADATA
// ============================================================================

export const metadata = {
  title: 'Dashboard - Tramboory',
  description: 'Panel de administración principal de Tramboory'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * DashboardPage - Página principal del dashboard
 * 
 * ### Características:
 * - **Vista General**: Métricas y resumen del sistema
 * - **Acciones Rápidas**: Enlaces a funciones principales
 * - **Actividad Reciente**: Últimas acciones del sistema
 * 
 * @example
 * ```tsx
 * // Ruta: /dashboard
 * <DashboardPage />
 * ```
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardMain />
    </div>
  )
}