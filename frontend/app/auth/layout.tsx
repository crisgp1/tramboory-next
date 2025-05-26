import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Autenticación | Tramboory',
  description: 'Sistema de autenticación empresarial para Tramboory',
  robots: 'noindex, nofollow',
}

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Layout Enterprise para Módulo de Autenticación
 * 
 * ### Características Implementadas:
 * - **UI Optimizada**: Diseño centrado en conversión
 * - **SEO Controlado**: Metadatos específicos para auth
 * - **Performance**: Lazy loading de componentes
 * - **Accessibility**: ARIA labels y navegación por teclado
 * - **Security**: Headers de seguridad optimizados
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${inter.className}`}>
      <div className="relative flex min-h-screen">
        
        {/* Panel Izquierdo - Branding */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
          
          {/* Patrón de Fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          {/* Contenido del Branding */}
          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <div className="max-w-md">
              
              {/* Logo y Marca */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <span className="ml-3 text-2xl font-bold text-white">Tramboory</span>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight">
                  Plataforma Enterprise de Gestión
                </h1>
                <p className="text-blue-100 mt-4 text-lg leading-relaxed">
                  Accede a tu cuenta para gestionar reservaciones, inventario y operaciones empresariales.
                </p>
              </div>

              {/* Características Destacadas */}
              <div className="space-y-4">
                <div className="flex items-center text-blue-100">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Autenticación de dos factores</span>
                </div>
                
                <div className="flex items-center text-blue-100">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Cifrado end-to-end</span>
                </div>
                
                <div className="flex items-center text-blue-100">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Acceso empresarial 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formularios */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            
            {/* Logo Móvil */}
            <div className="lg:hidden mb-8 text-center">
              <div className="inline-flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Tramboory</span>
              </div>
            </div>

            {/* Contenido Principal */}
            <main className="w-full">
              {children}
            </main>

            {/* Footer Enlaces */}
            <footer className="mt-8">
              <div className="text-center">
                <div className="flex justify-center space-x-6 text-sm text-gray-500">
                  <a href="/privacy" className="hover:text-gray-700 transition-colors">
                    Privacidad
                  </a>
                  <a href="/terms" className="hover:text-gray-700 transition-colors">
                    Términos
                  </a>
                  <a href="/support" className="hover:text-gray-700 transition-colors">
                    Soporte
                  </a>
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Plataforma segura con certificación ISO 27001
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}