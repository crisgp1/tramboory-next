import type { Metadata } from 'next'
import { LoginForm } from '@/features/auth/components/forms/LoginForm'

export const metadata: Metadata = {
  title: 'Iniciar Sesión | Tramboory',
  description: 'Acceso seguro a la plataforma empresarial Tramboory',
}

/**
 * Página de Login Enterprise
 * 
 * ### Características:
 * - **SSR Optimized**: Renderizado del lado del servidor
 * - **SEO Ready**: Metadatos optimizados
 * - **Security Headers**: Configuración de seguridad
 * - **Performance**: Code splitting automático
 */
export default function LoginPage() {
  return (
    <div className="space-y-6">
      {/* Header de la Página */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-gray-600">
          Accede a tu cuenta empresarial
        </p>
      </div>

      {/* Formulario de Login */}
      <LoginForm />

      {/* Enlaces de Navegación */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a 
            href="/auth/register" 
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}