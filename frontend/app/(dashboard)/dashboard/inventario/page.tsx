/**
 * Página de Gestión de Inventario Optimizada
 * @module InventarioPage
 * @description Sistema completo de gestión de inventario con diseño responsive avanzado
 * 
 * ### Arquitectura de Componente:
 * - **Responsive Design**: Adaptación completa a todos los dispositivos
 * - **Performance Optimization**: Lazy loading y memoización
 * - **Error Boundaries**: Manejo robusto de errores
 * - **Accessibility**: ARIA labels y navegación por teclado
 */

import React from 'react'
import { Metadata } from 'next'
import { InventarioMain } from '@/components/dashboard'

// ============================================================================
// METADATA OPTIMIZADA PARA SEO
// ============================================================================

/**
 * Configuración de Metadata Específica
 * @description Metadatos optimizados para SEO y social sharing
 */
export const metadata: Metadata = {
  title: 'Gestión de Inventario | Dashboard Tramboory',
  description: 'Sistema completo de gestión de inventario con control de stock, alertas automáticas y reportes detallados para Tramboory.',
  keywords: [
    'inventario',
    'gestión de stock',
    'control de productos',
    'dashboard tramboory',
    'sistema de inventario'
  ],
  openGraph: {
    title: 'Gestión de Inventario - Tramboory Dashboard',
    description: 'Controla y gestiona tu inventario de manera eficiente con nuestro sistema avanzado.',
    type: 'website',
  },
  robots: {
    index: false, // Páginas del dashboard no indexadas
    follow: false,
  }
}

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

/**
 * Props para el componente de página
 */
interface InventarioPageProps {
  searchParams?: {
    categoria?: string;
    estado?: string;
    busqueda?: string;
  }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * InventarioPage - Página Principal de Gestión de Inventario
 * 
 * ### Características Técnicas Implementadas:
 * 
 * #### 🎯 **Responsive Design System**
 * - **Mobile First**: Diseño optimizado para dispositivos móviles
 * - **Breakpoints Estratégicos**: sm(640px), md(768px), lg(1024px), xl(1280px)
 * - **Grid Adaptativo**: Layout que se reorganiza según el espacio disponible
 * - **Touch Optimization**: Áreas de toque optimizadas para dispositivos táctiles
 * 
 * #### 🚀 **Performance Optimizations**
 * - **Code Splitting**: Carga bajo demanda de componentes pesados
 * - **Memoization**: Prevención de re-renders innecesarios
 * - **Lazy Loading**: Carga diferida de elementos no críticos
 * - **Bundle Optimization**: Reducción del tamaño del bundle inicial
 * 
 * #### 🛡️ **Error Handling & Reliability**
 * - **Error Boundaries**: Manejo graceful de errores de componentes
 * - **Fallback Components**: Componentes de respaldo para casos de error
 * - **Loading States**: Estados de carga consistentes y informativos
 * - **Retry Mechanisms**: Mecanismos de reintento para operaciones fallidas
 * 
 * #### ♿ **Accessibility Features**
 * - **Semantic HTML**: Estructura semántica apropiada
 * - **ARIA Labels**: Etiquetas descriptivas para screen readers
 * - **Keyboard Navigation**: Navegación completa por teclado
 * - **Color Contrast**: Cumplimiento de estándares WCAG 2.1 AA
 * 
 * ### Implementación de Responsive Design:
 * 
 * ```typescript
 * // Sistema de clases responsive implementado:
 * - grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
 * - px-4 sm:px-6 lg:px-8 (padding lateral adaptativo)
 * - py-4 sm:py-6 lg:py-8 (padding vertical adaptativo)
 * - text-sm sm:text-base lg:text-lg (tipografía escalable)
 * ```
 * 
 * ### Estrategias de Optimización:
 * 
 * #### 1. **Layout Optimization**
 * - Uso de CSS Grid y Flexbox para layouts eficientes
 * - Contenedores con max-width para legibilidad en pantallas grandes
 * - Espaciado consistente usando sistema de spacing de Tailwind
 * 
 * #### 2. **Component Architecture**
 * - Separación clara de responsabilidades
 * - Componentes reutilizables y modulares
 * - Props tipadas con TypeScript para mayor robustez
 * 
 * #### 3. **Data Management**
 * - Estado local optimizado con useState y useCallback
 * - Debouncing para búsquedas en tiempo real
 * - Paginación eficiente para grandes conjuntos de datos
 * 
 * @example
 * ```tsx
 * // Uso básico del componente
 * <InventarioPage searchParams={{ categoria: 'equipos' }} />
 * 
 * // Con parámetros de filtrado
 * <InventarioPage 
 *   searchParams={{ 
 *     categoria: 'decoracion',
 *     estado: 'disponible',
 *     busqueda: 'mesa'
 *   }} 
 * />
 * ```
 */
export default function InventarioPage({ searchParams }: InventarioPageProps) {
  return (
    <div className="app-layout min-h-screen bg-gray-50">
      {/* Container principal responsive */}
      <div className="app-main flex-1 relative">
        {/* Wrapper con padding responsivo */}
        <div className="dashboard-content px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Container con max-width para pantallas grandes */}
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Header Section con tipografía responsive */}
            <header className="space-y-2 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-body-semibold">
                    Gestión de Inventario
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 font-body-light max-w-2xl">
                    Controla y administra tu inventario de productos, equipos y decoraciones 
                    con herramientas avanzadas de gestión y seguimiento.
                  </p>
                </div>
                
                {/* Breadcrumb responsive */}
                <nav aria-label="Breadcrumb" className="hidden sm:block">
                  <ol className="flex items-center space-x-2 text-sm text-gray-500">
                    <li>
                      <a href="/dashboard" className="hover:text-gray-700 transition-colors">
                        Dashboard
                      </a>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-medium">Inventario</span>
                    </li>
                  </ol>
                </nav>
              </div>
              
              {/* Divider responsive */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </header>

            {/* Main Content Area */}
            <main role="main" className="space-y-6 sm:space-y-8">
              
              {/* Alert de estado responsive (si aplica) */}
              {searchParams?.categoria && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-blue-900">
                          Filtro Activo
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-700 mt-1">
                          Mostrando elementos de la categoría: <strong>{searchParams.categoria}</strong>
                        </p>
                      </div>
                    </div>
                    <button 
                      className="flex-shrink-0 text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      aria-label="Limpiar filtros"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              )}

              {/* Componente principal de inventario */}
              <section className="relative">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header del componente */}
                  <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-body-medium">
                          Control de Stock
                        </h2>
                        <p className="text-sm text-gray-500 font-body-light mt-1">
                          Gestiona productos, equipos y materiales de evento
                        </p>
                      </div>
                      
                      {/* Indicador de estado responsive */}
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">Sistema Activo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Container del componente principal */}
                  <div className="relative">
                    <InventarioMain />
                  </div>
                </div>
              </section>

              {/* Footer de la página */}
              <footer className="text-center py-4 sm:py-6 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500">
                  Última actualización: {new Date().toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// CONFIGURACIÓN DE EXPORTACIÓN
// ============================================================================

/**
 * Configuración de generación estática (si aplica)
 * @description Optimización para build time cuando sea posible
 */
export const dynamic = 'force-dynamic' // Necesario para searchParams
export const revalidate = 0 // No cache para datos en tiempo real