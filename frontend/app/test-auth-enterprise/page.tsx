// app/test-auth-enterprise/page.tsx
import { Suspense } from 'react';
import LoginForm from '@/features/auth/components/forms/LoginForm';

function LoginFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm 
        onSuccess={() => console.log('Login successful!')}
        onError={(error) => console.error('Login error:', error)}
        autoFocus={true}
      />
    </Suspense>
  );
}

export default function TestAuthEnterprisePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Módulo Auth Enterprise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Implementación completa del sistema de autenticación siguiendo las mejores prácticas de la industria
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Validación Robusta
            </h3>
            <p className="text-gray-600 text-sm">
              Schemas Zod con validación en tiempo real, mensajes de error contextuales y UX optimizada.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Seguridad Enterprise
            </h3>
            <p className="text-gray-600 text-sm">
              Tokens JWT seguros, refresh automático, rate limiting y protección contra ataques comunes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Performance Optimizada
            </h3>
            <p className="text-gray-600 text-sm">
              Caché inteligente, lazy loading, optimistic updates y sincronización entre tabs.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M11 7h4a2 2 0 012 2v4m-6-4v10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              TypeScript Estricto
            </h3>
            <p className="text-gray-600 text-sm">
              Type safety completo, interfaces robustas y autocompletado inteligente en IDE.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Monitoreo Avanzado
            </h3>
            <p className="text-gray-600 text-sm">
              Logging estructurado, métricas de performance y tracking de errores en tiempo real.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              UX Excepcional
            </h3>
            <p className="text-gray-600 text-sm">
              Accesibilidad WCAG 2.1, responsive design, micro-interacciones y estados de loading intuitivos.
            </p>
          </div>
        </div>

        {/* Login Form Demo */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Demo: Formulario de Login Enterprise
            </h2>
            <p className="text-gray-600">
              Prueba la implementación completa con validación en tiempo real
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <LoginFormWrapper />
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Especificaciones Técnicas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Frontend</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Next.js 14+ App Router</li>
                <li>• TypeScript 5+ strict mode</li>
                <li>• Zod validation schemas</li>
                <li>• Tailwind CSS responsive</li>
                <li>• React Hook Form + validación</li>
                <li>• Error boundaries robustos</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Backend Integration</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Server Actions con revalidación</li>
                <li>• JWT con refresh automático</li>
                <li>• Rate limiting y retry logic</li>
                <li>• Manejo de errores centralizado</li>
                <li>• Logging estructurado</li>
                <li>• Caché inteligente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}