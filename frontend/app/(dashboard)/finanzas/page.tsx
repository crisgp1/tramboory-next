/**
 * Página de Finanzas
 * @module FinanzasPage
 * @description Página de gestión financiera y reportes
 */

import React from 'react'
import { FinanceMain } from '@/components/finance'

// ============================================================================
// METADATA
// ============================================================================

export const metadata = {
  title: 'Finanzas - Tramboory',
  description: 'Gestión financiera y reportes de ingresos'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * FinanzasPage - Página de gestión financiera
 * 
 * ### Características:
 * - **Métricas Financieras**: KPIs y resumen de ingresos/gastos
 * - **Historial de Transacciones**: Lista detallada de movimientos
 * - **Reportes**: Generación de reportes financieros
 * - **Análisis**: Tendencias y análisis de datos
 * 
 * @example
 * ```tsx
 * // Ruta: /dashboard/finanzas
 * <FinanzasPage />
 * ```
 */
export default function FinanzasPage() {
  return (
    <div className="space-y-6">
      <FinanceMain />
    </div>
  )
}