/**
 * Página de Inventario
 * @module InventarioPage
 * @description Página de gestión de inventario
 */

import React from 'react'
import { InventoryMain } from '@/components/inventory'

// ============================================================================
// METADATA
// ============================================================================

export const metadata = {
  title: 'Inventario - Tramboory',
  description: 'Gestión de inventario de productos y servicios'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * InventarioPage - Página de gestión de inventario
 * 
 * ### Características:
 * - **Gestión Completa**: CRUD de productos y servicios
 * - **Control de Stock**: Alertas y seguimiento de inventario
 * - **Filtros Avanzados**: Búsqueda y filtrado de productos
 * 
 * @example
 * ```tsx
 * // Ruta: /dashboard/inventario
 * <InventarioPage />
 * ```
 */
export default function InventarioPage() {
  return (
    <div className="space-y-6">
      <InventoryMain />
    </div>
  )
}