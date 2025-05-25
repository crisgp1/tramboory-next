'use client'

/**
 * Componente HomeContent - Versión de desarrollo temporal
 * TODO: Implementar componentes completos en iteración futura
 */
export default function HomeContent() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 to-indigo-950">
      {/* Hero Section Temporal */}
      <section className="relative z-10 flex items-center justify-center min-h-screen text-white">
        <div className="text-center space-y-8 px-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Tramboory
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Plataforma de gestión de eventos empresariales
          </p>
          <div className="space-y-4">
            <a 
              href="/test-auth-enterprise"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              🔐 Probar Módulo Auth Enterprise
            </a>
            <a 
              href="/dashboard"
              className="inline-block ml-4 bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-purple-900 transition-all duration-200"
            >
              📊 Ir al Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Footer Temporal */}
      <footer className="relative z-10 bg-black bg-opacity-50 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Tramboory. Sistema en desarrollo.</p>
        </div>
      </footer>
    </div>
  )
}