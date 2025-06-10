/**
 * Página de Catálogo
 * @module CatalogoPage
 * @description Página de gestión de catálogo de paquetes y servicios
 */

import React from 'react'
import { CatalogMain } from '@/components/catalog'

// ============================================================================
// METADATA
// ============================================================================

export const metadata = {
  title: 'Catálogo - Tramboory',
  description: 'Gestión de paquetes y servicios del catálogo'
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * CatalogoPage - Página de gestión de catálogo
 * 
 * ### Características:
 * - **Gestión de Paquetes**: CRUD completo de paquetes y servicios
 * - **Categorización**: Organización por categorías de eventos
 * - **Control de Estado**: Activar/desactivar paquetes
 * - **Precios y Características**: Gestión detallada de ofertas
 * 
 * @example
 * ```tsx
 * // Ruta: /dashboard/catalogo
 * <CatalogoPage />
 * ```
 */
export default function CatalogoPage() {
  return (
    <div className="space-y-6">
      <CatalogMain />
    </div>
  )
}
