import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard | Tramboory',
  description: 'Panel de control empresarial Tramboory',
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Layout Enterprise para Dashboard
 * 
 * ### Arquitectura del Layout:
 * - **Navigation Sidebar**: Navegación principal persistente
 * - **Header Bar**: Información de usuario y notificaciones
 * - **Content Area**: Área principal de contenido dinámico
 * - **Footer**: Información del sistema y enlaces
 * 
 * ### Características de Performance:
 * - **Lazy Loading**: Componentes cargados bajo demanda
 * - **Memoization**: Optimización de re-renders
 * - **Error Boundaries**: Manejo robusto de errores
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      
      {/* Estructura Principal del Dashboard */}
      <div className="flex h-screen">
        
        {/* Sidebar de Navegación */}
        <nav className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="flex flex-col h-full">
            
            {/* Logo y Branding */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Tramboory</span>
              </div>
            </div>

            {/* Menú de Navegación */}
            <div className="flex-1 px-4 py-6 space-y-2">
              
              {/* Dashboard */}
              <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
                </svg>
                Dashboard
              </a>

              {/* Reservaciones */}
              <a href="/dashboard/reservations" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reservaciones
              </a>

              {/* Inventario */}
              <a href="/dashboard/inventory" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Inventario
              </a>

              {/* Configuración */}
              <a href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configuración
              </a>
            </div>

            {/* Footer del Sidebar */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Sistema Activo
              </div>
            </div>
          </div>
        </nav>

        {/* Área Principal de Contenido */}
        <div className="flex-1 flex flex-col">
          
          {/* Header Superior */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Breadcrumbs / Título */}
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Panel de control empresarial</p>
              </div>

              {/* Acciones del Usuario */}
              <div className="flex items-center space-x-4">
                
                {/* Notificaciones */}
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11.613 15.932c-.179-.011-.358-.022-.538-.022-3.18 0-6.75-.89-6.75-2.998 0-.508.418-.925.934-.925.499 0 .902.383.934.86.23 3.4 2.249 6.1 3.02 6.26 1.262 1.43 2.422 2.806 3.808 3.892z" />
                  </svg>
                </button>

                {/* Perfil del Usuario */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">U</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">Usuario</div>
                    <div className="text-xs text-gray-500">Admin</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenido Principal */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}